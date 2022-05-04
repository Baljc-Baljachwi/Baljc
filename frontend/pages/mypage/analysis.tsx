import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../../styles/Home.module.css";

import Header from "components/common/Header";
import ProfileCard from "components/mypage/ProfileCard";
// import { Line } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import { CategoryScale } from "chart.js";
// Chart.register(CategoryScale);

import { getBudget } from "../../api/mypage";
import { useResetRecoilState } from "recoil";
import { budgetsState, IBudgetTypes } from "atoms/atoms";

const Container = styled.div`
  height: 100vh;
`;
const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #2e437a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 40px 40px;
  height: 30vh;
  color: #ffffff;
  /* padding: 0 2rem; */
`;
const PageTitle = styled.span`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2rem 0;
  color: #33487f;
`;

const ProfileContentListContainer = styled.div`
  /* filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25)); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: #f4f4f4; */
  background-color: #ffffff;
  border: none;
  /* border-radius: 1rem; */
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
  background-color: #ffffff;

  width: 100%;
  /* width: 32rem; */
  /* height: 9rem; */
  /* width: 320px; */
  /* height: 90px; */

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;

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
  /* padding: 2rem 0; */
  height: 100%;
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

const DivisionLine = styled.hr`
  border-top: 2px solid lightslategray;
  /* border-color: #f6f6f6; */
`;

const ContentsDiv = styled.div``;

const GoalsItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const GoalsItem = styled.div`
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

const GraphImage = styled.div`
  position: relative;
  width: 28rem;
  height: 12rem;
`;

const GraphImage2 = styled.div`
  /* position: relative; */
  /* width: 28rem;
  height: 12rem; */
`;

interface ProfileMenuContentProps {
  title: string;
  description: string;
}

interface IBudgetProps {
  date: string;
}

const analysis = ({ date }: IBudgetProps) => {
  // const [budgets, setBudgets] = useResetRecoilState<IBudgetTypes[]>{budgetsState}
  // const [budgets, setBudgets] = useState<number>(0);
  // useEffect(() => {
  //   getBudget(date)
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log("알림 조회 성공! 🤸‍♀️🔥");
  //       setaccountAlarmYN(res.data.data.accountAlarmYn);
  //       setAccountAlarmTime(res.data.data.accountAlarmTime);
  //       settodoAlarmYN(res.data.data.todoAlarmYn);
  //       setTodoAlarmTime(res.data.data.todoAlarmTime);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       console.log("😥🙀 알림 조회 실팩ㄱ");
  //     });
  // }, []);
  return (
    <>
      <Container>
        <Header label="마이페이지"></Header>
        <PageContainer>
          <ProfileCardContainer>
            <ProfileCard />
          </ProfileCardContainer>
          <ProfileContentListContainer>
            <ProfileMenuCardItem>
              <ProfileMenuCardContent>
                <ProfileMenuCardTitle>목표를 향해서!</ProfileMenuCardTitle>
                <ProfileMenuCardDetail>
                  내 생활 습관을 분석해보세요.
                </ProfileMenuCardDetail>
              </ProfileMenuCardContent>
              <DivisionLine />
              <ContentsDiv>
                <h5>이번 달 남은 예산</h5>
                <h4>300,000 원 남음</h4>
                <h6>하루에 12,000원씩 쓸 수 있습니다.</h6>
                <h6>이 속도로 소비하면 총 1,000,000원을 쓰게 됩니다.</h6>
              </ContentsDiv>
              <DivisionLine />
              <GoalsItemList>
                {/* -- GoalsItemList --
                <h5>이번 달 남은 예산</h5>
                <h4>300,000 원 남음</h4> */}
                {/* <GoalsItem>
                  <span>지출 관련 분석 여기에 넣기</span>
                </GoalsItem> */}
                <h4>카테고리별 지출 통계</h4>
                {/* chart started 
                <div className={styles.charts}>
                  bar chart
                  <div className={styles.bar}>
                    <h2>월 별 지출 통계</h2>
                    <Line data={data} width={400} height={400} />
                  </div>
                  도넛 chart
                  <div className={styles.circle}>
                    <h2>카테고리별 지출 통계</h2>
                    <Doughnut data={data1} width={400} height={400} />
                  </div>
                </div> */}
                {/* <div className={styles.circle}>
                  <h2>카테고리별 지출 통계</h2>
                  <Doughnut data={data1} width={400} height={400} />
                </div> */}
              </GoalsItemList>
            </ProfileMenuCardItem>
          </ProfileContentListContainer>
        </PageContainer>
      </Container>
    </>
  );
};

export default analysis;
//data for line chart
const data = {
  labels: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  datasets: [
    {
      label: "지출 / 월",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [65, 59, 80, 81, 56, 55, 47, 57, 40, 48, 59, 62],
    },
  ],
};

//doughnut chart data set

const data1 = {
  labels: [
    "식비",
    "교통비",
    "쇼핑",
    "주거/통신",
    "교육/학습",
    "문화/여가",
    "의료/건강",
    "경조사비",
    "육아/반려",
    "미분류",
  ],
  datasets: [
    {
      data: [120, 50, 30, 10, 6, 4, 0, 0, 0, 34],
      backgroundColor: [
        "#ff9aa2",
        "#abbeec",
        "#ffdf6f",
        "#8cc084",
        "#968e85",
        "#e5e1e0",
        "#90d2d8",
        "#ffc988",
        "#e79796",
        "#8cc1d3",
      ],
      hoverBackgroundColor: [
        "#8cc1d3",
        "#e79796",
        "#ffc988",
        "#90d2d8",
        "#e5e1e0",
        "#ffdf6f",
        "#abbeec",
        "#ff9aa2",
      ],
    },
  ],
};

analysis.requireAuth = true;
