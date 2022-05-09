import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import Header from "../../components/common/Header";
import ProfileCard from "../../components/mypage/ProfileCard";
import NotFoundTransaction from "components/common/not-found-transaction/NotFoundTransaction";
import ProgressStaticBar from "components/common/ProgressStaticBar";
import Icon from "components/common/Icon";

import {
  getBudget,
  getPieChartValue,
  getFixedExpenditure,
  getLineGraphValue,
} from "../../api/mypage";

import dayjs from "dayjs";
import {
  //   Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useRouter } from "next/router";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IFixed {
  totalFixedE: number;
}

const Analysis = ({ totalFixedE }: IFixed) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [dailyExpenditure, setDailyExpenditure] = useState(0);
  const [estimatedExpenditure, setEstimatedExpenditure] = useState(0);
  const [categories, setCategories] = useState([]);
  const year = Number(dayjs(date).format("YYYY"));
  const month = Number(dayjs(date).format("M"));
  const dateForm = dayjs(date).format("YYYY-MM-DD");
  const [budget, setBudget] = useState(0);
  const [expenditurePercent, setExpenditurePercent] = useState("0");
  const [remainingBudgetPercent, setRemainingBudgetPercent] = useState(0);
  const [fixedExpenditure, setFixedExpenditure] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [xdays, setXdays] = useState([]);

  const categoryName = Object.keys(categories);
  const categoryValue = Object.values(categories);
  const categoryContents = Object.entries(categories).map((entrie, idx) => {
    return console.log(entrie, idx);
  });
  const xdaysLabel = Object.keys(xdays).map((x, idx) => {
    return Number(x) + 1;
  });
  const xdaysValue = Object.values(xdays).map((value, idx) => {
    return Number(value) / 10000;
  });

  useEffect(() => {
    console.log(year);
    console.log(month);
    getFixedExpenditure(year, month)
      .then((res) => {
        // console.log(res.data.data);
        setFixedExpenditure(res.data.data.fixedExpenditure);
        setTotalExpenditure(res.data.data.totalExpenditure);
      })
      .catch((err) => {
        console.log("😥🙀 고정 지출 조회 실패");
        console.log(err.response);
      });
    getPieChartValue(year, month)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log("😥🙀 도넛 차트 조회 실패");
        console.log(err.response);
      });
    getLineGraphValue(year, month)
      .then((res) => {
        // console.log(res.data.data);
        setXdays(res.data.data);
        // console.log(xdays);
      })
      .catch((err) => {
        console.log("😥🙀 라인 차트 조회 실패");
        console.log(err.response);
      });
    // console.log("xdaysLabel");
    // console.log(xdaysLabel);
    // console.log("xdaysValue");
    // console.log(xdaysValue);
    getBudget(dateForm)
      .then((res) => {
        // console.log(res.data);
        console.log("예산 조회 성공! 🤸‍♀️🔥");
        // console.log(expenditurePercent);
        // console.log("퍼센트 toString");
        // console.log(expenditurePercent.toString());
        setRemainingBudget(res.data.data.remainingBudget);
        setDailyExpenditure(res.data.data.dailyExpenditure);
        setEstimatedExpenditure(res.data.data.estimatedExpenditure);
        setBudget(res.data.data.budget);
        setExpenditurePercent(res.data.data.expenditurePercent);
        setRemainingBudgetPercent(res.data.data.remainingBudgetPercent);
      })
      .catch((err) => {
        console.log("😥🙀 예산 조회 실패");
        console.log(err.response);
      });
  }, [month, year]);

  const data1 = {
    labels: categoryName,
    datasets: [
      {
        // data: [
        //   30000, 15000, 35000, 20000, 20000, 45000, 15000, 15000, 15000, 330000,
        // ],
        data: categoryValue,
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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "일 별 지출 추이",
      },
    },
  };
  const data2 = {
    labels: xdaysLabel,
    datasets: [
      {
        label: "일 별 지출 추이 (단위: 만 원)",
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        // data: [65, 59, 80, 81, 56, 55, 40],
        data: xdaysValue,
        // data: xdays,
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        // borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        // pointBackgroundColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        pointHoverBorderWidth: 0,
        pointRadius: 0,
        pointHitRadius: 0,
      },
    ],
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
          label="마이페이지"
          onClickBackButton={() => router.push("/mypage")}
        />
        <PageContainer>
          <ProfileCardContainer>
            <ProfileCard />
          </ProfileCardContainer>

          <ProfileContentListContainer>
            <ProfileMenuCardItem>
              <ProfileMenuCardContent>
                <span className="title">목표를 향해서!</span>
                <span className="description">
                  내 생활 습관을 분석해보세요.
                </span>
              </ProfileMenuCardContent>

              <DivisionLine />

              <ContentsDiv>
                <span>이번 달 남은 예산 : </span>
                <span>
                  <span className="highlightedText-primary">
                    {remainingBudget.toLocaleString()}
                  </span>{" "}
                  원
                </span>
                <br />
                <span>
                  앞으로는 하루에{" "}
                  <span className="highlightedText">
                    {dailyExpenditure.toLocaleString()}
                  </span>{" "}
                  원씩 쓸 수 있습니다.
                </span>
                <br />
                <span>
                  이 속도라면 이번 달에 총{" "}
                  <span className="highlightedText">
                    {estimatedExpenditure.toLocaleString()}
                  </span>{" "}
                  원을 쓰게 됩니다.
                </span>
              </ContentsDiv>
              <ProgressStaticBar done={`${expenditurePercent}`} />
              <DivisionLine />

              {/* 고정 지출 */}
              <ContentsDiv>
                <div className="charts">
                  <div className="circle">
                    <h2>4월</h2>
                    <div className="fixedEContents">
                      <div className="fixedEContents-manage">
                        <span className="primaryText">이번 달 고정 지출</span>
                        <span>
                          <span className="highlightedText-primary">
                            {fixedExpenditure.toLocaleString()}
                          </span>{" "}
                          원
                          <MoveToButton>
                            <Icon
                              mode="fas"
                              icon="chevron-right"
                              color="#AAAAAA"
                              size="16px"
                              onClick={() => router.push("/mypage/fixed")}
                            />
                          </MoveToButton>
                        </span>
                      </div>
                      <div className="fixedEContents-totalE">
                        <span>총 지출</span>
                        <span>{totalExpenditure.toLocaleString()} 원</span>
                      </div>
                    </div>
                    {/* {categoryValue.length === 0 ? (
                      <NotFoundTransaction />
                    ) : (
                      <Doughnut data={data1} width={400} height={400} />
                    )} */}
                  </div>
                </div>
              </ContentsDiv>
              <DivisionLine />

              {/* 카테고리 별 통계 - 도넛 차트 */}
              <ContentsDiv>
                <div className="charts">
                  <div className="circle">
                    <h2>카테고리 별 지출 통계</h2>
                    {categoryValue.length === 0 ? (
                      <NotFoundTransaction />
                    ) : (
                      <Doughnut data={data1} width={400} height={400} />
                    )}
                  </div>
                </div>
              </ContentsDiv>
              <DivisionLine />

              {/* 일 별 통계 - 꺾은선 그래프 */}
              <ContentsDiv>
                <div className="charts">
                  <div className="circle">
                    <h2>일 별 지출 통계</h2>
                    <Line
                      options={options}
                      data={data2}
                      width={400}
                      height={400}
                    />
                    {/* {categoryValue.length === 0 ? (
                      <NotFoundTransaction />
                    ) : (
                      <Doughnut data={data1} width={400} height={400} />
                    )} */}
                  </div>
                </div>
              </ContentsDiv>
            </ProfileMenuCardItem>
          </ProfileContentListContainer>
        </PageContainer>
      </Container>
    </>
  );
};

