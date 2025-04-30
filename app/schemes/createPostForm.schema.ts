import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createPostFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required")
});

export type CreatePostFromType = z.infer<typeof createPostFormSchema>;

export const createPostFromResolver = zodResolver(createPostFormSchema);
