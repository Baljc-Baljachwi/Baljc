import { api } from "api";
import { IAccountbook } from "types";

interface IPostAccountbooksParams extends IAccountbook {
  time: string | null;
}

export const getCategories = async (type: "E" | "I") => {
  return await api.get(`/api/accountbooks/categories?type=${type}`);
};

export const postAccountbooks = async (params: IPostAccountbooksParams) => {
  // console.log(params);
  return await api.post(`/api/accountbooks`, params);
};

export const getAccountbooksList = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(`api/accountbooks?year=${year}&month=${month}`);
};

export const getAccountbooks = async (accountbookId: string) => {
  return await api.get(`api/accountbooks/${accountbookId}`);
};

export const putAccountbooks = async (
  accountbookId: string,
  params: IPostAccountbooksParams
) => {
  return await api.put(`api/accountbooks/${accountbookId}`, params);
};

export const deleteAccountbooks = async (accountbookId: string) => {
  return await api.delete(`api/accountbooks/${accountbookId}`);
};
