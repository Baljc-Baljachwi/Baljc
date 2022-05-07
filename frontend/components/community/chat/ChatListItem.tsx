import styled from "styled-components";

const ChatContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;

const ChatItemDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.8rem;
`;

const ProfileImage = styled.img`
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

interface ChatProps {
  roomId: number;
  nickname: string;
  content: string;
}

export default function ChatListItem({ roomId, nickname, content }: ChatProps) {
  return (
    <ChatContainer>
      <ChatItemDiv>
        <ProfileImage src="/assets/img/mypage/avatar/default_profile.png"></ProfileImage>
        <ChatDetailDiv>
          <ChatHeader>
            <ChatNickname>{nickname}</ChatNickname>|<ChatDong>역북동</ChatDong>
          </ChatHeader>
          <ChatContent>{content}</ChatContent>
          <ChatDate>1분전</ChatDate>
        </ChatDetailDiv>
      </ChatItemDiv>
    </ChatContainer>
  );
}
