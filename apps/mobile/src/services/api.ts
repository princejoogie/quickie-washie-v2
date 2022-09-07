import axios from "axios";
import Constants from "expo-constants";

export const API_BASE_URL = Constants.manifest?.extra?.API_BASE_URL;

console.log({ API_BASE_URL });

export const api = axios.create({
  baseURL: API_BASE_URL ?? "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  console.log({ url: config.url, params: config.params });
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await api.get("/auth/refresh-token");
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
