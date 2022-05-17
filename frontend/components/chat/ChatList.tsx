import styled from "styled-components";

import ChatListItem from "./ChatListItem";
import { IChatRoomList } from "../../types/index";
import { useCallback, useEffect, useState } from "react";

import { getChatRoomList } from "../../api/chat";

const ChatContainer = styled.div``;

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

export default function ChatList() {
  const [chatList, setChatList] = useState<IChatRoomList[]>([]);

  const getChatist = useCallback(() => {
    getChatRoomList()
      .then((res) => {
        setChatList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getChatist();
  }, [getChatist]);

  return (
    <>
      <ChatContainer>
        {chatList.length > 0 ? (
          chatList.map((chatItem, idx) => {
            return <ChatListItem key={idx} chatItem={chatItem}></ChatListItem>;
          })
        ) : (
          <NoChatDiv>
            <NoChatTitle>채팅 기록이 없습니다.</NoChatTitle>
            <NoChatContent>동네 친구들과 대화를 시작해보세요!</NoChatContent>
          </NoChatDiv>
        )}
      </ChatContainer>
    </>
  );
}
