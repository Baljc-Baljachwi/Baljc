import { api } from ".";

export const kakaoLogin = async (code: string) => {
  return await api.get(`/api/members/login/kakao?code=${code}`);
};
