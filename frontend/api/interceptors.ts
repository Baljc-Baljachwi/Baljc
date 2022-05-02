import { AxiosInstance } from "axios";

class LocalStorage {
  constructor() {}

  static setItem(key: string, item: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, item);
    }
  }

  static getItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key: string) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}

function setInterceptors(instance: any) {
  instance.interceptors.request.use(
    (config: any) => {
      const accessTokenJSON = LocalStorage.getItem("accessToken");
      if (accessTokenJSON) {
        config.headers.Authorization =
          JSON.parse(accessTokenJSON)["accessToken"];
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
