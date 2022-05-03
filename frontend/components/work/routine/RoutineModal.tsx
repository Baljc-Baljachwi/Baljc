import { useEffect, useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import ButtonTrashCan from "../../common/ButtonTrashCan";
import ButtonBottom from "../../common/ButtonBottom";
import RoutineDaySelect from "./RoutineDaySelect";
import { IRoutine } from "../../../types/index";
import { putRoutines } from "../../../api/routine";

const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.p`
  font-weight: 700;
  font-size: 2rem;
`;

const ModalCloseBtn = styled.button`
  border: none;
  background-color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.4s ease;
`;

const ModalLable = styled.p`
  font-weight: 500;
  font-size: 2rem;
  margin: 1rem 0;
`;

const ModalInput = styled.input`
  width: 100%;
  font-family: "Noto Sans KR";
  font-size: 1.6rem;
  color: #3d3d3d;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  margin-bottom: 1rem;
  ::placeholder {
    color: #cccccc;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
`;

interface ModalProps {
  open: boolean;
  setOpen: any;
  modalType: number;
  list?: IRoutine;
  label?: string;
}

interface RoutineInputForm {
  title: string;
  repetition: number;
}

export default function RoutineModal({
  open,
  setOpen,
  modalType,
  label,
  list,
}: ModalProps) {
  // 나중에 API 형식으로 받아오기
  const [routineForm, setRoutineForm] = useState<RoutineInputForm>({
    title: list?.title || "",
    repetition: list?.repetition || 0,
  });

  const onClose = () => {
    setOpen(false);
  };

  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function handleWeeklyDayUpdate(value: number) {
    let newValue = 0;
    if (!routineForm.repetition) {
      newValue = 1 << value;
    } else if (routineForm.repetition & (1 << value)) {
      // 이미 선택된 경우
      newValue = routineForm.repetition - (1 << value);
    } else {
      // 새로 선택한 경우
      newValue = routineForm.repetition + (1 << value);
    }
    setRoutineForm((prev) => ({
      ...prev,
      repetition: newValue,
    }));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRoutineForm((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }

  const addRoutine = () => {
    console.log(routineForm);
    putRoutines(routineForm)
      .then((res) => {
        console.log(res.data);
        alert("일과 등록 완료");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert("일과 등록 실패");
      });
  };

  const editRoutine = () => {
    const routinId = list?.routineId || "";
    putRoutines(routinId, routineForm)
      .then((res) => {
        console.log(res.data);
        alert("일과 수정 완료");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert("일과 수정 실패");
      });
  };

  useEffect(() => {
    // if (list) {
    //   setRoutineForm((prev) => ({
    //     ...prev,
    //     title: list.title,
    //     repetition: list.repetition,
    //   }));
    // } else {
    //   setRoutineForm((prev) => ({
    //     ...prev,
    //     title: "",
    //     repetition: 0,
    //   }));
    // }
  }, []);

  return (
    <>
      {open ? (
        <>
          <ModalOverlay visible={open} />
          <ModalWrapper visible={open} tabIndex={-1} onClick={onMaskClick}>
            <ModalInner tabIndex={0} className="modal-inner">
              <ModalHeader>
                <ModalTitle>{label}</ModalTitle>
                <ModalCloseBtn onClick={onClose}>
                  <Icon mode="fas" icon="xmark" color="#3d3d3d" size="2rem" />
                </ModalCloseBtn>
              </ModalHeader>
              <ModalLable>제목</ModalLable>
              <ModalInput
                type="text"
                value={routineForm.title}
                onChange={onChange}
                placeholder="일과를 입력해주세요."
              />
              <ModalLable>반복</ModalLable>
              <RoutineDaySelect
                selectedDays={routineForm.repetition}
                handleWeeklyDayUpdate={handleWeeklyDayUpdate}
              ></RoutineDaySelect>
              <ModalFooter>
                {modalType === 0 ? (
                  <>
                    <ButtonBottom label="추가" onClick={() => addRoutine()} />
                  </>
                ) : (
                  <>
                    <ButtonTrashCan />
                    <ButtonBottom label="수정" onClick={() => editRoutine()} />
                  </>
                )}
              </ModalFooter>
            </ModalInner>
          </ModalWrapper>
        </>
      ) : (
        ""
      )}
    </>
  );
}
