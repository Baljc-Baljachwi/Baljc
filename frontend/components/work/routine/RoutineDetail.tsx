import Header from "../../../components/common/Header";
import RoutineCard from "./RoutineCard";
import RoutineModal from "./RoutineModal";
import FloatingButton from "components/common/FloatingButton";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRoutines, getAllRoutines } from "../../../api/routine";
import { IRoutine } from "../../../types/index";
import { useRecoilState } from "recoil";
import { routineState } from "../../../atoms/atoms";

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
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
`;

export default function RoutineDetail() {
  const router = useRouter();
  const dow = Number(router.query.dow);

  const [open, setOpen] = useState(false);
  // const [open, setOpen];
  const [routineList, setRoutineList] =
    useRecoilState<IRoutine[]>(routineState);

  const onClick = () => {
    // console.log(open);
    setOpen((prev) => !prev);
  };

  const getRoutineList = () => {
    getAllRoutines()
      .then((res) => {
        // console.log(res.data.data);
        setRoutineList(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getRoutineList();
  }, []);

  return (
    <>
      <Header
        label="오늘의 일과"
        onClickBackButton={() => router.push("/work")}
      />
      <RoutineDiv>
        {routineList.length != 0 ? (
          routineList.map((routine, index) => {
            const { routineId, title, repetition } = routine;
            return (
              <RoutineCard
                key={index}
                routineId={routineId}
                title={title}
                repetition={repetition}
                routineList={routineList}
                setRoutineList={setRoutineList}
              ></RoutineCard>
            );
          })
        ) : (
          <CardDiv onClick={onClick}>일과를 등록해보세요 !</CardDiv>
        )}
      </RoutineDiv>
      <FloatingButton onClick={onClick} />
      {open ? (
        <RoutineModal
          open={open}
          setOpen={setOpen}
          label={"오늘의 일과 추가"}
          modalType={0}
          routineList={routineList}
          setRoutineList={setRoutineList}
        />
      ) : (
        ""
      )}
    </>
  );
}
