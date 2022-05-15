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

const MonthlyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: #3d3d3d;
  box-shadow: 0 1px 1px #00000014;
`;

const MonthlySection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 700;
  font-style: bold;
  padding-bottom: 2rem;
`;
const MonthlyContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  font-weight: 400;
  font-style: normal;
`;

const MonthlyContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  color?: string;
  p?: string;
}>`
  color: ${(props) => (props.color ? props.color : "")};
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
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

        <MonthlyContentContainer>
          <MonthlySection>
            <div onClick={handleClickPrev}>
              <Icon mode="fas" icon="caret-left" size="14px" display="flex" />
            </div>
            <Typography fs="2.4rem">{month}월</Typography>
            <div onClick={handleClickNext}>
              <Icon mode="fas" icon="caret-right" size="14px" display="flex" />
            </div>
          </MonthlySection>
          <MonthlyContentWrapper>
            <MonthlyContent>
              <Typography fs="1.6rem" color="#4d5158">
                지출
              </Typography>
              <Typography fs="2rem" fw="600">
                - {expenditure.toLocaleString()} 원
              </Typography>
            </MonthlyContent>
            <MonthlyContent>
              <Typography fs="1.6rem" color="#4d5158">
                수입
              </Typography>
              <Typography fs="2rem" fw="600" color="#8cbff2">
                {income.toLocaleString()} 원
              </Typography>
            </MonthlyContent>
          </MonthlyContentWrapper>
        </MonthlyContentContainer>
        <PageContainer>
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
