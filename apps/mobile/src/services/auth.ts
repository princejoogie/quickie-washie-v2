import type {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
  ProfileResponse,
} from "@qw/dto";
import { api, setTokens } from "./api";

const profile = async () => {
  const response = await api.get<ProfileResponse>("/auth/profile");
  return response.data;
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

const authService = {
  login,
  profile,
  register,
};

export default authService;
