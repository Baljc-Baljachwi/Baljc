import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

import Header from "../../components/common/Header";
import Icon from "../../components/common/Icon";
import ButtonBottom from "components/common/ButtonBottom";
import ButtonTrashCan from "components/common/ButtonTrashCan";
import { getBoardsCategories } from "api/community";

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
  line-height: 1.8rem;
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
  width: 24rem;
  gap: 1.4rem;
`;

const CategoryLabel = styled.label<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#ffd469" : "#f5f6fa")};
  color: ${(props) => (props.isSelected ? "#3d3d3d" : "#797979")};
  width: 100%;
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 0.2rem 0;
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
  height: 9rem;
  width: 9rem;
  .image {
    object-fit: contain;
  }
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
  overflow-y: auto;
`;

const InputDiv = styled.div<{ isError?: boolean }>`
  width: 100%;
  height: 100%;

  font-size: 2rem;
  display: flex;
  gap: 1rem;
  overflow-y: auto;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
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

const ImageButtonLabel = styled.label`
  color: #ffffff;
  display: flex;
  padding: 1rem 1.2rem;
  border: 1px solid #8e8e8e;
  border-radius: 0.8rem;
  background-color: #ffffff;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

// export type CategoryType = "E" | "C" | "N";

interface IBoardCategory {
  boardCategoryId: string;
  imgUrl: string;
  name: string;
}

// interface CommunityProps {
//   category: CategoryType;
//   content: string | null;
//   image?: string | null;
// }

export default function CommunityCreateForm() {
  const router = useRouter();

  // 새로고침 hydration error 해결
  const [ready, setReady] = useState(false);
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
  const category = watch("category");
  const [imagePreviewList, setImagePreviewList] = useState<string[]>([]);
  const [imageFileList, setImageFileList] = useState<Blob[]>([]);
  const [boardCategories, setBoardCategories] = useState<IBoardCategory[]>([]);

  const onClickDeleteButton = () => {
    console.log("Delete!");
    // if (!initForm || !initForm.accountbookId) {
    //   return;
    // }
    console.log(imageFileList);

    // 게시글 삭제 API 추가하기
  };

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("image upload");
    console.log(event.target.files);
    const files = event.target.files;
    if (files && files.length > 0) {
      if (imageFileList.length < 3) {
        setImageFileList((prev) => [...prev, files[0]]);
        setImagePreviewList((prev) => [...prev, URL.createObjectURL(files[0])]);
      } else {
        console.log("파일은 3개까지만 가능하지롱");
      }
    }
  }

  function onClickImageDeleteButton(index: number) {
    console.log(index, imagePreviewList[index]);
    setImagePreviewList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length),
    ]);
    setImageFileList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length),
    ]);
  }

  function onClickSubmitButton(data: any) {
    console.log(data);
    // 게시글 작성 API 추가하기

    const boardInfo = {
      categoryId: category,
      content: data.content,
      place: "",
    };

    const formData = new FormData();
    imageFileList.forEach((file) => {
      formData.append("boardImg", file);
    });
    formData.append(
      "boardInfo",
      new Blob([JSON.stringify(boardInfo)], { type: "application/json" })
    );
    console.log(formData);
  }

  useEffect(() => {
    // 생성 페이지일 때만
    if (!initForm) {
      setValue("category", type === "E" ? "C" : "N");
    }
  }, [type, initForm, setValue]);

  useEffect(() => {});

  useEffect(() => {
    setReady(true);
    getBoardsCategories().then((res) => {
      console.log(res.data);
      if (res.data.code === 1700) {
        console.log(res.data.data);
        setBoardCategories(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  }, []);
  if (!ready) {
    return null;
  }

  return (
    <>
      <Header
        label="게시글 작성"
        onClickBackButton={() => router.push("/community")}
      />
      <FormContainer onSubmit={handleSubmit(onClickSubmitButton)}>
        <FlexContainer>
          <Typography fs="1.6rem" fw="500">
            카테고리
          </Typography>
          <CategoryLabelContainer>
            {boardCategories.map((item) => (
              <Fragment key={item.boardCategoryId}>
                <CategoryLabel
                  isSelected={category === item.boardCategoryId}
                  htmlFor={item.boardCategoryId}
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
                  value={item.boardCategoryId}
                  id={item.boardCategoryId}
                />
              </Fragment>
            ))}
          </CategoryLabelContainer>
        </FlexContainer>

        <ImageContainer>
          {imagePreviewList.map((imageUrl, index) => (
            <ImageWrapper key={index}>
              <Image
                className="image"
                src={imageUrl}
                alt=""
                layout="fill"
                style={{ borderRadius: "5px" }}
              />
              <IconContainer onClick={() => onClickImageDeleteButton(index)}>
                <Icon
                  mode="fas"
                  icon="circle-xmark"
                  color="#000000"
                  size="20px"
                />
              </IconContainer>
            </ImageWrapper>
          ))}
        </ImageContainer>

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
        <ErrorMessage>{errors.content?.message}</ErrorMessage>

        {!initForm ? (
          <ButtonContainer>
            <ImageButtonLabel htmlFor="image">
              <Icon mode="fas" icon="image" size="3rem" color="#8E8E8E" />
            </ImageButtonLabel>
            <DisplayNoneInput
              type="file"
              id="image"
              accept="image/png, image/jpeg, image/bmp"
              name="image"
            />
            <ButtonBottom label="확인" type="submit"></ButtonBottom>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <ImageButtonLabel htmlFor="image">
              <Icon mode="fas" icon="image" size="3rem" color="#8E8E8E" />
            </ImageButtonLabel>
            <DisplayNoneInput
              onChange={handleImageUpload}
              type="file"
              id="image"
              accept="image/png, image/jpeg, image/bmp"
              name="image"
            />
            <ButtonTrashCan onClick={onClickDeleteButton} />
            <ButtonBottom label="완료" type="submit" />
          </ButtonContainer>
        )}
      </FormContainer>
    </>
  );
}

CommunityCreateForm.requireAuth = true;
