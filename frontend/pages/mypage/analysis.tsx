import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analysis = () => {
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

  const xdaysLabel = Object.keys(xdays).map((x, idx) => {
    return Number(x) + 1;
  });
  const xdaysValue = Object.values(xdays).map((value, idx) => {
    return Number(value) / 10000;
  });

  useEffect(() => {
    getFixedExpenditure(year, month)
      .then((res) => {
        setFixedExpenditure(res.data.data.fixedExpenditure);
        setTotalExpenditure(res.data.data.totalExpenditure);
      })
      .catch((err) => {
        console.log(err);
      });
    getPieChartValue(year, month)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getLineGraphValue(year, month)
      .then((res) => {
        setXdays(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getBudget(dateForm)
      .then((res) => {
        setRemainingBudget(res.data.data.remainingBudget);
        setDailyExpenditure(res.data.data.dailyExpenditure);
        setEstimatedExpenditure(res.data.data.estimatedExpenditure);
        setBudget(res.data.data.budget);
        setExpenditurePercent(res.data.data.expenditurePercent);
        setRemainingBudgetPercent(res.data.data.remainingBudgetPercent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month, year]);

  const data1 = {
    labels: categoryName,
    datasets: [
      {
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
        data: xdaysValue,
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
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
            <ProfileMenuCardContent>
              <span className="title">목표를 향해서!</span>
              <span className="description">내 소비 습관을 분석해보세요.</span>
            </ProfileMenuCardContent>
          </ProfileContentListContainer>
          <ProfileContentListContainer>
            <ContentsDiv>
              <ColumnContainer>
                <span className="title">이번 달 남은 예산 </span>
                <span className="highlightedText-primary">
                  {remainingBudget.toLocaleString()} 원
                </span>
              </ColumnContainer>
              <span className="description">
                앞으로는 하루에{" "}
                <span className="highlightedText">
                  {dailyExpenditure.toLocaleString()}
                </span>{" "}
                원씩 쓸 수 있습니다.
              </span>
              <br />
              <span className="description">
                이 속도라면 이번 달에 총{" "}
                <span className="highlightedText">
                  {estimatedExpenditure.toLocaleString()}
                </span>{" "}
                원을 쓰게 됩니다.
              </span>
            </ContentsDiv>
            <ProgressStaticBar done={`${expenditurePercent}`} />
          </ProfileContentListContainer>
          <ProfileContentListContainer>
            {/* 고정 지출 */}
            <ContentsDiv>
              <div className="charts">
                <div className="circle">
                  <h2>{month}월</h2>
                  <div className="fixedEContents">
                    <div className="fixedEContents-manage">
                      <span>이번 달 고정 지출</span>
                      <span>
                        {fixedExpenditure.toLocaleString()} 원
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
                      <span style={{ paddingRight: "2rem" }}>
                        {totalExpenditure.toLocaleString()} 원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ContentsDiv>
          </ProfileContentListContainer>
          <ProfileContentListContainer>
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
          </ProfileContentListContainer>
          <ProfileContentListContainer>
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
                </div>
              </div>
            </ContentsDiv>
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
`;

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #2e437a;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
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
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  border: none;
  font-size: 1.6rem;
  padding: 1rem 4rem 3rem 4rem;
  border-bottom: 1rem solid #f4f4f4;
`;

const ProfileMenuCardContent = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    color: #33487f;
    font-weight: 700;
    font-size: 1.8rem;
    padding: 1rem 0 0 0;
  }
  .description {
    color: #4d5158;
    font-size: 1.6rem;
    font-weight: 400;
  }
`;

const ContentsDiv = styled.div`
  font-weight: 600;
  .title {
    color: #4d5158;
    font-weight: 700;
    font-size: 1.8rem;
    padding: 1rem 0;
  }
  .description {
    color: #4d5158;
    font-size: 1.6rem;
    font-weight: 400;
  }
  .highlightedText-primary {
    color: #ffd469;
    font-weight: 700;
    font-size: 2.4rem;
    padding-bottom: 1rem;
  }
  .highlightedText {
    color: #ffd469;
    font-weight: 700;
  }
  .charts {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;

    gap: 40px;
    .bar {
      h2 {
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .circle {
      h2 {
        margin-bottom: 20px;
        color: #4d5158;
        font-weight: 700;
        font-size: 1.8rem;
      }
      .fixedEContents {
        display: flex;
        flex-direction: column;
        .fixedEContents-manage {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #4d5158;
          font-size: 1.8rem;
          font-weight: 400;
          .primaryText {
            color: #4d5158;
            font-size: 1.8rem;
            font-weight: 400;
          }
        }
        .fixedEContents-totalE {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #4d5158;
          font-size: 1.8rem;
          font-weight: 400;
        }
      }
    }
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoveToButton = styled.span`
  padding-left: 1rem;
  cursor: pointer;
`;

Analysis.requireAuth = true;
