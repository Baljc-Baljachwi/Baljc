import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

import { colors } from "../../../styles/colors";
import { useEffect, useState } from "react";
import { getCategories } from "api/accountbook";
import { ICategory } from "types";

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
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr;
`;

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FinanceCardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const FlexContainer = styled.div`
  display: flex;
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
interface FinanceCardProps {
  accountbookId: string;
  isFixed: boolean;
  type: string;
  title: string;
  price: number;
  method: string;
  categoryName: string;
  date?: string;
}

export default function FinanceCard({
  accountbookId,
  type,
  title,
  price,
  method,
  categoryName,
  isFixed,
  date,
}: FinanceCardProps) {
  const router = useRouter();
  const [exCategories, setExCategories] = useState<ICategory[]>([]);
  const [inCategories, setInCategories] = useState<ICategory[]>([]);
  const [categoryImg, setCategoryImg] = useState("");

  const handleClick = () => {
    router.push({
      pathname: "/finance/detail",
      query: { accountbookId },
    });
  };

  useEffect(() => {
    getCategories("E").then((res) => {
      setExCategories(res.data.data);
    });
    getCategories("I").then((res) => {
      setInCategories(res.data.data);
    });
  }, [date]);

  useEffect(() => {
    exCategories?.map((category, idx) =>
      category.name === categoryName ? setCategoryImg(category.imgUrl) : null
    );
    inCategories?.map((category, idx) =>
      category.name === categoryName ? setCategoryImg(category.imgUrl) : null
    );
  }, [exCategories, inCategories, categoryName]);

  return (
    <>
      <FinanceCardItem
        backgroundColor={isFixed ? "#ffd469" : "#F4F4F4"}
        onClick={handleClick}
      >
        <GridContainer>
          {categoryImg ? (
            <Image
              src={categoryImg}
              alt={categoryName}
              layout="fixed"
              width="50px"
              height="50px"
            />
          ) : null}
          <FlexColumnContainer>
            <FinanceCardContent>
              <FinanceCardTitle>{title}</FinanceCardTitle>
              <FinanceCardPrice>
                {type === "E" ? "-" : null}
                {price.toLocaleString()}원
              </FinanceCardPrice>
            </FinanceCardContent>
            <FlexContainer>
              <Typography fs="1.2rem" fw="400" color="#4d5158" p="0 1rem 0 0">
                {categoryName}
              </Typography>
              <Typography fs="1rem" fw="400" color="#878B93" p="0 1rem 0 0">
                |
              </Typography>
              <Typography fs="1.2rem" fw="400" color="#4d5158" p="0 1rem 0 0">
                {method === "C"
                  ? "카드"
                  : method === "M"
                  ? "현금"
                  : method === "E"
                  ? "기타"
                  : method === "N"
                  ? "-"
                  : "-"}
              </Typography>
            </FlexContainer>
          </FlexColumnContainer>
        </GridContainer>
      </FinanceCardItem>
    </>
  );
}
