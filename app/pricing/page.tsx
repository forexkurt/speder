"use client";

import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-3xl w-full text-center space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Upgrade to Pro
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400">
                    Unlock unlimited speed reading and advanced features.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    {/* Free Plan */}
                    <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
                        <h3 className="text-2xl font-bold">Free Trial</h3>
                        <p className="text-4xl font-bold mt-4">$0</p>
                        <p className="text-zinc-500 mt-2">Forever free</p>
                        <ul className="mt-8 space-y-4 flex-1 text-left">
                            <li className="flex items-center gap-2">
                                ✅ Basic Speed Reading
                            </li>
                            <li className="flex items-center gap-2">
                                ✅ Up to 300 WPM
                            </li>
                        </ul>
                        <Link
                            href="/"
                            className="mt-8 w-full py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                        >
                            Continue Free
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-8 rounded-2xl border-2 border-blue-600 bg-white dark:bg-zinc-900 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                            POPULAR
                        </div>
                        <h3 className="text-2xl font-bold text-blue-600">Pro Monthly</h3>
                        <p className="text-4xl font-bold mt-4">$9.99</p>
                        <p className="text-zinc-500 mt-2">per month</p>
                        <ul className="mt-8 space-y-4 flex-1 text-left">
                            <li className="flex items-center gap-2">
                                ⚡ Unlimited WPM
                            </li>
                            <li className="flex items-center gap-2">
                                📖 Guided Mode
                            </li>
                            <li className="flex items-center gap-2">
                                📚 Save Progress
                            </li>
                            <li className="flex items-center gap-2">
                                🚫 Ad-free Experience
                            </li>
                        </ul>
                        <button
                            className="mt-8 w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                            onClick={() => alert("Stripe integration coming soon!")}
                        >
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
