import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import Icon from "components/common/Icon";
import { useRouter } from "next/router";

import { getChatList } from "../../api/chat";
import { IChatList } from "../../types/index";
import Header from "components/common/Header";
import { useRecoilValue } from "recoil";
import { userInfoState } from "atoms/atoms";
import dayjs from "dayjs";

const ChatRoomContainer = styled.div``;

const ChatInputDiv = styled.div`
  width: 100%;
  height: 5.6rem;
  position: fixed;
  max-width: 512px;
  bottom: 0;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 -1px 1px #00000014;
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 999999;
`;

const InputDiv = styled.input`
  width: 100%;
  height: 90%;
  max-width: 512px;
  background: #e4e4e4;
  border: none;
  border-radius: 1.5rem;
  outline: none;
  padding: 1.6rem;
  font-size: 1.6rem;
  color: #4d5158;
  font-family: "Noto Sans KR";
  ::placeholder {
    color: #cccccc;
  }
`;

const NoChatDiv = styled.div`
  width: 100%;
  height: calc(100vh - 50rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const NoChatTitle = styled.p`
  font-size: 1.8rem;
`;

const NoChatContent = styled.p`
  font-size: 1.6rem;
`;

interface ChatProps {
  roomId: string;
  nickname: string;
  imgUrl: string;
}

console.log(process.env.NEXT_PUBLIC_CHAT_URL);
const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || "";
const socket = io(CHAT_URL);
// const socket = io("http://localhost:5000");
// const socket = io("https://baljc.com");

export default function ChatRoom({ roomId, nickname, imgUrl }: ChatProps) {
  const router = useRouter();

  const userInfo = useRecoilValue(userInfoState);
  const [content, setContent] = useState("");
  // 기존 채팅 내용 리스트
  const [chatList, setChatList] = useState<IChatList[]>([]);
  // 새로 추가된 채팅
  const [recentChat, setRecentChat] = useState();

  useEffect(() => {
    // 소켓 연결 응답
    socket.on("connect", () => {
      console.log("connected: ", socket.id);

      // room id로 join 이벤트 요청
      socket.emit("join", roomId);
      console.log(socket);
    });

    // 페이지 이동 또는 브라우저 닫을 시 disconnect
    return () => {
      socket.disconnect();
      console.log("disconnect");
    };
  }, []);

  useEffect(() => {
    // 메시지 응답
    // 어떻게 받징
    socket.on("message", (data) => {
      console.log(data.nickname);
      console.log("receive: ", data.message);
      setChatList([
        ...chatList,
        {
          memberId: data.memberId,
          nickname: data.nickname,
          content: data.content,
          imgUrl: data.imgUrl,
          createdAt: dayjs(new Date()).toString(),
        },
      ]);
    });
  }, [chatList]);

  const handleInput = (e: any) => {
    setContent(e.target.value);
  };

  const send = () => {
    // 메시지 전송
    // room id는 join 이벤트에 사용한 room id와 동일해야함, member id와 message 포함하여 전송
    if (content.length > 0) {
      socket.emit("message", {
        roomId: roomId,
        memberId: userInfo.memberId,
        message: content,
        nickname: nickname,
        imgUrl: imgUrl,
      });
      console.log("send: ", content);
      setChatList([
        ...chatList,
        {
          memberId: userInfo.memberId,
          nickname: nickname,
          content: content,
          imgUrl: imgUrl,
          createdAt: dayjs(new Date()).toString(),
        },
      ]);
      setContent("");
    }
  };

  useEffect(() => {
    getChatList(roomId)
      .then((res) => {
        // console.log(res.data.data);
        setChatList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      send();
    }
  };

  return (
    <>
      <Header label={nickname} onClickBackButton={() => router.push("/chat")} />
      {chatList.length > 0 ? (
        chatList.map((chatItem, idx) => (
          <ChatMessage key={idx} chatItem={chatItem}></ChatMessage>
        ))
      ) : (
        <NoChatDiv>
          <NoChatTitle>채팅 기록이 없습니다.</NoChatTitle>
          <NoChatContent>친구와 대화를 시작해보세요!</NoChatContent>
        </NoChatDiv>
      )}

      <ChatInputDiv>
        <Icon icon="image" mode="fas" color="#cccccc" size="2.5rem" />
        <InputDiv
          placeholder="내용을 입력해주세요."
          onChange={handleInput}
          onKeyPress={onEnter}
          value={content}
        />
        <Icon
          icon="paper-plane"
          mode="fas"
          color="#cccccc"
          size="2.5rem"
          onClick={send}
        />
      </ChatInputDiv>
    </>
  );
}