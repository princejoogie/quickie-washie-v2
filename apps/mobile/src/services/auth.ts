import type {
  LoginBody,
  LoginResponse,
  LogoutResponse,
  RegisterBody,
  RegisterResponse,
  RefreshTokenResponse,
} from "@qw/dto";
import { api } from "./api";

const login = async (params: LoginBody) => {
  const response = await api.post<LoginResponse>("/auth/login", params);
  return response.data;
};

const register = async (params: RegisterBody) => {
  const response = await api.post<RegisterResponse>("/auth/register", params);
  return response.data;
};

const refreshToken = async () => {
  const response = await api.get<RefreshTokenResponse>("/auth/refresh-token");
  return response.data;
};

const logout = async () => {
  const response = await api.post<LogoutResponse>("/auth/logout");
  return response.data;
};

const authService = {
  login,
  register,
  refreshToken,
  logout,
}

export default authService;
