import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

import Daily from "./daily/index";
import { getMonthlyCalendar } from "api/calendar";
import Icon from "../common/Icon";
import { useRecoilValue } from "recoil";
import { todosState } from "atoms/atoms";
import Header from "../../components/common/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
`;

const FinanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MonthlyTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 2.3rem;
  padding: 2rem 3rem 1rem 3rem;
  font-weight: 700;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  padding: 1rem 0;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  color?: string;
  p?: string;
}>`
  color: ${(props) => (props.color ? props.color : "")};
  font-size: ${(props) => (props.fs ? props.fs : "")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
`;

export default function Monthly() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState(new Date());
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
  const dayMonthYear = dayjs(date).format("YYYY-MM-DD");
  dayjs.locale("ko");

  const todos = useRecoilValue(todosState);

  const handleClickLeft = () => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const lastDay = new Date(y, m, 0);
    setDate(lastDay);
  };

  const handleClickRight = () => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m + 1, 1);
    setDate(firstDay);
  };

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
  }, [year, month, date, todos]);

  useEffect(() => {
    setSaved([]);
    for (let day in mark) {
      const types = mark[day];
      if (types["A"] === 1) {
        setSaved((prev) => [...prev, day]);
        // setSaved([...saved, day]); 이렇게 쓰면 쥬금
      }
    }
  }, [mark]);

  if (!mounted) return null;
  return (
    <>
      <Container>
        <Header label="이번 달 요약" />
        <MonthlyTotal>
          <FlexContainer>
            <div style={{ paddingRight: "1rem" }}>
              <Icon
                mode="fas"
                icon="caret-left"
                size="16px"
                onClick={handleClickLeft}
              />
            </div>
            <Typography fs="2.4rem">{month}월</Typography>
            <div style={{ paddingLeft: "1rem" }}>
              <Icon
                mode="fas"
                icon="caret-right"
                size="16px"
                onClick={handleClickRight}
              />
            </div>
          </FlexContainer>
          <FlexContainer>
            <ColumnContainer>
              <Typography fs="1.5rem" fw="400" p="0 4rem 0 0" color="#4d5158">
                지출
              </Typography>
              <Typography fs="1.5rem" fw="400" p="0 4rem 0 0" color="#4d5158">
                수입
              </Typography>
            </ColumnContainer>
            <ColumnContainer>
              <Typography fs="2rem" fw="600">
                -{expenditure.toLocaleString()}원
              </Typography>
              <Typography fs="2rem" fw="600" color="#8cbff2">
                {income.toLocaleString()}원
              </Typography>
            </ColumnContainer>
          </FlexContainer>
        </MonthlyTotal>

        <CalendarWrapper>
          <Calendar
            activeStartDate={date}
            onChange={setDate}
            value={date}
            calendarType="US" // 일요일 시작
            formatDay={(locale, date) => dayjs(date).format("D")} // 날짜 표기 방식 변경
            formatMonthYear={(locale, date) => dayjs(date).format("M월")} // 월 표기 방식 변경
            showNavigation={false}
            showNeighboringMonth={false} // 이전, 이후 달 날짜 보이지 않도록
            next2Label={null} // 연 단위 이동 삭제
            prev2Label={null}
            minDetail="month" // month 클릭시 year 이동 방지
            tileContent={({ date, view }) =>
              view === "month" ? (
                <>
                  {saved ? (
                    saved.find(
                      (x) => x === dayjs(date).format("YYYY-MM-DD")
                    ) ? (
                      <div className="img"></div>
                    ) : (
                      <div className="img-div"></div>
                    )
                  ) : (
                    <div className="img-div"></div>
                  )}
                  {amount
                    ? amount.map((item, idx) =>
                        item[0] === dayjs(date).format("YYYY-MM-DD") ? (
                          item[1]["E"] ? (
                            <FinanceWrapper key={idx}>
                              <div className="cost">
                                -
                                {item[1]["E"]
                                  ? Number(item[1]["E"]).toLocaleString()
                                  : null}
                              </div>
                              <div className="income">
                                {item[1]["I"]
                                  ? Number(item[1]["I"]).toLocaleString()
                                  : null}
                              </div>
                            </FinanceWrapper>
                          ) : (
                            <FinanceWrapper key={idx}>
                              <div className="cost">
                                {item[1]["E"]
                                  ? Number(item[1]["E"]).toLocaleString()
                                  : null}
                              </div>
                              <div className="income">
                                {item[1]["I"]
                                  ? Number(item[1]["I"]).toLocaleString()
                                  : null}
                              </div>
                            </FinanceWrapper>
                          )
                        ) : null
                      )
                    : null}
                </>
              ) : null
            }
          />
        </CalendarWrapper>
        <Daily
          date={dayMonthYear}
          dayYoil={dayYoil}
          day={day}
          year={year}
          month={month}
        />
      </Container>
    </>
  );
}
