import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../../common/Icon";
import { getRoutines } from "../../../api/routine";
import { atom, useRecoilState } from "recoil";
import { IRoutine } from "../../../types/index";
import LocalStorage from "utils/localStorage";
import { useRouter } from "next/router";

const RoutineDiv = styled.div`
  background: #f4f4f4;
  border-radius: 1rem;
  width: 100%;
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  filter: drop-shadow(0 0.2rem 0.4rem rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const RoutineHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RoutineList = styled.div`
  margin-top: 1rem;
`;

const RoutineListItem = styled.li<{ isEmpty: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  gap: 1rem;
  font-size: 1.6rem;
`;

interface RoutineProps {
  dow: number;
}

export default function Routine({ dow }: RoutineProps) {
  const router = useRouter();

  const [routineList, setRoutineList] = useState<IRoutine[]>([]);

  const getRoutineList = () => {
    getRoutines(dow)
      .then((res) => {
        console.log(res.data.data);
        setRoutineList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRoutineList();
  }, [dow]);

  return (
    <>
      <RoutineDiv onClick={() => router.push("/work/routine")}>
        <RoutineHeader>
          <Icon mode="fas" icon="thumbtack" color="#EB3232" size="1.6rem" />
          <h1>오늘의 일과</h1>
        </RoutineHeader>
        <RoutineList>
          {routineList.length !== 0 ? (
            routineList.map((list) => (
              <RoutineListItem key={list.routineId} isEmpty={false}>
                <Icon mode="fas" icon="circle" color="#8CBFF2" size="1rem" />
                <p>{list.title}</p>
              </RoutineListItem>
            ))
          ) : (
            <RoutineListItem isEmpty={true}>
              <p>등록된 일과가 없습니다! </p>
              <p>추가하려면 클릭하세요.</p>
            </RoutineListItem>
          )}
        </RoutineList>
      </RoutineDiv>
    </>
  );
}
