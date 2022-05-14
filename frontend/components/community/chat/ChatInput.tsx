import styled from "styled-components";

import Icon from "components/common/Icon";

const ChatInputDiv = styled.div`
  width: 100%;
  height: 5.6rem;
  position: fixed;
  max-width: 512px;
  bottom: 0;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 -1px 1px #00000014;
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 999999;
`;

const InputDiv = styled.input`
  width: 100%;
  height: 90%;
  max-width: 512px;
  background: #e4e4e4;
  border: none;
  border-radius: 1.5rem;
  outline: none;
  padding: 1.6rem;
  font-size: 1.6rem;
  color: #3d3d3d;
  font-family: "Noto Sans KR";
  ::placeholder {
    color: #cccccc;
  }
`;

export default function ChatInput() {
  return (
    <ChatInputDiv>
      <Icon icon="image" mode="fas" color="#cccccc" size="2.5rem" />
      <InputDiv placeholder="내용을 입력해주세요." />
      <Icon icon="paper-plane" mode="fas" color="#cccccc" size="2.5rem" />
    </ChatInputDiv>
  );
}
