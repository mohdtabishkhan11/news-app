"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { use } from "react";
import { User } from "../types";

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
    let context = useContext(UserContext);
    if (context === null) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export function UserProvider({
    children,
    userPromise,
}: {
    children: ReactNode;
    userPromise: Promise<User | null>;
}) {
    let initialUser = use(userPromise);
    let [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Removes unnecessary values from user object
        const filteredUser = {
            _id: user?._id!,
            name: user?.name!,
            password: user?.password!,
            email: user?.email!,
            age: user?.age!,
        };

        setUser(filteredUser);
    }, [initialUser]);

    console.log({ user, setUser });

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
