import styled from "styled-components";
import { useState } from "react";

import ConfirmModal from "./ConfirmModal";

const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100000;
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
  z-index: 100000;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
  bottom: -75%;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
  bb?: string;
  color?: string;
}>`
  display: block;
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
  border-bottom: ${(props) => (props.bb ? props.bb : "")};
  color: ${(props) => (props.color ? props.color : "")};
`;

interface EditProps {
  commentId: string;
  open: boolean;
  setOpen: any;
}

export default function EditModal({ commentId, open, setOpen }: EditProps) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onClickConfirm = () => {
    setOpenConfirm((prev) => !prev);
  };

  return (
    <>
      {open ? (
        <>
          <ModalOverlay visible={open} />
          <ModalWrapper visible={open} tabIndex={-1} onClick={onMaskClick}>
            <ModalInner tabIndex={0} className="modal-inner">
              <Typography
                fs="1.8rem"
                p="1.2rem"
                color="red"
                onClick={onClickConfirm}
              >
                삭제하기
              </Typography>
            </ModalInner>
            <ModalInner tabIndex={0} className="modal-inner">
              <Typography fs="1.8rem" p="1.2rem">
                취소하기
              </Typography>
            </ModalInner>
          </ModalWrapper>
          {/* 모달 */}
          <ConfirmModal
            commentId={commentId}
            open={open}
            setOpen={setOpen}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}
