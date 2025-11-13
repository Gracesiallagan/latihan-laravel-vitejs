import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2"; // ✅ Tambahkan ini

export default function RegisterPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/register/post", {
            onSuccess: () => {
                // ✅ SweetAlert sukses
                Swal.fire({
                    icon: "success",
                    title: "Pendaftaran Berhasil!",
                    text: "Akun kamu telah dibuat. Silakan login.",
                    showConfirmButton: false,
                    timer: 2000,
                });
                reset("name", "email", "password");
            },
            onError: () => {
                // ✅ SweetAlert error
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: "Periksa kembali data yang kamu masukkan.",
                    confirmButtonColor: "#3b82f6",
                });
                reset("password");
            },
        });
    };

    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
                <div className="w-[360px] mx-auto">
                    <Card className="shadow-2xl border-none rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl transition-all duration-500">
                        <CardHeader className="text-center pb-1">
                            <CardTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Buat Akun Baru
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                                Daftar untuk mulai menggunakan aplikasi Anda
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-1">
                            <form onSubmit={handleSubmit}>
                                {/* 🔹 Versi super rapat */}
                                <FieldGroup className="!space-y-0">
                                    {/* Nama Lengkap */}
                                    <Field className="!mb-0">
                                        <FieldLabel
                                            htmlFor="name"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-200"
                                        >
                                            Nama Lengkap
                                        </FieldLabel>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Masukkan nama lengkap"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                            className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-300 text-sm py-2 mb-0"
                                        />
                                        {errors.name && (
                                            <div className="text-xs text-red-600 mt-0">
                                                {errors.name}
                                            </div>
                                        )}
                                    </Field>

                                    {/* Email */}
                                    <Field className="!mb-0">
                                        <FieldLabel
                                            htmlFor="email"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-0"
                                        >
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="contoh@email.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                            className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-300 text-sm py-2 mb-0"
                                        />
                                        {errors.email && (
                                            <div className="text-xs text-red-600 mt-0">
                                                {errors.email}
                                            </div>
                                        )}
                                    </Field>

                                    {/* Password */}
                                    <Field className="!mb-0">
                                        <FieldLabel
                                            htmlFor="password"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-0"
                                        >
                                            Kata Sandi
                                        </FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Masukkan kata sandi"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-300 text-sm py-2 mb-0"
                                        />
                                        {errors.password && (
                                            <div className="text-xs text-red-600 mt-0">
                                                {errors.password}
                                            </div>
                                        )}
                                    </Field>

                                    {/* Tombol Daftar */}
                                    <Field className="pt-2">
                                        <Button
                                            type="submit"
                                            className="w-full py-2.5 rounded-full text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-transform hover:scale-[1.02]"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "Daftar Sekarang"}
                                        </Button>

                                        <FieldDescription className="text-center mt-1 text-gray-500 dark:text-gray-400 text-sm">
                                            Sudah punya akun?{" "}
                                            <Link
                                                href="/auth/login"
                                                className="text-indigo-600 font-semibold hover:underline"
                                            >
                                                Masuk di sini
                                            </Link>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthLayout>
    );
}
