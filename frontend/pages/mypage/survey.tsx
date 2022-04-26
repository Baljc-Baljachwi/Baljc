import styled from "styled-components";

import Header from "../../components/common/Header";
import ButtonBottom from "../../components/common/ButtonBottom";
import ButtonTrashCan from "../../components/common/ButtonTrashCan";

const PageContainer = styled.main`
  padding: 0 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

export default function survey() {
  return (
    <>
      <Header label="설문 조사"></Header>
      <PageContainer>
        <h1>설문 조사</h1>
        <ButtonBottom label="가입" />
        <ButtonContainer>
          <ButtonTrashCan />
          <ButtonBottom label="수정" />
        </ButtonContainer>
      </PageContainer>
    </>
  );
}
