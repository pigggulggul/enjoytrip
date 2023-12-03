import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:80", // .env 로 옮기기
    //baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance };
