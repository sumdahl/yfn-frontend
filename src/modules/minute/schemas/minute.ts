import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

// Define the form schema with Zod
export const minuteSchema = z.object({
  minuteFile: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than 1MB`,
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are accepted",
    }),
});

export type FormValues = z.infer<typeof minuteSchema>;
