import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useForm } from "react-hook-form";

import {
  getCategories,
  postAccountbooks,
  putAccountbooks,
  deleteAccountbooks,
} from "api/accountbook";
import Icon from "../../common/Icon";
import ButtonBottom from "components/common/ButtonBottom";
import ButtonTrashCan from "components/common/ButtonTrashCan";
import { IAccountbook } from "types";
import { useRouter } from "next/router";
import ButtonModal from "components/common/ButtonModal";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 5rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 2rem;
`;

const InputDiv = styled.div<{ isError?: boolean }>`
  width: 100%;
  border-bottom: ${(props) =>
    props.isError ? "1px solid #ff0000" : "1px solid #cccccc"};
  margin: ${(props) => (props.isError ? "1.6rem 0 0 0" : "1.6rem 0 1.6rem 0")}
    span {
    color: ${(props) => (props.isError ? "#ff0000" : "#cccccc")};
  }
  :focus-within {
    border-bottom: ${(props) =>
      props.isError ? "1px solid #ff0000" : "1px solid #3d3d3d"};
    span {
      color: ${(props) => (props.isError ? "#ff0000" : "#3d3d3d")};
    }
  }
  font-size: 2rem;
  display: flex;
  gap: 1rem;
  input[type="month"] {
    font-size: 1.5rem;
    + span {
      font-size: 1.2rem;
    }
  }
`;

// 입력 Input 뒤에 단위 나타내는 텍스트
const InputUnit = styled.span`
  line-height: 2.8rem;
  word-break: keep-all;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 2rem;
  text-align: end;
  border: none;
  outline: none;
  background-color: #ffffff;
  color: #3d3d3d;
  font-family: "Noto Sans KR", sans-serif;
  ::placeholder {
    color: #cccccc;
  }
`;

const StyledLabel = styled.label`
  font-size: 2rem;
  color: #3d3d3d;
  display: inline-block;
  cursor: pointer;
  min-width: fit-content;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 1.4rem;
  text-align: end;
  line-height: 1.6rem;
  height: 1.6rem;
`;

const CheckboxContainer = styled.div`
  right: 2rem;
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const DisplayNoneInput = styled.input`
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

const CategoryImage = styled.label<{ isSelected?: boolean }>`
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

const PaymentLabel = styled.label<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#ffd469" : "#f5f6fa")};
  color: ${(props) => (props.isSelected ? "#3d3d3d" : "#797979")};
  width: 100%;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  font-weight: 700;
  border: none;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
`;

const PaymentContainer = styled.div`
  display: flex;
  width: 23.5rem;
  gap: 1rem;
  padding: 2rem 0;
