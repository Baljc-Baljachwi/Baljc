import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

import Icon from "../../components/common/Icon";
import ButtonBottom from "components/common/ButtonBottom";
import ButtonTrashCan from "components/common/ButtonTrashCan";
import { getBoardsCategories, postBoards, putBoard } from "api/community";

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
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 9rem;
  width: 9rem;
  margin-top: 3rem;
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
  margin: 0.4rem 0;
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
const MutedText = styled.p`
  font-size: 1.4rem;
  color: #a7a7a7;
  padding: 1rem 0;
`;

type ImageInfo = { imgUrl: string; boardImgId: string };

interface IBoardCategory {
  boardCategoryId: string;
  imgUrl: string;
  name: string;
}

interface IBoardContent {
  categoryName: string;
  content: string;
  imgInfoList: ImageInfo[];
}

interface CommunityFormProps {
  boardContent?: IBoardContent;
}

export default function CommunityForm({ boardContent }: CommunityFormProps) {
  const router = useRouter();

  // 새로고침 hydration error 해결
  const [ready, setReady] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      content: "",
    },
  });

  const category = watch("category");
  const [imagePreviewList, setImagePreviewList] = useState<ImageInfo[]>([]);
  const [imageFileList, setImageFileList] = useState<Blob[]>([]);
  const [deletedImageIdList, setDeletedImageIdList] = useState<string[]>([]);
  const [boardCategories, setBoardCategories] = useState<IBoardCategory[]>([]);

  function validFile(file: any) {
    if (file.size > 10485760) {
      return false;
    }
    const extensions = ["png", "jpeg", "jpg", "bmp"];
    const fileExt = file.name.split(".").at(-1).toLowerCase();
    return extensions.includes(fileExt);
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      let newFiles: File[] = [];
      let flag = true; // 알림 보낼지
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!validFile(file)) {
          if (flag) {
            confirm("10MB 이하의 이미지만 업로드 가능합니다.");
            flag = false;
          }
          continue;
        } else {
          newFiles.push(file);
        }
      }
      // 총 이미지 개수 체크
      let n = imagePreviewList.length + newFiles.length;
      if (n > 3) {
        confirm("사진은 3개까지만 업로드 가능합니다.");
        newFiles = newFiles.slice(0, 3 - imagePreviewList.length);
      }

      setImageFileList((prev) => [...prev, ...newFiles]);

      const newImagePreviewList = newFiles.map((file) => ({
        boardImgId: "",
        imgUrl: URL.createObjectURL(file),
      }));
      setImagePreviewList((prev) => [...prev, ...newImagePreviewList]);
    }
  }

  function onClickImageDeleteButton(index: number) {
    let n = imagePreviewList.length - imageFileList.length;

    // 서버에서 받아온 이미지면 deleted image에 추가
    if (imagePreviewList[index].boardImgId) {
      setDeletedImageIdList((prev) => [
        ...prev,
        imagePreviewList[index].boardImgId,
      ]);
    }
    setImagePreviewList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length),
    ]);

    // imagePreviewList와 imageFileList의 인덱스는 서로 다름.
    const fileIndex = index - n;
    setImageFileList((prev) => [
      ...prev.slice(0, fileIndex),
      ...prev.slice(fileIndex + 1, prev.length),
    ]);
  }

  function onClickSubmitButton(data: any) {
    const boardInfo = {
      categoryId: category,
      content: data.content,
      deleteBoardImgIdList: deletedImageIdList,
    };

    const formData = new FormData();
    console.log(imageFileList);
    imageFileList.forEach((file) => {
      formData.append("boardImg", file);
    });
    formData.append(
      "boardInfo",
      new Blob([JSON.stringify(boardInfo)], { type: "application/json" })
    );

    if (boardContent) {
      putBoard(router.query.boardId as string, formData)
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 1704) {
            // console.log(res.data.message);
            router.push({
              pathname: "/community/detail",
              query: { boardId: router.query.boardId },
            });
          } else {
            // console.log(res.data.message);
          }
        })
        .catch((err) => {
          // console.error(err);
        });
    } else {
      postBoards(formData)
        .then((res) => {
          if (res.data.code === 1701) {
            router.push("/community");
          }
        })
        .catch((err) => {
          // console.error(err);
        });
    }
  }

  useEffect(() => {
    setReady(true);
    // 카테고리 가져오기
    getBoardsCategories().then((res) => {
      if (res.data.code === 1700) {
        const { data } = res.data;
        const withOutAll = data.filter(
          (category: IBoardCategory) => category.name !== "전체보기"
        );
        setBoardCategories(withOutAll);

        if (!boardContent) {
          const { selectedCategory } = router.query;
          // 전체보기는 제외
          if (
            withOutAll.some(
              (category: any) => category.boardCategoryId === selectedCategory
            )
          ) {
            setValue(
              "category",
              selectedCategory || withOutAll[0].boardCategoryId
            );
          } else {
            setValue("category", withOutAll[0].boardCategoryId);
          }
        } else {
          setValue("content", boardContent.content);
          setImagePreviewList(boardContent.imgInfoList);

          if (boardContent.categoryName) {
            setValue(
              "category",
              withOutAll.filter(
                (category: any) => category.name === boardContent.categoryName
              )[0].boardCategoryId
            );
          }
        }
      }
    });
  }, [setValue, boardContent, router.query]);

  if (!ready) {
    return null;
  }
  return (
    <FormContainer
      onSubmit={handleSubmit(onClickSubmitButton, (err) => {
        // console.log(err);
      })}
    >
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
      <ErrorMessage>{errors.category?.message}</ErrorMessage>
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
      <ImageContainer>
        {imagePreviewList?.map((imageInfo, index) => (
          <ImageWrapper key={index}>
            <Image
              className="image"
              src={imageInfo.imgUrl}
              alt=""
              layout="fill"
              style={{ borderRadius: "5px" }}
            />
            <IconContainer onClick={() => onClickImageDeleteButton(index)}>
              <Icon
                mode="fas"
                icon="circle-xmark"
                color="#ff0000"
                size="20px"
              />
            </IconContainer>
          </ImageWrapper>
        ))}
      </ImageContainer>
      <MutedText>
        10MB 이하의 사진 최대 3개까지 업로드 가능합니다. (
        {imagePreviewList?.length || 0}
        /3)
      </MutedText>

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
          multiple
        />
        <ButtonBottom label="완료" type="submit" />
      </ButtonContainer>
    </FormContainer>
  );
}
