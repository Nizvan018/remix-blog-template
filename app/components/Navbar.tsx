import { Link } from "@remix-run/react";

const Navbar = () => {
    return (
        <nav className="fixed top-0 flex justify-center gap-16 w-full px-8 border-b border-white/20 bg-gray-950/90 backdrop-blur-sm">
            <div className="flex items-center justify-between w-full max-w-[1200px] py-6">
                <Link to="/" className="font-bold">
                    Remix App
                </Link>

                <ul className="flex items-center gap-6 text-sm">
                    <li>
                        <Link to="/" className="transition hover:text-blue-500">Home</Link>
                    </li>
                    <li>
                        <Link to="/posts/create" className="transition hover:text-blue-500">Create Post</Link>
                    </li>
                    <li>
                        <Link to="/about" className="transition hover:text-blue-500">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
