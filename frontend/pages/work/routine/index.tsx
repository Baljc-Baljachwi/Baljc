import { useEffect, useState } from "react";
import RoutineDetail from "../../../components/work/routine/RoutineDetail";

export default function RoutineHome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <>
      <RoutineDetail></RoutineDetail>
    </>
  );
}
RoutineHome.requireAuth = true;
