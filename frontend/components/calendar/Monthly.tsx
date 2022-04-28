import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

import Daily from "./daily/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Monthly() {
  const [date, setDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  // const year = 2022;
  // const month = 4;
  // // 예산 내 소비한 날짜 저장할 배열
  // const [mark, setMark] = useState([]);

  // // `/api/calendars/months?year=&month=`
  // // `/api/calendars/months?year={2022}&month={4}`
  // const result = await api.get(`/api/calendars/months?`, {
  //   params: {
  //     year: year,
  //     month: month,
  //   },
  // });
  // console.log(result);

  // 절약한 날짜
  const saved = ["2022-04-02", "2022-04-03", "2022-04-10"];

  // 소비 내역 있는 날짜

  const day = dayjs(date).format("DD일 dddd");

  dayjs.locale("ko");

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <Container>
      <CalendarWrapper>
        <Calendar
          onChange={setDate}
          value={date}
          calendarType="US" // 일요일 시작
          formatDay={(locale, date) => dayjs(date).format("D")} // 날짜 표기 방식 변경
          formatMonthYear={(locale, date) => dayjs(date).format("M월")} // 월 표기 방식 변경
          next2Label={null} // 연 단위 이동 삭제
          prev2Label={null}
          onClickMonth={(value, event) => {
            event.preventDefault();
            console.log(value);
          }}
          minDetail="month" // month 클릭시 year 이동 방지
          tileContent={({ date }) => (
            <>
              {saved.find((x) => x === dayjs(date).format("YYYY-MM-DD")) ? (
                <div className="img"></div>
              ) : null}

              <div className="finance-wrapper">
                <div className="cost">-10,000</div>
                <div className="income">2,000</div>
              </div>
            </>
          )}
        />
      </CalendarWrapper>
      <Daily day={day} />
    </Container>
  );
}
