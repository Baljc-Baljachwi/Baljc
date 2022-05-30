import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

import { getCategories } from "api/accountbook";
import { ICategory } from "types";

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
  const [exCategories, setExCategories] = useState<ICategory[]>([]);
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
  }, []);
  useEffect(() => {
    exCategories?.map((category, idx) =>
      category.name === categoryName ? setCategoryImg(category.imgUrl) : null
    );
  }, [exCategories, categoryName]);
  return (
    <>
      <FixedCardItem backgroundColor={"#F4F4F4"} onClick={handleClick}>
        <div className="ImgContainer">
          {categoryImg ? (
            <Image
              src={categoryImg}
              alt={categoryName}
              layout="fixed"
              width="50px"
              height="50px"
            />
          ) : null}
        </div>
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
    padding-right: 2rem;
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  }
  .TextContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    .major {
      display: flex;
      font-size: 1.6rem;
      justify-content: space-between;
      padding-bottom: 0.6rem;
      .priceTag {
        font-weight: 500;
        font-style: medium;
      }
    }
    .second {
      display: flex;
      font-size: 1.2rem;
    }
  }
`;
