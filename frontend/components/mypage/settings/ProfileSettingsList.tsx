import styled from "styled-components";
import ProfileContentCard from "../ProfileContentCard";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "states";
import { deleteMembers } from "../../../api/member";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
`;

const ProfileSettingsList = () => {
  const [_, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const { code } = router.query;

  const handleDeleteMember = () => {
    console.log("탈퇴하기 안녀엉...");
    deleteMembers().then((res) => {
      // console.log(res.data);
      console.log("메세지 찍어본다!" + res.data.message);
      router.push(res.data.code === 1003 ? "/login" : "/mypage/settings");
      setAccessToken({ accessToken: "" });
    });
  };
  return (
    <>
      <PageContainer>
        <ProfileContentCard
          title="푸쉬 알림 설정"
          description="푸쉬 알림을 받습니다."
        />
        <ProfileContentCard title="문의하기" description="1:1 문의를 합니다." />
        <ProfileContentCard
          onClick={handleDeleteMember}
          title="탈퇴하기"
          description="안녀엉..."
        />
      </PageContainer>
    </>
  );
};

export default ProfileSettingsList;
