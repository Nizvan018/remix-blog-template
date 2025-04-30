import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { Loader } from "lucide-react";
import { createPost } from "~/api/post";
import { ActionFunctionArgs } from "@remix-run/node";
import { type CreatePostFromType, createPostFromResolver } from "~/schemes/createPostForm.schema";

export async function action({ request }: ActionFunctionArgs) {
    const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<CreatePostFromType>(request, createPostFromResolver);

    if (errors) {
        return { errors, defaultValues };
    }

    const res = await createPost(data);

    if (res.status !== 201) {
        const error = await res.text();

        console.log(error);

        return { error };
    }

    const post = await res.json();

    return redirect(`/posts/${post.id}`);
}

const CreateForm = () => {
    const { register, handleSubmit, formState: { errors } } = useRemixForm<CreatePostFromType>({
        mode: "onSubmit",
        resolver: createPostFromResolver
    });

    const data = useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <>
            {data && (
                <div className="w-full max-w-[1200px] p-4 rounded-md border-2 border-rose-500 text-rose-500 font-semibold bg-rose-500/10">
                    {data.error ?? "Error on the fields"}
                </div>
            )}

            <Form
                method="post"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full max-w-[1200px] p-8 rounded-md border border-white/20"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                        {...register("title")}
                        type="text"
                        placeholder="An exciting title"
                        className={`border ${errors.title ? "border-rose-500/40" : "border-white/20"} rounded-md p-2 outline-none bg-transparent transition focus:border-white`}
                    />
                    {errors.title?.message && (
                        <span className="text-sm font-semibold text-rose-500">{errors.title.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="body">Body</label>
                    <textarea
                        {...register("body")}
                        rows={5}
                        placeholder="An awesome post!"
                        className={`border ${errors.title ? "border-rose-500/40" : "border-white/20"} rounded-md p-2 outline-none bg-transparent transition focus:border-white resize-none`}
                    />
                    {errors.body?.message && (
                        <span className="text-sm font-semibold text-rose-500">{errors.body.message}</span>
                    )}
                </div>

                <div className="flex justify-end w-full mt-8">
                    <button
                        type="submit"
                        className="flex items-center gap-2 w-fit text-black font-semibold rounded-md py-3 px-4 bg-white transition hover:bg-white/90"
                    >
                        <span>Create post</span>
                        {isSubmitting && (
                            <Loader size={20} className="animate-spin" />
                        )}
                    </button>
                </div>
            </Form>
        </>
    )
}

export default CreateForm;
