"use client";

import { Header } from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function PricingPage() {
    const { isSignedIn } = useUser();

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Planını Seç</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                        Hızlı okuma yeteneklerini geliştirmek için sana en uygun paketi seç.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col relative overflow-hidden">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Başlangıç</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold">₺0</span>
                                <span className="text-zinc-500 dark:text-zinc-400">/ay</span>
                            </div>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">Temel özelliklerle başla.</p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckIcon /> <span>Günlük 3 PDF yükleme</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckIcon /> <span>Temel Hızlı Okuma Modu</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckIcon /> <span>500 WPM Hız Sınırı</span>
                            </li>
                        </ul>

                        <Link
                            href={isSignedIn ? "/" : "/sign-up"}
                            className="w-full py-3 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition text-center text-sm"
                        >
                            {isSignedIn ? "Kullanmaya Başla" : "Ücretsiz Kayıt Ol"}
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border-2 border-blue-600 shadow-xl shadow-blue-500/10 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            ÖNERİLEN
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2 text-blue-600">Pro</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold">₺49</span>
                                <span className="text-zinc-500 dark:text-zinc-400">/ay</span>
                            </div>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">Sınırsız potansiyel.</p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckIcon className="text-blue-600" /> <span>Sınırsız PDF yükleme</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckIcon className="text-blue-600" /> <span>Tüm Okuma Modları (Flash & Guided)</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckIcon className="text-blue-600" /> <span>Sınırsız Hız (1000+ WPM)</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckIcon className="text-blue-600" /> <span>Gelişmiş İstatistikler</span>
                            </li>
                        </ul>

                        <button
                            className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 transition text-center text-sm"
                            onClick={() => alert("Ödeme entegrasyonu yakında aktif olacak!")}
                        >
                            Pro'ya Yükselt
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CheckIcon({ className = "text-zinc-900 dark:text-zinc-100" }: { className?: string }) {
    return (
        <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );
}
