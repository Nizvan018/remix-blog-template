import { Params, redirect } from "react-router";

export interface Post {
    id: number;
    title: string;
    body: string;
}

const data = [
    {
        id: 1,
        title: "Post 1",
        body: "Hello world"
    },
    {
        id: 2,
        title: "Post 2",
        body: "Lorem ipsum"
    }
];

/**
 * GET all posts
 * 
 * @returns {Post[]} All posts
 */
export const getPosts = (): Post[] => {
    return data;
}

/**
 * GET one post by id
 * 
 * @param {LoaderFunctionArgs} params
 * @returns {Post | null} An specific post or undefined if doesn't exist
 */
export const getPostById = (params: Params<string>): Post | null => {
    const { postId } = params;

    if (!postId) {
        return null;
    }

    return data.find(post => post.id === Number(postId)) ?? null;
}

/**
 * POST one post
 * 
 * @param {ActionFunctionArgs} request
 * @returns {Promise<Response>}
 */
export const createPost = async (request: Request): Promise<Response> => {
    const formData = await request.formData();
    const title = formData.get("title");
    const body = formData.get("body");

    console.log({ title, body });

    return redirect("/");
}
