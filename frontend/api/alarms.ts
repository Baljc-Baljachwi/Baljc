import { api } from "api";
import { IAlarm } from "types";

export const getAlarmList = async () => {
  return await api.get(`/api/alarms`);
};
