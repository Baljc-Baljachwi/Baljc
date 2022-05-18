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

const DayDiv = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 8px 0px;
  ::before,
  ::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;
interface ChatProp {
  chatItem: IChatList;
}
export default function ChatMessage({ chatItem }: ChatProp) {
  const userInfo = useRecoilValue(userInfoState);

  // console.log(chatItem);

  dayjs.locale("ko");
  const date = dayjs(chatItem.createdAt).format("YYYY-MM-DD dddd");
  // console.log(date);

  const chatDate = dayjs(chatItem.createdAt).format("A HH:mm");
  return (
    <MessageDiv>
      {/* <DayDiv>{date}</DayDiv> */}
      {chatItem.memberId == userInfo.memberId ? (
        <MyMessageDiv>
          <MessageTime>{chatDate}</MessageTime>
          <MyMessage>{chatItem.content}</MyMessage>
        </MyMessageDiv>
      ) : (
        <OtherMessageDiv>
          <OtherProfile src="/assets/img/mypage/avatar/default_profile.png" />
          <OtherMessage>{chatItem.content}</OtherMessage>
          <MessageTime>{chatDate}</MessageTime>
        </OtherMessageDiv>
      )}
    </MessageDiv>
  );
}
