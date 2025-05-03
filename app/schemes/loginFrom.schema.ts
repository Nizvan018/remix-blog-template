import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(8, "Password is too short").max(50, "Password is too long")
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const loginFormResolver = zodResolver(loginFormSchema);
