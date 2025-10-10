"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  hasCompletedProfile: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<void>;
  handleRedirectAfterRegister: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simulate checking auth status from localStorage or API
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simulate API login call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data - in real app, this would come from API
      const userData: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        hasCompletedProfile: true, // Simulate existing user
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      router.push("/dashboard");
    } catch (error) {
      throw new Error("Đăng nhập thất bại");
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // Simulate API register call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // New user needs to complete profile
      const userData: User = {
        id: "2",
        email,
        hasCompletedProfile: false,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      router.push("/profile-setup");
    } catch (error) {
      throw new Error("Đăng ký thất bại");
    }
  };

  const updateProfile = async (profileData: any) => {
    try {
      // Simulate API call to update profile
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (user) {
        const updatedUser = {
          ...user,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          hasCompletedProfile: true,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        router.push("/dashboard");
      }
    } catch (error) {
      throw new Error("Cập nhật hồ sơ thất bại");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/landing");
  };

  const handleRedirectAfterRegister = () => {
    router.push("/profile-setup");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        handleRedirectAfterRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
