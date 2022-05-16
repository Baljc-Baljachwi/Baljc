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
  //   {
  //     accountbookId,
  //     monthlyPeriod,
  //     dayOfWeek,
  //     title,
  //     price,
  //     categoryName,
  //     categoryImgUrl,
  //     paymentMethod,
  //   }: IExFixed
  const data: any = item[1];
  const [date, setDate] = useState(new Date());
  const year = Number(dayjs(date).format("YYYY"));
  const month = Number(dayjs(date).format("M"));
  const dateForm = dayjs(date).format("YYYY-MM-DD");
  const [exFixed, setExFixed] = useState<IExFixed>();
  //   console.log(exFixed);
  // const [accountbookId, setAccountbookId] = useState("");
  // const [monthlyPeriod, setMonthlyPeriod] = useState("");
  // const [dayOfWeek, setDayOfWeek] = useState("");
  // const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");
  // const [categoryName, setCategoryName] = useState("");
  // const [categoryImgUrl, setCategoryImgUrl] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState("");
  useEffect(() => {
    getFixedEList(year, month)
      .then((res) => {
        // console.log(res.data.data);
        setExFixed(res.data.data);
        // setAccountbookId(res.data.data.accountbookId);
        // setMonthlyPeriod(res.data.data.monthlyPeriod);
        // setDayOfWeek(res.data.data.dayOfWeek);
        // setTitle(res.data.data.title);
        // setPrice(res.data.data.price);
        // setCategoryName(res.data.data.categoryName);
        // setCategoryImgUrl(res.data.data.categoryImgUrl);
        // setPaymentMethod(res.data.data.paymentMethod);
      })
      .catch((err) => {
        // // console.log("😥🙀 고정 지출 조회 실패");
        // console.log(err.response);
      });
  }, []);

  //   useEffect(() => {
  //     exFixed?.map((value, idx) =>
  //       value.categoryName === categoryName
  //         ? setCategoryImg(value.categoryImgUrl)
  //         : null
  //     );
  //   }, [categoryImgUrl, categoryName]);
  //   console.log(item[1]);
  //   console.log(item[2]);
  //   console.log(data);

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
