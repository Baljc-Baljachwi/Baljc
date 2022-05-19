import styled from "styled-components";
import { useRouter } from "next/router";
import ProfileContentCard from "./ProfileContentCard";

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

export default function ProfileContentList() {
  const router = useRouter();
  return (
    <>
      <PageContainer>
        <ProfileContentCard
          title="목표를 향해서!"
          description="내 소비 습관을 분석해보세요."
          onClick={() => router.push("/mypage/analysis")}
        />
        <Hr />
        <ProfileContentCard
          title="고정 지출 관리"
          description="고정 지출을 등록해보세요."
          onClick={() => router.push("/mypage/fixed")}
        />
        <Hr />
        <ProfileContentCard
          title="내가 쓴 글 목록"
          description="내가 쓴 글을 모아보세요."
          onClick={() => router.push("/mypage/board")}
        />
        <Hr />
        <ProfileContentCard
          title="스크랩한 글 목록"
          description="내가 스크랩한 글을 모아보세요."
          onClick={() => router.push("/mypage/scrap")}
        />
      </PageContainer>
      <PageContainer>
        <ProfileContentCard
          title="설정"
          color="#747373"
          description="푸쉬 알림을 설정할 수 있습니다."
          onClick={() => router.push("/mypage/settings")}
        />
      </PageContainer>
    </>
  );
}
