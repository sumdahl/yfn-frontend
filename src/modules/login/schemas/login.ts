import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "प्रयोगकर्तानाम कम्तीमा ३ अक्षरको हुनुपर्छ")
    .max(20, "प्रयोगकर्तानाम २० अक्षरभन्दा बढी हुन सक्दैन"),
  password: z.string().min(6, "पासवर्ड कम्तीमा ६ अक्षरको हुनुपर्छ"),
});
export type LoginSchema = z.infer<typeof LoginSchema>;
