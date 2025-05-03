import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

import "./tailwind.css";
import { sessionStorage } from "./services/auth.server";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export const meta: MetaFunction = () => {
	return [
		{ title: "Remix App | Blog" },
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "description", content: "This is my first blog using Remix" }
	];
}

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await sessionStorage.getSession(request.headers.get("cookie"));
	const user = session.get("user");

	return { isLoggedIn: Boolean(user) };
}

export function Layout({ children }: { children: React.ReactNode }) {
	const data = useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="flex flex-col items-center w-full">
				<Navbar isLoggedIn={data.isLoggedIn} />
				{children}
				<Footer />
				<Toaster theme="dark" />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
