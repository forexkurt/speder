import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
            <SignIn />
        </div>
    );
}
