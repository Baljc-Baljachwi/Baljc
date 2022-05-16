import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import FinanceBoardList from "../../calendar/daily/FinanceBoardList";
import Icon from "../../common/Icon";

const Container = styled.div`
  background-color: #4d5f8f;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
`;

const Title = styled.div`
  display: inline;
  font-size: 1.4rem;
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
  padding: 1.6rem 0;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  color?: string;
  p?: string;
}>`
  color: ${(props) => (props.color ? props.color : "")};
  font-size: ${(props) => (props.fs ? props.fs : "")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
`;

const FlexContainer = styled.div<{ jc?: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: ${(props) => (props.jc ? props.jc : "")};
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const FinanceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Hr = styled.div`
  border: 0.1px #ffffff solid;
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

interface IAccountBookList {
  accountBookId: string;
  type: "E" | "I";
  categoryImgUrl: string;
  categoryName: string;
  title: string;
  price: number;
  paymentMethod: "M" | "C" | "E" | "N";
  fixedExpenditureYn: "M" | "H" | "N";
  fixedIncomeYn: "Y" | "N";
  monthlyPeriod: number | null;
  date: string | null;
  dayOfWeek: string | null;
}

export default function FinanceBoard({ item }: any, date: string) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const [dayNumber, setDayNumber] = useState<IDayNumber>();
  const [dayString, setDayString] = useState<IDayString>();
  const [accountBookList, setAccountBookList] = useState<IAccountBookList>();

  const handleClick = (e: any) => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    setDayNumber(item.dayNumber);
    setDayString(item.dayString);
    setAccountBookList(item.accountBookList);
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
          <Typography color="#ffffff" fs="1.6rem">
            하루 예산이
          </Typography>
          {dayNumber?.fixedExpenditure ? (
            <Typography color="#ffffff" fs="1.6rem" fw="300">
              {dayNumber?.fixedExpenditure.toLocaleString()}원
            </Typography>
          ) : null}
          <FlexContainer>
            <Typography color="#ffffff" fs="3.2rem" fw="500">
              {dayNumber?.remainingBudget.toLocaleString()}원
            </Typography>
            <Typography color="#ffffff" fs="1.5rem" p="0 0 1rem 0.5rem">
              남았습니다.
            </Typography>
          </FlexContainer>
          <FlexContainer style={{ justifyContent: "space-between" }}>
            <Typography color="#ffffff" fs="1.6rem" fw="300" p="0 0 0.5rem 0">
              오늘의 소비 {dayNumber?.totalExpenditure.toLocaleString()}원
            </Typography>
            <FlexContainer>
              <Typography color="#FFD469" fs="1.6rem" fw="500">
                {dayString?.word}
              </Typography>
            </FlexContainer>
          </FlexContainer>
        </TextWrapper>
      </div>
      <FinanceListContainer>
        {isCollapsed ? (
          <>
            <Hr />
            {dayNumber ? (
              <TotalContainer>
                <Typography color="#ffffff" fs="1.3rem" fw="100">
                  총 결제 건수 {dayNumber?.cntExpenditure}건
                </Typography>
                <Typography color="#ffffff" fs="1.3rem" fw="100">
                  총수입 {dayNumber?.totalIncome.toLocaleString()}원
                </Typography>
                <Typography color="#ffffff" fs="1.3rem" fw="100">
                  총지출 {dayNumber?.totalExpenditure.toLocaleString()}원
                </Typography>
              </TotalContainer>
            ) : null}
            <FinanceBoardList item={accountBookList} date={date} />
            <Typography
              color="#ffffff"
              fs="1rem"
              style={{ alignSelf: "center" }}
              onClick={handleClick}
            >
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
          <Typography
            color="#ffffff"
            fs="1rem"
            style={{ alignSelf: "center" }}
            onClick={handleClick}
          >
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
