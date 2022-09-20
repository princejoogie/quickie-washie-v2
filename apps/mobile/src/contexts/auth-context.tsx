import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { TokenPayload } from "@qw/dto";
import decode from "jwt-decode";

import authService from "../services/auth";
import { getRefreshToken, setTokens, unsetTokens } from "../services/api";
import { AxiosError } from "axios";
import { Alert } from "react-native";

interface TAuthContext {
  isLoading: boolean;
  data: TokenPayload | null;
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
  const [data, setData] = useState<TokenPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_c, setC] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getRefreshToken().then((token) => {
      if (token) {
        const data = decode<TokenPayload>(token);
        setData(data);
      } else {
        setData(null);
      }

      setIsLoading(false);
    });
  }, [_c]);

  const logout = async () => {
    await unsetTokens();
    setData(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const tokens = await authService.login({ email, password });
      await setTokens(tokens.accessToken, tokens.refreshToken);
      setC(_c + 1);
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.alert(
          "Error",
          e.response?.data.message ?? "Something went wrong"
        );
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, data, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
