import { Footer } from "@/components/footer";
import { NewsHomepage } from "./_components/homepage";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <>
            <header className="flex items-center w-full justify-between border-b border-neutral-200 p-4">
                <h1 className="text-3xl font-bold">NewsApp</h1>

                <div className="space-x-2 w-fit">
                    <Link href={"/sign-up"}>
                        <Button>Join Now</Button>
                    </Link>
                    <Link href={"/sign-in"}>
                        <Button variant={"outline"}>Sign In</Button>
                    </Link>
                </div>
            </header>

            <NewsHomepage />
            <Footer />
        </>
    );
}
