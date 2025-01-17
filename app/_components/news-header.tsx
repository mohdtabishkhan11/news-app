"use client";

import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const NewsHeader = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        // Redirect user to homepage
        router.push("/");
    };

    return (
        <div className="flex items-center w-full justify-between mb-6 pb-5 border-b border-neutral-200">
            <h1 className="text-3xl font-bold ">News Dashboard</h1>
            <div>
                <Button variant={"outline"} onClick={handleSignOut} title="profile">
                    <LogOut />
                </Button>
            </div>
        </div>
    );
};
