import { api } from "api";

export const getCategoies = async (type: "E" | "I") => {
  return await api.get(`/api/accountbooks/categories?type=${type}`);
};
