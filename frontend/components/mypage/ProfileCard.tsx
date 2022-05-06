import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "atoms/atoms";
import { getMemberInfo } from "../../api/member";
import { SalaryType } from "../../types";
import defaultProfileImg from "@/assets/img/mypage/avatar/avatar_tr1.png";
import flagImg from "@/assets/img/mypage/avatar/avatar_tr2.png";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";

const Container = styled.div`
  height: 100vh;
`;

const PageContainer = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  background-color: #ffffff;
  color: #3d3d3d;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  /* padding-bottom: 2rem; */
`;

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #2e437a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 40px 40px;
  height: 100%;
  color: #ffffff;
  gap: 1.4rem;
`;

const ProfileImage = styled.div`
  border: 3px solid #fafafe;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  position: relative;
  .profileImg {
    border: 3px solid #fafafe;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 600;
  gap: 1rem;
  margin-bottom: 2rem;
  span {
    font-size: 1.6rem;
    font-weight: 400;
    color: #ffd469;
  }
  .salaryInfo {
    display: flex;
    flex-direction: column;
    width: 14rem;
    .eachSalaryInfo {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 1.2rem;
        font-weight: 400;
        color: #ffd469;
      }
    }
  }
`;

interface IMemberInfoProps {
  nickname: string;
  profileUrl: string | null;
  salaryType: SalaryType;
  salary: number;
  workingHours: number | null;
  budget: number;
}

const ProfileCard = ({}) => {
  const router = useRouter();
  const [memberInfo, setMemberInfo] = useState<IMemberInfoProps>();
  // const UserInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    getMemberInfo().then((res) => {
      // console.log(res.data);
      console.log(res.data.data);
      if (res.data.code === 1001) {
        // console.log("1001도 넘어왔음!");
        // console.log(res.data.data);
        setMemberInfo(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  }, []);

  return (
    <>
      <Container>
        <ProfileCardContainer>
          <ProfileImage>
            {memberInfo && (
              <Image
                className="profileImg"
                src={memberInfo?.profileUrl || defaultProfileImage}
                alt={memberInfo?.nickname}
                layout="fill"
              />
            )}
          </ProfileImage>
          <ProfileInfo>
            {memberInfo?.nickname.length === 0
              ? " 닉네임 "
              : memberInfo?.nickname}
            <span>
              급여 |{" "}
              {memberInfo
                ? memberInfo.salaryType === "M"
                  ? `월급 ${memberInfo.salary.toLocaleString()} 원`
                  : memberInfo.salaryType === "H"
                  ? `시급 ${memberInfo.salary.toLocaleString()} 원`
                  : "급여를 등록해주세요."
                : null}
              {/* .toLocaleString() */}
            </span>
            <span>한 달 예산 | {memberInfo?.budget.toLocaleString()} 원</span>
          </ProfileInfo>
        </ProfileCardContainer>
      </Container>
    </>
  );
};

export default ProfileCard;

// const [nickname, setNickname] = useState();
// const [profileUrl, setProfileUrl] = useState();
// const [salaryType, setSalaryType] = useState();
// const [salary, setSalary] = useState();
// const [workingHours, setWorkingHours] = useState();
// const [budget, setBudget] = useState();

// setNickname(res.data.data.nickname);
// setProfileUrl(res.data.data.profileUrl);
// setBudget(res.data.data.budget);
// setSalaryType(res.data.data.salaryType);
// setSalary(res.data.data.salary);
// setWorkingHours(res.data.data.workingHours);

/* <div className="salaryInfo">
    <div className="eachSalaryInfo">
      <span>급여 </span>
      <span>
        {memberInfo?.salaryType === "M"
          ? "월급"
          : memberInfo?.salaryType === "H"
          ? "시급"
          : ""}{" "}
        {memberInfo?.salary} 원
      </span>
    </div>
    <div className="eachSalaryInfo">
      <span>한 달 예산 </span>
      <span> {memberInfo?.budget} 원</span>
    </div>
  </div> */
