import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommonFormSchema } from "./schemas/common";
import { useCallback, useState } from "react";

import { useSessionStore } from "@/stores/sector-store";

export const useCommonForm = () => {
  const sectorMemberList = useSessionStore(
    (s) => s.sectorResponse?.sector_list[1].sector_member_list[0]
  );

  const userId = sectorMemberList?.id;

  // use that userId here to perform patch request
  //user/:userId
  // const [loading, setLoading] = useState(false);
  const form = useForm<CommonFormSchema>({
    resolver: zodResolver(CommonFormSchema),
    defaultValues: {
      name_ne: "",
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

  // const onSubmit = useCallback(async (data: CommonFormSchema) => {
  //   try {
  //     //call to api axios

  //     setLoading(true);
  //     const response = await api.patch(`/user/${userId}`);
  //     const res = response.data?.data;
  //     console.log(res);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error,", error);

  //   }
  // });

  return {
    ...form,
    loading: false,
    onSubmit: form.handleSubmit((e) => console.log(e), console.error),
  };
};
