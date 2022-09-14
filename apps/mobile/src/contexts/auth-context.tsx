import { ReactNode, createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileResponse } from "@qw/dto";
import authService from "../services/auth";

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

  const profile = useQuery(["profile"], authService.profile, {
    retry: false,
    cacheTime: 0,
    onSuccess: (data) => {
      setData({ ...data });
    },
    onError: () => {
      setData(null);
    },
  });

  const logout = async () => {
    await authService.logout();
    setData(null);
  };

  const login = async (email: string, password: string) => {
    await authService.login({ email, password });
    await profile.refetch();
  };

  const isLoading =
    profile.isLoading || profile.isFetching || profile.isRefetching;

  return (
    <AuthContext.Provider value={{ isLoading, data, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
