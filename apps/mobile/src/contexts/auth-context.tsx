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
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
    },
  });
  const refresh = useMutation(authService.refreshToken, {
    onSettled: async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
    },
  });
  const logout = useMutation(authService.logout, {
    onSettled: async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
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
