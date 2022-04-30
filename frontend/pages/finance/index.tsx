import styled from "styled-components";

import Header from "../../components/common/Header";
import FinanceList from "../../components/finance/list/FinanceList";
import FinanceCard from "../../components/finance/list/FinanceCard";
import ButtonBottom from "../../components/common/ButtonBottom";
import ButtonTrashCan from "../../components/common/ButtonTrashCan";

import { WithRouterProps } from "next/dist/client/with-router";
import { Router, useRouter, withRouter } from "next/router";
import Link from "next/link";

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
const MonthlyContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  font-weight: 400;
  font-style: normal;
  padding: 2rem 0;
`;
const MonthlyContentIncome = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MonthlyContentExpenditure = styled.div`
  display: flex;
  justify-content: space-between;
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
              <span>- 2022.4 -</span>
            </MonthlySection>
            <MonthlyContent>
              <MonthlyContentIncome>
                <span>월 수입총액</span>
                <span style={{ color: "#0075FF", fontWeight: "bold" }}>
                  1,000,000 원
                </span>
                {/* <Link href="/detail" shallow={router.asPath === "/detail"}></Link> */}
              </MonthlyContentIncome>
              <MonthlyContentExpenditure>
                <span>월 지출총액</span>
                <span style={{ color: "#FF3F15", fontWeight: "bold" }}>
                  512,000 원
                </span>
              </MonthlyContentExpenditure>
            </MonthlyContent>
            <DivisionLine />
          </MonthlyContentContainer>
          <FinanceList />
        </PageContainer>
      </Container>
    </>
  );
}
