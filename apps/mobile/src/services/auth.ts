import type {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
  RefreshTokenResponse,
  RefreshTokenBody,
} from "@qw/dto";
import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setTokens = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("refreshToken", refreshToken);
};

const unsetTokens = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
};

const login = async (params: LoginBody) => {
  const response = await api.post<LoginResponse>("/auth/login", params);
  await setTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

const register = async (params: RegisterBody) => {
  const response = await api.post<RegisterResponse>("/auth/register", params);
  await setTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

const refreshToken = async (params: RefreshTokenBody) => {
  const response = await api.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    params
  );
  await setTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

const logout = async () => {
  try {
    await unsetTokens();
    return true;
  } catch {
    return false;
  }
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
};

export default authService;
