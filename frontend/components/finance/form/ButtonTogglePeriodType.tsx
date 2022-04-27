import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  width: 23.5rem;
  gap: 1rem;
  padding: 2rem 0;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#ffd469" : "#f5f6fa")};
  color: ${(props) => (props.isSelected ? "#3d3d3d" : "#797979")};
  width: 100%;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;
type PeriodType = "M" | "W" | "D" | null;

interface ButtonTogglePeriodTypeProps {
  selectedPeriodType: PeriodType;
  handleToggleButton: (value: PeriodType) => void;
}

export default function ButtonTogglePeriodType({
  selectedPeriodType,
  handleToggleButton,
}: ButtonTogglePeriodTypeProps) {
  function handleClickButton(event: any) {
    handleToggleButton(event.target.value);
  }
  return (
    <ButtonContainer>
      <StyledButton
        value="M"
        isSelected={selectedPeriodType === "M"}
        onClick={handleClickButton}
      >
        매월
      </StyledButton>
      <StyledButton
        value="W"
        isSelected={selectedPeriodType === "W"}
        onClick={handleClickButton}
      >
        매주
      </StyledButton>
      <StyledButton
        value="D"
        isSelected={selectedPeriodType === "D"}
        onClick={handleClickButton}
      >
        매일
      </StyledButton>
    </ButtonContainer>
  );
}
