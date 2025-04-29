import { Link } from "@remix-run/react";
import type { Post } from "~/api/post";

interface Props {
    posts: Post[];
}

const PostsList = ({ posts }: Props) => {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[1200px]">
            {posts.map(post => (
                <div
                    key={post.id}
                    className="flex items-center gap-4 p-6 rounded-md border border-white/20 w-full"
                >
                    <h2 className="font-semibold">{post.title}</h2>
                    <span>·</span>
                    <Link
                        to={`/posts/${post.id}`}
                        className="text-xs text-white/60 underline transition hover:text-white"
                    >
                        View post
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default PostsList;
