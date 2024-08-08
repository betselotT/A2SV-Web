import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(6, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
  confirmPassword: z.string().min(6, "Password must be atleast 6 characters"),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});
