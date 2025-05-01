import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { api } from "@/api/axios";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "./schemas/login";

export const useLoginForm = () => {
  const login = useAuthStore((e) => e.update);
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
        const response = await api.post("/auth/login", data);
        const res = response.data?.data;
        if (!res.access_token || !res?.user_details) {
          throw new Error("Invalid login response");
        }
        login(res.access_token, res.user_details);
        navigate("/minute", { replace: true });
      } catch (error: any) {
        console.log("Login failed", error);
        toast.error(error.message || "Unable to login, please try again.");
      } finally {
        setLoading(false);
      }
    },
    [login, navigate]
  );

  return { ...form, loading, onSubmit: handleSubmit((e) => onSubmit(e)) };
};
