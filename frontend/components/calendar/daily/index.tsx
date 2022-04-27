import styled from "styled-components";
import FinanceBoard from "./FinanceBoard";
import RoutineBoard from "./RoutineBoard";
import ToDoBoard from "./ToDoBoard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

interface DailyProps {
  day: string;
}

export default function Daily({ day }: DailyProps) {
  return (
    <Container>
      <Title>{day}</Title>
      <FinanceBoard />
      <RoutineBoard />
      <ToDoBoard />
    </Container>
  );
}
