import { api } from "api";
import { IMember, ICategory, IAccountbook } from "types";

// 이번 달 남은 예산/하루 예산/예상 지출 조회
export const getBudget = async (date: string) => {
  // console.log(date);
  return await api.get(`/api/mypages/now-exp?date=${date}`);
};

// 이번 달 지출/남은 예산/예상 소비 금액 조회 = 고정지출
export const getFixedExpenditure = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(`/api/mypages/fixed-exp?year=${year}&month=${month}`);
};

// 도넛 차트 - 카테고리 별
export const getPieChartValue = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(
    `/api/mypages/exp-analysis/category?year=${year}&month=${month}`
  );
};

// 꺾은선 - 일 별
export const getLineGraphValue = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(
    `/api/mypages/exp-analysis/daily?year=${year}&month=${month}`
  );
};

export const getFixedEList = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(
    `/api/mypages/fixed-exp/list?year=${year}&month=${month}`
  );
};
