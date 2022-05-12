import styled from "styled-components";

const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "flex" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100000;
  overflow: auto;
  outline: 0;
  justify-content: center;
  align-items: flex-end;
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

const ModalBody = styled.div`
  width: 90%;
  margin-bottom: 4rem;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span:last-child {
    border: none;
  }
`;

const Label = styled.span<{ labelColor?: string }>`
  font-size: 1.8rem;
  padding: 1.2rem;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #b3b3b3;
  color: ${(props) => props.labelColor || "3d3d3d"};
`;

const ModalTitle = styled.div`
  font-size: 2rem;
  padding: 1.2rem 0;
`;

interface IModalInner {
  label: string; // 버튼 글자
  labelColor?: string; // 버튼 글자색
  onClick?: () => void; // 클릭 이벤트
}

interface EditProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  modalTitle?: string;
  modalChildren: IModalInner[];
}

export default function ButtonModal({
  open,
  setOpen,
  modalTitle,
  modalChildren,
}: EditProps) {
  const onClose = () => {
    setOpen(false);
  };

  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {open && (
        <>
          <ModalOverlay visible={open} />
          <ModalWrapper visible={open} tabIndex={-1} onClick={onMaskClick}>
            <ModalBody>
              {modalTitle && (
                <ModalInner>
                  <ModalTitle>{modalTitle}</ModalTitle>
                </ModalInner>
              )}

              <ModalInner tabIndex={0}>
                {modalChildren.map((child, index) => (
                  <Label
                    labelColor={child.labelColor}
                    key={index}
                    onClick={() => {
                      if (child.onClick) {
                        child.onClick();
                      }
                      onClose();
                    }}
                  >
                    {child.label}
                  </Label>
                ))}
              </ModalInner>
            </ModalBody>
          </ModalWrapper>
        </>
      )}
    </>
  );
}
