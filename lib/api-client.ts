import { API_BASE_URL } from "./config";

export interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
  skipRefresh?: boolean;
}

export class ApiClient {
  private static getStoredAuth() {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("flexup_auth");
    return stored ? JSON.parse(stored) : null;
  }

  private static updateStoredToken(newToken: string, newRefreshToken: string) {
    if (typeof window === "undefined") return;
    const auth = this.getStoredAuth();
    if (auth) {
      auth.token = newToken;
      auth.refreshToken = newRefreshToken;
      localStorage.setItem("flexup_auth", JSON.stringify(auth));
    }
  }

  private static async refreshToken(): Promise<string | null> {
    const auth = this.getStoredAuth();
    if (!auth?.refreshToken) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/api/Authentication/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: auth.refreshToken }),
      });

      if (!response.ok) {
        // Refresh failed - clear auth
        localStorage.removeItem("flexup_auth");
        return null;
      }

      const data = await response.json();
      
      if (data.token && data.refreshToken) {
        this.updateStoredToken(data.token, data.refreshToken);
        return data.token;
      }

      return null;
    } catch (error) {
      console.error("Token refresh error:", error);
      localStorage.removeItem("flexup_auth");
      return null;
    }
  }

  static async fetch(url: string, options: ApiRequestOptions = {}): Promise<Response> {
    const { requireAuth = true, skipRefresh = false, headers = {}, ...fetchOptions } = options;

    // Add authorization header if required
    let requestHeaders = { ...headers };
    if (requireAuth) {
      const auth = this.getStoredAuth();
      if (auth?.token) {
        requestHeaders = {
          ...requestHeaders,
          Authorization: `Bearer ${auth.token}`,
        };
      }
    }

    // Make initial request
    let response = await fetch(url, {
      ...fetchOptions,
      headers: requestHeaders,
    });

    // If 401 and we haven't tried refreshing yet, attempt token refresh
    if (response.status === 401 && requireAuth && !skipRefresh) {
      const newToken = await this.refreshToken();
      
      if (newToken) {
        // Retry request with new token
        requestHeaders = {
          ...requestHeaders,
          Authorization: `Bearer ${newToken}`,
        };

        response = await fetch(url, {
          ...fetchOptions,
          headers: requestHeaders,
        });
      } else {
        // Refresh failed - redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return response;
  }

  static async get(url: string, options?: ApiRequestOptions) {
    return this.fetch(url, { ...options, method: "GET" });
  }

  static async post(url: string, body?: any, options?: ApiRequestOptions) {
    return this.fetch(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static async put(url: string, body?: any, options?: ApiRequestOptions) {
    return this.fetch(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static async delete(url: string, options?: ApiRequestOptions) {
    return this.fetch(url, { ...options, method: "DELETE" });
  }
}
