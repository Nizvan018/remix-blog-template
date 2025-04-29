import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getPostById, type Post } from "~/api/post";
import Header from "./Header";
import PostCard from "./PostCard";

export const loader = ({ params }: LoaderFunctionArgs) => {
    return getPostById(params);
}

const SinglePost = () => {
    const post = useLoaderData<Post>();

    if (!post) {
        return (
            <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
                <h2>The post wasn&apos;t found</h2>
            </main>
        )
    }

    return (
        <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
            <Header />

            <PostCard post={post} />
        </main>
    )
}

export default SinglePost;
