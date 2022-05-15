import styled from "styled-components";
import { useRouter } from "next/router";

import { IRoutine } from "types";
import Icon from "../../common/Icon";

const Container = styled.div`
  background-color: #4d5f8f;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
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

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
  color?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "")};
  color: ${(props) => (props.color ? props.color : "")};
`;

export default function RoutineBoard({ routines }: any) {
  const router = useRouter();
  return (
    <Container>
      <Title>일과</Title>
      <RoutineList>
        <ul>
          {routines ? (
            routines.length !== 0 ? (
              routines.map((routine: IRoutine) => (
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
              ))
            ) : (
              <RoutineListItem
                onClick={() => router.push({ pathname: "/work/routine" })}
                style={{ padding: "1rem 0", flexWrap: "wrap" }}
              >
                <Typography fs="1.6rem">등록된 일과가 없습니다! </Typography>
                <Typography fs="1.6rem">추가하려면 클릭하세요.</Typography>
              </RoutineListItem>
            )
          ) : null}
        </ul>
      </RoutineList>
    </Container>
  );
}
