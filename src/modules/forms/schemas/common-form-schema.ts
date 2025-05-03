import { z } from "zod";

// import { differenceInYears, isBefore } from "date-fns";

// function getAgeFromBirthdate(birthDate: Date): number {
//   const today = new Date();

//   let age = differenceInYears(today, birthDate);

//   const thisYearBirthday = new Date(
//     today.getFullYear(),
//     birthDate.getMonth(),
//     birthDate.getDate()
//   );

//   if (isBefore(today, thisYearBirthday)) {
//     age--;
//   }

//   return age;
// }

const isJpeg = (file?: File) =>
  !!file && (file.type === "image/jpeg" || file.type === "image/jpg");

export const CommonFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  name_en: z.string().min(1, { message: "Name is required" }),

  dob: z.coerce.date().superRefine((dob, ctx) => {
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "उमेर १८ वर्ष भन्दा बढी हुनुपर्छ।",
      });
    } else if (age > 40) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "उमेर ४० वर्ष नाघेको हुनुहुदैन ",
      });
    }
  }),

  phone: z.string().length(10, { message: "नम्बर मात्रै १० अंक" }),
  // .regex(/^\d{10}$/, { message: "Phone number must contain only digits" }),

  party_no: z.string().max(15, { message: " " }).or(z.literal("")),

  photo: z
    .custom<File>((file) => file instanceof File, "फोटो अपलोड गर्नुहोस्।")
    .refine(isJpeg, {
      message: "JPG/JPEG मात्र स्वीकार्य छ।",
    }),

  citizenship_no: z
    .string()
    .max(50, { message: "नागरिकता नं ५० अक्षरभन्दा कम हुनुपर्छ" })
    .regex(/^[0-9-]+$/, {
      message: "नागरिकता नं केवल अंक र '-' मात्र हुनुपर्छ",
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
