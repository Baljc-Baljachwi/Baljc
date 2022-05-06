import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Image from "next/image";

import Header from "../../components/common/Header";
import ButtonBottom from "../../components/common/ButtonBottom";
import { putMembers } from "api/member";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";

const PageContainer = styled.main`
  padding: 0 2rem 2rem 2rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 5rem;
`;

const LabelProfileImageContiainer = styled.div`
  width: 100%;
  margin: 5rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.label`
  border: 4.2px solid #fafafe;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  border-radius: 50%;
  width: 14rem;
  height: 14rem;
  position: relative;
  .profileImg {
    border: 3px solid #fafafe;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
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
`;

// 입력 Input 뒤에 단위 나타내는 텍스트
const InputUnit = styled.span`
  line-height: 2rem;
  word-break: keep-all;
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
  ::placeholder {
    color: #cccccc;
  }
`;

const DisplayNoneInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  font-size: 2rem;
  color: #3d3d3d;
  /* font-weight: 500; */
  display: inline-block;
  margin-top: 1.6rem;
`;

const SalaryTypeContainer = styled.div`
  display: flex;
  width: 23.5rem;
  gap: 1rem;
  padding: 2rem 0;
`;

const DefaultImageButton = styled.div`
  width: 12rem;
  border-radius: 0.5rem;
  color: #ffffff;
  font-size: 1.2rem;
  text-align: center;
  line-height: 2.4rem;
  background-color: #2e437a;
`;

const SalaryTypeLabel = styled.label<{ isSelected: boolean }>`
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

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 1.4rem;
  text-align: end;
  line-height: 1.6rem;
  height: 1.6rem;
`;

export default function Survey() {
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      nickname: "",
      salaryType: "M",
      salary: "",
      profileUpdated: false,
      workingHours: "",
      budget: "",
    },
  });
  const salaryType = watch("salaryType");

  const [ready, setReady] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<Blob>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  function validFile(file: any) {
    if (file.size > 2097152) {
      return false;
    }
    const extensions = ["png", "jpeg", "jpg", "bmp"];
    const fileExt = file.name.split(".").at(-1);
    return extensions.includes(fileExt);
  }

  function handleInputProfileImage(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    setImageError(false);
    if (!target.files) {
      return;
    }

    if (target.files.length > 0) {
      const file = target.files[0];
      setImageError(!validFile(file));
      setImagePreview(URL.createObjectURL(file));
      setValue("profileUpdated", true);
      setProfileImageFile(file as Blob);
    } else {
      setImagePreview("");
      setValue("profileUpdated", true);
      setProfileImageFile(new Blob());
    }
  }

  function onClickDefaultImageButton() {
    setValue("profileUpdated", true);
    setProfileImageFile(new Blob());
    setImagePreview("");
    setImageError(false);
  }

  function onSubmit(data: any) {
    if (
      profileImageFile &&
      profileImageFile.size > 0 &&
      !validFile(profileImageFile)
    ) {
      setImageError(true);
      return;
    }
    if (imageError) {
      return;
    }
    const memberInfo = {
      nickname: data.nickname,
      profileUpdated: data.profileUpdated,
      salaryType: data.salaryType,
      salary: +data.salary,
      workingHours: +data.workingHours,
      budget: +data.budget,
    };

    const formData = new FormData();
    formData.append("profileImage", profileImageFile || new Blob());
    formData.append(
      "memberInfo",
      new Blob([JSON.stringify(memberInfo)], { type: "application/json" })
    );

    putMembers(formData).then((res) => {
      console.log(res.data);
      if (res.data.code === 1002) {
        router.push("/calendar");
      } else {
        confirm("설문조사 생성 실패!");
      }
    });
  }

  return (
    <>
      <Header label="설문조사" />
      <LabelProfileImageContiainer>
        <ProfileImage htmlFor="profileImage">
          <Image
            className="profileImg"
            src={imagePreview || defaultProfileImage}
            alt={getValues("nickname")}
            layout="fill"
          />
        </ProfileImage>
        <DefaultImageButton onClick={onClickDefaultImageButton}>
          기본 이미지로 변경
        </DefaultImageButton>
        <ErrorMessage>
          {imageError && "2MB 이하 이미지(.png, .jpeg, .bmp) 파일만 가능합니다"}
        </ErrorMessage>
      </LabelProfileImageContiainer>
      <DisplayNoneInput
        type="file"
        id="profileImage"
        accept="image/png, image/jpeg, image/bmp"
        name="profileImage"
        onChange={handleInputProfileImage}
      />

      <PageContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <div>
            <StyledLabel htmlFor="nickname">닉네임</StyledLabel>
            <InputDiv isError={!!errors.nickname}>
              <StyledInput
                type="text"
                placeholder="닉네임을 입력해주세요"
                {...register("nickname", {
                  required: { value: true, message: "닉네임을 입력해주세요" },
                  maxLength: { value: 18, message: "2 ~ 18자로 입력해주세요" },
                  minLength: { value: 2, message: "2 ~ 18자로 입력해주세요" },
                  pattern: {
                    value: /^[0-9a-zA-Zㄱ-힣]*$/,
                    message: "공백 및 특수문자를 포함할 수 없습니다",
                  },
                })}
              />
            </InputDiv>
            <ErrorMessage>{errors.nickname?.message}</ErrorMessage>
          </div>

          <div>
            <StyledLabel htmlFor="salary">급여</StyledLabel>
            <SalaryTypeContainer>
              {[
                { name: "월급", value: "M" },
                { name: "시급", value: "H" },
                { name: "없음", value: "N" },
              ].map((obj) => (
                <Fragment key={obj.value}>
                  <SalaryTypeLabel
                    isSelected={salaryType === obj.value}
                    htmlFor={obj.value}
                  >
                    {obj.name}
                  </SalaryTypeLabel>
                  <DisplayNoneInput
                    {...register("salaryType")}
                    type="radio"
                    value={obj.value}
                    id={obj.value}
                  />
                </Fragment>
              ))}
            </SalaryTypeContainer>
          </div>

          {salaryType !== "N" && (
            <>
              <div>
                <InputDiv isError={!!errors.salary}>
                  <StyledInput
                    type="number"
                    placeholder="0"
                    {...register("salary", {
                      required: {
                        value: true,
                        message: "급여를 입력해주세요",
                      },
                      min: {
                        value: 0,
                        message:
                          "올바른 범위(0이상 2147483647이하)를 입력해주세요",
                      },
                      max: {
                        value: 2147483647,
                        message:
                          "올바른 범위(0이상 2147483647이하)를 입력해주세요",
                      },
                      pattern: {
                        value: /[0-9]/,
                        message: "숫자만 입력해주세요",
                      },
                    })}
                  />
                  <InputUnit>원</InputUnit>
                </InputDiv>
                <ErrorMessage>{errors.salary?.message}</ErrorMessage>
              </div>

              <div>
                <StyledLabel htmlFor="workingHours">
                  한 주에 몇 시간 일하시나요?
                </StyledLabel>
                <InputDiv isError={!!errors.workingHours}>
                  <StyledInput
                    type="number"
                    placeholder="0"
                    {...register("workingHours", {
                      required: {
                        value: true,
                        message: "주당 근무 시간을 입력해주세요",
                      },
                      min: {
                        value: 0,
                        message: "올바른 범위(0이상 168이하)를 입력해주세요",
                      },
                      max: {
                        value: 168,
                        message: "올바른 범위(0이상 168이하)를 입력해주세요",
                      },
                      pattern: {
                        value: /[0-9]/,
                        message: "숫자만 입력해주세요",
                      },
                    })}
                  />
                  <InputUnit>시간</InputUnit>
                </InputDiv>
                <ErrorMessage>{errors.workingHours?.message}</ErrorMessage>
              </div>
            </>
          )}

          <div>
            <StyledLabel htmlFor="budget">한 달 예산</StyledLabel>
            <InputDiv isError={!!errors.budget}>
              <StyledInput
                type="number"
                placeholder="0"
                {...register("budget", {
                  required: {
                    value: true,
                    message: "한 달 예산을 입력해주세요",
                  },
                  min: {
                    value: 0,
                    message: "올바른 범위(0이상 2147483647이하)를 입력해주세요",
                  },
                  max: {
                    value: 2147483647,
                    message: "올바른 범위(0이상 2147483647이하)를 입력해주세요",
                  },
                  pattern: { value: /[0-9]/, message: "숫자만 입력해주세요" },
                })}
              />
              <InputUnit>원</InputUnit>
            </InputDiv>
            <ErrorMessage>{errors.budget?.message}</ErrorMessage>
          </div>
          <ButtonBottom label="가입" type="submit" />
        </FormContainer>
      </PageContainer>
    </>
  );
}

Survey.requireAuth = true;
