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
  name: z.string().min(1, { message: "Name is required" }),

  dob: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .superRefine((dob, ctx) => {
      const ad = BSToAD(dob); // Assumes valid ISO date string
      const age = getAgeFromBirthdate(ad);

      if (age < 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You must be at least 18 years old",
          path: ["dob"],
        });
      }

      if (age > 40) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You must be 40 years old or younger",
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
    .instanceof(File, { message: "Passport photo is required" })
    .refine(isJpeg, { message: "Passport photo must be a JPG/JPEG file" })
    .optional(),

  citizenship_front: z
    .instanceof(File, { message: "Front side of citizenship is required" })
    .refine(isJpeg, { message: "Front side must be a JPG/JPEG file" })
    .optional(),

  citizenship_back: z
    .instanceof(File, { message: "Back side of citizenship is required" })
    .refine(isJpeg, { message: "Back side must be a JPG/JPEG file" })
    .optional(),
});

export type CommonFormSchema = z.infer<typeof CommonFormSchema>;
