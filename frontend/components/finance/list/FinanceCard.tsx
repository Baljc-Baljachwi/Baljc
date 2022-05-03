import styled from "styled-components";
import { useRouter } from "next/router";

import { colors } from "../../../styles/colors";

const FinanceCardItem = styled.div<{ backgroundColor: string }>`
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
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

const FinanceCardPrice = styled.span<{ color?: string }>`
  color: ${(props) => props.color};
  font-weight: 500;
  font-style: medium;
  padding-bottom: 1rem;
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
  isFixed: boolean;
  type: string;
  title: string;
  price: number;
  method: string;
  category: string;
}

export default function FinanceCard({
  type,
  title,
  price,
  method,
  category,
  isFixed,
}: FinanceCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: "/finance/detail",
      query: { title },
    });
  };
  return (
    <>
      <FinanceCardItem
        backgroundColor={isFixed ? "#ffd469" : "#F4F4F4"}
        onClick={handleClick}
      >
        <FinanceCardContent>
          <FinanceCardTitle>{title}</FinanceCardTitle>
          <FinanceCardPrice>
            {type === "E" ? "-" : null}
            {price.toLocaleString()}원
          </FinanceCardPrice>
        </FinanceCardContent>
        <FinanceCardDetail>
          {category} |{" "}
          {method === "C"
            ? "카드"
            : method === "M"
            ? "현금"
            : method === "E"
            ? "기타"
            : method === "N"
            ? "-"
            : "-"}
        </FinanceCardDetail>
      </FinanceCardItem>
    </>
  );
}
