import { useRouter } from "next/router";
import styled from "styled-components";
import { IChatRoomList } from "../../types/index";

const ChatContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
`;

const ChatItemDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.8rem;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 6.2rem;
  height: 6.2rem;
`;

const ChatDetailDiv = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const ChatHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ChatNickname = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
`;

const ChatDong = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #6a6a6a;
`;

const ChatContent = styled.div`
  font-size: 1.4rem;
`;

const ChatDate = styled.div`
  font-size: 1.2rem;
`;

interface chatProps {
  chatItem: IChatRoomList;
}

export default function ChatListItem({ chatItem }: chatProps) {
  const router = useRouter();

  return (
    <ChatContainer
      onClick={() =>
        router.push(
          {
            pathname: `/chat/${chatItem.roomId}`,
            query: {
              nickname: chatItem.other.nickname || "",
              profileUrl: chatItem.other.profileUrl || "",
            },
          }
          // `/chat/${chatItem.roomId}`
        )
      }
    >
      <ChatItemDiv>
        {chatItem.other.profileUrl === null ? (
          <ProfileImage src="/assets/img/mypage/avatar/default_profile.png"></ProfileImage>
        ) : (
          <ProfileImage src={chatItem.other.profileUrl}></ProfileImage>
        )}

        <ChatDetailDiv>
          <ChatHeader>
            <ChatNickname>{chatItem.other.nickname}</ChatNickname>|
            <ChatDong>{chatItem.other.depth3}</ChatDong>
          </ChatHeader>
          <ChatContent>{chatItem.content}</ChatContent>
          <ChatDate>{chatItem.updatedAt}</ChatDate>
        </ChatDetailDiv>
      </ChatItemDiv>
    </ChatContainer>
  );
}
