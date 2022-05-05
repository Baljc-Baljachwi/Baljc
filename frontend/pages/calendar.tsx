import { useEffect, useState } from "react";
import styled from "styled-components";
import Monthly from "../components/calendar/Monthly";

const Container = styled.div`
  padding-bottom: 7rem;
`;

export default function Calendar() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <Container>
      <Monthly />
    </Container>
  );
}

Calendar.requireAuth = true;
