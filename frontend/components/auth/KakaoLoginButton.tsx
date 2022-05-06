import Image from "next/image";
import Link from "next/link";

import styled from "styled-components";
import kakaoLoginButtonImage from "../../public/assets/img/login/kakao_login_medium_narrow.png";
// const KAKAO_CLIENT_ID = "a450daddb77a31dbba0ce5e4f3adf23f";
// const KAKAO_REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const kakaoGetAuthCodeURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;

const ButtonContainer = styled.div`
  position: relative;
  border-radius: 1.2rem;
  height: 45px;
  width: 183px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
`;

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 10rem 0;
  height: 100vh;
  gap: 1.5rem;
  background-color: #2e437a;
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

export default function KakaoLoginButton() {
  return (
    <>
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
    </>
  );
}
