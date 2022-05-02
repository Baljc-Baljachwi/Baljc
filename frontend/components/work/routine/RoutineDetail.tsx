import Header from "../../../components/common/Header";
import RoutineCard from "./RoutineCard";
import Icon from "../../../components/common/Icon";
import RoutineModal from "./RoutineModal";

import styled from "styled-components";
import { useState } from "react";

const StyledHeader = styled.header`
  width: 100%;
  height: 6.6rem;
  background-color: #2e437a;
  font-size: 2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`;

const BackButton = styled.span`
  padding-right: 1rem;
  cursor: pointer;
`;

const AddorModifyButton = styled.span`
  /* padding-right: 2rem; */
  cursor: pointer;
`;

const RoutineDiv = styled.div`
  // width: 100%;
`;

export default function RoutineDetail() {
  const [open, setOpen] = useState(false);

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

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Header
        label="오늘의 일과"
        icon="plus"
        onClickRightButton={() => onClick()}
      />
      <RoutineDiv>
        {routineList.map((list) => (
          <RoutineCard key={list.id} list={list}></RoutineCard>
        ))}
      </RoutineDiv>
      {open ? (
        <RoutineModal
          open={open}
          setOpen={setOpen}
          label={"오늘의 일과 추가"}
        />
      ) : (
        ""
      )}
    </>
  );
}
