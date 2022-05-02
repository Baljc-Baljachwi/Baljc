import Header from "../../components/common/Header";
import Routine from "../../components/work/routine/index";
import Todo from "../../components/work/todolist/index";

import styled from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { type } from "os";

const StyledDiv = styled.div`
  padding: 2rem;
`;

const WeeklyDiv = styled.div`
  width: 100%;
`;

const WeeklyHeader = styled.div`
  margin-bottom: 1.8rem;
`;

const YoilDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  font-size: 1.3rem;
  font-weight: 500;
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DateItem = styled.p<{ isToday: boolean }>`
  font-size: 1.5rem;
  font-weight: 500;
  width: 4rem;
  text-align: center;
  line-height: 4rem;
  color: ${(props) => (props.isToday ? "white" : "#a3a3a3")};
  background: ${(props) => (props.isToday ? "#FFD469" : "")};
  border-radius: ${(props) => (props.isToday ? "50%" : "")};
  cursor: pointer;
`;

interface WeekState {
  day: string;
  isClicked: boolean;
}

export default function Home() {
  const [week, setWeek] = useState<WeekState[]>([]);

  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const yoil = ["일", "월", "화", "수", "목", "금", "토"];
  const [dow, setDow] = useState<number>(0);

  const getTodayYoil = (day: number) => {
    setDow(1 << (6 - day));
  };

  const getWeekly = () => {
    const now = new Date();
    getTodayYoil(now.getDay());

    const sunday = now.getTime() - 86400000 * now.getDay();
    now.setTime(sunday);

    const result: string[] = [now.toISOString().slice(0, 10)];

    for (let i = 1; i < 7; i++) {
      now.setTime(now.getTime() + 86400000);
      result.push(now.toISOString().slice(0, 10));
    }

    for (let d of result) {
      let is = false;
      if (d === today) is = true;

      setWeek((prev) => [...prev, { day: d, isClicked: is }]);
    }
  };

  const onClick = (item: WeekState, index: number) => {
    setWeek(
      week.map((w) =>
        w.day === item.day
          ? { ...w, isClicked: true }
          : { ...w, isClicked: false }
      )
    );
    getTodayYoil(index);
  };

  useEffect(() => {
    setWeek([]);
    getWeekly();
  }, []);

  return (
    <>
      <Header label="할 일" />
      <StyledDiv>
        <WeeklyDiv>
          <WeeklyHeader>
            <h1>
              {today.slice(0, 4)}년{" "}
              {today.slice(5, 6) === "0"
                ? today.slice(6, 7)
                : today.slice(5, 7)}
              월
            </h1>
          </WeeklyHeader>
          <YoilDiv>
            {yoil.map((item, key) => (
              <p key={key}>{item}</p>
            ))}
          </YoilDiv>
          <DateDiv>
            {week &&
              week.map((item, index) => {
                return (
                  <DateItem
                    isToday={item.isClicked}
                    key={index}
                    onClick={() => onClick(item, index)}
                  >
                    {item.day.slice(8)}
                  </DateItem>
                );
              })}
          </DateDiv>
        </WeeklyDiv>
        <Routine dow={dow}></Routine>
        <Todo viewOnly={false}></Todo>
      </StyledDiv>
    </>
  );
}
