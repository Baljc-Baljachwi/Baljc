import styled from "styled-components";

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

const RoutineListItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  gap: 1rem;
  font-size: 1.6rem;
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
      content: "헬스장",
    },
  ];
  return (
    <Container>
      <Title>일과</Title>
      <RoutineList>
        <ul>
          {routine.map((item) => (
            <RoutineListItem key={item.id}>
              <Icon
                mode="fas"
                icon="circle"
                color="#FFD469"
                size="1rem"
                display="flex"
              />
              {item.content}
            </RoutineListItem>
          ))}
        </ul>
      </RoutineList>
    </Container>
  );
}
