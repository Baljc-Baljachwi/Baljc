import { api } from "api";

export const getMemberInfo = async () => {
  return await api.get(`/api/members`);
};
