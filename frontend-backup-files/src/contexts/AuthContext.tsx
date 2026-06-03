// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAccessToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
