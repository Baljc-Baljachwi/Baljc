import styled from "styled-components";
import { colors } from "../../../styles/colors";

const FinanceCardItem = styled.div<{ backgroundColor: string }>`
  /* width: 32rem; */
  /* margin-left: 2rem; */
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};

  width: 100%;

  font-size: 1.6rem;
  padding: 1.6rem 2rem;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const FinanceCardContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FinanceCardTitle = styled.span`
  color: #3d3d3d;
  font-weight: 400;
`;

const FinanceCardPrice = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 500;
  font-style: medium;
`;

const FinanceCardDetail = styled.span`
  color: #696969;
  font-size: 1.2rem;
  font-weight: 400;
`;

const titleColor = {
  light: colors.gray900,
  dark: colors.gray25,
};

const subtitleColor = {
  light: colors.gray400,
  dark: colors.gray500,
};

interface FinanceCardProps {
  // backgroundColor: string;
  isFixed: boolean;
  isExpenditure: boolean;
  //   (type==='E'? FinanceCardProps.color=" #FFD469": color="#F4F4F4"): string; // erd에선 char로 E: 지출, I: 수입 이지만 우선 string으로 해뒀습니다.
  // type: string;
  title: string;
  price: string;
  method: string;
  category: string;
  // price: number;

  //   fixed_expenditure_yn: boolean;
  //   fixed_income_yn: boolean;
  //   inExpenditure: boolean;
}

export default function FinanceCard({
  // type,
  // isFixed,
  title,
  price,
  method,
  category,
  isFixed,
  isExpenditure,
}: FinanceCardProps) {
  return (
    <>
      <FinanceCardItem backgroundColor={isFixed ? "#ffd469" : "#F4F4F4"}>
        <FinanceCardContent>
          <FinanceCardTitle>{title}</FinanceCardTitle>
          <FinanceCardPrice color={isExpenditure ? "#FF3F15" : "#0075FF"}>
            {price}
          </FinanceCardPrice>
        </FinanceCardContent>
        <FinanceCardDetail>
          {category} | {method}
        </FinanceCardDetail>
      </FinanceCardItem>
    </>
  );
}
