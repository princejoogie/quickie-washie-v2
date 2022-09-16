import axios from "axios";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RefreshTokenResponse, RefreshTokenBody } from "@qw/dto";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "../constants";
import { handleError } from "../utils/helpers";
import { Alert } from "react-native";

export const API_BASE_URL = Constants.manifest?.extra?.API_BASE_URL;
export const queryCache = new QueryCache();
export const queryClient = new QueryClient({
  queryCache,
  logger: console,
  defaultOptions: {
    mutations: {
      onError: (e) => {
        const error = handleError(e);
        Alert.alert("Error", error.message);
      },
    },
  },
});

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
  console.log(
    "[OUTGOING >>]",
    config.method?.toUpperCase(),
    config.url,
    config.data ? "\nDATA:" : "",
    config.data ? JSON.stringify(config.data, null, 2) : ""
  );
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(
      "[<< INCOMING]",
      response.config.url,
      response.data ? "\nDATA:" : "",
      response.data ? JSON.stringify(response.data, null, 2) : ""
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

      if (!!token) {
        const data = await refreshToken({ refreshToken: token });
        await setTokens(data.accessToken, data.refreshToken);
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
  console.log("[SETTING TOKENS]");
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, accessToken],
    [REFRESH_TOKEN_KEY, refreshToken],
  ]);
  console.log("[TOKENS SET]");
};

export const unsetTokens = async () => {
  console.log("[UNSETTING TOKENS]");
  await AsyncStorage.clear();
  queryClient.resetQueries();
  console.log("[TOKENS UNSET]");
};
