import React from "react";
import styled from "styled-components";

import { PaymentMethodType } from "types";

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

interface ButtonTogglePaymentMethodProps {
  selectedPaymentMethod: PaymentMethodType;
  handleToggleButton: (value: PaymentMethodType) => void;
}

export default function ButtonTogglePaymentMethod({
  selectedPaymentMethod,
  handleToggleButton,
}: ButtonTogglePaymentMethodProps) {
  function handleClickButton(event: any) {
    handleToggleButton(event.target.value);
  }
  return (
    <ButtonContainer>
      <StyledButton
        value="C"
        isSelected={selectedPaymentMethod === "C"}
        onClick={handleClickButton}
      >
        카드
      </StyledButton>
      <StyledButton
        value="M"
        isSelected={selectedPaymentMethod === "M"}
        onClick={handleClickButton}
      >
        현금
      </StyledButton>
      <StyledButton
        value="E"
        isSelected={selectedPaymentMethod === "E"}
        onClick={handleClickButton}
      >
        기타
      </StyledButton>
    </ButtonContainer>
  );
}
