import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty("प्रयोगकर्तानाम आवश्यक छ")
    .regex(/^[\w.-]+@yfn\.com$/, "प्रयोगकर्तानाम @yfn.com मा समाप्त हुनुपर्छ")
    .max(40, ""),
  password: z
    .string()
    .nonempty("पासवर्ड आवश्यक छ")
    .max(16, "पासवर्ड १६ अक्षरभन्दा बढी हुन सक्दैन"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
