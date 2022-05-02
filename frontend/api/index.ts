import axios from "axios";

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

function createBasicInstance() {
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const accessToken = LocalStorage.getItem("accessToken");
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] =
      JSON.parse(accessToken)["accessToken"];
  }

  return instance;
}

function createFileInstance() {
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const accessToken = LocalStorage.getItem("accessToken");
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] =
      JSON.parse(accessToken)["accessToken"];
  }
  return instance;
}

export const api = createBasicInstance();
export const fileApi = createFileInstance();
