import Header from "../components/common/Header";
import Weekly from "../components/work/Weekly";
import Routine from "../components/work/routine/index";
import Todo from "../components/work/todolist/index";

import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 2rem;
`;

export default function Home() {
  return (
    <>
      <Header label="할 일" />
      <StyledDiv>
        <Weekly></Weekly>
        <Routine></Routine>
        <Todo viewOnly={false}></Todo>
      </StyledDiv>
    </>
  );
}
