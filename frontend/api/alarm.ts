import { api } from "api";

// 알림 설정 조회
export const getAlarms = async () => {
  return await api.get(`/api/alarms`);
};

// 알림 설정 변경
export const putAlarms = async (data: object) => {
  // console.log("🔥🔥🔥🔥 PUT API 호출하고나서 data 잘 넘어오는지임!! ");
  // console.log(data);
  return await api.put(`/api/alarms`, data);
};
