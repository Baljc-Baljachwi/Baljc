import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import Icon from "components/common/Icon";

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

const socket = io("https://baljc.com");

export default function ChatRoom() {
  const [content, setContent] = useState("");

  useEffect(() => {
    // 소켓 연결 응답
    socket.on("connect", () => {
      console.log("connected: ", socket.id);

      // room id로 join 이벤트 요청
      socket.emit("join", "3k52");
      console.log(socket);

      // 메시지 응답
      socket.on("message", (message) => {
        console.log("receive: ", message);
      });
    });

    // 페이지 이동 또는 브라우저 닫을 시 disconnect
    return () => {
      socket.disconnect();
      console.log("disconnect");
    };
  }, []);

  const handleInput = (e: any) => {
    setContent(e.target.value);
  };

  const send = useCallback(() => {
    // 메시지 전송
    // room id는 join 이벤트에 사용한 room id와 동일해야함, member id와 message 포함하여 전송
    socket.emit("message", {
      roomId: "3k52",
      memberId: "031f",
      message: content,
    });
    console.log("send: ", content);
    setContent("");
  }, [content]);

  return (
    <>
      <ChatRoomContainer></ChatRoomContainer>
      <ChatMessage></ChatMessage>
      {/* <ChatInput></ChatInput> */}
      <ChatInputDiv>
        <Icon icon="image" mode="fas" color="#cccccc" size="2.5rem" />
        <InputDiv
          placeholder="내용을 입력해주세요."
          onChange={handleInput}
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
