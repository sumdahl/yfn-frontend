import { BSToAD } from "react-nepali-datepicker-bs";
import { z } from "zod";

import { differenceInYears, isBefore, parseISO } from "date-fns";

function getAgeFromBirthdate(birthdate: string): number {
  const birthDate = parseISO(birthdate);
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

  dob: z
    .string()
    .min(1, { message: "जन्म मिति आवश्यक छ।" })
    .superRefine((dob, ctx) => {
      const ad = BSToAD(dob); // Convert BS to AD
      const age = getAgeFromBirthdate(ad);

      if (age < 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "न्यूनतम उमेर १८ वर्ष हुनुपर्छ।",
          path: ["dob"],
        });
      }

      if (age > 40) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "उमेर ४० वर्ष माथि को प्रतिनिधिलाई आवेदन दिन निषेध गरिएको छ।",
          path: ["dob"],
        });
      }
    }),

  phone_number: z
    .string()
    .length(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must contain only digits" }),

  party_number: z.string().optional(),

  passport_photo: z
    .custom<File>((file) => file instanceof File, "फोटो अपलोड गर्नुहोस्।")
    .refine(isJpeg, {
      message: "JPG/JPEG मात्र स्वीकार्य छ।",
    }),

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
