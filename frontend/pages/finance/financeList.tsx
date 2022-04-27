import styled from "styled-components";

import FinanceCard from "../../components/finance/list/FinanceCard";

const PageContainer = styled.main`
  /* padding: 0 2rem; */
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
      <PageContainer>
        <FinanceCard
          backgroundColor="#F4F4F4"
          title="통신비"
          price="-34,980원"
          category="대중교통"
          method="입출금통장"
        />
        {/* <ButtonBottom label="가입" /> */}
        {/* color, type, title, price, isFixed */}
        {/* <FinanceCard isFixed={true} background-color="#FFD469" /> */}
      </PageContainer>
    </>
  );
}
