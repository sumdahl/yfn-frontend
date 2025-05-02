import { z } from "zod";

import { differenceInYears, isBefore } from "date-fns";

function getAgeFromBirthdate(birthDate: Date): number {
  const today = new Date();

  let age = differenceInYears(today, birthDate);

  const thisYearBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (isBefore(today, thisYearBirthday)) {
    age--;
  }

  return age;
}

const isJpeg = (file?: File) =>
  !!file && (file.type === "image/jpeg" || file.type === "image/jpg");

export const CommonFormSchema = z.object({
  name_ne: z.string().min(1, { message: "Name is required" }),
  name_en: z.string().min(1, { message: "Name is required" }),

  dob: z.coerce.date().refine(
    (dob) => {
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      return age >= 18 && age <= 40;
    },
    {
      message: "Age must be between 18 and 40 years",
    }
  ),

  phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must contain only digits" }),

  party_no: z.string().length(7).optional(),

  photo: z
    .custom<File>((file) => file instanceof File, "फोटो अपलोड गर्नुहोस्।")
    .refine(isJpeg, {
      message: "JPG/JPEG मात्र स्वीकार्य छ।",
    }),

  citizenship_no: z
    .string()
    .min(4, { message: "Citizhenship no. is required." }),

  citizenship_front: z
    .custom<File>(
      (file) => file instanceof File,
      "अगाडिको नागरिकता अपलोड गर्नुहोस्।"
    )
    .refine(isJpeg, {
      message: "JPG/JPEG मात्र स्वीकार्य छ।",
    }),

  citizenship_back: z
    .custom<File>(
      (file) => file instanceof File,
      "पछाडिको नागरिकता अपलोड गर्नुहोस्।"
    )
    .refine(isJpeg, {
      message: "JPG/JPEG मात्र स्वीकार्य छ।",
    }),
});

export type CommonFormSchema = z.infer<typeof CommonFormSchema>;
