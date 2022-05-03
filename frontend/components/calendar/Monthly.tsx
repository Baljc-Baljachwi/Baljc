import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

import Daily from "./daily/index";
import { getMonthlyCalendar } from "api/calendar";

const StyledHeader = styled.header`
  width: 100%;
  height: 6.6rem;
  background-color: #2e437a;
  font-size: 2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MonthlyTotal = styled.div`
  display: flex;
  justify-content: end;
  font-size: 2.4rem;
  padding: 2rem 2rem 0 2rem;
  font-weight: 700;
  .title {
    font-size: 1.5rem;
    color: #3d3d3d;
    padding-bottom: 1rem;
  }
  .flex_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding-left: 1.5rem;
  }
  .label {
    font-weight: 300;
    font-size: 1.3rem;
    padding: 0 1rem 0 0;
  }
  .e_content {
    color: #2e437a;
  }
`;

export default function Monthly() {
  const [date, setDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const year = dayjs(date).format("YYYY");
  const month = dayjs(date).format("M");
  const day = dayjs(date).format("D");
  const [expenditure, setExpenditure] = useState("");
  const [income, setIncome] = useState("");

  // 기록 있는 날짜
  const [mark, setMark] = useState([]);

  // 절약한 날짜
  const [saved, setSaved] = useState<Array<string>>([]);
  // const [saved, setSaved] = useState<string[]>([]); 이렇게 써도 됨

  // 소비한 날짜와 금액
  const amount = Object.entries(mark);
  // [['2022-05-1', {E: 3500, I: 1000}], ['2022-05-2', {E: 10000}]]

  const dayYoil = dayjs(date).format("D일 dddd");
  dayjs.locale("ko");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    getMonthlyCalendar({ year: year, month: month }).then((res) => {
      if (res.data.code === 1600) {
        setMark(res.data.data.calendarMonth);
        setExpenditure(res.data.data.monthTotal.E);
        setIncome(res.data.data.monthTotal.I);
      }
    });
  }, [year, month]);

  useEffect(() => {
    setSaved([]);
    for (let day in mark) {
      const types = mark[day];
      if ("A" in types) {
        setSaved((prev) => [...prev, day]);
        // setSaved([...saved, day]); 이렇게 쓰면 쥬금
      }
    }
  }, [mark]);

  if (!mounted) return null;
  return (
    <>
      <Container>
        <StyledHeader>
          <div className="title">이번 달 요약</div>
        </StyledHeader>
        <MonthlyTotal>
          <div className="flex_wrapper">
            <div className="label">지출</div>
            <div className="label">수입</div>
          </div>
          <div className="flex_wrapper">
            <div className="e_content">-{expenditure.toLocaleString()}원</div>
            <div className="i_cotent">{income.toLocaleString()}원</div>
          </div>
        </MonthlyTotal>

        <CalendarWrapper>
          <Calendar
            onChange={setDate}
            value={date}
            calendarType="US" // 일요일 시작
            formatDay={(locale, date) => dayjs(date).format("D")} // 날짜 표기 방식 변경
            formatMonthYear={(locale, date) => dayjs(date).format("M월")} // 월 표기 방식 변경
            showNeighboringMonth={false} // 이전, 이후 달 날짜 보이지 않도록
            next2Label={null} // 연 단위 이동 삭제
            prev2Label={null}
            minDetail="month" // month 클릭시 year 이동 방지
            tileContent={({ date, view }) =>
              view === "month" ? (
                <>
                  {saved ? (
                    saved.find((x) => x === dayjs(date).format("YYYY-MM-D")) ? (
                      <div className="img"></div>
                    ) : null
                  ) : null}
                  {amount
                    ? amount.map((item, idx) =>
                        item[0] === dayjs(date).format("YYYY-MM-D") ? (
                          item[1]["E"] ? (
                            <div key={idx} className="finance-wrapper">
                              <div className="cost">-{item[1]["E"]}</div>
                              <div className="income">{item[1]["I"]}</div>
                            </div>
                          ) : null
                        ) : null
                      )
                    : null}
                </>
              ) : null
            }
          />
        </CalendarWrapper>
        <Daily dayYoil={dayYoil} day={day} year={year} month={month} />
      </Container>
    </>
  );
}
