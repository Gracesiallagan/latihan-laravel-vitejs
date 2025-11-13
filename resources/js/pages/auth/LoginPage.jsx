import React from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/layouts/AuthLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/login/post");
    };

    return (
        <AuthLayout>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="w-full max-w-sm bg-white dark:bg-slate-800 shadow-lg rounded-2xl px-5 py-4 border border-gray-100 dark:border-slate-700">
                    {/* Header */}
                    <div className="text-center mb-2">
                        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight">
                            Selamat Datang
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                            Silakan masuk untuk melanjutkan
                        </p>
                    </div>

                    {/* Form */}
                    <Card className="bg-transparent border-0 shadow-none p-0">
                        <CardHeader className="p-0 mb-0" />
                        <CardContent className="p-0 mt-1">
                            <form onSubmit={handleSubmit}>
                                <FieldGroup className="space-y-1">
                                    {/* Email */}
                                    <Field className="mb-1">
                                        <FieldLabel
                                            htmlFor="email"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-0.5"
                                        >
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Masukkan email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-blue-300 outline-none"
                                        />
                                        {errors.email && (
                                            <div className="text-xs text-red-500 mt-0.5">
                                                {errors.email}
                                            </div>
                                        )}
                                    </Field>

                                    {/* Password */}
                                    <Field className="mb-1">
                                        <FieldLabel
                                            htmlFor="password"
                                            className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-0.5"
                                        >
                                            Password
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
                                            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-300 outline-none"
                                        />
                                        {errors.password && (
                                            <div className="text-xs text-red-500 mt-0.5">
                                                {errors.password}
                                            </div>
                                        )}
                                    </Field>

                                    {/* Tombol Login */}
                                    <div className="mt-1">
                                        <Button
                                            type="submit"
                                            className={`w-full py-2 rounded-lg text-sm font-semibold text-white transition duration-150 ${
                                                processing
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                            }`}
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "Masuk"}
                                        </Button>
                                    </div>

                                    {/* Link ke Register */}
                                    <div className="text-center mt-1">
                                        <FieldDescription className="text-xs text-gray-500 dark:text-gray-400">
                                            Belum punya akun?{" "}
                                            <a
                                                href="/auth/register"
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                Daftar di sini
                                            </a>
                                        </FieldDescription>
                                    </div>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthLayout>
    );
}
