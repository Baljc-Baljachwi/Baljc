import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

import Header from "../../components/common/Header";
import Avatar from "../../public/assets/img/mypage/avatar/avartar_h.jpg";
import Icon from "../../components/common/Icon";
import ButtonBottom from "components/common/ButtonBottom";
import ButtonTrashCan from "components/common/ButtonTrashCan";
import ButtonImage from "components/common/ButtonImage";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  height: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 2rem 0;
`;

const Typography = styled.div<{
  fs?: string;
  fw?: string;
  p?: string;
}>`
  font-size: ${(props) => (props.fs ? props.fs : "1rem")};
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  padding: ${(props) => (props.p ? props.p : "0")};
`;

const CategoryLabelContainer = styled.div`
  display: flex;
  width: 23.5rem;
  gap: 1rem;
`;

const CategoryLabel = styled.label<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#ffd469" : "#f5f6fa")};
  color: ${(props) => (props.isSelected ? "#3d3d3d" : "#797979")};
  width: 100%;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  font-weight: 700;
  border: none;
  border-radius: 0.5rem;
  text-align: center;
`;

const DisplayNoneInput = styled.input`
  display: none;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const IconContainer = styled.div`
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: 80px;
  z-index: 100000;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputDiv = styled.div<{ isError?: boolean }>`
  width: 100%;
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

const StyledTextarea = styled.textarea`
  width: 100%;
  font-size: 2rem;
  border: none;
  outline: none;
  color: #3d3d3d;
  font-family: "Noto Sans KR", sans-serif;
  ::placeholder {
    color: #cccccc;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 1.4rem;
  text-align: end;
  line-height: 1.6rem;
  height: 1.6rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1.6rem;
`;

// export type CategoryType = "E" | "C" | "N";

// interface CommunityProps {
//   category: CategoryType;
//   content: string | null;
//   image?: string | null;
// }

export default function CommunityCreateForm() {
  const router = useRouter();

  const initForm = true;
  const type = "E";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: type === "E" ? "C" : "N",
      content: "",
    },
  });

  const onClickDeleteButton = () => {
    console.log("Delete!");
    // if (!initForm || !initForm.accountbookId) {
    //   return;
    // }

    // 게시글 삭제 API 추가하기
  };

  const onClickImageUpload = () => {
    console.log("image upload");
    // 파일 업로드 API 추가하기
  };

  useEffect(() => {
    // 생성 페이지일 때만
    if (!initForm) {
      setValue("category", type === "E" ? "C" : "N");
    }
  }, [type, initForm, setValue]);

  return (
    <>
      <Header
        label="게시글 작성"
        onClickBackButton={() => router.push("/community")}
      />
      <FormContainer onSubmit={handleSubmit((data) => console.log(data))}>
        <div>
          <FlexContainer>
            <Typography fs="1.6rem">카테고리</Typography>
            <CategoryLabelContainer>
              {[
                { name: "부탁해요", value: "C" },
                { name: "같이해요", value: "M" },
                { name: "동네정보", value: "E" },
              ].map((item) => (
                <Fragment key={item.value}>
                  <CategoryLabel
                    // isSelected={category === item.value}
                    isSelected={false}
                    htmlFor={item.value}
                  >
                    {item.name}
                  </CategoryLabel>
                  <DisplayNoneInput
                    {...register("category", {
                      required: {
                        value: true,
                        message: "카테고리를 설정해주세요",
                      },
                    })}
                    type="radio"
                    value={item.value}
                    id={item.value}
                  />
                </Fragment>
              ))}
            </CategoryLabelContainer>
          </FlexContainer>
          <ImageContainer>
            <ImageWrapper>
              <Image
                src={Avatar}
                alt=""
                width={90}
                height={90}
                style={{ borderRadius: "5px" }}
              />
              <IconContainer>
                <Icon
                  mode="fas"
                  icon="circle-xmark"
                  color="#000000"
                  size="20px"
                />
              </IconContainer>
            </ImageWrapper>
          </ImageContainer>

          <InputContainer>
            <InputDiv isError={!!errors.content}>
              <StyledTextarea
                {...register("content", {
                  maxLength: {
                    value: 10000,
                    message: "10,000자를 넘을 수 없습니다",
                  },
                })}
                placeholder="내용을 입력해주세요."
              />
            </InputDiv>
          </InputContainer>
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        </div>
        {!initForm ? (
          <ButtonContainer>
            <ButtonImage onClick={onClickImageUpload} />
            <ButtonBottom label="확인" type="submit"></ButtonBottom>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <ButtonImage onClick={onClickImageUpload} />
            <ButtonTrashCan onClick={onClickDeleteButton} />
            <ButtonBottom label="완료" type="submit" />
          </ButtonContainer>
        )}
      </FormContainer>
    </>
  );
}

CommunityCreateForm.requireAuth = true;
