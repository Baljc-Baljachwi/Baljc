import styled from "styled-components";
import { colors } from "../../../styles/colors";

const FinanceCardItem = styled.div`
  width: 32rem;
  margin-left: 2rem;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  display: flex; ;
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
  backgroundColor: string;
  //   (type==='E'? FinanceCardProps.color=" #FFD469": color="#F4F4F4"): string; // erd에선 char로 E: 지출, I: 수입 이지만 우선 string으로 해뒀습니다.
  type: string;
  title: string;
  price: number;

  isFixed: boolean;
  //   fixed_expenditure_yn: boolean;
  //   fixed_income_yn: boolean;
  //   inExpenditure: boolean;
  // label: string;
}

export default function FinanceCard({
  backgroundColor,
  type,
  title,
  price,
  isFixed,
}: FinanceCardProps) {
  return (
    <>
      <FinanceCardItem background-color={backgroundColor}></FinanceCardItem>
    </>
  );
}

const StyledButton = styled.button`
  width: 100%;
  background-color: #2e437a;
  color: #ffffff;
  font-size: 1.6rem;
  padding: 1.6rem 0;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;
