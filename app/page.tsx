import { LoginForm } from "./_components/login-form";
import { NewsHomepage } from "./_components/homepage";

export default function Home() {
    return (
        <>
            <div>
                {<NewsHomepage />}
            </div>
            {/* <main className="w-full h-full flex items-center justify-center">
                <LoginForm />
            </main> */}
        </>
    );
}
