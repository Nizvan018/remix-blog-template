import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/api/post";
import Header from "./Header";
import PostsList from "./PostsList";
import { Post } from "~/generated/prisma";

export const loader = async () => {
	try {
		const posts = await getPosts();

		return posts;
	} catch (error) {
		console.error(error);

		throw new Response(JSON.stringify({
			error: "Error getting posts",
			message: (error as Error).message
		}), { status: 500 });
	}
}

export function ErrorBoundary() {
	return (
		<main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
			<strong className="text-rose-500">Unexpected error ❌</strong>
		</main>
	)
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
