import styled from "styled-components";

const Container = styled.div`
  background-color: #4d5f8f;
  border-radius: 10px;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  display: inline;
  font-size: 1rem;
  background-color: #8cbff2;
  color: #ffffff;
  padding: 0.1rem 1rem;
`;

const TextWrapper = styled.div`
  padding: 1rem 0;
`;

const Typography = styled.div<{ fs?: string; color?: string }>`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export default function FinanceBoard() {
  return (
    <Container>
      <Title>가계부</Title>
      <TextWrapper>
        <Typography fs="1.5rem">고정지출비용 {}원</Typography>
        <FlexContainer>
          <Typography fs="3.2rem">12,000 원</Typography>
          <Typography fs="1.5rem"> 남았습니다.</Typography>
        </FlexContainer>
        <FlexContainer
          style={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          <Typography fs="1.5rem">오늘 소비 8,000 {}원</Typography>
          <Typography>이 돈으로 떡볶이 3인분{}을 먹을 수 있었어요.</Typography>
        </FlexContainer>
      </TextWrapper>
      <Typography>더보기</Typography>
    </Container>
  );
}
