import axios from "axios";

function createBasicInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
}

export const api = createBasicInstance();
