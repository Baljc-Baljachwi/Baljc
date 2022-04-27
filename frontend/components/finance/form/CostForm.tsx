import React, { useState, memo } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import ButtonTogglePaymentMethod from "./ButtonTogglePaymentMethod";
import ButtonTogglePeriodType from "./ButtonTogglePeriodType";
import ButtonDaySelect from "./ButtonDaySelect";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const InputContainer = styled.div<{ isPrice?: boolean }>`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  margin: ${(props) => (props.isPrice ? "1.6rem 0 0 0" : "1.6rem 0 0 0")};
  color: #cccccc;
  :focus-within {
    border-bottom: 1px solid #3d3d3d;
    span {
      color: #3d3d3d;
    }
  }
  font-size: 2rem;
  display: flex;
  gap: 1rem;
`;

// 입력 Input 뒤에 단위 나타내는 텍스트
const InputUnit = styled.span<{ hasValue: boolean }>`
  line-height: 2rem;
  word-break: keep-all;
  color: ${(props) => (props.hasValue ? "#3d3d3d" : "#cccccc")};
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 2rem;
  text-align: end;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #3d3d3d;
  font-family: "Noto Sans KR", sans-serif;
  ::placeholder {
    color: #cccccc;
  }
`;

const StyledLabel = styled.label`
  font-size: 2rem;
  color: #3d3d3d;
  /* font-weight: 500; */
  display: inline-block;
  margin-top: 1.6rem;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
  position: absolute;
  right: 2rem;
  display: flex;
  justify-content: end;
  padding-top: 1rem;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const StyledCheckBox = styled.input`
  display: none;
`;

const CheckLabel = styled.label`
  font-size: 1.6rem;
  cursor: pointer;
  line-height: 1.6rem;
