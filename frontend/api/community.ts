import { api, fileApi } from "api";

export const getBoardsCategories = async () => {
  return await api.get(`/api/boards/categories`);
};

export const postBoards = async (data: FormData) => {
  return await fileApi.post(`/api/boards`, data);
};

export const getBoardsList = async (
  index: string | number,
  category: string
) => {
  return await api.get(`/api/boards?index=${index}&category=${category}`);
};

export const getBoardsDetail = async (boardId: string) => {
  return await api.get(`/api/boards/${boardId}`);
};

export const putBoard = async (boardId: string, data: FormData) => {
  return await api.put(`/api/boards/${boardId}`, data);
};

export const postLikeBoards = async (boardId: string, data: object) => {
  return await api.post(`/api/boards/${boardId}/like`, data);
};

export const postScrapBoards = async (boardId: string, data: object) => {
  return await api.post(`/api/boards/${boardId}/scrap`, data);
};

export const getComment = async (boardId: string, commentId: string) => {
  return await api.get(`/api/boards/${boardId}/comments/${commentId}`);
};

export const postComment = async (boardId: string, data: object) => {
  return await api.post(`/api/boards/${boardId}/comments`, data);
};

export const deleteComment = async (boardId: string, commentId: string) => {
  return await api.delete(`/api/boards/${boardId}/comments/${commentId}`);
};

export const deleteBoards = async (boardId: string) => {
  return await api.delete(`/api/boards/${boardId}`);
};
