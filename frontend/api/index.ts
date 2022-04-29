import axios from "axios";

function createBasicInstance() {
  const instance = axios.create({
    baseURL: "https://baljc.com",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = accessToken;
  }

  return instance;
}

export const api = createBasicInstance();
