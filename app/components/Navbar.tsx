import { Form, Link } from "@remix-run/react";
import { LogOut, LogIn } from "lucide-react";

interface Props {
    isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn }: Props) => {
    return (
        <nav className="fixed top-0 flex justify-center gap-16 w-full px-8 border-b border-white/20 bg-gray-950/90 backdrop-blur-sm">
            <div className="flex items-center justify-between w-full max-w-[1200px] py-6">
                <Link to="/" className="font-bold">
                    Remix App
                </Link>

                <div className="flex items-center gap-6">
                    <ul className="flex items-center gap-6 text-sm">
                        <li>
                            <Link to="/" className="transition hover:text-blue-500">Home</Link>
                        </li>
                        <li>
                            <Link to="/posts/create/form" className="transition hover:text-blue-500">Create Post</Link>
                        </li>
                        <li>
                            <Link to="/about" className="transition hover:text-blue-500">About</Link>
                        </li>
                    </ul>

                    {isLoggedIn ? (
                        <Form method="POST" action="/logout">
                            <button
                                type="submit"
                                className="rounded-md p-2 bg-rose-500"
                            >
                                <LogOut size={16} className="text-white" />
                            </button>
                        </Form>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-md p-2 bg-white"
                        >
                            <LogIn size={16} className="text-gray-950" />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
