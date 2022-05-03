import { api } from "api";

// todo 생성 API
export const postTodos = async (data: object) => {
  console.log(data);
  return await api.post(`/api/todos`, data);
};
