import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import LocalStorage from "utils/localStorage";

function setInterceptors(instance: any) {
  instance.interceptors.request.use(
    (config: any) => {
      const userInfoJSON = LocalStorage.getItem("userInfo");
      if (userInfoJSON) {
        config.headers.Authorization = JSON.parse(userInfoJSON).accessToken;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      console.log(error);
      console.log(error.config);
      console.log(error.response);
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
