import { Post } from "~/generated/prisma";

interface Props {
    post: Post;
}

const PostCard = ({ post }: Props) => {
    return (
        <article className="flex flex-col gap-8 w-full max-w-[1200px] p-8 rounded-md border border-white/20">
            <h2 className="text-xl font-bold">{post.title}</h2>

            <div className="flex flex-col gap-1">
                <h3 className="text-gray-400 text-sm font-semibold">Content</h3>
                <p>{post.body}</p>
            </div>
        </article>
    )
}

export default PostCard;
