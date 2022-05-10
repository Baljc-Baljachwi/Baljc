import { api } from "api";

export const getBoardsCategories = async () => {
  return await api.get(`/api/boards/categories`);
};
