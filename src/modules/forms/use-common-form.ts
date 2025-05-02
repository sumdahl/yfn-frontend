import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { api } from "@/api/axios";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CommonFormSchema } from "./schemas/common";

export const useCommonForm = () => {
  const updateAuth = useAuthStore((state) => state.update);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CommonFormSchema>({
    resolver: zodResolver(CommonFormSchema),
    defaultValues: {
      name_ne: "",
      name_en: "",
      dob: "",
      phone: "",
      party_no: "",
      citizenship_no: "",
      photo: undefined,
      citizenship_front: undefined,
      citizenship_back: undefined,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = useCallback(
    async (data: CommonFormSchema) => {
      try {
        setLoading(true);

        // Create FormData for multipart file uploads
        const formData = new FormData();
        formData.append("name_ne", data.name_ne);
        formData.append("name_en", data.name_en);
        formData.append("dob", data.dob);
        formData.append("phone", data.phone);
        if (data.party_no) formData.append("party_no", data.party_no);
        formData.append("citizenship_no", data.citizenship_no);
        if (data.photo) formData.append("photo", data.photo);
        if (data.citizenship_front)
          formData.append("citizenship_front", data.citizenship_front);
        if (data.citizenship_back)
          formData.append("citizenship_back", data.citizenship_back);

        // Send request to API
        const response = await api.post("/api/sector", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Validate response
        if (!response.data?.success || !response.data?.data) {
          throw new Error("Invalid response from server");
        }

        // Optionally update auth store if user details are returned
        const userDetails = response.data.data.user_details; // Adjust based on actual response
        if (userDetails && response.data.data.access_token) {
          updateAuth(response.data.data.access_token, userDetails);
        }

        // Show success message and navigate
        toast.success("Form submitted successfully!");
        navigate("/sector", { replace: true });
      } catch (error: any) {
        console.error("Form submission failed", error);
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Unable to submit form, please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [navigate, updateAuth]
  );

  return { ...form, loading, onSubmit: handleSubmit(onSubmit) };
};
