import styled from "styled-components";

const Container = styled.div`
  background-color: #4d5f8f;
  border-radius: 10px;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  display: inline;
  font-size: 1rem;
  background-color: #8cbff2;
  color: #ffffff;
  padding: 0.1rem 1rem;
`;

const TextWrapper = styled.div`
  padding: 1rem 0;
  color: #ffffff;
`;

const RoutineItem = styled.div`
  font-size: 1.4rem;
  line-height: 2.4rem;
`;

export default function RoutineBoard() {
  // API 연동 전
  const routine = [
    {
      id: 1,
      content: "분리수거",
    },
    {
      id: 2,
      content: "빨래",
    },
    {
      id: 3,
      content: "운동",
    },
  ];
  return (
    <Container>
      <Title>일과</Title>
      <TextWrapper>
        <ul>
          {routine.map((item) => (
            <RoutineItem key={item.id}>{item.content}</RoutineItem>
          ))}
        </ul>
      </TextWrapper>
    </Container>
  );
}
