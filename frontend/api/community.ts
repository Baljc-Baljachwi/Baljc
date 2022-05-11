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
