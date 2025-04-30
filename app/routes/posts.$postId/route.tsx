import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getPostById } from "~/api/post";
import Header from "./Header";
import PostCard from "./PostCard";
import CustomErrorBoundary from "~/components/CustomErrorBoundary";
import { Post } from "~/generated/prisma";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const { postId } = params;
        const post = await getPostById(postId);

        return json(post);
    } catch (error) {
        console.error(error);

        if (error instanceof Response) {
            throw error;
        }

        throw new Response("An unexpected error has ocurred", { status: 500 });
    }
}

export function ErrorBoundary() {
    return <CustomErrorBoundary />
}

const SinglePost = () => {
    const post = useLoaderData<Post>();

    return (
        <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
            <Header />

            <PostCard post={post} />
        </main>
    )
}

export default SinglePost;
