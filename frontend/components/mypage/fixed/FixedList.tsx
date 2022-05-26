import { useEffect, useState } from "react";
import { getFixedEList } from "api/mypage";

import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import FixedItem from "./FixedItem";

interface IExFixed {
  accountbookId: string;
  monthlyPeriod: number;
  dayOfWeek: string;
  title: string;
  price: number;
  categoryName: string;
  categoryImgUrl: string;
  paymentMethod: string;
}
interface FixedListProps {
  item: any;
}

export default function FixedList({ item }: FixedListProps) {
  const data: any = item[1];
  const [date, setDate] = useState(new Date());
  const year = Number(dayjs(date).format("YYYY"));
  const month = Number(dayjs(date).format("M"));
  const [exFixed, setExFixed] = useState<IExFixed>();

  useEffect(() => {
    getFixedEList(year, month)
      .then((res) => {
        setExFixed(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <PageContainer>
        <Day> {data.monthlyPeriod}일 </Day>
        <FixedItem
          accountbookId={data.accountbookId}
          title={data.title}
          price={data.price}
          categoryName={data.categoryName}
          paymentMethod={data.paymentMethod}
          monthlyPeriod={data.monthlyPeriod}
          dayOfWeek={data.dayOfWeek}
          categoryImgUrl={data.categoryImgUrl}
        />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Day = styled.div`
  font-size: 1.6rem;
  color: #33487f;
`;
