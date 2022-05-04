import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "components/common/Header";
import ProfileContentCard from "components/mypage/ProfileContentCard";
import ToggleButton from "components/mypage/settings/ToggleButton";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "states";
import { getAlarms, putAlarms } from "../../../api/alarm";
import { IAlarm, YNType } from "../../../types";

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
const PageTitle = styled.span`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2rem 0;
  color: #33487f;
`;
const DivisionLine = styled.hr`
  border-top: 2px solid lightgray;
`;
const ProfileContentListContainer = styled.div`
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
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
//-----------------------------------------------------------------------------------
const ProfileMenuCardItem = styled.div`
  /* width: 32rem; */
  /* margin-left: 2rem; */
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f4f4f4;

  width: 100%;
  /* width: 32rem; */
  height: 9rem;
  /* width: 320px; */
  /* height: 90px; */

  font-size: 1.6rem;
  padding: 1.6rem 2rem;

  font-family: "Noto Sans KR", sans-serif;
  color: #747373;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const ProfileMenuCardContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
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
`;
const SettingAlarmItem = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  span {
    color: #3d3d3d;
  }
  .right-content {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`;

interface ProfileMenuContentProps {
  title: string;
  description: string;
}

// interface IAlarmParams extends IAlarm {
//   accountAlarmYn: YNType;
//   accountAlarmTime: string;
//   todoAlarmYn: YNType;
//   todoAlarmTime: string;
// }

const Alarm = () => {
  const router = useRouter();

  const [alarms, setAlarms] = useState<IAlarm>();
  const [accountAlarm, setAccountAlarm] = useState<YNType>("Y");
  const [accountAlarmTime, setAccountAlarmTime] = useState("오후 9시");
  const [todoAlarm, setTodoAlarm] = useState<YNType>("Y");
  const [todoAlarmTime, setTodoAlarmTime] = useState("오전 9시");
  const [toggleAccountAlarm, setToggleAccountAlarm] = useState(true);
  const [toggleTodoAlarm, setToggleTodoAlarm] = useState(true);
  //   const UserInfo = useRecoilValue(userInfoState);

  // setAlarms 각 항목 settting
  useEffect(() => {
    getAlarms().then((res) => {
      console.log(res.data);
      if (res.data.code === 1200) {
        console.log("1200도 넘어왔음!");
        console.log(res.data.data);
        setAlarms(res.data.data);
        setAccountAlarm(res.data.data.accountAlarmYn);
        setAccountAlarmTime(res.data.data.accountAlarmTime);
        setTodoAlarm(res.data.data.todoAlarmYn);
        setTodoAlarmTime(res.data.data.todoAlarmTime);
      } else {
        console.log(res.data.message);
      }
    });
  }, []);

  // setAccountAlarm
  useEffect(() => {
    getAlarms().then((res) => {
      console.log(res.data);
      if (res.data.code === 1200) {
        // console.log("1200도 넘어왔음!");
        console.log("setAccountAlarm 하기 전! " + res.data.data.accountAlarmYn);
        // setAlarms(res.data.data);
        setAccountAlarm(res.data.data.accountAlarmYn);
        console.log(
          "setAccountAlarm 하고 나서!! " + res.data.data.accountAlarmYn
        );
      } else {
        console.log(res.data.message);
      }
    });
  }, [accountAlarm]);

  // setAccountAlarmTime
  useEffect(() => {
    getAlarms().then((res) => {
      console.log(res.data);
      if (res.data.code === 1200) {
        // console.log("1200도 넘어왔음!");
        console.log(
          "setAccountAlarmTime 하기 전! " + res.data.data.accountAlarmTime
        );
        // setAlarms(res.data.data);
        setAccountAlarmTime(res.data.data.accountAlarmTime);
        console.log(
          "setAccountAlarm 하고 나서!! " + res.data.data.accountAlarmTime
        );
      } else {
        console.log(res.data.message);
      }
    });
  }, [accountAlarmTime]);

  // setTodoAlarm
  useEffect(() => {
    getAlarms().then((res) => {
      console.log(res.data);
      if (res.data.code === 1200) {
        // console.log("1200도 넘어왔음!");
        console.log("setTodoAlarm 하기 전! " + res.data.data.todoAlarmYn);
        // setAlarms(res.data.data);
        setTodoAlarm(res.data.data.todoAlarmYn);
        console.log("setTodoAlarm 하고 나서!! " + res.data.data.todoAlarmYn);
      } else {
        console.log(res.data.message);
      }
    });
  }, [todoAlarm]);

  // setTodoAlarmTime
  useEffect(() => {
    getAlarms().then((res) => {
      console.log(res.data);
      if (res.data.code === 1200) {
        // console.log("1200도 넘어왔음!");
        console.log("setTodoAlarmTime 하기 전! " + res.data.data.todoAlarmTime);
        // setAlarms(res.data.data);
        setTodoAlarmTime(res.data.data.todoAlarmTime);
        console.log(
          "setTodoAlarmTime 하고 나서!! " + res.data.data.todoAlarmTime
        );
      } else {
        console.log(res.data.message);
      }
    });
  }, [todoAlarmTime]);

  //알람 변경 API
  // useEffect(() => {
  //   putAlarms(params).then((res) => {
  //     console.log(res.data);
  //     if (res.data.code === 1200) {
  //       console.log("1200도 넘어왔음!");
  //       console.log(res.data.data);
  //       // setAlarms(res.data.data);
  //       // setAccountAlarm(res.data.data.accountAlarmYn);
  //       // setAccountAlarmTime(res.data.data.accountAlarmTime);
  //       // setTodoAlarm(res.data.data.todoAlarmYn);
  //       // setTodoAlarmTime(res.data.data.todoAlarmTime);
  //     } else {
  //       console.log(res.data.message);
  //     }
  //   });
  // }, []);

  const onClickAccountAlarm = () => {
    setAccountAlarm((prev) => (prev === "Y" ? "N" : "Y"));
  };

  const onClickTodoAlarm = () => {
    setTodoAlarm((prev) => (prev === "Y" ? "N" : "Y"));
  };

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
                  <span>{accountAlarmTime} == 오후 9:00</span>
                  {accountAlarm}
                  <ToggleButton
                    isOn={accountAlarm}
                    onClick={onClickAccountAlarm}
                  />
                </div>
              </SettingAlarmItem>
              <SettingAlarmItem>
                <span>할 일</span>
                <div className="right-content">
                  <span>{todoAlarmTime} == 오전 9:00</span>
                  {todoAlarm}
                  <ToggleButton isOn={todoAlarm} onClick={onClickTodoAlarm} />
                </div>
              </SettingAlarmItem>
            </SettingAlarmItemList>
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
