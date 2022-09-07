import type {
  LoginBody,
  LoginResponse,
  LogoutResponse,
  RegisterBody,
  RegisterResponse,
  RefreshTokenResponse,
  RefreshTokenBody,
} from "@qw/dto";
import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = async (params: LoginBody) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", params);
    await AsyncStorage.setItem("accessToken", response.data.accessToken);
    await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch {
    return null;
  }
};

const register = async (params: RegisterBody) => {
  try {
    const response = await api.post<RegisterResponse>("/auth/register", params);
    await AsyncStorage.setItem("accessToken", response.data.accessToken);
    await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch {
    return null;
  }
};

const refreshToken = async (params: RefreshTokenBody) => {
  const response = await api.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    params
  );
  await AsyncStorage.setItem("accessToken", response.data.accessToken);
  await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

const logout = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
};

export default authService;
