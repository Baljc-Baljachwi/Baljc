import React, { useState } from "react";
import styled from "styled-components";

import Image from "next/image";

const Container = styled.div`
  height: 100vh;
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  /* padding: 0 2rem; */
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
`;

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2e437a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 40px 40px;
  height: 30vh;
  color: #ffffff;
`;

const ProfileImage = styled.div`
  /* border: 3px solid #fafafe; */
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  position: relative;
  .profileImg {
    border-radius: 50%;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 900;
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: #ffd469;
  }
`;

const LabelProfileImageContiainer = styled.div`
  width: 100%;
  /* margin: 5rem 0 4rem 0; */
  display: flex;
  justify-content: center;
`;

const LabelProfileImage = styled.label<{ image: string }>`
  display: inline-block;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: #cccccc;
  background-image: url(${(props) => (props.image ? props.image : "")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  border: 3px solid #fafafe;
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
  workTime: number;
  monthBudget: number;
  profileImage: Blob;
}
const ProfileCard = ({}) => {
  const [surveyForm, setSurveyForm] = useState<SurveyInputForm>({
    nickname: "",
    salaryType: "M",
    salary: 0,
    workTime: 0,
    monthBudget: 0,
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
      console.log(target.files);
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
          [name]: {} as Blob,
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

  return (
    <>
      <Container>
        <ProfileCardContainer>
          {/* <LabelProfileImageContiainer>
            <LabelProfileImage image={imagePreview} htmlFor="profileImage" />
          </LabelProfileImageContiainer>
          {imagePreview}
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: "none" }}
          /> */}
          {/* <ProfileImage> */}
          {/* <Image
              className="profileImg"
              src="/assets/img/mypage/avatar_member6.png"
              alt="avatar"
              layout="fill"
            /> */}
          {/* </ProfileImage> */}
          <LabelProfileImage image={imagePreview} htmlFor="profileImage" />
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />
          <ProfileInfo>
            발챙쓰
            <span style={{ color: "#ffffff" }}>
              목표 | 조금 좋은 집을 살 거예요
            </span>
            <span>급여 | 비밀</span>
            <span>한 달 예산 | 500,000 원</span>
          </ProfileInfo>
        </ProfileCardContainer>
      </Container>
    </>
  );
};

export default ProfileCard;
