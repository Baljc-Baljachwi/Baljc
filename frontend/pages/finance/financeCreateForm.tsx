import styled from "styled-components";

import Header from "../../components/common/Header";
import CostForm from "../../components/finance/form/CostForm";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

export default function financeCreateForm() {
  return (
    <>
      <Header label="가계부 내역 추가"></Header>
      <PageContainer>
        <CostForm></CostForm>
      </PageContainer>
    </>
  );
}
