import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import authService from "./auth";

export const API_BASE_URL = Constants.manifest?.extra?.API_BASE_URL;

console.log({ API_BASE_URL });

export const api = axios.create({
  baseURL: API_BASE_URL ?? "http://localhost:4000/api",
});

api.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (!!accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  console.log("--> ", config.url, ": ", config.data, config.headers);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!!refreshToken) {
        const data = await authService.refreshToken({ refreshToken });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
