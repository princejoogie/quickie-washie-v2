import type { RefreshTokenResponse, RefreshTokenBody } from "@qw/dto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "../constants";

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
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};
