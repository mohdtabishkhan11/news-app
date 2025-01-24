"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ActionState } from "@/lib/auth/middleware";
import { signIn, signUp } from "@/actions/auth";
import { Globe, Loader2 } from "lucide-react";
import Link from "next/link";

interface FormProps {
    mode: "signup" | "signin";
}

const BG_VIDEO = "/video_bg.mp4";

export const Form = ({ mode }: FormProps) => {
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        mode === "signin" ? signIn : signUp,
        {
            error: "",
        }
    );

    return (
        <>
            <div className="fullscreen-bg ">
                <video loop muted autoPlay className="fullscreen-bg__video bg-black">
                    <source src={BG_VIDEO} type="video/mp4"></source>
                </video>
            </div>
            <Card className="w-full max-w-md py-5 px-7">
                <CardHeader>
                    <CardTitle className="text-2xl inline-flex items-center gap-x-2">
                        <Globe className="w-6 h-6" />
                        {mode === "signin" ? "Sign-In" : "Sign-Up"}
                    </CardTitle>
                    <CardDescription>
                        Please fill in your details to get personalized news.
                    </CardDescription>
                </CardHeader>
                <form action={formAction} className="max-w-md w-full space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            type="email"
                            defaultValue={state?.email}
                            required
                            placeholder="Enter your email"
                            disabled={pending}
                        />
                    </div>
                    {mode === "signup" && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                name="name"
                                type="text"
                                defaultValue={state?.name}
                                required
                                disabled={pending}
                                placeholder="Enter your name"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            type="password"
                            defaultValue={state?.password}
                            required
                            placeholder="Enter your email"
                            disabled={pending}
                            minLength={8}
                            maxLength={40}
                        />
                    </div>
                    {mode === "signup" && (
                        <div className="space-y-2">
                            <Label htmlFor="email">Age</Label>
                            <Input
                                name="age"
                                type="text"
                                defaultValue={state?.age}
                                disabled={pending}
                                required
                                placeholder="Enter your age"
                            />
                        </div>
                    )}

                    {state?.error && (
                        <div className="text-red-500 text-sm space-y-2 px-2">{state.error}</div>
                    )}

                    <Button type="submit">
                        {pending ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Loading...
                            </>
                        ) : mode === "signin" ? (
                            "Sign in"
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">
                                {mode === "signin"
                                    ? "New to our platform?"
                                    : "Already have an account?"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            href={`${mode === "signin" ? "/sign-up" : "/sign-in"}`}
                            className="w-fit mx-auto flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            {mode === "signin"
                                ? "Create an account"
                                : "Sign in to existing account"}
                        </Link>
                    </div>
                </div>
            </Card>
        </>
    );
};
