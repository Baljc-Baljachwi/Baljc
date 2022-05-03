import { api } from "api";

// todo 조회 API
export const getTodos = async (date: string) => {
  // console.log(date);
  return await api.get(`/api/todos?date=${date}`);
};

// todo 생성 API
export const postTodos = async (data: object) => {
  // console.log(data);
  return await api.post(`/api/todos`, data);
};

// todo 완료 여부 API
export const completedTodo = async (todoId: string, completedYn: object) => {
  // console.log(todoId);
  // console.log(completedYn);
  return await api.patch(`/api/todos/${todoId}/done`, completedYn);
};
