import styled from "styled-components";
import Icon from "../../common/Icon";

const RoutineDiv = styled.div`
  background: #f4f4f4;
  border-radius: 1rem;
  width: 100%;
  padding: 1.5rem 2rem;
  filter: drop-shadow(0 0.2rem 0.4rem rgba(0, 0, 0, 0.25));
`;

const RoutineHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RoutineList = styled.div`
  margin-top: 1rem;
`;

const RoutineListItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  gap: 1rem;
  font-size: 1.6rem;
`;

export default function Routine() {
  return (
    <>
      <RoutineDiv>
        <RoutineHeader>
          <Icon mode="fas" icon="thumbtack" color="#EB3232" size="1.6rem" />
          <h1>오늘의 일과</h1>
        </RoutineHeader>
        <RoutineList>
          <RoutineListItem>
            <Icon mode="fas" icon="circle" color="#8CBFF2" size="1rem" />
            <p>분리수거</p>
          </RoutineListItem>
          <RoutineListItem>
            <Icon mode="fas" icon="circle" color="#8CBFF2" size="1rem" />
            <p>헬스가기</p>
          </RoutineListItem>
        </RoutineList>
      </RoutineDiv>
    </>
  );
}
