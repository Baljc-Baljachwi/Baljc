import { api } from "api";
import { IAccountBook } from "types";

interface IPostAccountBooksParams extends IAccountBook {
  time: string | null;
}

export const getCategoies = async (type: "E" | "I") => {
  return await api.get(`/api/accountbooks/categories?type=${type}`);
};

export const postAccountBooks = async (params: IPostAccountBooksParams) => {
  console.log(params);
  return await api.post(`/api/accountbooks`, params);
};
