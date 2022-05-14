import dayjs from "dayjs";
import styled from "styled-components";
import TodoList from "../../work/todolist/index";

const Container = styled.div`
  background-color: #4d5f8f;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  display: inline;
  font-size: 1rem;
  background-color: #8cbff2;
  color: #ffffff;
  padding: 0.1rem 1rem;
  border-radius: 3px;
`;

interface ToDoBoardProps {
  date: string;
}
export default function ToDoBoard({ date }: ToDoBoardProps) {
  return (
    <Container>
      <Title>할 일</Title>
      <TodoList monthlyTodo={true} date={date} />
    </Container>
  );
}
