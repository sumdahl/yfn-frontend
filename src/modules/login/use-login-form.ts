import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { api } from "@/api/axios";
import { useAuthStore } from "@/stores/auth-store";
import useSectorStore from "@/stores/sector-store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "./schemas/login";
import { AxiosError } from "axios";
import { SectorApiResponse } from "@/constants/api-sector";
import { User } from "@/models/user";

export const useLoginForm = () => {
  const { update } = useAuthStore();
  const { setSectorData, setLoading } = useSectorStore();
  const [loading, setFormLoading] = useState(false);
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
        setFormLoading(true);
        setLoading(true);

        //Login request
        const response = await api.post("/auth/login", data);
        const res: { access_token: string; user_details: User } =
          response.data?.data;

        if (!res.access_token || !res?.user_details) {
          throw new Error("Invalid login response");
        }
        update(res.access_token, res.user_details);

        const sectorRes = await api.get<SectorApiResponse>("/sector");
        const sectorData = sectorRes.data;

        if (!sectorData?.success || !sectorData?.data) {
          throw new Error("Failed to fetch sector data.");
        }

        if (
          !sectorData.data.minute_details ||
          !sectorData.data.sector_list ||
          !Array.isArray(sectorData.data.sector_list)
        ) {
          throw new Error("Invalid sector data structure");
        }

        setSectorData(sectorData.data);

        console.log("Sector response set. Navigating...");
        navigate("/forms", { replace: true });
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          const message =
            (axiosError.response.data as { message?: string })?.message ||
            "Invalid username or password";
          toast.error(message);
        } else if (axiosError.response?.status === 401) {
          toast.error("Unauthorized access. Please log in again.");
        } else {
          toast.error("500 server error");
        }
      } finally {
        setFormLoading(false);
        setLoading(false);
      }
    },
    [update, navigate, setSectorData, setLoading]
  );

  return { ...form, loading, onSubmit: handleSubmit((e) => onSubmit(e)) };
};
