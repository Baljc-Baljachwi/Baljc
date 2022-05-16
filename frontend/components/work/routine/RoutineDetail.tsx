import Header from "../../../components/common/Header";
import RoutineCard from "./RoutineCard";
import RoutineModal from "./RoutineModal";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRoutines, getAllRoutines } from "../../../api/routine";
import { IRoutine } from "../../../types/index";
import { useRecoilState } from "recoil";
import { routineState } from "../../../atoms/atoms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const StyledToastContainer = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  .Toastify__toast {
    background-color: rgba(75, 192, 192, 0.4);
    font-size: 1.4rem;
    font-weight: 600;
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  }
  .Toastify__toast-container {
    /* width: 320px; */
    width: 20rem;
  }
  .Toastify__toast--default {
    background: #fff;
    color: #aaa;
  }
  .Toastify__toast--info {
    background: #3498db;
  }
  .Toastify__toast--success {
    /* background: #07bc0c; */
    background: rgba(75, 192, 192, 0.4);
  }
  .Toastify__toast--warning {
    /* background: #f1c40f; */
    background: #ffd469;
    color: #aaa;
  }
  .Toastify__toast--error {
    background: #e74c3c;
  }
`;

interface ToastProp {
  toastMsg: string;
}
export default function RoutineDetail() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [routineList, setRoutineList] =
    useRecoilState<IRoutine[]>(routineState);

  const [toastMsg, setToastMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
    if (toastMsg.length > 0) {
      if (isSuccess) {
        toast.success(toastMsg, {
          theme: "colored",
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: false,
          autoClose: 2000,
        });
      } else {
        toast.error(toastMsg, {
          theme: "colored",
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: false,
          autoClose: 2000,
        });
      }
      setToastMsg("");
      setIsSuccess(false);
    }
  }, [toastMsg]);

  useEffect(() => {
    getRoutineList();
  }, []);

  return (
    <>
      <Header
        label="오늘의 일과"
        icon="plus"
        onClickRightButton={() => onClick()}
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
                setToastMsg={setToastMsg}
                // setIsSuccess={setIsSuccess}
              ></RoutineCard>
            );
          })
        ) : (
          <CardDiv onClick={onClick}>일과를 등록해보세요 !</CardDiv>
        )}
        <StyledToastContainer
          pauseOnFocusLoss={false}
          style={{ bottom: "10rem" }}
        />
      </RoutineDiv>
      {open ? (
        <RoutineModal
          open={open}
          setOpen={setOpen}
          label={"오늘의 일과 추가"}
          modalType={0}
          routineList={routineList}
          setRoutineList={setRoutineList}
          setToastMsg={setToastMsg}
          setIsSuccess={setIsSuccess}
        />
      ) : (
        ""
      )}
    </>
  );
}
