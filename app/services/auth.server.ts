import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { User } from "~/generated/prisma";
import prisma from "~/lib/prisma.server";
import bcrypt from "bcryptjs";

type UserWithoutPassword = Omit<User, "password">;

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30
    }
});

export const authenticator = new Authenticator<UserWithoutPassword>();

async function login(email: string, password: string): Promise<UserWithoutPassword> {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new Error("The user doesn't exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user;

    return safeUser;
}

authenticator.use(
    new FormStrategy(async ({ form }) => {
        const email = form.get("email");
        const password = form.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
            throw new Error("Invalid data form");
        }

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        return await login(String(email).trim().replace(/^"+|"+$/g, ""), String(password).trim().replace(/^"+|"+$/g, ""));
    }),
    "user-pass"
);

export async function authenticate(request: Request, returnTo?: string) {
    const session = await sessionStorage.getSession(request.headers.get("cookie"));
    const user = session.get("user");

    if (user) {
        return user;
    }

    if (returnTo) {
        session.set("returnTo", returnTo);
    }

    throw redirect("/login", {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session)
        }
    });
}
