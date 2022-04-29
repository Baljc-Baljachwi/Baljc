import React, { useState } from "react";
import styled from "styled-components";

import Icon from "../../common/Icon";
import ButtonTogglePaymentMethod from "./ButtonTogglePaymentMethod";
import ButtonTogglePeriodType from "./ButtonTogglePeriodType";
import ButtonDaySelect from "./ButtonDaySelect";
import ButtonBottom from "components/common/ButtonBottom";
import ButtonTrashCan from "components/common/ButtonTrashCan";
import { IAccountBook, PeriodType, PaymentMethodType } from "types";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 10rem;
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
  line-height: 2.8rem;
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1.6rem;
`;

interface CostFormProps {
  initCostForm?: IAccountBook;
}

function compareDate(
  startDate: string | null,
  endDate: string | null
): boolean {
  if (!startDate || !endDate) {
    return false;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start > end;
}

export default function CostForm({ initCostForm }: CostFormProps) {
  const [costForm, setCostForm] = useState<IAccountBook>(
    initCostForm || ({} as IAccountBook)
  );

  const [dateTime, setDateTime] = useState<{ date: string; time: string }>({
    date: "",
    time: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // 시작날짜보다 끝날짜가 빠른 경우 대처
    if (name === "startDate" && compareDate(value, costForm.endDate)) {
      setCostForm((prev) => ({
        ...prev,
        endDate: value,
        [name]: value,
      }));
    } else {
      setCostForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;

    const newData = target.checked ? { date: null } : { monthlyPeriod: null };

    setCostForm((prev) => ({
      ...prev,
      [name]: target.checked ? "Y" : "N",
      ...newData,
    }));
  }

  function handleTogglePaymentMethod(value: PaymentMethodType) {
    setCostForm((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  }

  function handleDateTimeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setDateTime((prev) => ({ ...prev, [name]: value }));
  }

  function onClickConfirmButton(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("Confirm!!");
    console.log(costForm);
    console.log(dateTime);
  }

  function onClickEditButton(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("Edit!!");
    console.log(costForm);
    console.log(dateTime);
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
            id="fixedExpenditureYn"
            name="fixedExpenditureYn"
            checked={costForm.fixedExpenditureYn === "Y" || false}
            onChange={handleCheckBoxChange}
          />
          <CheckLabel htmlFor="fixedExpenditureYn">
            {costForm.fixedExpenditureYn === "Y" ? (
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
          <CheckLabel htmlFor="fixedExpenditureYn">고정지출</CheckLabel>
        </CheckboxContainer>
      </div>

      {costForm.fixedExpenditureYn === "Y" ? (
        <>
          <div>
            <StyledLabel>날짜</StyledLabel>
            <InputContainer>
              <StyledInput
                type="month"
                name="startDate"
                value={costForm.startDate || ""}
                onChange={handleInputChange}
              />
              <InputUnit hasValue={!!costForm.startDate}>부터</InputUnit>
              <StyledInput
                type="month"
                name="endDate"
                value={costForm.endDate || ""}
                min={costForm.startDate || ""}
                onChange={handleInputChange}
              />
              <InputUnit hasValue={!!costForm.endDate}>까지</InputUnit>
            </InputContainer>
          </div>
          <div>
            <InputContainer>
              <InputUnit hasValue={!!costForm.monthlyPeriod}>매월</InputUnit>
              <StyledInput
                type="number"
                name="monthlyPeriod"
                max={28}
                value={Math.min(costForm.monthlyPeriod || 0, 28) || ""}
                onChange={handleInputChange}
              />
              <InputUnit hasValue={!!costForm.monthlyPeriod}>일마다</InputUnit>
            </InputContainer>
          </div>
        </>
      ) : (
        <>
          <div>
            <StyledLabel>날짜</StyledLabel>
            <InputContainer>
              <StyledInput
                type="date"
                name="date"
                value={dateTime.date}
                onChange={handleDateTimeInputChange}
              />
            </InputContainer>
          </div>
          <div>
            <StyledLabel>시각</StyledLabel>
            <InputContainer>
              <StyledInput
                type="time"
                name="time"
                value={dateTime.time}
                onChange={handleDateTimeInputChange}
              />
            </InputContainer>
          </div>
        </>
      )}

      <StyledLabel>카테고리</StyledLabel>

      <div>
        <StyledLabel>결제 수단</StyledLabel>
        <ButtonTogglePaymentMethod
          selectedPaymentMethod={costForm.paymentMethod || "C"}
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
      {!initCostForm ? (
        <ButtonBottom
          label="확인"
          onClick={onClickConfirmButton}
        ></ButtonBottom>
      ) : (
        <ButtonContainer>
          <ButtonTrashCan />
          <ButtonBottom label="수정" onClick={onClickEditButton} />
        </ButtonContainer>
      )}
    </FormContainer>
  );
}
