import { ReactNode, createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
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
    onSettled(data) {
      if (data) setData(data);
      else setData(null);
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
