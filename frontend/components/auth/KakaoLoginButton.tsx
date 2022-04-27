import Image from "next/image";
import Link from "next/link";

import styled from "styled-components";
import kakaoLoginButtonImage from "../../public/assets/img/login/kakao_login_medium_narrow.png";
// const KAKAO_CLIENT_ID = "a450daddb77a31dbba0ce5e4f3adf23f";
// const KAKAO_REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const kakaoGetAuthCodeURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;

const AwesomeHeader = styled.header`
  width: 100%;
  height: 25rem;
  background-color: #2e437a;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px;
`;

const AwesomeFooter = styled.footer`
  width: 100%;
  height: 25rem;
  background-color: #ffefc6;
  position: absolute;
  bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -1px 8px;
`;

const Title = styled.div`
  position: absolute;
  top: 10rem;
  left: 4rem;
  font-size: 4.8rem;
  color: #ffffff;
`;

const ButtonContainer = styled.div`
  position: relative;
  border-radius: 1.2rem;
  height: 45px;
  width: 183px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const MainContainer = styled.main`
  width: 100%;
  height: calc(100vh - 40rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rem 0;
`;

const MessageContainer = styled.article`
  color: #3d3d3d;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

export default function KakaoLoginButton() {
  return (
    <>
      <AwesomeHeader />
      <Title>발자취</Title>
      <MainContainer>
        <MessageContainer>
          저희 발자취는
          <br />
          자취생 여러분의 김 한장을 응원합니다.
        </MessageContainer>
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
      <AwesomeFooter />
    </>
  );
}
