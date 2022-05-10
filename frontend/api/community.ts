import { api, fileApi } from "api";

export const getBoardsCategories = async () => {
  return await api.get(`/api/boards/categories`);
};

export const postBoards = async (data: FormData) => {
  return await fileApi.post(`/api/boards`, data);
};
