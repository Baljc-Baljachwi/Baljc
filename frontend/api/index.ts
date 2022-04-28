import axios from "axios";

function createBasicInstance() {
  const instance = axios.create({
    baseURL: "https://baljc.com",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
}

export const api = createBasicInstance();
