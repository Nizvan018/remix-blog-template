import { Link } from "@remix-run/react";

const Footer = () => {
    return (
        <footer className="flex justify-center px-8 w-full border-t border-white/20 bg-gray-950/90 backdrop-blur-sm">
            <div className="flex justify-between gap-16 w-full max-w-[1200px] py-12">
                <div className="flex flex-col justify-between gap-4 h-full">
                    <Link to="/" className="text-xl font-bold">
                        Remix App
                    </Link>

                    <span className="text-sm font-light">
                        Coded by <Link
                            to="https://github.com/Nizvan018"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="font-semibold hover:underline hover:text-blue-500"
                        >
                            Nizvan018
                        </Link>
                    </span>
                </div>

                <nav>
                    <ul className="flex flex-col gap-2 text-xs">
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
                </nav>
            </div>
        </footer>
    )
}

export default Footer;
