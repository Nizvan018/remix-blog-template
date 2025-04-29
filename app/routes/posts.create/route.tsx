import Header from "./Header";
import CreateForm from "./CreateForm";
import { ActionFunctionArgs } from "@remix-run/node";
import { createPost } from "~/api/post";

export const action = async ({ request }: ActionFunctionArgs) => {
    return createPost(request);
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
