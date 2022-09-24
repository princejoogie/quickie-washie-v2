import type {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
  ProfileResponse,
  UpdateProfileResponse,
  UpdateProfileBody,
  ReauthenticateBody,
} from "@qw/dto";
import { api, setTokens } from "./api";

const profile = async () => {
  const response = await api.get<ProfileResponse>("/auth/profile");
  return response.data;
};

const updateProfile = async (body: UpdateProfileBody) => {
  const response = await api.put<UpdateProfileResponse>("/auth/profile", body);
  return response.data;
};

const login = async (body: LoginBody) => {
  const response = await api.post<LoginResponse>("/auth/login", body);
  await setTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

const register = async (body: RegisterBody) => {
  const response = await api.post<RegisterResponse>("/auth/register", body);
  await setTokens(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

const reauthenticate = async (body: ReauthenticateBody) => {
  const response = await api.post<LoginResponse>("/auth/reauthenticate", body);
  return response.data;
};

const authService = {
  login,
  profile,
  register,
  reauthenticate,
  updateProfile,
};

export default authService;
