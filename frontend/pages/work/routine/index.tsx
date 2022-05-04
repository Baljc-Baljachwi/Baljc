import RoutineDetail from "../../../components/work/routine/RoutineDetail";

export default function RoutineHome() {
  return (
    <>
      <RoutineDetail></RoutineDetail>
    </>
  );
}
RoutineHome.requireAuth = true;
