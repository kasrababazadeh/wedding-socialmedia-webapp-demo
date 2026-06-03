"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: number;
  partner1_forename: string;
  partner2_forename: string;
  // Add any other profile fields here
}

interface AuthContextType {
  accessToken: string | null;
  user: UserProfile | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  getProfile: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    if (access) {
      setAccessToken(access);
      getProfile(access).catch(() => logout());
    }
  }, []);

  const login = async (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setAccessToken(access);
    await getProfile(access); // ✅ fetch user and update context
  };
  

  const logout = async () => {
    const refresh = localStorage.getItem("refreshToken");
    
    if (refresh && accessToken) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh }),
      });
    
      if (!res.ok) {
        console.error("Logout failed", await res.json());
        return; // Optional: stop here if logout fails
      }
    }
  
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setUser(null);
    router.push("/");
  };
  

  const getProfile = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error loading profile:", err);
      throw err; // don't call logout here – let `useEffect` or caller handle it
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
