import styled from "styled-components";
import Routine from "../../work/routine/index";

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
  border-radius: 3px;
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
  return (
    <Container>
      <Title>일과</Title>
      {/* <TextWrapper>
        <ul>
          {routine.map((item) => (
            <RoutineItem key={item.id}>{item.content}</RoutineItem>
          ))}
        </ul>
      </TextWrapper> */}
      <Routine />
    </Container>
  );
}
