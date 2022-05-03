import { api } from "api";

// todo 조회 API
export const getTodos = async (date: string) => {
  console.log(date);
  return await api.get(`/api/todos?date=${date}`);
};

// todo 생성 API
export const postTodos = async (data: object) => {
  console.log(data);
  return await api.post(`/api/todos`, data);
};
