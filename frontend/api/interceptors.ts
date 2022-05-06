import { AxiosInstance } from "axios";
import LocalStorage from "utils/localStorage";

function setInterceptors(instance: any) {
  instance.interceptors.request.use(
    (config: any) => {
      const accessTokenJSON = LocalStorage.getItem("accessToken");
      if (accessTokenJSON) {
        config.headers.Authorization = JSON.parse(accessTokenJSON);
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
}

export default setInterceptors;

// (error) => {
//   if (error.response.status === 401) {
//     window.location.href = "/login";
//     window.localStorage.clear();
//   }
//   return Promise.reject(error);
// }
