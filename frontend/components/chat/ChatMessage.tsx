import { userInfoState } from "atoms/atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IChatList } from "../../types/index";
import dayjs from "dayjs";
import "dayjs/locale/ko";

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
  weight: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
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

const DayDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 1.2rem;
  margin: 1rem 0;
  flex-basis: 100%;
  ::before,
  ::after {
    content: "";
    flex-grow: 1;
    background: #cccccc;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;
interface ChatProp {
  chatItem: IChatList;
  isDate: boolean;
}
export default function ChatMessage({ chatItem, isDate }: ChatProp) {
  const userInfo = useRecoilValue(userInfoState);

  dayjs.locale("ko");
  const date = dayjs(chatItem.createdAt).format("YYYY-MM-DD dddd");
  const chatDate = dayjs(chatItem.createdAt).format("A HH:mm");

  return (
    <MessageDiv>
      {isDate && <DayDiv>{date}</DayDiv>}
      {chatItem.memberId == userInfo.memberId ? (
        <MyMessageDiv>
          <MessageTime>{chatDate}</MessageTime>
          <MyMessage>{chatItem.content}</MyMessage>
        </MyMessageDiv>
      ) : (
        <OtherMessageDiv>
          {chatItem.profileUrl ? (
            <OtherProfile src={chatItem.profileUrl} />
          ) : (
            <OtherProfile src="/assets/img/mypage/avatar/default_profile.png" />
          )}
          <OtherMessage>{chatItem.content}</OtherMessage>
          <MessageTime>{chatDate}</MessageTime>
        </OtherMessageDiv>
      )}
    </MessageDiv>
  );
}
