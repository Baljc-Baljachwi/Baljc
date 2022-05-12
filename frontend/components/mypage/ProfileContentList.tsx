import styled from "styled-components";
import { useRouter } from "next/router";
import ProfileContentCard from "./ProfileContentCard";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
`;

export default function ProfileContentList() {
  const router = useRouter();
  return (
    <>
      <PageContainer>
        <ProfileContentCard
          title="내가 쓴 글 목록"
          description="내가 쓴 글을 모아보세요."
          onClick={() => router.push("/mypage/board")}
        />
        <ProfileContentCard
          title="스크랩한 글 목록"
          description="내가 스크랩한 글을 모아보세요."
          onClick={() => router.push("/mypage/scrap")}
        />
        <ProfileContentCard
          title="목표를 향해서!"
          description="내 생활 습관을 분석해보세요."
          onClick={() => router.push("/mypage/analysis")}
        />
        <ProfileContentCard
          title="고정 지출 관리"
          description="고정 지출을 등록해보세요."
          onClick={() => router.push("/mypage/fixed")}
        />
        <ProfileContentCard
          title="설정"
          description="푸쉬 알림을 설정할 수 있습니다."
          onClick={() => router.push("/mypage/settings")}
        />
      </PageContainer>
    </>
  );
}
