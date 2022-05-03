import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "states";
import { getMemberInfo } from "../../api/member";
import { SalaryType } from "../../types";
import defaultProfileImg from "@/assets/img/mypage/avatar/avatar_tr1.png";
import flagImg from "@/assets/img/mypage/avatar/avatar_tr2.png";

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
  font-family: "InkLipquidFonts";
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  gap: 1rem;
  span {
    font-size: 1.2rem;
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
  salary: number | null;
  workingHours: number | null;
  budget: number;
}

const ProfileCard = ({}) => {
  const router = useRouter();
  const [memberInfo, setMemberInfo] = useState<IMemberInfoProps>();
  // const [nickname, setNickname] = useState();
  // const [profileUrl, setProfileUrl] = useState();
  // const [salaryType, setSalaryType] = useState();
  // const [salary, setSalary] = useState();
  // const [workingHours, setWorkingHours] = useState();
  // const [budget, setBudget] = useState();
  // const UserInfo = useRecoilValue(userInfoState);
  useEffect(() => {
    getMemberInfo().then((res) => {
      // console.log(res.data);
      if (res.data.code === 1001) {
        // console.log("1001도 넘어왔음!");
        // console.log(res.data.data);
        // setMemberInfo(res.data.data);
        // setNickname(res.data.data.nickname);
        // setProfileUrl(res.data.data.profileUrl);
        // setBudget(res.data.data.budget);
        // setSalaryType(res.data.data.salaryType);
        // setSalary(res.data.data.salary);
        // setWorkingHours(res.data.data.workingHours);
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
            {memberInfo && memberInfo.profileUrl && (
              <Image
                className="profileImg"
                src={memberInfo?.profileUrl}
                alt={memberInfo?.nickname}
                layout="fill"
              />
            )}
          </ProfileImage>
          <ProfileInfo>
            {memberInfo?.nickname}
            <span>
              급여 | [
              {memberInfo?.salaryType === "M"
                ? "월급"
                : memberInfo?.salaryType === "H"
                ? "시급"
                : ""}
              ] {memberInfo?.salary} 원
            </span>
            <span>한 달 예산 | {memberInfo?.budget} 원</span>
            {/* <div className="salaryInfo">
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
            </div> */}
          </ProfileInfo>
        </ProfileCardContainer>
      </Container>
    </>
  );
};

export default ProfileCard;
