import { api, fileApi } from ".";

export const kakaoLogin = async (code: string) => {
  return await api.get(`/api/members/login/kakao?code=${code}`);
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
