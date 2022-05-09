import axios from "axios";
import { api, fileApi } from ".";

export const kakaoLogin = async (code: string, token: string | null) => {
  const params = token ? { code, token } : { code };
  return await api.get(`/api/members/login/kakao`, { params });
};

export const putMembers = async (data: FormData) => {
  return await fileApi.put(`/api/members`, data);
};

export const deleteMembers = async () => {
  return await api.delete(`/api/members`);
};

export const getMemberInfo = async () => {
  return await api.get(`/api/members`);
};

export const kakaoCoord2Region = async (
  longitude: string | number,
  latitude: string | number
) => {
  return await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
      },
    }
  );
};
