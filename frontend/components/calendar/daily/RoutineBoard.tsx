import styled from "styled-components";
import { IRoutine } from "types";

import Icon from "../../common/Icon";

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

const RoutineList = styled.div`
  padding: 1rem 0;
  color: #ffffff;
`;

const RoutineListItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  gap: 1rem;
  font-size: 1.6rem;
`;

export default function RoutineBoard({ routines }: any) {
  return (
    <Container>
      <Title>일과</Title>
      <RoutineList>
        <ul>
          {routines?.map((routine: IRoutine) => (
            <RoutineListItem key={routine.routineId}>
              <Icon
                mode="fas"
                icon="circle"
                color="#FFD469"
                size="1rem"
                display="flex"
              />
              {routine.title}
            </RoutineListItem>
          ))}
        </ul>
      </RoutineList>
    </Container>
  );
}
