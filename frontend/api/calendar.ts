import { api } from "api";
import { ICalendar } from "types";

export const getMonthlyCalendar = async (params: ICalendar) => {
  return await api.get(
    `/api/calendars/months?year=${params.year}&month=${params.month}`
  );
};