export default Analysis;

const Container = styled.div`
  height: 100%;
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
`;

const PageTitle = styled.span`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2rem 0;
  color: #33487f;
`;

const ProfileContentListContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  border: none;
  width: 100%;
  height: 100%;

  font-size: 1.6rem;
  padding: 1.6rem 2rem;
  gap: 2rem;
`;

const ProfileMenuCardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;

  width: 100%;
  font-size: 1.6rem;
  padding: 1.6rem;
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
  height: 100%;
  .title {
    color: #33487f;
    font-weight: 700;
    font-size: 1.8rem;
  }
  .description {
    color: #696969;
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const DivisionLine = styled.hr`
  border-top: 2px solid;
  border-color: #c8c8c8;
`;

const ContentsDiv = styled.div`
  font-weight: 600;
  .highlightedText-primary {
    color: orange;
    font-weight: 700;
    font-size: 2rem;
  }
  .highlightedText {
    color: orange;
    font-weight: 700;
  }
  .charts {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 20px;
    gap: 40px;
    .bar {
      h2 {
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .circle {
      h2 {
        text-align: center;
        font-size: 22px;
        margin-bottom: 20px;
      }
      .fixedEContents {
        display: flex;
        flex-direction: column;
        .fixedEContents-manage {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .primaryText {
            font-weight: 700;
            font-size: 2rem;
          }
        }
        .fixedEContents-totalE {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
`;

const MoveToButton = styled.span`
  padding-left: 1rem;
  cursor: pointer;
`;

Analysis.requireAuth = true;
