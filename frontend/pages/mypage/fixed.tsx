import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import Header from "components/common/Header";
import FixedList from "components/mypage/fixed/FixedList";
import FixedItem from "components/mypage/fixed/FixedItem";

const Fixed = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(Number(dayjs(date).format("M")));
  const [year, setYear] = useState(Number(dayjs(date).format("YYYY")));
  return (
    <>
      <Header
        label="고정 지출 조회"
        onClickBackButton={() => router.push("/mypage")}
      />
      <HeaderCard>
        <span>이번 달 고정 지출</span>
        <span>
          <span>총 </span>93,900<span>원</span>
        </span>
      </HeaderCard>
      <ContentsContainer>
        {/* {amount && amount.length > 0 ? (
          amount.map((item, idx) => <FixedList key={idx} item={item} />)
        ) : (
          <NoContentContainer>
            <p>고정 지출 내역이 없습니다!</p>
            <p className="small">+ 버튼을 눌러 새로운 내용을 추가해보세요</p>
          </NoContentContainer>
        )} */}
      </ContentsContainer>
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
  height: 20vh;
  padding: 0 4rem;

  color: #ffffff;
  font-size: 2.4rem;
  font-weight: 700;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: nowrap;

  height: 100%;
  padding: 2 2rem;

  color: #3d3d3d;
  font-size: 1.6rem;
  font-weight: 400;
`;

const NoContentContainer = styled.section`
  width: 100%;
  height: calc(100vh - 50rem);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    text-align: center;
    font-size: 2.4rem;
    font-weight: 700;
    padding: 1rem;
    color: #cccccc;
    &.small {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }
`;
