import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

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

export default function Weekly() {
  const [week, setWeek] = useState<string[]>();
  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const yoil = ["일", "월", "화", "수", "목", "금", "토"];

  const getWeekly = () => {
    const now = new Date();
    const sunday = now.getTime() - 86400000 * now.getDay();
    now.setTime(sunday);
    console.log(now);

    const result: string[] = [now.toISOString().slice(0, 10)];

    for (let i = 1; i < 7; i++) {
      now.setTime(now.getTime() + 86400000);
      result.push(now.toISOString().slice(0, 10));
    }
    setWeek(result);
  };

  useEffect(() => {
    getWeekly();
  }, []);

  return (
    <>
      <WeeklyDiv>
        <WeeklyHeader>
          <h1>
            {today.slice(0, 4)}년{" "}
            {today.slice(5, 6) === "0" ? today.slice(6, 7) : today.slice(5, 7)}
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
            week.map((item, key) => (
              <DateItem isToday={today == item ? true : false} key={key}>
                {item.slice(8)}
              </DateItem>
            ))}
        </DateDiv>
      </WeeklyDiv>
    </>
  );
}
