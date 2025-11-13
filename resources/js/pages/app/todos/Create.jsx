import React, { useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import Swal from "sweetalert2";

export default function Create() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        due_date: "",
        status: "pending",
        cover: null,
    });

    // jika backend mengirim flash success
    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: flash.success,
                width: "540px",
                padding: "2.5rem 2rem",
                background: "#ffffff",
                customClass: {
                    popup: "rounded-3xl shadow-2xl",
                    title: "text-gray-800 font-semibold text-xl",
                },
                showConfirmButton: false,
                timer: 2200,
            });
        }
    }, [flash]);

    // submit handler — pakai post ke /todos (tanpa Ziggy)
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/todos", {
            forceFormData: true, // penting supaya file dikirim
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Todo Berhasil Ditambahkan!",
                    text: "Todo Anda sudah tersimpan dan siap dikerjakan.",
                    width: "540px", // 🔹 Sedikit lebih lebar dari sebelumnya
                    padding: "2.5rem 2rem", // 🔹 Tinggi tetap proporsional
                    background: "#ffffff",
                    customClass: {
                        popup: "rounded-3xl shadow-2xl",
                        title: "text-gray-800 font-semibold text-xl",
                    },
                    timer: 2200,
                    showConfirmButton: false,
                });

                reset();
                router.visit("/todos");
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal Menyimpan!",
                    text: "Periksa kembali input Anda",
                    confirmButtonColor: "#2563eb",
                });
            },
        });
    };

    return (
        <AppLayout>
            <div className="flex justify-center items-center py-12 px-4">
                <div className="w-full max-w-2xl bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-8 border border-gray-100 dark:border-slate-700 transition-all duration-500">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Tambah Todo
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Buat rencana harianmu jadi lebih teratur dan
                            produktif!
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-6"
                    >
                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Judul Todo
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 dark:bg-slate-900 dark:text-white focus:ring-4 focus:ring-blue-300 outline-none transition-all"
                                placeholder="Masukkan judul todo..."
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 dark:bg-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-300 outline-none transition-all"
                                rows="4"
                                placeholder="Tuliskan deskripsi todo..."
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Batas Waktu */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Batas Waktu
                                </label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 dark:bg-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-300 outline-none transition-all"
                                    value={data.due_date}
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />
                                {errors.due_date && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.due_date}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Status Awal
                                </label>
                                <select
                                    className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 dark:bg-slate-900 dark:text-white focus:ring-4 focus:ring-blue-300 outline-none transition-all"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="done">Selesai</option>
                                </select>
                            </div>
                        </div>

                        {/* Cover */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Upload Cover
                            </label>
                            <div className="relative flex items-center justify-between border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 hover:border-blue-400 transition-all">
                                <label
                                    htmlFor="cover-upload"
                                    className="text-sm text-gray-700 dark:text-gray-200 font-medium cursor-pointer"
                                >
                                    Pilih File
                                </label>
                                <input
                                    id="cover-upload"
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) =>
                                        setData("cover", e.target.files[0])
                                    }
                                />
                                <span className="text-xs text-gray-500 truncate ml-2">
                                    {data.cover
                                        ? data.cover.name
                                        : "Belum ada file dipilih"}
                                </span>
                            </div>

                            {errors.cover && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cover}
                                </p>
                            )}
                        </div>

                        {/* Tombol Submit */}
                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-8 py-3.5 rounded-full font-semibold text-white text-lg shadow-lg transform transition-all duration-300 ${
                                    processing
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105"
                                }`}
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
