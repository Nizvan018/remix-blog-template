import { useLoaderData } from "@remix-run/react";
import { getPosts, type Post } from "~/api/post";
import Header from "./Header";
import PostsList from "./PostsList";

export const loader = () => {
	return getPosts();
}

const Index = () => {
	const posts = useLoaderData<Post[]>();

	return (
		<main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
			<Header />

			<PostsList posts={posts} />
		</main>
	);
}

export default Index;
