// API client with JWT auth and auto-refresh
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";

/**
 * Resolved at build time, with no production fallback — see doctor-portal/lib/api.ts.
 * A missing variable must fail the build rather than silently reach live patient data.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Copy .env.example to .env.local for local " +
      "development, or set it in the deployment environment."
  );
}
const API_PREFIX = "/api/v1";

export const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}${API_PREFIX}`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor — inject Bearer token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("careflow_user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Helper for file uploads (multipart/form-data)
export function createFormDataApi() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;
  return axios.create({
    baseURL: `${BASE_URL}${API_PREFIX}`,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    timeout: 300000, // 5 min for large file uploads
  });
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
