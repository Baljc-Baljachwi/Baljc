import styled from "styled-components";

import ChatListItem from "./ChatListItem";

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
  // 대충 일단 넣어
  const chatList = [
    { roomId: 1, nickname: "줌줌따리", content: "아농" },
    { roomId: 2, nickname: "멋지희", content: "하이하이" },
    { roomId: 3, nickname: "갓성재", content: "안녕하세요" },
  ];

  return (
    <>
      <ChatContainer>
        {chatList.length > 0 ? (
          chatList.map((chatItem, idx) => {
            const { roomId, nickname, content } = chatItem;
            return (
              <ChatListItem
                key={idx}
                roomId={roomId}
                nickname={nickname}
                content={content}
              ></ChatListItem>
            );
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
