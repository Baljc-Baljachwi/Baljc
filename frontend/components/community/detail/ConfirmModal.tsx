import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { deleteComment } from "api/community";

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

interface ConfirmProps {
  commentList: any;
  setCommentList: any;
  commentId: string;
  open: boolean;
  setOpen: any;
  openConfirm: boolean;
  setOpenConfirm: any;
}

export default function ConfirmModal({
  commentList,
  setCommentList,
  commentId,
  open,
  setOpen,
  openConfirm,
  setOpenConfirm,
}: ConfirmProps) {
  const router = useRouter();

  const onClose = () => {
    setOpenConfirm(false);
    setOpen(false);
  };

  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = (e: any) => {
    const boardId = router.query.boardId;
    deleteComment(boardId as string, commentId as string)
      .then((res) => {
        // console.log(res);
        if (res.data.code === 1707) {
          setCommentList(
            commentList.filter(
              (comment: any) => comment.commentId !== commentId
            )
          );
          onClose();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {openConfirm ? (
        <>
          <ModalWrapper
            visible={openConfirm}
            tabIndex={-1}
            onClick={onMaskClick}
          >
            <ModalInner tabIndex={0} className="modal-inner">
              <Typography fs="1.8rem" p="1.2rem">
                정말 삭제하시겠습니까?
              </Typography>
            </ModalInner>
            <ModalInner tabIndex={0} className="modal-inner">
              <Typography
                fs="1.8rem"
                p="1.2rem"
                bb="1px solid #B3B2B3"
                style={{ width: "100%", textAlign: "center" }}
                onClick={handleDelete}
              >
                예
              </Typography>
              <Typography fs="1.8rem" p="1.2rem" onClick={onClose}>
                아니오
              </Typography>
            </ModalInner>
          </ModalWrapper>
        </>
      ) : (
        ""
      )}
    </>
  );
}
