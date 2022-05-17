import styled from "styled-components";
import { IChatList } from "../../types/index";

const MessageDiv = styled.div`
  width: 100%;
`;

const MyMessageDiv = styled.div`
  display: flex;
  justify-content: end;
  padding: 2rem;
  align-items: end;
  gap: 1.6rem;
`;

const MyMessage = styled.div`
  background-color: #ffefc5;
  padding: 1.2rem 1.6rem;
  text-align: center;
  border-radius: 2.5rem 2.5rem 0 2.5rem;
  font-size: 1.6rem;
`;

const OtherMessageDiv = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: end;
  padding: 2rem;
`;

const OtherProfile = styled.img`
  height: 5.5rem;
`;

const OtherMessage = styled.div`
  background-color: #d9dde7;
  padding: 1.2rem 1.6rem;
  text-align: center;
  border-radius: 2.5rem 2.5rem 2.5rem 0;
  font-size: 1.6rem;
`;

const MessageTime = styled.div`
  color: #dedede;
  font-size: 1.2rem;
  white-space: nowrap;
`;

interface ChatProp {
  chatItem: IChatList;
}
export default function ChatMessage({ chatItem }: ChatProp) {
  return (
    <MessageDiv>
      {/* <MyMessageDiv>
        <MessageTime>오후 3:45</MessageTime>
        <MyMessage>안녕하세요 ~!</MyMessage>
      </MyMessageDiv>
      <OtherMessageDiv>
        <OtherProfile src="/assets/img/mypage/avatar/default_profile.png" />
        <OtherMessage>안녕하세요안녕하세요안녕하세요안녕하세요</OtherMessage>
        <MessageTime>오후 3:46</MessageTime>
      </OtherMessageDiv> */}
    </MessageDiv>
  );
}
