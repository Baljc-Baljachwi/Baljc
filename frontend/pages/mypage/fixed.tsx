import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFixedEList, getFixedExpenditure } from "api/mypage";

import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import Header from "components/common/Header";
import FixedList from "components/mypage/fixed/FixedList";
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
  // console.log(exFixed);
  // console.log(fixedEList);
  useEffect(() => {
    getFixedExpenditure(year, month)
      .then((res) => {
        // console.log(res.data.data);
        setFixedExpenditure(res.data.data.fixedExpenditure);
      })
      .catch((err) => {
        console.log("😥🙀 고정 지출 조회 실패");
        console.log(err.response);
      });
    getFixedEList(year, month)
      .then((res) => {
        console.log(res);
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
        console.log("😥🙀 고정 지출 조회 실패");
        console.log(err.response);
      });
  }, []);
  // console.log(exFixed);
  return (
    <>
      <Header
        label="고정 지출 조회"
        onClickBackButton={() => router.push("/mypage")}
      />
      <Container>
        {/* <BodyContainer> */}
        <HeaderCard>
          <span>이번 달 고정 지출</span>
          <span>
            <span>총 </span>
            {fixedExpenditure.toLocaleString()}
            <span>원</span>
          </span>
        </HeaderCard>
        {/* <ContentsContainer> */}
        {fixedEList && fixedEList.length > 0 ? (
          fixedEList.map((item, idx) => <FixedList key={idx} item={item} />)
        ) : (
          <NoContentContainer>
            고정 지출 내역이 없습니다!
            <NoContentMessage className="small">
              고정 지출을 등록해주세요.
            </NoContentMessage>
          </NoContentContainer>
        )}
        {/* </ContentsContainer> */}
        {/* </BodyContainer> */}
      </Container>
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
  background-color: #f4f4f4;
  // padding: 1rem 0 0 0;
  // padding-bottom: 7rem;
`;
const BodyContainer = styled.div`
  padding: 0 0 1rem 0;
`;
