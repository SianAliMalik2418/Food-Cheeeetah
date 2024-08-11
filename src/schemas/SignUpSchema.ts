import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be of 2 or more characters")
    .max(20, "Username must be maximumn 20 characters long")
    .trim()
    .regex(/^[a-zA-Z0-9]+$/, "Only letters, numbers, _, - are allowed."),

  email: z
    .string()
    .email({ message: "Invalid Email address." })
    .trim()

    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, {
      message: "Email must not contain special characters.",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
