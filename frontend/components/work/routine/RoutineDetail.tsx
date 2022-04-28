import Header from "../../../components/common/Header";
import RoutineCard from "./RoutineCard";

import styled from "styled-components";

const RoutineDiv = styled.div`
  // width: 100%;
`;

export default function RoutineDetail() {
  const routineList = [
    {
      id: 1,
      title: "분리수거",
      repetition: 4, // 0000100
    },
    {
      id: 2,
      title: "헬스가기",
      repetition: 42, // 0101010
    },
  ];

  return (
    <>
      <Header label="오늘의 일과" icon="plus" />
      <RoutineDiv>
        {routineList.map((list) => (
          <RoutineCard key={list.id} list={list}></RoutineCard>
        ))}
      </RoutineDiv>
    </>
  );
}
