import { api } from "api";
import { IMember, ICategory, IAccountbook } from "types";

// 이번 달 지출/남은 예산/예상 소비 금액 조회 = 고정지출
export const getFixedExpenditure = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(`/api/mypages/fixed-exp?year=${year}&month=${month}`);
};

// 지출 분석 조회(일별:꺾은선 그래프)
export const getLineGraphValue = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(
    `/api/mypages/exp-analysis/category?year=${year}&month=${month}`
  );
};

// 지출 분석 조회(카테고리별:도넛 차트)
export const getPieChartValue = async (
  year: string | number,
  month: string | number
) => {
  return await api.get(
    `/api/mypages/exp-analysis/day?year=${year}&month=${month}`
  );
};
