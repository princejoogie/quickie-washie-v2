import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
