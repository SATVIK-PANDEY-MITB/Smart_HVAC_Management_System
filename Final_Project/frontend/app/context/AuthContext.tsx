"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const STORAGE_KEY = "smart_hvac_auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state safely from localStorage on client side
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedAuth = localStorage.getItem(STORAGE_KEY);
        if (storedAuth) {
          const parsedUser = JSON.parse(storedAuth) as User;
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser);
            setIsAuthenticated(true);
          }
        }
      }
    } catch (err) {
      console.error("Failed to read auth state from localStorage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (username: string, password: string): { success: boolean; error?: string } => {
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername || !password) {
      return { success: false, error: "Please enter your username and password." };
    }

    if (trimmedUsername === "admin" && password === "admin123") {
      const demoUser: User = {
        username: "admin",
        name: "Building Administrator",
        role: "Admin",
      };

      setUser(demoUser);
      setIsAuthenticated(true);

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
        }
      } catch (err) {
        console.error("Failed to save auth state to localStorage:", err);
      }

      return { success: true };
    }

    return { success: false, error: "Invalid username or password." };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.error("Failed to remove auth state from localStorage:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