`;

interface ICostForm {
  title: string; // 1 ~ 18자
  price: number;
  memo: string; // 100자 이하
  paymentMethod: "M" | "C" | "E" | "N"; // M: 현금, C: 카드, E: 기타, N: null
  fixed: boolean;

  // fixed true
  periodType: "M" | "W" | "D" | "N"; // M: 매월, W: 매주, D: 매일, N: null
  monthlyPeriod: number | null; // 1 ~ 31 사이.
  weeklyPeriod: number | null; // 비트마스킹 이용, 일 목 => (1000100) = 68.

  // fixed false
  date: string | null;
  time: string | null;
}

export default function CostForm() {
  const [costForm, setCostForm] = useState<ICostForm>({
    paymentMethod: "C",
  } as ICostForm);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (target.type !== "checkbox") {
      setCostForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (target.checked) {
      // 고정 지출 체크 시 불필요 데이터 null 처리
      setCostForm((prev) => ({
        ...prev,
        [name]: target.checked,
        periodType: "M",
        date: null,
      }));
    } else {
      // 고정 지출 체크 해제 시 불필요 데이터 null 처리
      setCostForm((prev) => ({
        ...prev,
        [name]: target.checked,
        periodType: "N",
        monthlyPeriod: null,
        weeklyPeriod: null,
      }));
    }
  }

  function handleTogglePaymentMethod(value: "M" | "C" | "E" | "N") {
    setCostForm((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  }

  function handleTogglePeriodType(value: "M" | "W" | "D" | "N") {
    // 바뀔 때마다 필요없는 데이터 null로
    switch (value) {
      case "M":
        setCostForm((prev) => ({
          ...prev,
          periodType: value,
          weeklyPeriod: null,
          date: null,
        }));
        break;
      case "W":
        setCostForm((prev) => ({
          ...prev,
          periodType: value,
          monthlyPeriod: null,
          date: null,
        }));
        break;
      case "D":
        setCostForm((prev) => ({
          ...prev,
          periodType: value,
          monthlyPeriod: null,
          weeklyPeriod: null,
          date: null,
        }));
        break;
      case "N":
        setCostForm((prev) => ({
          ...prev,
          periodType: value,
          monthlyPeriod: null,
          weeklyPeriod: null,
        }));
        break;
    }
  }

  function handleWeeklyDayUpdate(value: number) {
    let newValue = 0;
    if (!costForm.weeklyPeriod) {
      newValue = 1 << value;
    } else if (costForm.weeklyPeriod & (1 << value)) {
      // 이미 선택된 경우
      newValue = costForm.weeklyPeriod - (1 << value);
    } else {
      // 새로 선택한 경우
      newValue = costForm.weeklyPeriod + (1 << value);
    }
    setCostForm((prev) => ({
      ...prev,
      weeklyPeriod: newValue,
    }));
  }

  return (
    <FormContainer>
      <div>
        <StyledLabel>제목</StyledLabel>
        <InputContainer>
          <StyledInput
            name="title"
            value={costForm.title || ""}
            onChange={handleInputChange}
          />
        </InputContainer>
      </div>
      <div>
        <StyledLabel>금액</StyledLabel>
        <InputContainer isPrice={true}>
          <StyledInput
            type="number"
            placeholder="0"
            name="price"
            value={costForm.price || ""}
            onChange={handleInputChange}
          />
          <InputUnit hasValue={costForm.price > 0}>원</InputUnit>
        </InputContainer>

        <CheckboxContainer>
          <StyledCheckBox
            type="checkbox"
            id="fixed"
            name="fixed"
            checked={costForm.fixed || false}
            onChange={handleInputChange}
          />
          <CheckLabel htmlFor="fixed">
            {costForm.fixed ? (
              <Icon
                mode="fas"
                icon="square-check"
                color="#ffd469"
                size="1.6rem"
              />
            ) : (
              <Icon mode="far" icon="square" color="#ffd469" size="1.6rem" />
            )}
          </CheckLabel>
          <CheckLabel htmlFor="fixed">고정지출</CheckLabel>
        </CheckboxContainer>
      </div>

      <div>
        <StyledLabel>날짜</StyledLabel>
        {costForm.periodType === "M" ? (
          <>
            <ButtonTogglePeriodType
              selectedPeriodType={costForm.periodType || "M"}
              handleToggleButton={handleTogglePeriodType}
            />
            <InputContainer>
              <StyledInput
                type="number"
                name="monthlyPeriod"
                value={costForm.monthlyPeriod || 0}
                onChange={handleInputChange}
              />
              <InputUnit hasValue={!!costForm.monthlyPeriod}>일마다</InputUnit>
            </InputContainer>
          </>
        ) : costForm.periodType === "W" ? (
          <>
            <ButtonTogglePeriodType
              selectedPeriodType={costForm.periodType}
              handleToggleButton={handleTogglePeriodType}
            />
            <ButtonDaySelect
              selectedDays={costForm.weeklyPeriod}
              handleWeeklyDayUpdate={handleWeeklyDayUpdate}
            />
          </>
        ) : costForm.periodType === "D" ? (
          <ButtonTogglePeriodType
            selectedPeriodType={costForm.periodType}
            handleToggleButton={handleTogglePeriodType}
          />
        ) : (
          <>
            <InputContainer>
              <StyledInput type="date" />
            </InputContainer>
            <StyledLabel>시각</StyledLabel>
            <InputContainer>
              <StyledInput type="time" />
            </InputContainer>
          </>
        )}
      </div>

      <StyledLabel>카테고리</StyledLabel>

      <div>
        <StyledLabel>결제 수단</StyledLabel>
        <ButtonTogglePaymentMethod
          selectedPaymentMethod={costForm.paymentMethod}
          handleToggleButton={handleTogglePaymentMethod}
        />
      </div>

      <div>
        <StyledLabel>메모</StyledLabel>
        <InputContainer>
          <StyledInput
            type="text"
            name="memo"
            placeholder="메모 남기기"
            value={costForm.memo || ""}
            onChange={handleInputChange}
          />
        </InputContainer>
      </div>
    </FormContainer>
  );
}
