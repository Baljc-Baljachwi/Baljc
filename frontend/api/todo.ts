import { api } from "api";

// todo 조회 API
export const getTodos = async (date: string) => {
  return await api.get(`/api/todos?date=${date}`);
};

// todo 생성 API
export const postTodos = async (data: object) => {
  return await api.post(`/api/todos`, data);
};

// todo 완료 여부 API
export const completedTodos = async (todoId: string, completedYn: object) => {
  return await api.patch(`/api/todos/${todoId}/done`, completedYn);
};

// todo 수정 API
export const editTodos = async (todoId: string, content: object) => {
  return await api.patch(`/api/todos/${todoId}`, content);
};

// todo 삭제 API
export const deleteTodos = async (todoId: string) => {
  return await api.delete(`/api/todos/${todoId}`);
};
