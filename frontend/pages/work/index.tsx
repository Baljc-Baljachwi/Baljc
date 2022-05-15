import Header from "../../components/common/Header";
import Routine from "../../components/work/routine/index";
import Todo from "../../components/work/todolist/index";

import styled from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [week, setWeek] = useState<WeekState[]>([]);

  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const yoil = ["일", "월", "화", "수", "목", "금", "토"];
  const [dow, setDow] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const getClickedDow = (day: number) => {
    setDow(1 << (6 - day));
  };

  const getClickedDay = (day: string) => {
    setDate(day);
  };

  const getWeekly = () => {
    var currentDay = new Date();
    var theYear = currentDay.getFullYear();
    var theMonth = currentDay.getMonth();
    var theDate = currentDay.getDate();
    var theDayOfWeek = currentDay.getDay();

    var thisWeek = [];

    for (var i = 0; i < 7; i++) {
      var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
      var yyyy = resultDay.getFullYear();
      var mm: string | number = Number(resultDay.getMonth()) + 1;
      var dd: string | number = resultDay.getDate();

      mm = String(mm).length === 1 ? "0" + mm : mm;
      dd = String(dd).length === 1 ? "0" + dd : dd;

      thisWeek[i] = yyyy + "-" + mm + "-" + dd;
    }

    for (let d of thisWeek) {
      let is = false;
      if (d === today) is = true;

      setWeek((prev) => [...prev, { day: d, isClicked: is }]);
    }
  };

  const onClick = (item: WeekState, index: number) => {
    setDate(item.day);
    setWeek(
      week.map((w) =>
        w.day === item.day
          ? { ...w, isClicked: true }
          : { ...w, isClicked: false }
      )
    );
    getClickedDow(index);
  };

  useEffect(() => {
    setWeek([]);
    getWeekly();
    getClickedDow(new Date().getDay());
    console.log(today);
    getClickedDay(today);
  }, []);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }

  return (
    <>
      <Header
        label="할 일"
        onClickBackButton={() => router.push("/calendar")}
      />
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
        <Todo monthlyTodo={false} date={date}></Todo>
      </StyledDiv>
    </>
  );
}

Home.requireAuth = true;