`;

interface IAccountbookForm extends IAccountbook {
  time: string | null;
}

interface FinanceFormProps {
  type: "E" | "I";
  initForm?: IAccountbookForm;
}

interface Category {
  categoryId: string;
  type: "E" | "I";
  name: string;
  imgUrl: string;
}

export default function FinanceForm({ type, initForm }: FinanceFormProps) {
  // console.log("render");
  const router = useRouter();
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const date = year + "-" + month + "-" + day;
  const time =
    ("0" + today.getHours()).slice(-2) +
    ":" +
    ("0" + today.getMinutes()).slice(-2);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      accountbookId: initForm?.accountbookId || "",
      type,
      categoryId: initForm?.categoryId || "",
      title: initForm?.title || "",
      price: initForm?.price.toString() || "",
      memo: initForm?.memo || "",
      paymentMethod: initForm?.paymentMethod || (type === "E" ? "C" : "N"),
      fixedExpenditureYn: initForm?.fixedExpenditureYn === "Y" || false,
      fixedIncomeYn: initForm?.fixedIncomeYn === "Y" || false,
      monthlyPeriod: initForm?.monthlyPeriod || (day < "28" ? day : "28"),
      startDate: initForm?.startDate || year + "-" + month,
      endDate: initForm?.endDate || year + "-" + month,
      date: initForm?.date || date,
      time: initForm?.time || time,
    },
  });

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalChildren = [
    {
      label: "삭제",
      labelColor: "#ff0000",
      onClick: () => onClickDeleteButton(),
    },
    { label: "취소" },
  ];

  useEffect(() => {
    // console.log(type);
    getCategories(type).then((res) => {
      // console.log(res.data);
      if (res.data.code === 1300) {
        // console.log(res.data.data);
        setCategoryList(res.data.data);
      } else {
        // console.log(res.data.message);
        confirm("카테고리 조회 실패!");
      }
    });
    // 생성 페이지일 때만
    if (!initForm) {
      setValue("categoryId", "");
      setValue("paymentMethod", type === "E" ? "C" : "N");
      setValue("fixedExpenditureYn", false);
      setValue("fixedIncomeYn", false);
      setValue("startDate", "");
      setValue("endDate", "");
    }
  }, [type, initForm, setValue]);

  function onSubmit(data: any) {
    // console.log("Confirm!!");

    const isFixed =
      (type === "E" && data.fixedExpenditureYn) ||
      (type === "I" && data.fixedIncomeYn);

    const params = {
      ...data,
      type,
      price: +data.price,
      fixedExpenditureYn: data.fixedExpenditureYn ? "Y" : "N",
      fixedIncomeYn: data.fixedIncomeYn ? "Y" : "N",

      date: isFixed ? null : data.date,
      time: isFixed ? null : data.time,
      monthlyPeriod: isFixed ? +data.monthlyPeriod : null,
      startDate: isFixed ? data.startDate + "-01" : null,
      endDate: isFixed ? data.endDate + "-28" : null,
    };
    delete params.accountbookId;

    // 수정 페이지에서
    if (initForm && initForm.accountbookId) {
      putAccountbooks(initForm.accountbookId, params).then((res) => {
        if (res.data.code === 1304) {
          router.push("/finance");
        } else {
          confirm("가계부 삭제 실패");
        }
      });
      // console.log(params);

      // 추가 페이지에서
    } else {
      postAccountbooks(params).then((res) => {
        // console.log(res.data);
        if (res.data.code === 1301) {
          router.push("/finance");
        } else {
          confirm("가계부 생성 실패");
        }
      });
      // console.log(params);
    }
  }

  function onClickDeleteButton() {
    // console.log("Delete!");
    if (!initForm || !initForm.accountbookId) {
      return;
    }

    deleteAccountbooks(initForm.accountbookId).then((res) => {
      // console.log(res.data);
      if (res.data.code === 1305) {
        router.push("/finance");
      } else {
        confirm("가계부 삭제 실패!");
      }
    });
  }

  const fixedExpenditureTF = watch("fixedExpenditureYn");
  const fixedIncomeTF = watch("fixedIncomeYn");
  const categoryId = watch("categoryId");
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (fixedExpenditureTF || fixedIncomeTF) {
      setValue("date", "");
      setValue("startDate", initForm?.startDate || year + "-" + month);
      setValue("endDate", initForm?.endDate || year + "-" + month);
    } else {
      setValue("startDate", "");
      setValue("endDate", "");
      setValue("date", initForm?.date || date);
    }
  }, [fixedExpenditureTF, fixedIncomeTF, date]);

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputContainer>
            <StyledLabel>제목</StyledLabel>
            <InputDiv isError={!!errors.title}>
              <StyledInput
                {...register("title", {
                  required: { value: true, message: "제목을 입력해주세요" },
                  maxLength: { value: 18, message: "1~18자로 입력해주세요" },
                })}
              />
            </InputDiv>
          </InputContainer>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <div>
          <InputContainer>
            <StyledLabel>금액</StyledLabel>
            <InputDiv isError={!!errors.price}>
              <StyledInput
                type="number"
                {...register("price", {
                  required: { value: true, message: "금액을 입력해주세요" },
                  min: { value: 0, message: "금액을 입력해주세요" },
                  max: { value: 2147483647, message: "너무 큰 금액입니다" },
                  pattern: { value: /[0-9]/, message: "숫자만 입력해주세요" },
                })}
                placeholder="0"
              />
              <InputUnit>원</InputUnit>
            </InputDiv>
          </InputContainer>
          <ErrorMessage>{errors.price?.message}</ErrorMessage>

          <CheckboxContainer>
            <DisplayNoneInput
              type="checkbox"
              {...register(
                type === "E" ? "fixedExpenditureYn" : "fixedIncomeYn"
              )}
              id={type === "E" ? "fixedExpenditureYn" : "fixedIncomeYn"}
            />
            <CheckLabel
              htmlFor={type === "E" ? "fixedExpenditureYn" : "fixedIncomeYn"}
            >
              {(type === "E" && fixedExpenditureTF) ||
              (type === "I" && fixedIncomeTF) ? (
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
            <CheckLabel
              htmlFor={type === "E" ? "fixedExpenditureYn" : "fixedIncomeYn"}
            >
              {type === "E" ? "고정지출" : "고정수입"}
            </CheckLabel>
          </CheckboxContainer>
        </div>

        {(type === "E" && getValues("fixedExpenditureYn")) ||
        (type === "I" && getValues("fixedIncomeYn")) ? (
          <>
            {/* 고정 지출 또는 고정 수입일 때*/}
            <div>
              <InputContainer>
                <StyledLabel>날짜</StyledLabel>
                <InputDiv isError={!!errors.startDate || !!errors.endDate}>
                  <StyledInput
                    type="month"
                    {...register("startDate", {
                      required: {
                        value: true,
                        message: "시작일을 입력해주세요",
                      },
                    })}
                  />
                  <InputUnit>부터</InputUnit>
                  <StyledInput
                    type="month"
                    {...register("endDate", {
                      required: {
                        value: true,
                        message: "종료일을 입력해주세요",
                      },
                      min: {
                        value: getValues("startDate"),
                        message: "시작일보다 빠를 수 없습니다",
                      },
                    })}
                  />
                  <InputUnit>까지</InputUnit>
                </InputDiv>
              </InputContainer>
              <ErrorMessage>{errors.startDate?.message}</ErrorMessage>
              <ErrorMessage>{errors.endDate?.message}</ErrorMessage>
            </div>
            <div>
              <InputContainer>
                <InputDiv isError={!!errors.monthlyPeriod}>
                  <InputUnit>매월</InputUnit>
                  <StyledInput
                    type="number"
                    {...register("monthlyPeriod", {
                      required: {
                        value: true,
                        message: "주기를 입력해주세요",
                      },
                      min: {
                        value: 1,
                        message: "주기는 1일부터 28일까지만 가능합니다",
                      },
                      max: {
                        value: 28,
                        message: "주기는 1일부터 28일까지만 가능합니다",
                      },
                    })}
                  />
                  <InputUnit>일마다</InputUnit>
                </InputDiv>
              </InputContainer>
              <ErrorMessage>{errors.monthlyPeriod?.message}</ErrorMessage>
            </div>
          </>
        ) : (
          <>
            {/* 고정 지출 또는 고정 수입 아닐 때*/}
            <div>
              <InputContainer>
                <StyledLabel>날짜</StyledLabel>
                <InputDiv isError={!!errors.date}>
                  <StyledInput
                    type="date"
                    {...register("date", {
                      required: { value: true, message: "날짜를 입력해주세요" },
                    })}
                  />
                </InputDiv>
              </InputContainer>
              <ErrorMessage>{errors.date?.message}</ErrorMessage>
            </div>
            <div>
              <InputContainer>
                <StyledLabel>시각</StyledLabel>
                <InputDiv isError={!!errors.time}>
                  <StyledInput
                    type="time"
                    {...register("time", {
                      required: { value: true, message: "시각을 입력해주세요" },
                    })}
                  />
                </InputDiv>
              </InputContainer>
              <ErrorMessage>{errors.time?.message}</ErrorMessage>
            </div>
          </>
        )}
        <div>
          <StyledLabel>카테고리</StyledLabel>
          <CategoryListContainer>
            {categoryList.map((category) => (
              <CategoryButton key={category.categoryId}>
                <CategoryImage
                  htmlFor={category.categoryId}
                  isSelected={categoryId === category.categoryId}
                >
                  <Image
                    src={category.imgUrl}
                    alt={category.name}
                    layout="fill"
                  />
                </CategoryImage>
                <span>{category.name}</span>
                <DisplayNoneInput
                  {...register("categoryId", {
                    required: {
                      value: true,
                      message: "카테고리를 선택해주세요",
                    },
                  })}
                  type="radio"
                  value={category.categoryId}
                  id={category.categoryId}
                />
              </CategoryButton>
            ))}
          </CategoryListContainer>
          <ErrorMessage>{errors.categoryId?.message}</ErrorMessage>
        </div>

        {type === "E" && (
          <>
            <div>
              <StyledLabel>결제 수단</StyledLabel>
              <PaymentContainer>
                {[
                  { name: "카드", value: "C" },
                  { name: "현금", value: "M" },
                  { name: "기타", value: "E" },
                ].map((obj) => (
                  <Fragment key={obj.value}>
                    <PaymentLabel
                      isSelected={paymentMethod === obj.value}
                      htmlFor={obj.value}
                    >
                      {obj.name}
                    </PaymentLabel>
                    <DisplayNoneInput
                      {...register("paymentMethod", {
                        required: {
                          value: true,
                          message: "결제 수단을 선택해주세요",
                        },
                      })}
                      type="radio"
                      value={obj.value}
                      id={obj.value}
                    />
                  </Fragment>
                ))}
              </PaymentContainer>
            </div>
          </>
        )}

        <div>
          <InputContainer>
            <StyledLabel>메모</StyledLabel>
            <InputDiv isError={!!errors.memo}>
              <StyledInput
                type="text"
                {...register("memo", {
                  maxLength: {
                    value: 100,
                    message: "100자를 넘을 수 없습니다",
                  },
                })}
                placeholder="메모 남기기"
              />
            </InputDiv>
          </InputContainer>
          <ErrorMessage>{errors.memo?.message}</ErrorMessage>
        </div>

        {!initForm ? (
          <ButtonBottom label="확인" type="submit"></ButtonBottom>
        ) : (
          <ButtonContainer>
            <ButtonTrashCan
              type="button"
              onClick={() => setIsModalOpen(true)}
            />
            <ButtonBottom label="수정" type="submit" />
          </ButtonContainer>
        )}
      </FormContainer>
      <ButtonModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalTitle="정말 삭제하시겠습니까?"
        modalChildren={modalChildren}
      />
    </>
  );
}
