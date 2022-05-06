import { api } from "api";
import { IRoutine } from "types";

// 일과 전체 조회 API
export const getAllRoutines = async () => {
  return await api.get(`/api/routines/all`);
};

// 일과 요일 별 조회 API
export const getRoutines = async (dow: number) => {
  return await api.get(`/api/routines?dow=${dow}`);
};

// 일과 등록 API
export const postRoutines = async (data: object) => {
  return await api.post(`/api/routines`, data);
};

// 일과 수정 API
export const putRoutines = async (routineId: string, data: object) => {
  return await api.put(`/api/routines/${routineId}`, data);
};

// 일과 삭제 API
export const deleteRoutines = async (routineId: string) => {
  return await api.delete(`/api/routines/${routineId}`);
};
