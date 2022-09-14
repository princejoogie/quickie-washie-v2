import axios from "axios";
import { QueryClient } from "react-query";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RefreshTokenResponse, RefreshTokenBody } from "@qw/dto";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "../constants";

export const API_BASE_URL = Constants.manifest?.extra?.API_BASE_URL;
export const queryClient = new QueryClient();

export const api = axios.create({
  baseURL: API_BASE_URL ?? "http://localhost:4000/api",
});

api.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
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
      const token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

      if (!!token) {
        const data = await refreshToken({ refreshToken: token });
        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        return await api(originalRequest);
      }
    }

    return await Promise.reject(error);
  }
);

export const refreshToken = async (params: RefreshTokenBody) => {
  const response = await api.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    params
  );
  await setTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const unsetTokens = async () => {
  await queryClient.invalidateQueries(["profile"]);
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};
