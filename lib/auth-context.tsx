"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "./config";

const AUTH_STORAGE_KEY = "flexup_auth";

const genderEnumMap: Record<number, string> = {
  0: "male",
  1: "female",
  2: "other",
};

const trainingGoalEnumMap: Record<number, string> = {
  0: "muscle-gain",
  1: "fat-loss",
  2: "maintain",
  3: "endurance",
};

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  gender?: string;
  height?: number;
  weight?: number;
  trainingGoal?: string;
  dateOfBirth?: string;
  hasCompletedProfile: boolean;
}

interface AuthTokens {
  token: string;
  refreshToken: string;
}

interface StoredAuth extends AuthTokens {
  user: User;
}

interface CompleteProfilePayload {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  level?: string;
  weeklyWorkouts?: string;
}

interface AccountUpdatePayload {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  trainingGoal?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeProfile: (profileData: CompleteProfilePayload) => Promise<void>;
  updateProfile: (profileData: AccountUpdatePayload) => Promise<User | null>;
  refreshProfile: () => Promise<User | null>;
  refreshAccessToken: () => Promise<boolean>;
  handleRedirectAfterRegister: () => void;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toNullableNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return undefined;
};

const normalizeGender = (value: unknown): string | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "number") {
    return genderEnumMap[value];
  }
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (["male", "female", "other"].includes(normalized)) {
      return normalized;
    }
    const lookup = genderEnumMap[Number.parseInt(normalized, 10)];
    return lookup;
  }
  return undefined;
};

const normalizeTrainingGoal = (value: unknown): string | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "number") {
    return trainingGoalEnumMap[value];
  }

  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    const directMatch = Object.values(trainingGoalEnumMap).find((goal) =>
      goal === normalized
    );
    if (directMatch) {
      return directMatch;
    }

    if (normalized.includes("muscle")) return "muscle-gain";
    if (normalized.includes("fat")) return "fat-loss";
    if (normalized.includes("maintain")) return "maintain";
    if (normalized.includes("endurance")) return "endurance";
  }

  return undefined;
};

const ageToDateString = (age?: string): string | null => {
  const value = toNullableNumber(age);
  if (value === undefined) return null;

  const today = new Date();
  const birthYear = today.getFullYear() - value;
  const birthDate = new Date(birthYear, today.getMonth(), today.getDate());
  return birthDate.toISOString().split("T")[0];
};

