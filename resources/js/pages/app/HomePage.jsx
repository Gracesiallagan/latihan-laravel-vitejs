import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { usePage, Link } from "@inertiajs/react";

export default function HomePage() {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            {/* Layout utama - satu halaman tanpa scroll */}
            <div className="flex flex-col justify-center items-center h-[calc(100vh-120px)] px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-center">
                <div className="max-w-3xl space-y-6">
                    {/* Judul */}
                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        Selamat Datang, {auth.name}
                    </h1>

                    {/* Kalimat motivasi */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Awali harimu dengan rencana yang terarah. Susun daftar
                        kegiatan, capai targetmu, dan jadikan{" "}
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            TodoApp
                        </span>{" "}
                        teman terbaik untuk setiap pencapaianmu.
                    </p>

                    {/* Tombol Aksi */}
                    <div className="pt-4">
                        <Button
                            asChild
                            className="px-8 py-3 text-lg font-semibold rounded-full
               bg-blue-600 hover:bg-blue-700 
               text-white shadow-md hover:shadow-lg
               transition-all duration-300 ease-in-out
               transform hover:-translate-y-0.5 active:scale-95"
                        >
                            <Link href="/todos">Mulai Buat Rencana</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
