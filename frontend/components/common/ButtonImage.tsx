import styled from "styled-components";

import Icon from "./Icon";

const StyledButton = styled.div`
  color: #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.2rem;
  font-size: 1.8rem;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0.4rem solid #cccccc;
  border-radius: 0.8rem;
  background-color: none;
  cursor: pointer;
  gap: 1rem;
  width: auto;
  .span {
  }
`;

interface ButtonImageProps {
  label?: string;
  onClick?: () => void;
}

export default function ButtonImage({ onClick, label }: ButtonImageProps) {
  return (
    <StyledButton onClick={onClick}>
      <Icon mode="fas" icon="plus" size="3rem" color="#cccccc"></Icon>
      <span>{label}</span>
    </StyledButton>
  );
}
