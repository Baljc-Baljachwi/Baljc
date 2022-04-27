import styled from "styled-components";
import Header from "../../../components/common/Header";

const Container = styled.div`
  height: 100vh;
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  padding: 0 2rem;
  background-color: #ebeced;
`;

const financeDetail = () => {
  return (
    <>
      <Container>
        <Header label="가계부 내역 상세 조회" icon="pencil"></Header>
        <PageContainer></PageContainer>
      </Container>
    </>
  );
};

export default financeDetail;
