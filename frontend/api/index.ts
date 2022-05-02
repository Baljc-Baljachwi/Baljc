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
  const tokenItem = LocalStorage.getItem("accessToken");
  const accessToken = tokenItem ? JSON.parse(tokenItem)["accessToken"] : null;

  console.log("Create basic instance");
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });

  return instance;
}

function createFileInstance() {
  const tokenItem = LocalStorage.getItem("accessToken");
  const accessToken = tokenItem ? JSON.parse(tokenItem)["accessToken"] : null;
  console.log("Create basic instance");

  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: accessToken,
    },
  });

  return instance;
}

export const api = createBasicInstance();
export const fileApi = createFileInstance();
