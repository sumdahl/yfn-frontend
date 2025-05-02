// import { useAuthStore } from "@/stores/auth-store";
// import axios from "axios";

// export const baseURL =
//   "https://da3f-2400-1a00-b060-261e-f4a-b4d9-13a1-22ca.ngrok-free.app";

// export const api = axios.create({ baseURL: baseURL + "/api" });

// axios.interceptors.request.use((config) => {
//   config.headers["Authorization"] = "Bearer " + useAuthStore.getState().token;
//   return config;
// });

import axios from "axios";

import { useAuthStore } from "@/stores/auth-store";

export const baseURL = "https://dummyjson.com";

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
