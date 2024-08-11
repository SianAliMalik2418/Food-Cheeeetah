import { z } from "zod";

export const UserProfileSchema = z.object({
  email: z.string().optional(),
  username: z
    .string()
    .min(2, "Username must be of 2 or more characters")
    .max(20, "Username must be maximumn 20 characters long")
    .trim()
    .regex(/^[a-zA-Z0-9]+$/, "Only letters, numbers, _, - are allowed."),
  city: z.string().min(1, "This field is required!"),
  country: z.string().min(1, "This field is required!"),
  addressLine1: z.string().min(1, "This field is required!"),
});

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
