import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AppLayout({ children }) {
    const { url } = usePage(); // ambil URL saat ini
    const onLogout = () => router.get("/auth/logout");

    const isTodoPage = url.startsWith("/todos");

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 text-gray-800 dark:text-gray-200 transition-colors">
            {/* ======= 🌐 Navigation ======= */}
            <nav className="border-b border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-5">
                    <div className="flex h-16 items-center justify-between">
                        {/* Kiri: TodoApp atau Tombol Kembali */}
                        {isTodoPage ? (
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-indigo-600 transition-all"
                            >
                                <ArrowLeft size={18} />
                                <span>Kembali</span>
                            </Link>
                        ) : (
                            <Link
                                href="/"
                                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300"
                            >
                                TodoApp
                            </Link>
                        )}
                        <Button
                            onClick={onLogout}
                            className="px-5 py-2.5 text-sm font-semibold rounded-full
               bg-slate-700 hover:bg-slate-800
               text-white shadow-sm hover:shadow-md
               transition-all duration-300 ease-in-out
               transform hover:-translate-y-0.5 active:scale-95"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* ======= 📄 Main Content (Jarak diperkecil) ======= */}
            <main className="container mx-auto px-5 pt-0 pb-4">{children}</main>

            {/* ======= ⚙️ Footer ======= */}
            <footer className="border-t border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/70 backdrop-blur-md py-6 mt-10">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; 2025{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                        GraceSoobin
                    </span>
                    . All rights reserved.
                </div>
            </footer>
        </div>
    );
}
