import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFixedEList, getFixedExpenditure } from "api/mypage";

import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import Header from "components/common/Header";
import FixedList from "components/mypage/fixed/FixedList";
import FloatingButton from "components/common/FloatingButton";

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

const Fixed = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(Number(dayjs(date).format("M")));
  const [year, setYear] = useState(Number(dayjs(date).format("YYYY")));
  const [fixedExpenditure, setFixedExpenditure] = useState(0);
  const [exFixed, setExFixed] = useState<IExFixed[]>([]);
  const [accountbookId, setAccountbookId] = useState("");
  const [monthlyPeriod, setMonthlyPeriod] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImgUrl, setCategoryImgUrl] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const fixedEList = Object.entries(exFixed);
  const dayMonthYear = dayjs(date).format("YYYY-MM-DD");

  useEffect(() => {
    getFixedExpenditure(year, month)
      .then((res) => {
        setFixedExpenditure(res.data.data.fixedExpenditure);
      })
      .catch((err) => {
        console.log("😥🙀 고정 지출 조회 실패");
      });
    getFixedEList(year, month)
      .then((res) => {
        setExFixed(res.data.data);
      })
      .catch((err) => {
        console.log("😥🙀 고정 지출 조회 실패");
      });
  }, []);
  return (
    <>
      <Header
        label="고정 지출 조회"
        onClickBackButton={() => router.push("/mypage")}
      />

      <HeaderCard>
        <span>이번 달 고정 지출</span>
        <span>
          <span>총 </span>
          {fixedExpenditure.toLocaleString()}
          <span>원</span>
        </span>
      </HeaderCard>
      {fixedEList && fixedEList.length > 0 ? (
        fixedEList.map((item, idx) => (
          <Container key={idx}>
            <FixedList item={item} />
          </Container>
        ))
      ) : (
        <NoContentContainer>
          고정 지출 내역이 없습니다!
          <NoContentMessage className="small">
            고정 지출을 등록해주세요.
          </NoContentMessage>
        </NoContentContainer>
      )}
      <FloatingButton
        onClick={() => {
          router.push({
            pathname: "/finance/financeCreateForm",
            query: { date: dayMonthYear },
          });
        }}
      />
    </>
  );
};

export default Fixed;
Fixed.requireAuth = true;

const HeaderCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: nowrap;

  background-color: #2e437a;
  // height: 20vh;
  height: 20rem;
  padding: 0 4rem;

  color: #ffffff;
  font-size: 2.4rem;
  font-weight: 700;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  height: 100%;
  padding: 2rem;

  color: #3d3d3d;
  font-size: 1.6rem;
  font-weight: 400;
`;

const NoContentContainer = styled.section`
  background-color: #f4f4f4;
  width: 100%;
  // height: calc(100vh - 50rem);
  // height: calc(100vh - 33.2rem);
  height: calc(100vh - 32.2rem);
  // height: calc(100vh - 13.2rem);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #cccccc;
  font-size: 2.4rem;
  font-weight: 700;
  // p {
  //   text-align: center;
  //   font-size: 2.4rem;
  //   font-weight: 700;
  //   padding: 1rem;
  //   color: #cccccc;
  //   &.small {
  //     font-size: 1.8rem;
  //     font-weight: 500;
  //   }
  // }
`;

const NoContentMessage = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  padding: 1rem;
  color: #cccccc;
  &.small {
    font-size: 1.8rem;
    font-weight: 500;
    .btn_MoveTo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Container = styled.div`
  padding: 2rem;
`;
