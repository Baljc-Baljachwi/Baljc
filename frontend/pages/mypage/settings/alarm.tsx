import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "components/common/Header";
import ToggleButton from "components/mypage/settings/ToggleButton";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { getAlarms, putAlarms } from "../../../api/alarm";
import { YNType } from "../../../types";
import ButtonBottom from "components/common/ButtonBottom";

const Container = styled.div`
  height: 100vh;
`;

const PageContainer = styled.main`
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* width: 100%; */
  padding: 1.6rem 2rem;
`;

const DivisionLine = styled.hr`
  border-top: 2px solid lightgray;
`;
const ProfileContentListContainer = styled.div`
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 1rem;
  width: 100%;
  height: 100%;

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;
`;

const ProfileMenuCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileMenuCardTitle = styled.span`
  color: #33487f;
  font-weight: 700;
  font-size: 1.6rem;
`;

const ProfileMenuCardDetail = styled.span`
  color: #696969;
  font-size: 1rem;
  font-weight: 400;
`;

const SettingAlarmItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const SettingAlarmItem = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    color: #3d3d3d;
  }
  .right-content {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`;

const Alarm = () => {
  const router = useRouter();
  // const [alarms, setAlarms] = useState<IAlarm>();
  const [accountAlarmYN, setaccountAlarmYN] = useState<YNType>("Y");
  const [accountAlarmTime, setAccountAlarmTime] = useState("09:00:00");
  const [todoAlarmYN, settodoAlarmYN] = useState<YNType>("Y");
  const [todoAlarmTime, setTodoAlarmTime] = useState("09:00:00");
  //   const UserInfo = useRecoilValue(userInfoState);

  // setAlarms 각 항목 settting
  useEffect(() => {
    getAlarms()
      .then((res) => {
        console.log(res.data);
        console.log("알림 조회 성공! 🤸‍♀️🔥");
        setaccountAlarmYN(res.data.data.accountAlarmYn);
        setAccountAlarmTime(res.data.data.accountAlarmTime);
        settodoAlarmYN(res.data.data.todoAlarmYn);
        setTodoAlarmTime(res.data.data.todoAlarmTime);
      })
      .catch((err) => {
        console.log(err.response);
        console.log("😥🙀 알림 조회 실팩ㄱ");
      });
  }, []);

  const onClickaccountAlarmYN = () => {
    setaccountAlarmYN((prev) => (prev === "Y" ? "N" : "Y"));
  };

  const onClicktodoAlarmYN = () => {
    settodoAlarmYN((prev) => (prev === "Y" ? "N" : "Y"));
  };

  const onClickSaveButton = () => {
    console.log("저장 버튼 click!");
    const alarmInfo = {
      accountAlarmYn: accountAlarmYN,
      accountAlarmTime: accountAlarmTime,
      todoAlarmYn: todoAlarmYN,
      todoAlarmTime: todoAlarmTime,
    };
    // const data = new alarmInfo();
    // console.log("저장버튼 눌렀을 때임!! put api 호출 전! 🔥🔥🔥");
    // console.log(alarmInfo);

    putAlarms(alarmInfo)
      .then((res) => {
        console.log(res.data);
        console.log("알림 변경사항 저장 성공! 🤸‍♀️🔥");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("😥🙀 알림 변경사항 저장 실패!");
      });
  };
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }

  return (
    <>
      <Container>
        <Header label="알림 설정"></Header>
        <PageContainer>
          <ProfileContentListContainer>
            <ProfileMenuCardContent>
              <ProfileMenuCardTitle>푸쉬 알림 설정</ProfileMenuCardTitle>
              <ProfileMenuCardDetail>
                정해진 시간에 푸쉬 알림을 받습니다.
              </ProfileMenuCardDetail>
            </ProfileMenuCardContent>
            <DivisionLine />
            <SettingAlarmItemList>
              <SettingAlarmItem>
                <span>가계부</span>
                <div className="right-content">
                  <span>{accountAlarmTime}</span>
                  <ToggleButton
                    isOn={accountAlarmYN}
                    onClick={onClickaccountAlarmYN}
                  />
                </div>
              </SettingAlarmItem>
              <SettingAlarmItem>
                <span>할 일</span>
                <div className="right-content">
                  <span>{todoAlarmTime}</span>
                  <ToggleButton
                    isOn={todoAlarmYN}
                    onClick={onClicktodoAlarmYN}
                  />
                </div>
              </SettingAlarmItem>
            </SettingAlarmItemList>
            <ButtonBottom label="저장" onClick={onClickSaveButton} />
          </ProfileContentListContainer>
        </PageContainer>
      </Container>
    </>
  );
};

export default Alarm;

// <ProfileContentCard
//               title="푸쉬 알림 설정"
//               description="푸쉬 알림을 받습니다."
//             />
//             <ProfileSettingsList />

// // setAlarms 각 항목 settting
// useEffect(() => {
//   getAlarms()
//     .then((res) => {
//       console.log(res.data);
//       console.log("알림 조회 성공! 🤸‍♀️🔥");
//       setaccountAlarmYN(res.data.data.accountAlarmYn);
//       setAccountAlarmTime(res.data.data.accountAlarmTime);
//       settodoAlarmYN(res.data.data.todoAlarmYn);
//       setTodoAlarmTime(res.data.data.todoAlarmTime);
//       // if (res.data.code === 1200) {
//       //   // console.log("1200도 넘어왔음!");
//       //   console.log(res.data.data);
//       //   // setAlarms(res.data.data);
//       //   setaccountAlarmYN(res.data.data.accountAlarmYn);
//       //   setAccountAlarmTime(res.data.data.accountAlarmTime);
//       //   settodoAlarmYN(res.data.data.todoAlarmYn);
//       //   setTodoAlarmTime(res.data.data.todoAlarmTime);
//       // } else {
//       //   console.log(res.data.message);
//       // }
//     })
//     .catch((err) => {
//       console.log(err.response);
//       console.log("😥🙀 알림 조회 실팩ㄱ");
//     });
// }, []);
