import { LoginForm } from "./_components/login-form";
import { NewsHomepage } from "./_components/homepage";
// import { LoginForm } from "./(auth)/_components/sign-up-form";

export default function Home() {
    return (
        <main className="w-full h-full flex items-center justify-center">
            <div>{<NewsHomepage />}</div>
            {/* <LoginForm /> */}
        </main>
    );
}
