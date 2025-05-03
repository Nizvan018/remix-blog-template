import bcrypt from "bcryptjs";
import prisma from "~/lib/prisma.server";
import { SignupFormType } from "~/schemes/signupForm.schema";

/**
 * POST a new user
 * 
 * @param {SignupFormType} userData 
 * @returns {Promise<Response>} created user in case of no errors
 */
export const createUser = async (userData: SignupFormType): Promise<Response> => {
    try {
        const passwordHash = await bcrypt.hash(userData.password, 8);

        const newUser = await prisma.user.create({
            data: {
                email: userData.email,
                password: passwordHash,
                fullName: userData.fullName
            }
        });

        return new Response(JSON.stringify({
            email: newUser.email,
            password: newUser.password,
            fullName: newUser.fullName
        }), { status: 201 });
    } catch (error) {
        return new Response("An unexpected error has ocurred", { status: 500 });
    }
}
