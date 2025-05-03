import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const signupFormSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .max(50, "The password is too long (max 5 chars)"),
    fullName: z.string()
        .min(1, "Name is required")
        .min(3, "The name is too short")
});

export type SignupFormType = z.infer<typeof signupFormSchema>;

export const signupFormResolver = zodResolver(signupFormSchema);
