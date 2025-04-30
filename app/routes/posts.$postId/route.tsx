import { Form, redirect, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { deletePostById, getPostById } from "~/api/post";
import Header from "./Header";
import PostCard from "./PostCard";
import CustomErrorBoundary from "~/components/CustomErrorBoundary";
import { Post } from "~/generated/prisma";
import { Loader, Shredder } from "lucide-react";

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

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const id = formData.get("postId");

    if (typeof id !== "string") {
        return { error: "The id is not valid" }
    }

    const res = await deletePostById(id);

    if (!res.ok) {
        const error = await res.text();
        console.error(error);

        return { error };
    }

    return redirect("/");
}

export function ErrorBoundary() {
    return <CustomErrorBoundary />
}

const SinglePost = () => {
    const post = useLoaderData<Post>();
    const data = useActionData<typeof action>();
    const navigation = useNavigation();
    const isDeleting = navigation.state === "submitting";

    return (
        <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
            <Header />

            {data?.error && (
                <span className="w-full max-w-[1200px] p-4 rounded-md border-2 border-rose-500 text-rose-500 font-semibold bg-rose-500/10">
                    {data.error}
                </span>
            )}

            <PostCard post={post} />

            <Form method="delete" className="flex justify-end w-full max-w-[1200px]">
                <input type="text" hidden name="postId" value={post.id} />
                <button
                    type="submit"
                    className="flex items-center gap-2 w-fit text-white font-semibold rounded-md py-3 px-4 bg-rose-600 transition hover:bg-rose-700"
                >
                    {isDeleting ? (
                        <>
                            <span>Deleting post</span>
                            <Loader size={20} className="animate-spin" />
                        </>
                    ) : (
                        <>
                            <span>Delete post</span>
                            <Shredder size={20} />
                        </>
                    )}
                </button>
            </Form>
        </main>
    )
}

export default SinglePost;
