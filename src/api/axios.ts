import { useAuthStore } from "@/stores/auth-store";
import axios from "axios";

// const hostName = "http://192.168.45.6:8080";
export const baseURL = "https://3685-27-34-66-132.ngrok-free.app/api/";

export const api = axios.create({ baseURL });

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + useAuthStore.getState().token;
  return config;
});
