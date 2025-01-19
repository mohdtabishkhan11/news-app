import { cookies } from "next/headers";
import { verifyToken } from "./auth/session";
import user from "@/models/user";
import { dbConnect } from "./connect-db";

export async function getUser() {
    const sessionCookie = (await cookies()).get("session");
    if (!sessionCookie || !sessionCookie.value) {
        return null;
    }

    const sessionData = await verifyToken(sessionCookie.value);
    if (!sessionData || !sessionData.user || typeof sessionData.user.id !== "string") {
        return null;
    }

    if (new Date(sessionData.expires) < new Date()) {
        return null;
    }

    await dbConnect();

    console.log(typeof sessionData.user.id); // logs 'string'

    const currentUser = await user.findById(sessionData.user.id);
    console.log({ currentUser });

    if (!currentUser) {
        return null;
    }

    return currentUser;
}
