import { Form } from "@remix-run/react";

const CreateForm = () => {
    return (
        <Form
            method="post"
            className="flex flex-col gap-4 w-full max-w-[1200px] p-8 rounded-md border border-white/20"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="An exciting title"
                    className="border border-white/20 rounded-md p-2 outline-none bg-transparent transition focus:border-white"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    name="body"
                    rows={5}
                    placeholder="An awesome post!"
                    className="border border-white/20 rounded-md p-2 outline-none bg-transparent transition focus:border-white resize-none"
                />
            </div>

            <div className="flex justify-end w-full mt-8">
                <button
                    type="submit"
                    className="w-fit text-black font-semibold rounded-md py-2 px-4 bg-white transition hover:bg-white/90"
                >
                    Create post
                </button>
            </div>
        </Form>
    )
}

export default CreateForm;
