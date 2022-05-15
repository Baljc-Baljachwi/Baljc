import styled from "styled-components";
import { useState } from "react";

import FinanceBoard from "./FinanceBoard";
import RoutineBoard from "./RoutineBoard";
import ToDoBoard from "./ToDoBoard";
import { getDailyCalendar } from "api/calendar";
import { useEffect } from "react";
import { IRoutine } from "types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 5rem 2rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

interface DailyProps {
  year: string;
  month: string;
  day: string;
  dayYoil: string;
  date: string;
}

export default function Daily({ date, dayYoil, day, month, year }: DailyProps) {
  const [result, setResult] = useState<Array<any>>([]);
  const [routines, setRoutines] = useState<IRoutine[]>();
  useEffect(() => {
    getDailyCalendar({ year: year, month: month, day: day }).then((res) => {
      setResult(res.data.data);
      setRoutines(res.data.data.routines);
    });
  }, [day, date, month, year]);

  return (
    <Container>
      <Title>{dayYoil}</Title>
      <FinanceBoard item={result} date={date} />
      <RoutineBoard routines={routines} />
      <ToDoBoard date={date} />
    </Container>
  );
}
