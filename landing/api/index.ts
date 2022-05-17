import axios from "axios";
import setInterceptors from "./interceptors";

function createBasicInstance() {
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  setInterceptors(instance);

  return instance;
}

function createFileInstance() {
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  setInterceptors(instance);

  return instance;
}

export const api = createBasicInstance();
export const fileApi = createFileInstance();
