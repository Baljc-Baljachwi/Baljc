import { api } from "api";

export const putRoutines = async (data: object) => {
  console.log(data);
  return await api.post(`/api/routines`, data);
};
