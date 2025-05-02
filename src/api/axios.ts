import axios from "axios";

import { useAuthStore } from "@/stores/auth-store";

export const baseURL = "https://api.tarunregmi.com.np";

export const api = axios.create({ baseURL: baseURL + "/api" });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  // incase of Unauthorized request
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login"; // Redirect on unauthorized
    }
    return Promise.reject(error);
  }
);
