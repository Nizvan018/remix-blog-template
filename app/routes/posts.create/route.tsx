import { Outlet } from "@remix-run/react";
import Header from "./Header";

const PostCreatePage = () => {
    return (
        <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
            <Header />

            <Outlet />
        </main>
    )
}

export default PostCreatePage;
