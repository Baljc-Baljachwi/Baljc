import styled from "styled-components";

import Header from "../../components/common/Header";
import FinanceCard from "../../components/finance/list/FinanceCard";
import ButtonBottom from "../../components/common/ButtonBottom";
import ButtonTrashCan from "../../components/common/ButtonTrashCan";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

// const FinanceCardItem = styled.div<{ backgroundColor: string }>`
//   background-color: aliceblue;
//   /* height: 20px; */
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 1.6rem;
// `;

export default function FinanceList() {
  return (
    <>
      <Header label="가계부 목록" icon="plus"></Header>
      <PageContainer>
        <h1>4월</h1>
        {/* <FinanceCardItem backgroundColor="#F4F4F4" /> */}
        <FinanceCard
          backgroundColor="#F4F4F4"
          title="통신비"
          price="-34,980원"
        />
        {/* <ButtonBottom label="가입" /> */}
        {/* color, type, title, price, isFixed */}
        {/* <FinanceCard isFixed={true} background-color="#FFD469" /> */}
      </PageContainer>
    </>
  );
}
