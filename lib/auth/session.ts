import { compare, hash } from "bcryptjs";
import { User } from "../types";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const KEY = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;

type SessionData = {
    user: { id: string };
    expires: string;
};

export const hashPassword = (password: string) => {
    return hash(password, SALT_ROUNDS);
};

export const comparePasswords = (plainPassword: string, hashedPassword: string) => {
    return compare(plainPassword, hashedPassword);
};

export const signToken = async (payload: SessionData) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 day from now")
        .sign(KEY);
};

export const verifyToken = async (input: string) => {
    const { payload } = await jwtVerify(input, KEY, {
        algorithms: ["HS256"],
    });
    return payload as SessionData;
};

export const getSession = async () => {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await verifyToken(session);
};

export const setSession = async (user: User) => {
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session: SessionData = {
        user: { id: user._id! },
        expires: expiresInOneDay.toISOString(),
    };
    const encryptedSession = await signToken(session);
    (await cookies()).set("session", encryptedSession, {
        expires: expiresInOneDay,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
};
