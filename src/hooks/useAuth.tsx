import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type AuthResponse } from "@/types/auth.types";
import { tokenStorage } from "@/lib/token";

interface AuthContextType {
  user: Omit<AuthResponse, "accessToken" | "refreshToken"> | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const storedUser = tokenStorage.getUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (data: AuthResponse) => {
    const { accessToken, refreshToken, ...userData } = data;
    tokenStorage.setTokens(accessToken, refreshToken);
    tokenStorage.setUser(userData);
    setUser(userData);
  };

  const logout = () => {
    tokenStorage.clearTokens();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
