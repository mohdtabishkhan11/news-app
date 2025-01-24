"use server";
import { validateAction } from "@/lib/auth/middleware";
import { comparePasswords, hashPassword, setSession } from "@/lib/auth/session";
import { dbConnect } from "@/lib/connect-db";
import { User } from "@/lib/types";
import user from "@/models/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signOut = async () => {
    (await cookies()).delete("session");
};

// Define signUpSchema
const signUpSchema = z.object({
    name: z.string().min(2, { message: "Name must be more than 1 character" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    age: z.string(),
});

const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
// TODO fix age validation

let redirectPath: string | null = null;

export const signUp = validateAction(signUpSchema, async (data, formData) => {
    const { name, age, email, password } = data;

    try {
        // Check if user is already registered
        await dbConnect();

        const existingUser = await user.findOne({
            email,
        });

        if (existingUser) {
            console.log("User is already registered with given email");
            return {
                error: "Failed to create user. Please try again.",
                name,
                email,
                password,
            };
        }

        const passwordHash = await hashPassword(password);

        const createdUser: User = await user.create({
            email,
            name,
            password: passwordHash,
            age,
        });

        await setSession(createdUser);

        redirectPath = "/dashboard";
    } catch (error) {
        console.log("SignUp error:", error);
        redirectPath = "/";
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
});

export const signIn = validateAction(signInSchema, async (data, formData) => {
    const { email, password } = data;

    try {
        await dbConnect();

        const userExists = await user.findOne({ email });

        if (!userExists) {
            return {
                error: "Invalid email or password. Please try again.",
                email,
                password,
            };
        }

        // Compare password hash
        const isPasswordValid = await comparePasswords(password, userExists.password);

        if (!isPasswordValid) {
            return {
                error: "Invalid email or password. Please try again.",
                email,
                password,
            };
        }

        await setSession(userExists as User);

        redirectPath = "/dashboard";
    } catch (error) {
        console.log("SignIn error:", error);
        redirectPath = "/";
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
});
