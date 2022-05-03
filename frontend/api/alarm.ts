import { api } from "api";
import { IAlarm } from "types";

// 알림 설정 조회
export const getAlarms = async () => {
  return await api.get(`/api/alarms`);
};

// 알림 설정 변경
export const putAlarms = async (params: IAlarm) => {
  return await api.put(`/api/alarms`, params);
};

// interface IAlarmParams extends IAlarm {
//   accountAlarmYn: YNType;
//   accountAlarmTime: string;
//   todoAlarmYn: YNType;
//   todoAlarmTime: string;
// }
