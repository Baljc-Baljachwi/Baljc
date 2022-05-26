import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { getMemberInfo } from "../../api/member";
import { SalaryType } from "../../types";
import defaultProfileImg from "@/assets/img/mypage/avatar/avatar_tr1.png";
import flagImg from "@/assets/img/mypage/avatar/avatar_tr2.png";
import defaultProfileImage from "public/assets/img/mypage/avatar/default_profile.png";

const Container = styled.div`
  height: 100%;
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
  const [memberInfo, setMemberInfo] = useState<IMemberInfoProps>();

  useEffect(() => {
    getMemberInfo().then((res) => {
      setMemberInfo(res.data.data);
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
                priority={true}
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
            <span>이번 달 예산 | {memberInfo?.budget.toLocaleString()} 원</span>
          </ProfileInfo>
        </ProfileCardContainer>
      </Container>
    </>
  );
};

export default ProfileCard;
