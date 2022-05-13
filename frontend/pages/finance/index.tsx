import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useRouter } from "next/router";
import { getAccountbooksList } from "api/accountbook";
import Header from "../../components/common/Header";
import FinanceList from "../../components/finance/list/FinanceList";
import Icon from "../../components/common/Icon";

const Container = styled.div`
  padding-bottom: 2rem;
  background-color: #ffffff;
  position: relative;
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  padding: 0 2rem;
`;

const DivisionLine = styled.hr`
  border-top: 2px solid lightgray;
`;

const MonthlyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  color: #3d3d3d;
`;

const MonthlySection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 700;
  font-style: bold;
`;
const MonthlyContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  font-weight: 400;
  font-style: normal;
  padding: 2rem 0;
`;

const MonthlyContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  color?: string;
  p?: string;
  cursor?: string;
}>`
  color: ${(props) => (props.color ? props.color : "")};
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
  cursor: ${(props) => (props.cursor ? props.cursor : "")};
`;

const NoContencContainer = styled.section`
  width: 100%;
  height: calc(100vh - 50rem);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NoContentMessage = styled.p`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  padding: 1rem;
  color: #cccccc;
  &.small {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

export default function Finance(): JSX.Element {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(Number(dayjs(date).format("M")));
  const [year, setYear] = useState(Number(dayjs(date).format("YYYY")));
  const [expenditure, setExpenditure] = useState("");
  const [income, setIncome] = useState("");
  const [monthlyLog, setMonthlyLog] = useState([]);
  const amount = Object.entries(monthlyLog); // ['1', [{…}, {…}] ]

  const handleClickPrev = () => {
    if (month > 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(12);
    }
  };

  const handleClickNext = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(1);
    }
  };

  useEffect(() => {
    getAccountbooksList(year, month).then((res) => {
      setExpenditure(res.data.data.monthTotal.E);
      setIncome(res.data.data.monthTotal.I);
      setMonthlyLog(res.data.data.accountbookMonth);
    });
  }, [month, year]);

  // console.log(amount);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return <></>;
  }

  return (
    <>
      <Container>
        <Header
          label="가계부 목록"
          icon="plus"
          onClickRightButton={() => router.push("/finance/financeCreateForm")}
          onClickBackButton={() => router.push("/calendar")}
        ></Header>
        <PageContainer>
          <MonthlyContentContainer>
            <MonthlySection>
              <div onClick={handleClickPrev}>
                <Icon
                  mode="fas"
                  icon="chevron-left"
                  size="16px"
                  display="flex"
                />
              </div>
              <span>{year}년 </span>
              <span>{month}월</span>
              <div onClick={handleClickNext}>
                <Icon
                  mode="fas"
                  icon="chevron-right"
                  size="16px"
                  display="flex"
                />
              </div>
            </MonthlySection>
            <MonthlyContentWrapper>
              <MonthlyContent>
                <Typography fs="1.6rem">수입</Typography>
                <Typography fs="1.6rem" fw="600" color="#0075ff">
                  {income.toLocaleString()} 원
                </Typography>
              </MonthlyContent>
              <MonthlyContent>
                <Typography fs="1.6rem">지출</Typography>
                <Typography fs="1.6rem" fw="600">
                  - {expenditure.toLocaleString()} 원
                </Typography>
              </MonthlyContent>
            </MonthlyContentWrapper>
            <DivisionLine />
          </MonthlyContentContainer>
          {amount && amount.length > 0 ? (
            amount.map((item, idx) => <FinanceList key={idx} item={item} />)
          ) : (
            <NoContencContainer>
              <NoContentMessage>가계부 내역이 없습니다!</NoContentMessage>
              <NoContentMessage className="small">
                + 버튼을 눌러 새로운 내용을 추가해보세요
              </NoContentMessage>
            </NoContencContainer>
          )}
        </PageContainer>
      </Container>
    </>
  );
}

Finance.requireAuth = true;
