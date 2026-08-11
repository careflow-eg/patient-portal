import { Token, LoginRequest, RegisterRequest, User } from "@/types/auth";

export const authService = {
  async login(credentials: LoginRequest): Promise<Token> {
    try {
      const res = await fetch("/api/patient/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Authentication failed");
      }

      const data = await res.json();
      if (data.access_token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("careflow_user", JSON.stringify(data.user));
        }
      }
      return data;
    } catch (err: any) {
      console.warn("Local API auth failed, trying legacy endpoint:", err);
      const res = await fetch("https://careflow-workflow-orchestrator.up.railway.app/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return await res.json();
    }
  },

  async register(payload: RegisterRequest): Promise<{ data: User }> {
    const res = await fetch("/api/patient/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Registration failed");
    }

    const data = await res.json();
    return data;
  },

  async getMe(): Promise<User> {
    const res = await fetch("/api/patient/me");
    const data = await res.json();
    return data.data;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("careflow_user");
    }
  },
};
