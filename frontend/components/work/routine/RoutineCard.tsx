import styled from "styled-components";
import Icon from "../../common/Icon";

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
`;

const RoutineContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RoutineTitle = styled.div``;
const RoutineDay = styled.div``;

interface listProps {
  id: number;
  title: string;
  repetition: string[];
}

export default function RoutineCard(props: { list: listProps }) {
  return (
    <>
      <CardDiv>
        <Icon mode="fas" icon="circle" color="#8CBFF2" size="1rem" />
        <RoutineContent>
          <RoutineTitle>{props.list.title}</RoutineTitle>
          <RoutineDay>
            {props.list.repetition.map((item) => item + " ")}{" "}
          </RoutineDay>
          {/* <RoutineDay>{props.list.repetition} </RoutineDay> */}
        </RoutineContent>
      </CardDiv>
    </>
  );
}
