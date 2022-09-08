import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";

interface TAuthContext {
  isLoading: boolean;
}

export const AuthContext = createContext<TAuthContext>({
  isLoading: true,
});

interface AuthContextProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [data, setData] = useState(null);

  const login = useMutation(authService.login, {
    onSettled: async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    },
  });
  const refresh = useMutation(authService.refreshToken, {
    onSettled: async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    },
  });
  const logout = useMutation(authService.logout, {
    onSettled: async () => {
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    },
  });

  const isLoading = login.isLoading || refresh.isLoading || logout.isLoading;

  useEffect(() => {}, [login.data, refresh.data]);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
