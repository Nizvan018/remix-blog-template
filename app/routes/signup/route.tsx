import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { Loader, LogIn } from "lucide-react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { createUser } from "~/api/user.server";
import { type SignupFormType, signupFormResolver } from "~/schemes/signupForm.schema";
import { sessionStorage } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await sessionStorage.getSession(request.headers.get("cookie"));
    const user = session.get("user");

    if (user) {
        return redirect("/");
    }

    return null;
}

export async function action({ request }: ActionFunctionArgs) {
    const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<SignupFormType>(request, signupFormResolver);

    if (errors) {
        return { errors, defaultValues };
    }

    const res = await createUser(data);

    if (!res.ok) {
        const error = await res.text();
        console.error(error);

        return { error };
    }

    return redirect("/login");
}

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors } } = useRemixForm<SignupFormType>({
        mode: "onSubmit",
        resolver: signupFormResolver
    });

    const data = useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <main className="flex flex-col justify-center items-center gap-4 w-full h-screen px-8">
            {data && (
                <div className="w-full max-w-md p-4 rounded-md border-2 border-rose-500 text-rose-500 font-semibold bg-rose-500/10">
                    {data.error ?? "Error on the fields"}
                </div>
            )}

            <section className="flex flex-col gap-16 w-full max-w-md p-8 rounded-md border border-white/20">
                <h1 className="text-4xl font-bold">Sign up 📥</h1>

                <Form
                    method="post"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full"
                >
                    {/* FULL NAME */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName">Full name</label>
                        <input
                            {...register("fullName")}
                            type="text"
                            placeholder="Keanu Charles Reeves"
                            className={`border ${errors.fullName ? "border-rose-500/40" : "border-white/20"} rounded-md p-2 outline-none bg-transparent transition focus:border-white`}
                        />
                        {errors.fullName?.message && (
                            <span className="text-sm font-semibold text-rose-500">{errors.fullName.message}</span>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">E-mail</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="example@gmail.com"
                            className={`border ${errors.email ? "border-rose-500/40" : "border-white/20"} rounded-md p-2 outline-none bg-transparent transition focus:border-white`}
                        />
                        {errors.email?.message && (
                            <span className="text-sm font-semibold text-rose-500">{errors.email.message}</span>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="example@gmail.com"
                            className={`border ${errors.password ? "border-rose-500/40" : "border-white/20"} rounded-md p-2 outline-none bg-transparent transition focus:border-white`}
                        />
                        {errors.password?.message && (
                            <span className="text-sm font-semibold text-rose-500">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-4 w-full mt-12">
                        <Link
                            to="/login"
                            className="underline text-xs text-white/50"
                        >
                            Do you already have an account?
                        </Link>

                        <button
                            type="submit"
                            className="flex items-center gap-2 w-fit text-black font-semibold rounded-md py-3 px-4 bg-white transition hover:bg-white/90"
                        >
                            {isSubmitting ? (
                                <>
                                    <span>Loading</span>
                                    <Loader size={20} className="animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Sign up</span>
                                    <LogIn size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default SignupPage;
