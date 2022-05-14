import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styled from "styled-components";
import kakaoLoginButtonImage from "../../public/assets/img/login/kakao_login_medium_narrow.png";

const kakaoGetAuthCodeURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;

const Container = styled.div`
  background-color: #2e437a;
`;
const ButtonContainer = styled.div`
  position: relative;
  border-radius: 1.2rem;
  height: 45px;
  width: 183px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
`;

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 1.5rem;
  background-color: #2e437a;
  height: 76vh;
  padding-bottom: 8vh;
`;

const BottomContainer = styled.section`
  width: 100%;
  display: flex;
  background-color: #2e437a;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 0.6rem;
  height: 24vh;
`;

const LoginTitle = styled.article`
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
`;

const LoginContent = styled.div`
  color: white;
  font-size: 1.6rem;
  text-align: center;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const TermsContainer = styled.p`
  text-align: center;
  width: 30rem;
  color: #ffffff;
  font-size: 1.2rem;
`;

const AnchorText = styled.span`
  color: #ffd469;
  border-bottom: 1px solid #ffd469;
  font-weight: 600;
`;

export default function KakaoLoginButton() {
  const router = useRouter();
  return (
    <Container>
      <MainContainer>
        <Image
          src="/assets/img/login/login_logo_white.png"
          alt=""
          width={130}
          height={130}
        />
        <LoginTitle>슬기로운 자취생활 길잡이</LoginTitle>
        <LoginContent>
          가계부부터 지출분석, 일정 관리까지 <br></br>
          나만의 발자취를 남겨보세요!
        </LoginContent>
        <ButtonContainer>
          <Link href={kakaoGetAuthCodeURL}>
            <a>
              <Image
                src={kakaoLoginButtonImage}
                alt="Kakao login button"
                layout="fill"
              />
            </a>
          </Link>
        </ButtonContainer>
      </MainContainer>
      <BottomContainer>
        <TermsContainer>로그인 버튼을 클릭하면</TermsContainer>
        <TermsContainer>
          <AnchorText onClick={() => router.push("/auth/terms")}>
            이용약관
          </AnchorText>{" "}
          및{" "}
          <AnchorText onClick={() => router.push("/auth/privacypolicy")}>
            개인정보 처리방침
          </AnchorText>{" "}
          에{" "}
        </TermsContainer>
        <TermsContainer>동의하게 됩니다.</TermsContainer>
      </BottomContainer>
    </Container>
  );
}
