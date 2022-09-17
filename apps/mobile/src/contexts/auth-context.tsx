import { ReactNode, createContext, useContext, useState } from "react";
import { ProfileResponse } from "@qw/dto";
import authService from "../services/auth";
import { setTokens, unsetTokens } from "../services/api";

interface TAuthContext {
  isLoading: boolean;
  data: ProfileResponse | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<TAuthContext>({
  isLoading: true,
  data: null,
  logout: async () => {},
  login: async () => {},
});

interface AuthContextProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [data, setData] = useState<TAuthContext["data"]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    await unsetTokens();
    setData(null);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const tokens = await authService.login({ email, password });
    await setTokens(tokens.accessToken, tokens.refreshToken);
    const data = await authService.profile();
    setData(data);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isLoading, data, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
