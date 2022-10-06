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
import {
  getRefreshToken,
  refreshToken,
  setTokens,
  unsetTokens,
} from "../services/api";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { getPushNotificationToken } from "../lib/push-notifications";
import notificationService from "../services/notification";

interface TAuthContext {
  isLoading: boolean;
  data: TokenPayload | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  refresh: () => void;
}

export const AuthContext = createContext<TAuthContext>({
  isLoading: true,
  data: null,
  logout: async () => {},
  login: async () => {},
  refresh: () => {},
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
    const pushToken = await getPushNotificationToken();

    if (pushToken) {
      await notificationService.unregisterPushToken({
        notificationToken: pushToken,
      });
    }

    await unsetTokens();
    setData(null);
  };

  const refresh = async () => {
    const token = await getRefreshToken();

    if (token) {
      const res = await refreshToken({ refreshToken: token });
      const data = decode<TokenPayload>(res.accessToken);
      setData(data);
    } else {
      await logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const tokens = await authService.login({ email, password });
      await setTokens(tokens.accessToken, tokens.refreshToken);
      const pushToken = await getPushNotificationToken();

      console.log({ pushToken });

      if (pushToken) {
        await notificationService.registerPushToken({
          notificationToken: pushToken,
        });
      }

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
    <AuthContext.Provider value={{ isLoading, data, logout, login, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
