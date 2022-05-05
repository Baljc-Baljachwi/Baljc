import { useState } from "react";
import styled from "styled-components";
import Icon from "../../common/Icon";
import RoutineModal from "./RoutineModal";
import { IRoutine } from "../../../types/index";
import { SetterOrUpdater } from "recoil";

const CardDiv = styled.div`
  margin: 2rem;
  padding: 1.5rem;
  background: #f4f4f4;
  border-radius: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-contents: center;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
`;

const RoutineContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RoutineTitle = styled.div``;

const RoutineDayDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const RoutineDay = styled.p``;

interface PropTypes {
  routineId: string;
  title: string;
  repetition: number;
  routineList: IRoutine[];
  setRoutineList: SetterOrUpdater<IRoutine[]>;
}

export default function RoutineCard({
  routineId,
  title,
  repetition,
  routineList,
  setRoutineList,
}: PropTypes) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <>
      <CardDiv onClick={onClick}>
        <Icon mode="fas" icon="circle" color="#8CBFF2" size="1rem" />
        <RoutineContent>
          <RoutineTitle>{title}</RoutineTitle>
          <RoutineDayDiv>
            {dayList.map((value, index) => {
              const checked =
                repetition === null
                  ? false
                  : repetition & (1 << (6 - index))
                  ? true
                  : false;
              return (
                <>
                  {checked ? (
                    <RoutineDay key={index}>{value}</RoutineDay>
                  ) : null}
                </>
              );
            })}
          </RoutineDayDiv>
        </RoutineContent>
      </CardDiv>
      {open ? (
        <RoutineModal
          open={open}
          setOpen={setOpen}
          label={"오늘의 일과 수정"}
          routineId={routineId}
          title={title}
          repetition={repetition}
          modalType={1}
          routineList={routineList}
          setRoutineList={setRoutineList}
        />
      ) : (
        ""
      )}
    </>
  );
}
