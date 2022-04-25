import Link from "next/link";

// const KAKAO_CLIENT_ID = "a450daddb77a31dbba0ce5e4f3adf23f";
// const KAKAO_REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const kakaoGetAuthCodeURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;

export default function KakaoLoginButton() {
  return (
    <div>
      <Link href={kakaoGetAuthCodeURL}>
        <a>Kakao Login</a>
      </Link>
    </div>
  );
}
