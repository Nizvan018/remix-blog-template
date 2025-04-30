import { useFetcher } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { action } from "./route";
import { Loader } from "lucide-react";

const CreateForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            body: ""
        }
    });
    const fetcher = useFetcher<typeof action>();
    const data = fetcher.data;
    const isSubmitting = fetcher.state === "submitting";

    const onSubmit = handleSubmit(async (data) => {
        fetcher.submit(data, {
            method: "POST"
        });
    });

    return (
        <>
            {data && (
                <div className="w-full max-w-[1200px] p-4 rounded-md border-2 border-rose-500 text-rose-500 font-semibold bg-rose-500/10">{data.error}</div>
            )}

            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-4 w-full max-w-[1200px] p-8 rounded-md border border-white/20"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Title</label>
                    <input
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Title is required"
                            }
                        })}
                        type="text"
                        placeholder="An exciting title"
                        className="border border-white/20 rounded-md p-2 outline-none bg-transparent transition focus:border-white"
                    />
                    {errors.title?.message && (
                        <span className="text-xs font-semibold text-rose-500">{errors.title.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="body">Body</label>
                    <textarea
                        {...register("body", {
                            required: {
                                value: true,
                                message: "Body is required"
                            }
                        })}
                        rows={5}
                        placeholder="An awesome post!"
                        className="border border-white/20 rounded-md p-2 outline-none bg-transparent transition focus:border-white resize-none"
                    />
                    {errors.body?.message && (
                        <span className="text-xs font-semibold text-rose-500">{errors.body.message}</span>
                    )}
                </div>

                <div className="flex justify-end w-full mt-8">
                    <button
                        type="submit"
                        className="flex items-center gap-2 w-fit text-black font-semibold rounded-md py-2 px-4 bg-white transition hover:bg-white/90"
                    >
                        <span>Create post</span>
                        {isSubmitting && (
                            <Loader size={20} className="animate-spin" />
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateForm;
