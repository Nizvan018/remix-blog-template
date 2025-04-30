import Header from "./Header";
import CreateForm from "./CreateForm";
import { ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { createPost } from "~/api/post";
import { toast } from "sonner";
import { isRouteErrorResponse, useActionData } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const res = await createPost(formData);

    if (res.status !== 201) {
        const error = await res.text();

        console.log(error);

        return { error };
    }

    const post = await res.json();

    return redirect(`/posts/${post.id}`);
}

const PostCreatePage = () => {
    return (
        <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
            <Header />

            <CreateForm />
        </main>
    )
}

export default PostCreatePage;
