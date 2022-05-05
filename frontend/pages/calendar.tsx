import { useEffect, useState } from "react";
import styled from "styled-components";
import Monthly from "../components/calendar/Monthly";

export default function Calendar() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <>
      <Monthly />
    </>
  );
}

Calendar.requireAuth = true;
