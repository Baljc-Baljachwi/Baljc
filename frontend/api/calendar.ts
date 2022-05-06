import { api } from "api";
import { ICalendar, IDaily } from "types";

export const getMonthlyCalendar = async (params: ICalendar) => {
  return await api.get(
    `/api/calendars/months?year=${params.year}&month=${params.month}`
  );
};

export const getDailyCalendar = async (params: IDaily) => {
  return await api.get(
    `/api/calendars/days?year=${params.year}&month=${params.month}&day=${params.day}`
  );
};
