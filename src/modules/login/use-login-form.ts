import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { api } from "@/api/axios";
import { useAuthStore } from "@/stores/auth-store";
import { useSessionStore } from "@/stores/sector-store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "./schemas/login";
import { AxiosError } from "axios";

export const useLoginForm = () => {
  const login = useAuthStore((e) => e.update);
  const setSectorResponse = useSessionStore((s) => s.setSectorResponse);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = useCallback(
    async (data: LoginSchema) => {
      try {
        setLoading(true);

        //Login request
        const response = await api.post("/auth/login", data);
        const res = response.data?.data;

        if (!res.access_token || !res?.user_details) {
          throw new Error("Invalid login response");
        }
        login(res.access_token, res.user_details);

        const sectorRes = await api.get("/sector");
        const sectorData = sectorRes.data;

        console.log(sectorData);

        if (!sectorData?.success || !sectorData?.data) {
          throw new Error("Failed to fetch sector data.");
        }

        setSectorResponse(sectorData); //setSectorResponse

        navigate("/forms", { replace: true });
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          const message =
            (axiosError.response.data as { message?: string })?.message ||
            "Invalid username or password";
          toast.error(message);
        } else {
          toast.error("500 server error");
        }
      } finally {
        setLoading(false);
      }
    },
    [login, navigate, setSectorResponse]
  );

  return { ...form, loading, onSubmit: handleSubmit((e) => onSubmit(e)) };
};
