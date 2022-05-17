import axios, { AxiosError, AxiosResponse } from "axios";
import LocalStorage from "utils/localStorage";

function setInterceptors(instance: any) {
  let isTokenRefreshing = false;
  let refreshSubscribers: ((accessToken: string) => void)[] = []; // 콜백 배열

  // 토큰 리프레시 후 콜백
  const onTokenRefreshed = (accessToken: string) => {
    refreshSubscribers.map((callback) => callback(accessToken));
  };
  // 콜백 배열에 추가
  const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
    refreshSubscribers.push(callback);
  };

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
    async (error: AxiosError) => {
      const { config, response } = error;
      const originalRequest = config;
      console.log("message: ", response?.data.message);

      // 액세스 토큰 만료시
      if (response?.data.code === 2004) {
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
          const userInfoJSON = JSON.parse(
            LocalStorage.getItem("userInfo") || "{}"
          );
          const { accessToken, refreshToken, memberId } = userInfoJSON;

          try {
            const res = await axios.post(
              `${process.env.BASE_URL}/api/members/refresh`,
              { authorization: accessToken, refreshToken, memberId }
            );

            console.log(res);
            const { headers } = res;
            const newAccessToken = headers.authorization;
            const newRefreshToken = headers.refreshToken;

            const newUserInfo = {
              ...userInfoJSON,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            };

            LocalStorage.setItem("userInfo", JSON.stringify(newUserInfo));
            isTokenRefreshing = false;
            onTokenRefreshed(newAccessToken);
          } catch (err: any) {
            console.error(err);
            console.log(err.response.data);
            // 유효하지 않은 리프레시 토큰
            if (err.response.data.code === 3002) {
              LocalStorage.removeItem("userInfo");
              window.location.replace("/");
            }
          }
        }
        // 토큰 재발급 동안 요청 refreshSubscriber에 저장
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = accessToken;
              resolve(axios(originalRequest));
            }
          });
        });
        return retryOriginalRequest;
      }
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
