import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { WithRouterProps } from "next/dist/client/with-router";
import { Router, useRouter, withRouter } from "next/router";
import Link from "next/link";
import { getAccountbooksList } from "api/accountbook";

import Header from "../../components/common/Header";
import FinanceList from "../../components/finance/list/FinanceList";
import FinanceCard from "../../components/finance/list/FinanceCard";
import ButtonBottom from "../../components/common/ButtonBottom";
import ButtonTrashCan from "../../components/common/ButtonTrashCan";

const Container = styled.div`
  height: 100vh;
  /* background-color: #ebeced; */
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
  /* display: flex; */
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

// const FinanceCardItem = styled.div<{ backgroundColor: string }>`
//   background-color: aliceblue;
//   /* height: 20px; */
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 1.6rem;
// `;

export default function Finance() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const month = dayjs(date).format("M");
  const year = dayjs(date).format("YYYY");
  const [expenditure, setExpenditure] = useState("");
  const [income, setIncome] = useState("");
  const [monthlyLog, setMonthlyLog] = useState([]);
  const amount = Object.entries(monthlyLog); // ['1', [{…}, {…}] ]

  useEffect(() => {
    getAccountbooksList(year, month).then((res) => {
      setExpenditure(res.data.data.monthTotal.E);
      setIncome(res.data.data.monthTotal.I);
      setMonthlyLog(res.data.data.accountbookMonth);
      // "accountbookMonth": {
      //     "21": [
      //         {  "accountbookId": "e655794f-9b85-4ce8-9eba-911ff405f0fa",
      //             "type": "E",
      //             ...
      //         },
      //         {...} // 21일에 소비한 내역
      //     ],
      //     "8": [ {...}, {...} // 일에 소비한 내역
      //     ]
      // }
    });
  }, []);
  // console.log(monthlyLog); // {1: Array(2), 2: Array(1)} { 1: [{...}, {...}], 2: [{...}, {...}]}

  return (
    <>
      <Container>
        <Header
          label="가계부 목록"
          icon="plus"
          onClickRightButton={() => router.push("/finance/financeCreateForm")}
        ></Header>
        <PageContainer>
          <MonthlyContentContainer>
            <MonthlySection>
              <span>{year}년 </span>
              <span>{month}월</span>
            </MonthlySection>
            <MonthlyContentWrapper>
              <MonthlyContent>
                <Typography fs="1.6rem">지출</Typography>
                <Typography fs="1.6rem" fw="600" color="#0075ff">
                  {income.toLocaleString()} 원
                </Typography>
              </MonthlyContent>
              <MonthlyContent>
                <Typography fs="1.6rem">수입</Typography>
                <Typography fs="1.6rem" fw="600">
                  {expenditure.toLocaleString()} 원
                </Typography>
                {/* <Link href="/detail" shallow={router.asPath === "/detail"}></Link> */}
              </MonthlyContent>
            </MonthlyContentWrapper>
            <DivisionLine />
          </MonthlyContentContainer>
          {amount
            ? amount.map((item, idx) => <FinanceList key={idx} item={item} />)
            : null}
          {/* <FinanceList financeList={financeList || null} /> */}
        </PageContainer>
      </Container>
    </>
  );
}
