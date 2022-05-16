import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "components/common/Header";
import ToggleButton from "components/mypage/settings/ToggleButton";
import ButtonBottom from "components/common/ButtonBottom";

import { getAlarms, putAlarms } from "../../../api/alarm";
import { YNType } from "../../../types";

const Container = styled.div`
  /* height: 100vh; */
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
  /* margin-top: 2rem; */
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
  font-size: 1.8rem;
`;

const ProfileMenuCardDetail = styled.span`
  color: #4d5158;
  font-size: 1.4rem;
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

const TimePicker = styled.input`
  width: 100%;
  font-size: 1.6rem;
  text-align: end;
  border: none;
  outline: none;
  background-color: #f4f4f4;
  color: #3d3d3d;
  font-family: "Noto Sans KR", sans-serif;
  ::placeholder {
    color: #cccccc;
  }
`;

const StyledToastContainer = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  .Toastify__toast {
    background-color: rgba(75, 192, 192, 0.4);
    font-size: 1.4rem;
    font-weight: 600;
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  }
  .Toastify__toast-container {
    /* width: 320px; */
    width: 20rem;
  }
  .Toastify__toast--default {
    background: #fff;
    color: #aaa;
  }
  .Toastify__toast--info {
    background: #3498db;
  }
  .Toastify__toast--success {
    /* background: #07bc0c; */
    background: rgba(75, 192, 192, 0.4);
  }
  .Toastify__toast--warning {
    /* background: #f1c40f; */
    background: #ffd469;
    color: #aaa;
  }
  .Toastify__toast--error {
    background: #e74c3c;
  }
`;

const Alarm = () => {
  const router = useRouter();
  // const [alarms, setAlarms] = useState<IAlarm>();
  const [accountAlarmYN, setaccountAlarmYN] = useState<YNType>("Y");
  const [accountAlarmTime, setAccountAlarmTime] = useState("21:00:00");
  const [todoAlarmYN, settodoAlarmYN] = useState<YNType>("Y");
  const [todoAlarmTime, setTodoAlarmTime] = useState("09:00:00");
  //   const UserInfo = useRecoilValue(userInfoState);
  const notify = () =>
    toast.success("🤸‍♀️ㅤ알림 설정 저장 성공!", {
      theme: "colored",
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: false,
      autoClose: 2000,
    });
  const notifyFail = () =>
    toast.error("🤔ㅤ알림 설정을 저장하지 못했습니다.", {
      theme: "colored",
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: false,
      autoClose: 2000,
    });

  // setAlarms 각 항목 settting
  useEffect(() => {
    getAlarms()
      .then((res) => {
        // console.log(res.data);
        // console.log("알림 조회 성공! 🤸‍♀️🔥");
        setaccountAlarmYN(res.data.data.accountAlarmYn);
        setAccountAlarmTime(res.data.data.accountAlarmTime);
        settodoAlarmYN(res.data.data.todoAlarmYn);
        setTodoAlarmTime(res.data.data.todoAlarmTime);
      })
      .catch((err) => {
        console.log(err.response);
        console.log("😥🙀 알림 조회 실패");
      });
  }, []);

  const onClickaccountAlarmYN = () => {
    setaccountAlarmYN((prev) => (prev === "Y" ? "N" : "Y"));
  };

  const onClicktodoAlarmYN = () => {
    settodoAlarmYN((prev) => (prev === "Y" ? "N" : "Y"));
  };

  const onAccountTimeChangeHandler = (e: any) => {
    setAccountAlarmTime(e.target.value);
  };
  const onTodoTimeChangeHandler = (e: any) => {
    setTodoAlarmTime(e.target.value);
  };

  const onClickSaveButton = () => {
    const alarmInfo = {
      accountAlarmYn: accountAlarmYN,
      accountAlarmTime: accountAlarmTime,
      todoAlarmYn: todoAlarmYN,
      todoAlarmTime: todoAlarmTime,
    };

    putAlarms(alarmInfo)
      .then((res) => {
        notify();
        console.log(res.data);
        console.log("알림 변경사항 저장 성공! 🤸‍♀️🔥");
      })
      .catch((err) => {
        notifyFail();
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
        <Header
          label="알림 설정"
          onClickBackButton={() => router.push("/mypage/settings")}
        />
        <PageContainer>
          {/* <ToastContainer
            pauseOnFocusLoss={false}
            style={{ bottom: "10rem" }}
          /> */}
          <StyledToastContainer
            pauseOnFocusLoss={false}
            style={{ bottom: "10rem" }}
          />
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
                  {/* <span>{accountAlarmTime}</span> */}
                  <TimePicker
                    className="TimePicker"
                    type="time"
                    value={accountAlarmTime}
                    onChange={onAccountTimeChangeHandler}
                  />
                  <ToggleButton
                    isOn={accountAlarmYN}
                    onClick={onClickaccountAlarmYN}
                  />
                </div>
              </SettingAlarmItem>
              <SettingAlarmItem>
                <span>할 일</span>
                <div className="right-content">
                  {/* <span>{todoAlarmTime}</span> */}
                  <TimePicker
                    className="TimePicker"
                    type="time"
                    value={todoAlarmTime}
                    onChange={onTodoTimeChangeHandler}
                  />
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

Alarm.requireAuth = true;
