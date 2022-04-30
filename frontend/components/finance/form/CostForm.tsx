import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import { getCategoies, postAccountBooks } from "api/accountBook";
import Icon from "../../common/Icon";
import ButtonTogglePaymentMethod from "./ButtonTogglePaymentMethod";
import ButtonBottom from "components/common/ButtonBottom";
import ButtonTrashCan from "components/common/ButtonTrashCan";
import { IAccountBook, PaymentMethodType } from "types";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 10rem;
`;

const InputContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  margin: 1.6rem 0 0 0;
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

const CategoryListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const CategoryButton = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.2rem;
  height: 7.4rem;
`;

const CategoryImage = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: ${(props) => (props.isSelected ? "4.8rem" : "4.4rem")};
  height: ${(props) => (props.isSelected ? "4.8rem" : "4.4rem")};
  box-sizing: content-box;
  border: ${(props) => (props.isSelected ? "0.4rem solid #2E437A" : "")};
  border-radius: 50%;
  + span {
    font-size: ${(props) => (props.isSelected ? "1.4rem" : "1.2rem")};
    font-weight: ${(props) => (props.isSelected ? "500" : "400")};
  }
`;

interface ICostForm extends IAccountBook {
  time: string | null;
}

interface CostFormProps {
  initCostForm?: ICostForm;
}

interface Category {
  categoryId: string;
  type: "E" | "I";
  name: string;
  imgUrl: string;
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
  const [costForm, setCostForm] = useState<ICostForm>(
    initCostForm ||
      ({
        accountBookId: "",
        type: "E",
        categoryId: "",
        title: "",
        price: 0,
        memo: null,
        paymentMethod: "C",
        fixedExpenditureYn: "N",
        fixedIncomeYn: "N",
        monthlyPeriod: null,
        startDate: null,
        endDate: null,
        date: null,
        time: null,
      } as ICostForm)
  );

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    getCategoies("E").then((res) => {
      console.log(res.data);
      if (res.data.code === 1300) {
        console.log(res.data.data);
        setCategoryList(res.data.data);
      }
    });
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // 시작날짜보다 끝날짜가 빠른 경우 대처
    if (name === "startDate" && compareDate(value, costForm.endDate)) {
      setCostForm((prev) => ({
        ...prev,
        endDate: value,
        [name]: value,
      }));
    } else if (name === "price") {
      setCostForm((prev) => ({
        ...prev,
        [name]: +value,
      }));
    } else if (name === "monthlyPeriod") {
      const newValue = Math.min(+value, 28);
      setCostForm((prev) => ({
        ...prev,
        [name]: newValue,
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
    const newData = target.checked
      ? { date: null, time: null }
      : { monthlyPeriod: null };

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

  function onClickConfirmButton() {
    console.log("Confirm!!");
    const params = {
      ...costForm,
    };
    delete params.accountBookId;

    postAccountBooks(params).then((res) => {
      console.log(res.data);
    });
    console.log(params);
  }

  function onClickEditButton() {
    console.log("Edit!!");
    console.log(costForm);
  }

  function onClickCategoryButton(categoryId: string) {
    console.log(categoryId);
    setCostForm((prev) => ({ ...prev, categoryId }));
  }

  return (
    <FormContainer>
      <div>
        <StyledLabel>제목</StyledLabel>
        <InputContainer>
          <StyledInput
            name="title"
            value={costForm.title}
            onChange={handleInputChange}
          />
        </InputContainer>
      </div>
      <div>
        <StyledLabel>금액</StyledLabel>
        <InputContainer>
          <StyledInput
            type="number"
            placeholder="0"
            name="price"
            value={costForm.price}
            onChange={handleInputChange}
          />
          <InputUnit hasValue={costForm.price > 0}>원</InputUnit>
        </InputContainer>

        <CheckboxContainer>
          <StyledCheckBox
            type="checkbox"
            id="fixedExpenditureYn"
            name="fixedExpenditureYn"
            checked={costForm.fixedExpenditureYn === "Y"}
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
                value={costForm.date || ""}
                onChange={handleInputChange}
              />
            </InputContainer>
          </div>
          <div>
            <StyledLabel>시각</StyledLabel>
            <InputContainer>
              <StyledInput
                type="time"
                name="time"
                value={costForm.time || ""}
                onChange={handleInputChange}
              />
            </InputContainer>
          </div>
        </>
      )}
      <div>
        <StyledLabel>카테고리</StyledLabel>
        <CategoryListContainer>
          {categoryList.map((category) => (
            <CategoryButton
              key={category.categoryId}
              onClick={() => onClickCategoryButton(category.categoryId)}
            >
              <CategoryImage
                isSelected={costForm.categoryId === category.categoryId}
              >
                <Image
                  src={category.imgUrl}
                  alt={category.name}
                  layout="fill"
                />
              </CategoryImage>
              <span>{category.name}</span>
            </CategoryButton>
          ))}
        </CategoryListContainer>
      </div>

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
