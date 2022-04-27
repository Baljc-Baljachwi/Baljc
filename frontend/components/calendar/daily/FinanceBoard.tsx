import styled from "styled-components";
import { useState } from "react";
import FinanceList from "../../finance/list/FinanceList";

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

const Typography = styled.div<{
  fs?: string;
  color?: string;
  p?: string;
  cursor?: string;
}>`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  padding: ${(props) => (props.p ? props.p : "0")};
  cursor: ${(props) => (props.cursor ? props.cursor : "")};
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const FinanceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function FinanceBoard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = (e: any) => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Container>
      <Title>가계부</Title>
      <TextWrapper>
        <Typography fs="1.5rem">고정지출비용 {}원</Typography>
        <FlexContainer>
          <Typography fs="3.2rem">12,000{} 원</Typography>
          <Typography fs="1.5rem" p="0 0 0 0.5rem">
            남았습니다.
          </Typography>
        </FlexContainer>
        <FlexContainer
          style={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          <Typography fs="1.5rem">오늘 소비 8,000 {}원</Typography>
          <FlexContainer>
            <Typography>이 돈으로</Typography>
            <Typography color="#FFD469" p="0 0 0 0.5rem">
              떡볶이 3인분
            </Typography>
            <Typography>을 먹을 수 있었어요.</Typography>
          </FlexContainer>
        </FlexContainer>
      </TextWrapper>
      <FinanceListContainer>
        <div onClick={handleClick}>
          {isCollapsed ? null : (
            <Typography p="0 3rem" cursor="pointer">
              펼치기
            </Typography>
          )}
        </div>
        {isCollapsed ? <FinanceList /> : null}
        <div onClick={handleClick}>
          {isCollapsed ? (
            <Typography p="0 3rem" cursor="pointer">
              닫기
            </Typography>
          ) : null}
        </div>
      </FinanceListContainer>
    </Container>
  );
}
