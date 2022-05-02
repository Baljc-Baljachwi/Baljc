import { api } from "api";
import { IRoutine } from "types";

export const getRoutines = async (dow: number) => {
  return await api.get(`/api/routines?dow=${dow}`);
};

export const putRoutines = async (data: object) => {
  console.log(data);
  return await api.post(`/api/routines`, data);
};
