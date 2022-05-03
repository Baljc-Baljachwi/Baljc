import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import FinanceList from "../../finance/list/FinanceList";
import Icon from "../../common/Icon";
import { IAccountbook } from "types";

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
  border-radius: 3px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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

const FlexContainer = styled.div<{ jc?: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: ${(props) => (props.jc ? props.jc : "")};
`;

const FinanceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IDayNumber {
  cntExpenditure: number;
  fixedExpenditure: number;
  remainingBudget: number;
  totalExpenditure: number;
  totalIncome: number;
}

interface IDayString {
  dayOfWeek: string;
  word?: string;
}

export default function FinanceBoard({ item }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const [dayNumber, setDayNumber] = useState<IDayNumber>();
  const [dayString, setDayString] = useState<IDayString>();

  const handleClick = (e: any) => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    setDayNumber(item.dayNumber);
    setDayString(item.dayString);
    console.log(dayString);
  }, [item]);

  return (
    <Container>
      <Header>
        <Title>가계부</Title>
        <div
          onClick={(e: any) => {
            router.push("/finance/financeCreateForm");
          }}
        >
          <Icon
            mode="fas"
            icon="plus"
            color="#ffffff"
            size="2rem"
            display="flex"
          />
        </div>
      </Header>
      <div onClick={handleClick}>
        <TextWrapper>
          <Typography fs="1.5rem">
            {dayNumber?.fixedExpenditure
              ? `고정지출비용 ${dayNumber?.fixedExpenditure.toLocaleString()}원`
              : null}
          </Typography>
          <FlexContainer>
            <Typography fs="3.2rem">
              {dayNumber?.remainingBudget.toLocaleString()}원
            </Typography>
            <Typography fs="1.5rem" p="0 0 0 0.5rem">
              남았습니다.
            </Typography>
          </FlexContainer>
          <FlexContainer style={{ justifyContent: "space-between" }}>
            <Typography fs="1.5rem">
              오늘 소비 {dayNumber?.totalExpenditure.toLocaleString()}원
            </Typography>
            <FlexContainer>
              <Typography color="#FFD469" fs="1.2rem">
                {dayString?.word}
              </Typography>
            </FlexContainer>
          </FlexContainer>
        </TextWrapper>
      </div>
      <FinanceListContainer>
        {isCollapsed ? (
          <>
            {/* <FinanceList  /> */}
            <Typography fs="1rem" p="0.5rem 100% 0 100%" onClick={handleClick}>
              <Icon
                mode="fas"
                icon="caret-up"
                color="#ffffff"
                size="2rem"
                display="flex"
              />
            </Typography>
          </>
        ) : (
          <Typography fs="1rem" p="0 100%" onClick={handleClick}>
            <Icon
              mode="fas"
              icon="caret-down"
              color="#ffffff"
              size="2rem"
              display="flex"
            />
          </Typography>
        )}
      </FinanceListContainer>
    </Container>
  );
}
