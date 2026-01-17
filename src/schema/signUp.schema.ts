import { z } from "zod";

// Add custom schema
export const signUpSchema = z.object({
  name: z.string().nonempty("Name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  terms: z.boolean().refine((value) => value, {
    message: "You must agree to the terms and privacy policy.",
  }),
});
