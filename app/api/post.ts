import { Post } from "~/generated/prisma";
import prisma from "~/lib/prisma.server";
import { CreatePostFromType } from "~/schemes/createPostForm.schema";

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
 * @param {CreatePostFromType} data
 * @returns {Promise<Response>} created post
 */
export const createPost = async (data: CreatePostFromType): Promise<Response> => {
    try {
        const post = await prisma.post.create({
            data: {
                title: data.title,
                body: data.body
            }
        });

        return new Response(JSON.stringify(post), { status: 201 });
    } catch (error) {
        return new Response("An unexpected error has ocurred", { status: 500 });
    }
}

/**
 * DELETE one post by id
 * 
 * @param {string} id
 * @returns {Promise<Response>} deleted post
 */
export const deletePostById = async (id: string): Promise<Response> => {
    try {
        const post = await prisma.post.delete({
            where: {
                id: id
            }
        });

        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error) {
        return new Response("En unexpected error has ocurred", { status: 500 });
    }
}
