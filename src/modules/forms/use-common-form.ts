import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommonFormSchema } from "./schemas/common-form-schema";
import { useCallback, useState } from "react";
import { api } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSectorStore from "@/stores/sector-store";

export const useCommonForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const firstMember = useSectorStore((s) => s.sectorMemberList[0]);
  const userId = firstMember?.id ?? null; //ensures data not be null
  console.log("UserId: ", userId);

  const navigate = useNavigate();
  // use that userId here to perform patch request
  //user/:userId
  // const [loading, setLoading] = useState(false);
  const form = useForm<CommonFormSchema>({
    resolver: zodResolver(CommonFormSchema),
    defaultValues: {
      name: "",
      name_en: "",
      dob: undefined,
      phone: "",
      party_no: "",
      citizenship_no: "",
      photo: undefined,
      citizenship_front: undefined,
      citizenship_back: undefined,
    },
    mode: "onChange", // Trigger validation on change for immediate feedback
  });

  const onSubmit = useCallback(
    async (data: CommonFormSchema) => {
      if (!userId) {
        console.error("User ID not available");
        return;
      }

      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("name", data.name); //nepali name asked to be removed
        formData.append("name_en", data.name_en);
        formData.append(
          "dob",
          data.dob ? new Date(data.dob).toISOString().split("T")[0] : ""
        );

        formData.append("phone", data.phone);
        formData.append("citizenship_no", data.citizenship_no);

        if (data.party_no.trim() !== "") {
          formData.append("party_no", data.party_no);
        }

        if (data.photo) formData.append("photo", data.photo);
        if (data.citizenship_front)
          formData.append("citizenship_front", data.citizenship_front);
        if (data.citizenship_back)
          formData.append("citizenship_back", data.citizenship_back);

        console.log(formData);

        const response = await api.patch(`/user/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const result = await response.data; //data ma user ko details pathauxa save garera arko redirected page ma dekhaidinxu
        console.log("Patch success:", result);

        toast.success(result.message);

        navigate("/success", { replace: true }); //show message
        //or render new page
      } catch (error) {
        console.error("Patch error:", error);
      } finally {
        setLoading(false);
      }
    },
    [userId, navigate]
  );

  return { ...form, loading, onSubmit: form.handleSubmit((e) => onSubmit(e)) };
};
