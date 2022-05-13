import { useEffect, useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import ButtonTrashCan from "../../common/ButtonTrashCan";
import ButtonBottom from "../../common/ButtonBottom";
import RoutineDaySelect from "./RoutineDaySelect";
import { IRoutine } from "../../../types/index";
import { putRoutines } from "../../../api/routine";
import { deleteRoutines, postRoutines } from "../../../api/routine";
import { SetterOrUpdater } from "recoil";

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

const ModalInput = styled.input<{ titleValidation: boolean }>`
  width: 100%;
  font-family: "Noto Sans KR";
  font-size: 1.6rem;
  color: #3d3d3d;
  border: none;
  border-bottom: ${(props) =>
    props.titleValidation ? "1px solid #ff0000" : "1px solid #cccccc"};
  outline: none;
  // margin-bottom: 1rem;
  ::placeholder {
    color: #cccccc;
  }
`;

const TitleErrorMessage = styled.p<{ titleValidation: boolean }>`
  visibility: ${(props) => (props.titleValidation ? "visible" : "hidden")};
  color: #ff0000;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: right;
`;

const RepetitionErrorMessage = styled.p<{ repetitionValidation: boolean }>`
  visibility: ${(props) => (props.repetitionValidation ? "visible" : "hidden")};
  border-top: ${(props) =>
    props.repetitionValidation ? "1px solid #ff0000" : ""};
  color: #ff0000;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: right;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
`;

interface ModalProps {
  open: boolean;
  setOpen: any;
  modalType: number;
  routineList: IRoutine[];
  setRoutineList: SetterOrUpdater<IRoutine[]>;
  routineId?: string;
  title?: string;
  repetition?: number;
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
  routineList,
  setRoutineList,
  routineId,
  title,
  repetition,
}: ModalProps) {
  // 나중에 API 형식으로 받아오기
  const [routineForm, setRoutineForm] = useState<RoutineInputForm>({
    title: title || "",
    repetition: repetition || 0,
  });

  const [titleValidation, setTitleValidation] = useState(false);
  const [repetitionValidation, setRepetitionValidation] = useState(false);

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

    if (newValue === 0) {
      setRepetitionValidation(true);
    } else {
      setRepetitionValidation(false);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      setTitleValidation(true);
    } else {
      setTitleValidation(false);
    }

    setRoutineForm((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }

  const addRoutine = () => {
    if (routineForm.title.length > 0 && routineForm.repetition !== 0) {
      postRoutines(routineForm)
        .then((res) => {
          // console.log(res.data);
          setRoutineList([...routineList, res.data.data]);
          alert("일과 등록 완료");
          setOpen(false);
        })
        .catch((err) => {
          // console.log(err);
          alert("일과 등록 실패");
        });
    } else {
      if (routineForm.title.length === 0) {
        setTitleValidation(true);
      }
      if (routineForm.repetition === 0) {
        setRepetitionValidation(true);
      }
    }
  };

  const editRoutine = () => {
    const routinId = routineId || "";
    if (routineForm.title.length > 0 && routineForm.repetition !== 0) {
      putRoutines(routinId, routineForm)
        .then((res) => {
          // console.log(res.data);
          setRoutineList(
            routineList.map((routine: IRoutine) => {
              return routine.routineId === routineId
                ? {
                    ...routine,
                    routineId: routineId,
                    title: routineForm.title,
                    repetition: routineForm.repetition,
                  }
                : routine;
            })
          );
          setOpen(false);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      if (routineForm.title.length === 0) {
        setTitleValidation(true);
      }
      if (routineForm.repetition === 0) {
        setRepetitionValidation(true);
      }
    }
  };

  const deleteRoutine = () => {
    const routinId = routineId || "";
    deleteRoutines(routinId)
      .then((res) => {
        // console.log(res.data);
        setRoutineList(
          routineList.filter(
            (routine: IRoutine) => routine.routineId !== routineId
          )
        );
        alert("일과 삭제 완료");
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err);
        alert("일과 삭제 실패");
      });
  };

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
                titleValidation={titleValidation}
              />
              <TitleErrorMessage titleValidation={titleValidation}>
                1자 이상 입력해주세요.
              </TitleErrorMessage>
              <ModalLable>반복</ModalLable>
              <RoutineDaySelect
                selectedDays={routineForm.repetition}
                handleWeeklyDayUpdate={handleWeeklyDayUpdate}
              ></RoutineDaySelect>
              <RepetitionErrorMessage
                repetitionValidation={repetitionValidation}
              >
                반복 요일을 선택해주세요.
              </RepetitionErrorMessage>
              <ModalFooter>
                {modalType === 0 ? (
                  <>
                    <ButtonBottom label="추가" onClick={() => addRoutine()} />
                  </>
                ) : (
                  <>
                    <ButtonTrashCan onClick={() => deleteRoutine()} />
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
