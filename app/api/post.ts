import { Post } from "~/generated/prisma";
import prisma from "~/lib/prisma.server";

/**
 * GET all posts
 * 
 * @returns {Promise<Post[] | null>} All posts
 */
export const getPosts = async (): Promise<Post[]> => {
    return await prisma.post.findMany();
}

/**
 * GET one post by id
 * 
 * @param {string} id
 * @returns {Promise<Post | null>} An specific post or undefined if doesn't exist
 */
export const getPostById = async (id: string | undefined): Promise<Post | null> => {
    if (!id) {
        throw new Response("Post ID is required", { status: 400 });
    }

    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

    if (!post) {
        throw new Response("Post not found", { status: 404 });
    }

    return post;
}

/**
 * POST one post
 * 
 * @param {FormData} formData
 * @returns {Promise<Response>} created post
 */
export const createPost = async (formData: FormData): Promise<Response> => {
    try {
        const title = formData.get("title");
        const body = formData.get("body");

        if (typeof title !== "string" || typeof body !== "string") {
            return new Response("Invalid form data", { status: 400 });
        }

        const post = await prisma.post.create({
            data: {
                title: title,
                body: body
            }
        });

        return new Response(JSON.stringify(post), { status: 201 });
    } catch (error) {
        return new Response("An unexpected error has ocurred", { status: 500 });
    }
}
