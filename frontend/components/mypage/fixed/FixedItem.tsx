import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import dayjs from "dayjs";

import { colors } from "../../../styles/colors";
import { getCategories } from "api/accountbook";
import { getFixedEList } from "api/mypage";
import { ICategory } from "types";

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

interface FixedItemProps {
  accountbookId: string;
  monthlyPeriod: string;
  dayOfWeek: string;
  title: string;
  price: number;
  categoryName: string;
  categoryImgUrl: string;
  paymentMethod: string;
}

export default function FixedItem({
  accountbookId,
  monthlyPeriod,
  dayOfWeek,
  title,
  price,
  categoryName,
  categoryImgUrl,
  paymentMethod,
}: FixedItemProps) {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const year = Number(dayjs(date).format("YYYY"));
  const month = Number(dayjs(date).format("M"));
  const dateForm = dayjs(date).format("YYYY-MM-DD");
  const [exCategories, setExCategories] = useState<ICategory[]>([]);
  const [categoryImg, setCategoryImg] = useState("");
  //   useEffect(() => {
  //     getCategories("E").then((res) => {
  //       console.log(res.data);
  //       setExCategories(res.data.data);
  //     });
  //   }, []);
  //   useEffect(() => {
  //     exCategories?.map((category, idx) =>
  //       category.name === categoryName ? setCategoryImg(category.imgUrl) : null
  //     );
  //   }, [exCategories, categoryName]);
  return (
    <>
      <FixedCardItem backgroundColor={"#F4F4F4"}>
        <div className="ImgContainer">이미지 자리</div>
        <div className="TextContainer">
          <div className="major">
            <span>{title}</span>
            <span className="priceTag">-{price.toLocaleString()}원</span>
          </div>
          <div className="second">
            {categoryName} |{" "}
            {paymentMethod === "C"
              ? "카드"
              : paymentMethod === "M"
              ? "현금"
              : paymentMethod === "E"
              ? "기타"
              : paymentMethod === "N"
              ? "-"
              : "-"}
          </div>
        </div>
      </FixedCardItem>
    </>
  );
}

const FixedCardItem = styled.div<{ backgroundColor: string }>`
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;

  background-color: ${(props) => props.backgroundColor};

  width: 100%;

  font-size: 1.6rem;
  padding: 1.6rem 2rem;

  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  color: #3d3d3d;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  .ImgContainer {
    display: flex;
  }
  .TextContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    .major {
      display: flex;
      font-size: 1.6rem;
      justify-content: space-between;
      .priceTag {
        font-weight: 500;
        font-style: medium;
        padding-bottom: 1rem;
      }
    }
    .second {
      display: flex;
      font-size: 1.2rem;
    }
  }
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
