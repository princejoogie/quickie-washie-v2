import { ReactNode, createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileResponse } from "@qw/dto";
import authService from "../services/auth";

interface TAuthContext {
  isLoading: boolean;
  data: ProfileResponse | null;
}

export const AuthContext = createContext<TAuthContext>({
  isLoading: true,
  data: null,
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
      setData(data);
    },
    onError: () => {
      setData(null);
    },
  });

  const isLoading =
    profile.isLoading || profile.isFetching || profile.isRefetching;

  return (
    <AuthContext.Provider value={{ isLoading, data }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
