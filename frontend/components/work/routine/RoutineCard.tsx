import { Fragment } from "react";
import { useState } from "react";
import styled from "styled-components";
import Icon from "../../common/Icon";
import RoutineModal from "./RoutineModal";

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
interface listProps {
  id: number;
  title: string;
  repetition: number | null;
}

export default function RoutineCard(props: { list: listProps }) {
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
          <RoutineTitle>{props.list.title}</RoutineTitle>
          <RoutineDayDiv>
            {dayList.map((value, index) => {
              const checked =
                props.list.repetition === null
                  ? false
                  : props.list.repetition & (1 << (6 - index))
                  ? true
                  : false;
              console.log(checked);
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
          list={props.list}
        />
      ) : (
        ""
      )}
    </>
  );
}
