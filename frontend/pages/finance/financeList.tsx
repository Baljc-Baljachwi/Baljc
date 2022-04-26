import styled from "styled-components";

import Header from "../../components/common/Header";
import FinanceCard from "../../components/finance/list/FinanceCard";
import ButtonBottom from "../../components/common/ButtonBottom";
import ButtonTrashCan from "../../components/common/ButtonTrashCan";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 1.6rem;
// `;

export default function FinanceList() {
  return (
    <>
      <Header label="가계부 목록" icon="plus"></Header>
      {/* <h1>Finance</h1> */}
      <PageContainer>
        {/* 우선 이렇게 하드코딩 해놓음 */}
        <h1>4월</h1>
        {/* color, type, title, price, isFixed */}
        {/* <FinanceCard isFixed={true} background-color="#FFD469" /> */}
        {/* <ButtonBottom label="가입" />
        <ButtonTrashCan />
        <ButtonBottom label="수정" /> */}
      </PageContainer>
    </>
  );
}
