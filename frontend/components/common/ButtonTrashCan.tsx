import styled from "styled-components";

import Icon from "./Icon";

const StyledButton = styled.button`
  color: #ffffff;
  padding: 0 1.5rem;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #0000002c;
  border-radius: 0.8rem;
  background-color: #ffffff;
  cursor: pointer;
`;

interface ButtonTrashCanProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function ButtonTrashCan({ type, onClick }: ButtonTrashCanProps) {
  return (
    <StyledButton type={type} onClick={onClick}>
      <Icon mode="far" icon="trash-can" size="2rem" color="#cdcdcd"></Icon>
    </StyledButton>
  );
}
