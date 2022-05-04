import styled from "styled-components";
import Monthly from "../components/calendar/Monthly";

const Container = styled.div`
  padding-bottom: 7rem;
`;

export default function Calendar() {
  return (
    <Container>
      <Monthly />
    </Container>
  );
}

Calendar.requireAuth = true;
