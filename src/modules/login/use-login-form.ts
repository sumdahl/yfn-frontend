import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { api } from "@/api/axios";
import { useAuthStore } from "@/stores/auth-store";
import { useSessionStore } from "@/stores/sector-store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "./schemas/login";

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

        // //Fetch /sector data
        // const sectorRes = await api.get("/sector");
        // const sectorRes = await fetch(
        //   ""
        // );
        // const sectorData = sectorRes.json();
        // console.log(sectorData);
        const sectorRes = await api.get("/sector");
        const sectorData = sectorRes.data;

        console.log(sectorData);

        // if (!sectorData?.success || !sectorData?.data) {
        //   throw new Error("Failed to fetch sector data.");
        // }

        // setSectorResponse(sectorData);    //setSectorResponse

        navigate("/forms", { replace: true });
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
