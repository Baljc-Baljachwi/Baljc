import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  width: 23.5rem;
  gap: 1rem;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#2e437a" : "#ffffff")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "#cccccc")};
  border: 1px solid;
  border-color: ${(props) => (props.isSelected ? "#2e437a" : "#cccccc")};
  width: 100%;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  font-family: "Noto Sans KR", sans-serif;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;
type TypeSalary = "M" | "H" | "N";

interface ButtonToggleSalaryTypeProps {
  selectedSalaryType: string;
  handleToggleButton: (value: TypeSalary) => void;
}

export default function ButtonToggleSalaryType({
  selectedSalaryType,
  handleToggleButton,
}: ButtonToggleSalaryTypeProps) {
  function handleClickButton(event: any) {
    handleToggleButton(event.target.value);
  }
  return (
    <ButtonContainer>
      <StyledButton
        value="M"
        isSelected={selectedSalaryType === "M"}
        onClick={handleClickButton}
      >
        월급
      </StyledButton>
      <StyledButton
        value="H"
        isSelected={selectedSalaryType === "H"}
        onClick={handleClickButton}
      >
        시급
      </StyledButton>
      <StyledButton
        value="N"
        isSelected={selectedSalaryType === "N"}
        onClick={handleClickButton}
      >
        없음
      </StyledButton>
    </ButtonContainer>
  );
}
