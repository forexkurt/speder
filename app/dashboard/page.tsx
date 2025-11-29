"use client";

import { Header } from "@/components/Header";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4 dark:text-white">Giriş Yapmalısınız</h1>
                <a href="/sign-in" className="text-blue-600 hover:underline">Giriş Yap</a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
            <Header />

            <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Hesabım</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Hoş geldin, {user.firstName || user.username}!</p>
                    </div>
                    <SignOutButton>
                        <button className="text-sm text-red-600 hover:text-red-500 font-medium px-4 py-2 border border-red-200 dark:border-red-900/30 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition">
                            Çıkış Yap
                        </button>
                    </SignOutButton>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Profil Bilgileri</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <img src={user.imageUrl} alt="Profile" className="w-16 h-16 rounded-full" />
                            <div>
                                <p className="font-medium">{user.fullName}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Card */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Abonelik Durumu</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">Mevcut Plan</span>
                                <span className="font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm">Ücretsiz</span>
                            </div>
                            <div className="pt-4">
                                <a href="/pricing" className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-lg text-sm font-medium transition">
                                    Planı Yükselt
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card (Placeholder) */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Okuma İstatistikleri</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Toplam Okunan Kelime</p>
                                <p className="text-2xl font-bold">0</p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Ortalama Hız</p>
                                <p className="text-2xl font-bold">0 <span className="text-sm font-normal text-zinc-500">WPM</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
