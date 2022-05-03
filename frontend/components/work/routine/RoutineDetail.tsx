import Header from "../../../components/common/Header";
import RoutineCard from "./RoutineCard";
import RoutineModal from "./RoutineModal";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRoutines } from "../../../api/routine";
import { IRoutine } from "../../../types/index";

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

export default function RoutineDetail() {
  const router = useRouter();
  // query로 보내면 문자열이 되네요..?
  const dow = Number(router.query.dow);

  const [open, setOpen] = useState(false);
  const [routineList, setRoutineList] = useState<IRoutine[]>([]);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const getRoutineList = () => {
    getRoutines(dow)
      .then((res) => {
        setRoutineList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRoutineList();
  }, []);

  return (
    <>
      <Header
        label="오늘의 일과"
        icon="plus"
        onClickRightButton={() => onClick()}
      />
      <RoutineDiv>
        {routineList.length != 0 ? (
          routineList.map((list, index) => (
            <RoutineCard key={index} list={list}></RoutineCard>
          ))
        ) : (
          <CardDiv onClick={onClick}>일과를 등록해보세요 !</CardDiv>
        )}
      </RoutineDiv>
      {open ? (
        <RoutineModal
          open={open}
          setOpen={setOpen}
          label={"오늘의 일과 추가"}
          modalType={0}
        />
      ) : (
        ""
      )}
    </>
  );
}
