import { useEffect, useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import ButtonTrashCan from "../../common/ButtonTrashCan";
import ButtonBottom from "../../common/ButtonBottom";

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
  list: {
    id?: number;
    title?: string;
    repetition?: string[];
  };
  label?: string;
}

export default function RoutineModal({
  open,
  setOpen,
  label,
  list,
}: ModalProps) {
  const onClose = () => {
    setOpen(false);
  };

  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const dayList = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      {open ? (
        <>
          <ModalOverlay visible={open} />
          <ModalWrapper
            visible={open}
            tabIndex={-1}
            onClick={open ? onMaskClick : null}
          >
            <ModalInner tabIndex={0} className="modal-inner">
              <ModalHeader>
                <ModalTitle>{label}</ModalTitle>
                <ModalCloseBtn onClick={onClose}>
                  <Icon mode="fas" icon="xmark" color="#3d3d3d" size="2rem" />
                </ModalCloseBtn>
              </ModalHeader>
              <ModalLable>제목</ModalLable>
              <ModalInput type="text" value={list.title} />
              <ModalLable>반복</ModalLable>
              <ModalFooter>
                <ButtonTrashCan />
                <ButtonBottom label="추가" />
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
