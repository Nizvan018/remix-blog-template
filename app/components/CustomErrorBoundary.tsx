import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

const CustomErrorBoundary = () => {
    const error = useRouteError();

    console.log(error);

    if (isRouteErrorResponse(error)) {
        return (
            <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
                <strong className="text-rose-500">{error.data} ❌</strong>
            </main>
        )
    }

    return (
        <main className="flex flex-col items-center gap-8 w-full h-screen mt-32 px-8">
            <strong className="text-rose-500">Unexpected error ❌</strong>
        </main>
    )
}

export default CustomErrorBoundary;
