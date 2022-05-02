import { api } from "api";
import { IAccountBook } from "types";

interface IPostAccountBooksParams extends IAccountBook {
  time: string | null;
}

export const getCategories = async (type: "E" | "I") => {
  return await api.get(`/api/accountbooks/categories?type=${type}`);
};

export const postAccountBooks = async (params: IPostAccountBooksParams) => {
  console.log(params);
  return await api.post(`/api/accountbooks`, params);
};

export const getAccountBooksList = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(`api/accountbooks?year=${year}&month=${month}`);
};

export const getAccountBooks = async (accountBookId: string) => {
  return await api.get(`api/accountbooks/${accountBookId}`);
};
