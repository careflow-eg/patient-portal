// API client with JWT auth and auto-refresh
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.careflowai.health";
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "/api/v1";

export const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL.replace(/\/$/, "")}${API_PREFIX}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach JWT token if present
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("careflow_patient_access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor: Redirect to login on 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (!pathname.startsWith("/login") && !pathname.startsWith("/register")) {
        localStorage.removeItem("careflow_patient_access_token");
        localStorage.removeItem("careflow_patient_refresh_token");
        window.location.href = "/login?expired=1";
      }
    }
    return Promise.reject(error);
  }
);
