import { api } from "api";

// 알림 설정 조회
export const getAlarms = async () => {
  return await api.get(`/api/alarms`);
};

// 알림 설정 변경
export const putAlarms = async (data: object) => {
  return await api.put(`/api/alarms`, data);
};
