import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Monthly() {
  const [date, setDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <Container>
      <Calendar
        onChange={setDate}
        value={date}
        calendarType="US" // 일요일 시작
        // formatShortWeekday={formatShortWeekday} //
        // maxDate={date} // 오늘 날짜까지만 보기
        formatDay={(locale, date) => dayjs(date).format("D")} // 날짜 표기 방식 변경
        formatMonthYear={(locale, date) => dayjs(date).format("M월")} // 월 표기 방식 변경
        next2Label={null} // 연 단위 이동 삭제
        prev2Label={null}
        onClickMonth={(value, event) => {
          event.preventDefault();
          console.log(value);
        }}
      />
    </Container>
  );
}
