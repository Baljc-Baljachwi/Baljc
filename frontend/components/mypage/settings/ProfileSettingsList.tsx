import styled from "styled-components";
import ProfileContentCard from "../ProfileContentCard";

import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userInfoState } from "atoms/atoms";
import { deleteMembers, logout } from "../../../api/member";
import ButtonModal from "components/common/ButtonModal";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 1rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  overflow: hidden;
`;

const Hr = styled.div`
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.25);
`;

const ProfileSettingsList = () => {
  const [_, setUserInfoState] = useRecoilState(userInfoState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalChildren = [
    {
      label: "탈퇴하기",
      labelColor: "#ff0000",
      onClick: () => handleDeleteMember(),
    },
    { label: "취소" },
  ];
  const router = useRouter();
  const { code } = router.query;

  const handleDeleteMember = () => {
    deleteMembers().then((res) => {
      router.push(res.data.code === 1003 ? "/" : "/mypage/settings");
      setUserInfoState({
        accessToken: "",
        refreshToken: "",
        memberId: "",
        surveyedYn: false,
        regionYn: false,
      });
    });
  };

  const handleClickToAlarmPage = () => {
    router.push("/mypage/settings/alarm");
  };

  function onClickLogout() {
    logout()
      .then((res) => {
        setUserInfoState({
          accessToken: "",
          refreshToken: "",
          memberId: "",
          surveyedYn: false,
          regionYn: false,
        });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <PageContainer>
        <ProfileContentCard
          onClick={handleClickToAlarmPage}
          title="푸쉬 알림 설정"
          height="7rem"
        />
        <Hr />
        <ProfileContentCard
          title="로그아웃"
          onClick={onClickLogout}
          height="7rem"
        />
        <Hr />
      </PageContainer>
      <PageContainer>
        <ProfileContentCard
          color="#747373"
          onClick={() => setIsModalOpen(true)}
          title="탈퇴하기"
          height="7rem"
        />
      </PageContainer>
      <ButtonModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        modalTitle="정말 탈퇴하시겠습니까?"
        modalChildren={modalChildren}
      />
    </>
  );
};

export default ProfileSettingsList;
