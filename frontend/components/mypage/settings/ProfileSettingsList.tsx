import styled from "styled-components";
import ProfileContentCard from "../ProfileContentCard";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState, memberIdState } from "atoms/atoms";
import { deleteMembers, logout } from "../../../api/member";
import { getAlarms } from "../../../api/alarm";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
`;

const ProfileSettingsList = () => {
  const [_, setAccessToken] = useRecoilState(accessTokenState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const router = useRouter();
  const { code } = router.query;

  const handleDeleteMember = () => {
    console.log("탈퇴하기 안녀엉...");
    deleteMembers().then((res) => {
      // console.log(res.data);
      console.log("메세지 찍어본다!" + res.data.message);
      router.push(res.data.code === 1003 ? "/" : "/mypage/settings");
      setAccessToken("");
      setMemberId("");
    });
  };

  const handleClickToAlarmPage = () => {
    router.push("/mypage/settings/alarm");
    // console.log("알림 설정 페이지로 이동");
    // getAlarms().then((res) => {
    //   console.log(res.data);
    //   console.log("메세지 찍어본다!" + res.data.message);
    //   if (res.data.code === 1200) {
    //     router.push("/mypage/settings/alarm");
    //   }
    // });
  };

  function onClickLogout() {
    logout()
      .then((res) => {
        if (res.data.code === 1004) {
          setAccessToken("");
          setMemberId("");
          router.push("/");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  }
  return (
    <>
      <PageContainer>
        <ProfileContentCard
          onClick={handleClickToAlarmPage}
          title="푸쉬 알림 설정"
          description="푸쉬 알림을 받습니다."
        />
        <ProfileContentCard
          title="로그아웃"
          description="로그아웃"
          onClick={onClickLogout}
        />
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