const parseProfilePayload = (payload: any, baseUser: User): User => {
  const firstName = payload?.firstName ?? payload?.FirstName ?? baseUser.firstName;
  const lastName = payload?.lastName ?? payload?.LastName ?? baseUser.lastName;
  const phoneNumber =
    payload?.phoneNumber ?? payload?.PhoneNumber ?? baseUser.phoneNumber;
  const profileImageUrl =
    payload?.profileImageUrl ??
    payload?.ProfileImageUrl ??
    baseUser.profileImageUrl;
  const gender = normalizeGender(payload?.gender ?? payload?.Gender) ?? baseUser.gender;
  const trainingGoal =
    normalizeTrainingGoal(payload?.trainingGoal ?? payload?.TrainingGoal) ??
    baseUser.trainingGoal;

  const height =
    toNullableNumber(payload?.height ?? payload?.Height) ?? baseUser.height;
  const weight =
    toNullableNumber(payload?.weight ?? payload?.Weight) ?? baseUser.weight;

  const dateOfBirth =
    payload?.dateOfBirth ??
    payload?.DateOfBirth ??
    baseUser.dateOfBirth;

  return {
    ...baseUser,
    firstName: firstName ?? baseUser.firstName,
    lastName: lastName ?? baseUser.lastName,
    phoneNumber: phoneNumber ?? baseUser.phoneNumber,
    profileImageUrl,
    gender,
    height,
    weight,
    trainingGoal,
    dateOfBirth: dateOfBirth ?? baseUser.dateOfBirth,
    hasCompletedProfile: true,
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    void checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthStatus = async () => {
    try {
      const legacyUser = localStorage.getItem("user");
      if (legacyUser) {
        localStorage.removeItem("user");
      }

      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsed: StoredAuth = JSON.parse(storedAuth);
        setUser(parsed.user);
        setTokens({ token: parsed.token, refreshToken: parsed.refreshToken });
        try {
          await refreshUserProfileInternal(
            { token: parsed.token, refreshToken: parsed.refreshToken },
            parsed.user
          );
        } catch (error) {
          console.error("Unable to refresh profile during init:", error);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      clearAuthState();
    } finally {
      setIsLoading(false);
    }
  };

  const persistAuthState = (auth: StoredAuth) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    setUser(auth.user);
    setTokens({ token: auth.token, refreshToken: auth.refreshToken });
  };

  const clearAuthState = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setTokens(null);
  };

  const refreshUserProfileInternal = async (
    tokenSource?: AuthTokens,
    baseUser?: User | null
  ): Promise<User | null> => {
    const activeTokens = tokenSource ?? tokens;
    const currentUser = baseUser ?? user;

    if (!activeTokens || !currentUser) {
      return null;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/User/get-profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${activeTokens.token}`,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Không thể tải thông tin người dùng.");
    }

    const body = await response.json();
    const profilePayload = body?.data ?? body;

    const mappedUser = parseProfilePayload(profilePayload, currentUser);

    persistAuthState({
      user: mappedUser,
      token: activeTokens.token,
      refreshToken: activeTokens.refreshToken,
    });

    return mappedUser;
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      if (!tokens?.refreshToken) {
        return false;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/Authentication/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: tokens.refreshToken }),
        }
      );

      if (!response.ok) {
        clearAuthState();
        return false;
      }

      const data = await response.json();
      
      if (data.token && data.refreshToken && user) {
        persistAuthState({
          user,
          token: data.token,
          refreshToken: data.refreshToken,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearAuthState();
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/Authentication/login-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Đăng nhập thất bại");
    }

    const data = await response.json();

    const loggedInUser: User = {
      id: data.userId,
      email: data.email ?? email,
      hasCompletedProfile: data.hasCompletedProfile ?? false,
      firstName: data.firstName ?? undefined,
      lastName: data.lastName ?? undefined,
      phoneNumber: data.phoneNumber ?? undefined,
      profileImageUrl: data.profileImageUrl ?? undefined,
      gender: data.gender ? normalizeGender(data.gender) : undefined,
      height: toNullableNumber(data.height),
      weight: toNullableNumber(data.weight),
      trainingGoal: normalizeTrainingGoal(data.trainingGoal) ?? undefined,
      dateOfBirth: data.dateOfBirth ?? undefined,
    };

    const authTokens = {
      token: data.token,
      refreshToken: data.refreshToken,
    };

    persistAuthState({
      user: loggedInUser,
      token: authTokens.token,
      refreshToken: authTokens.refreshToken,
    });

    try {
      await refreshUserProfileInternal(authTokens, loggedInUser);
    } catch (error) {
      console.error("Không thể tải hồ sơ sau khi đăng nhập:", error);
    }

    router.push(
      loggedInUser.hasCompletedProfile ? "/dashboard" : "/profile-setup"
    );
  };

  const register = async (email: string, password: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/Authentication/register-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Đăng ký thất bại");
    }
  };

  const completeProfile = async (profileData: CompleteProfilePayload) => {
    if (!tokens?.token || !user) {
      throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
    }

    const payload = {
      firstName: profileData.firstName?.trim() || null,
      lastName: profileData.lastName?.trim() || null,
      gender: profileData.gender || null,
      age: toNullableNumber(profileData.age ?? ""),
      height: toNullableNumber(profileData.height ?? ""),
      weight: toNullableNumber(profileData.weight ?? ""),
      trainingGoal: profileData.goal || null,
    };

    const response = await fetch(
      `${API_BASE_URL}/api/User/complete-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Cập nhật hồ sơ thất bại");
    }

    const baseUser: User = {
      ...user,
      hasCompletedProfile: true,
    };

    persistAuthState({
      user: baseUser,
      token: tokens.token,
      refreshToken: tokens.refreshToken,
    });

    try {
      await refreshUserProfileInternal(undefined, baseUser);
    } catch (error) {
      console.error("Không thể tải hồ sơ sau khi hoàn tất:", error);
    }

    router.push("/dashboard");
  };

  const updateProfile = async (
    profileData: AccountUpdatePayload
  ): Promise<User | null> => {
    if (!tokens?.token || !user) {
      throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
    }

    const formData = new FormData();

    if (profileData.firstName?.trim()) {
      formData.append("FirstName", profileData.firstName.trim());
    }

    if (profileData.lastName?.trim()) {
      formData.append("LastName", profileData.lastName.trim());
    }

    if (profileData.phoneNumber?.trim()) {
      formData.append("PhoneNumber", profileData.phoneNumber.trim());
    }

    if (profileData.gender) {
      formData.append("Gender", profileData.gender);
    }

    if (profileData.trainingGoal) {
      formData.append("TrainingGoal", profileData.trainingGoal);
    }

    const heightValue = toNullableNumber(profileData.height);
    if (heightValue !== undefined) {
      formData.append("Height", heightValue.toString());
    }

    const weightValue = toNullableNumber(profileData.weight);
    if (weightValue !== undefined) {
      formData.append("Weight", weightValue.toString());
    }

    const dob = ageToDateString(profileData.age);
    if (dob) {
      formData.append("DateOfBirth", dob);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/User/update-profile`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokens.token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Cập nhật hồ sơ thất bại");
    }

    const baseUser: User = {
      ...user,
      hasCompletedProfile: true,
    };

    persistAuthState({
      user: baseUser,
      token: tokens.token,
      refreshToken: tokens.refreshToken,
    });

    try {
      return await refreshUserProfileInternal(undefined, baseUser);
    } catch (error) {
      console.error("Không thể tải hồ sơ sau khi cập nhật:", error);
      return baseUser;
    }
  };

  const refreshProfile = async (): Promise<User | null> => {
    try {
      return await refreshUserProfileInternal();
    } catch (error) {
      console.error("Không thể tải hồ sơ:", error);
      return user;
    }
  };

  const logout = () => {
    clearAuthState();
    router.push("/landing");
  };

  const handleRedirectAfterRegister = () => {
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        completeProfile,
      updateProfile,
      refreshProfile,
      refreshAccessToken,
      handleRedirectAfterRegister,
      accessToken: tokens?.token ?? null,
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
