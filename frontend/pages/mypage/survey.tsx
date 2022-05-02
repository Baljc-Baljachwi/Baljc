import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/common/Header";
import ButtonBottom from "../../components/common/ButtonBottom";
import ButtonToggleSalaryType from "../../components/mypage/survey/ButtonToggleSalaryType";
import { putMembers } from "api/member";

const PageContainer = styled.main`
  padding: 0 2rem 6rem 2rem;
`;

const LabelProfileImageContiainer = styled.div`
  width: 100%;
  margin: 5rem 0 4rem 0;
  display: flex;
  justify-content: center;
`;

const LabelProfileImage = styled.label<{ image: string }>`
  display: inline-block;
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  background-color: #cccccc;
  background-image: url(${(props) => (props.image ? props.image : "")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const InputContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  margin: 1.6rem 0 4rem 0;
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
`;

const ButtonToggleContainer = styled.div`
  margin-top: 1.6rem;
`;

type TypeSalary = "M" | "H" | "N";

interface SurveyInputForm {
  nickname: string;
  salaryType: TypeSalary;
  salary: number;
  workingHours: number;
  budget: number;
  profileImage: Blob | null;
}

export default function Survey() {
  const [surveyForm, setSurveyForm] = useState<SurveyInputForm>({
    nickname: "",
    salaryType: "M",
    salary: 0,
    profileImage: null,
    workingHours: 0,
    budget: 0,
  } as SurveyInputForm);

  const [imagePreview, setImagePreview] = useState<string>("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name !== "profileImage") {
      setSurveyForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (target.files) {
      if (target.files.length > 0) {
        // 새로 파일을 넣은 경우
        const file = target.files[0];
        setImagePreview(URL.createObjectURL(file));
        setSurveyForm((prev) => ({
          ...prev,
          [name]: file as Blob,
        }));
      } else {
        // 파일을 없앤 경우
        setImagePreview("");
        setSurveyForm((prev) => ({
          ...prev,
          [name]: new Blob(),
        }));
      }
    }
  }

  function handleToggleButton(value: TypeSalary) {
    setSurveyForm((prev) => ({
      ...prev,
      salaryType: value,
    }));
  }

  function onClickSubmitButton() {
    console.log("click");
    const memberInfo = {
      nickname: surveyForm.nickname,
      profileUpdated:
        !!surveyForm.profileImage && surveyForm.profileImage.size > 0,
      salaryType: surveyForm.salaryType,
      salary: +surveyForm.salary,
      workingHours: +surveyForm.workingHours,
      budget: +surveyForm.budget,
    };
    console.log(memberInfo);

    const data = new FormData();
    data.append("profileImage", surveyForm.profileImage || new Blob());
    data.append(
      "memberInfo",
      new Blob([JSON.stringify(memberInfo)], { type: "application/json" })
    );

    console.log(data.get("profileImage"));
    console.log(data.get("memberInfo"));

    putMembers(data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  return (
    <>
      <Header label="설문 조사"></Header>
      <LabelProfileImageContiainer>
        <LabelProfileImage image={imagePreview} htmlFor="profileImage" />
      </LabelProfileImageContiainer>
      <input
        type="file"
        id="profileImage"
        name="profileImage"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      <PageContainer>
        <StyledLabel htmlFor="nickname">닉네임</StyledLabel>
        <InputContainer>
          <StyledInput
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={surveyForm.nickname}
            onChange={handleInputChange}
          />
        </InputContainer>

        <StyledLabel htmlFor="salary">급여</StyledLabel>
        <ButtonToggleContainer>
          <ButtonToggleSalaryType
            selectedSalaryType={surveyForm.salaryType}
            handleToggleButton={handleToggleButton}
          />
        </ButtonToggleContainer>
        {surveyForm?.salaryType !== "N" && (
          <>
            <InputContainer>
              <StyledInput
                name="salary"
                type="number"
                placeholder="0"
                value={surveyForm.salary || ""}
                onChange={handleInputChange}
              />
              <InputUnit hasValue={surveyForm.salary > 0}>원</InputUnit>
            </InputContainer>

            <StyledLabel htmlFor="workingHours">
              한 주에 몇 시간 일하시나요?
            </StyledLabel>
            <InputContainer>
              <StyledInput
                name="workingHours"
                type="number"
                placeholder="0"
                value={surveyForm.workingHours || ""}
                onChange={handleInputChange}
              />
              <InputUnit hasValue={surveyForm.workingHours > 0}>시간</InputUnit>
            </InputContainer>
          </>
        )}

        <StyledLabel htmlFor="budget">한 달 예산</StyledLabel>
        <InputContainer>
          <StyledInput
            name="budget"
            type="number"
            placeholder="0"
            value={surveyForm.budget || 0}
            onChange={handleInputChange}
          />
          <InputUnit hasValue={surveyForm.budget > 0}>원</InputUnit>
        </InputContainer>

        <ButtonBottom label="가입" onClick={onClickSubmitButton} />
        {/* <ButtonContainer>
          <ButtonTrashCan />
          <ButtonBottom label="수정" />
        </ButtonContainer> */}
      </PageContainer>
    </>
  );
}
