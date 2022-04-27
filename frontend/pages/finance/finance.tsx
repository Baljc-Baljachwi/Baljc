import styled from "styled-components";

import Header from "../../components/common/Header";
import FinanceList from "./financeList";
import FinanceCard from "../../components/finance/list/FinanceCard";
import ButtonBottom from "../../components/common/ButtonBottom";
import ButtonTrashCan from "../../components/common/ButtonTrashCan";

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  padding: 0 2rem;
  background-color: #ebeced;
  height: 100vh;
`;
const DivisionLine = styled.hr`
  /* color: rgba(0, 0, 0, 0.65); */
  /* color: red; */
  /* size: 100px; */
  border-top: 2px solid lightgray;
`;

const MonthlyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  /* font-size: 2rem;
  font-weight: 700;
  font-style: bold; */
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
  return (
    <>
      <Header label="가계부 목록" icon="plus"></Header>
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
            </MonthlyContentIncome>
            <MonthlyContentExpenditure>
              <span>월 지출총액</span>
              <span style={{ color: "#FF3F15", fontWeight: "bold" }}>
                512,000 원
              </span>
            </MonthlyContentExpenditure>
          </MonthlyContent>
          <DivisionLine />
          {/* <hr /> */}
        </MonthlyContentContainer>
        {/* <FinanceCardItem backgroundColor="#F4F4F4" /> */}
        <FinanceList />
        {/* <FinanceCard
          backgroundColor="#F4F4F4"
          title="통신비"
          price="-34,980원"
          category="대중교통"
          method="입출금통장"
        /> */}
        {/* <ButtonBottom label="가입" /> */}
        {/* color, type, title, price, isFixed */}
        {/* <FinanceCard isFixed={true} background-color="#FFD469" /> */}
      </PageContainer>
    </>
  );
}
