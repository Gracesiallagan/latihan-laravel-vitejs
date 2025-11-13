import React, { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Index() {
    const { props } = usePage();
    const { todos, filters, stats, flash } = props;
    const { data, setData } = useForm({
        q: filters.q || "",
        status: filters.status || "",
    });

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: flash.success,
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }, [flash]);

    function submitSearch(e) {
        e.preventDefault();
        Inertia.get(
            "/todos",
            { q: data.q, status: data.status },
            { preserveState: true, replace: true }
        );
    }

    function confirmDelete(id) {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data akan dihapus permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/todos/${id}`);
            }
        });
    }

    const chartOptions = {
        chart: { id: "todos-chart" },
        labels: ["Pending", "In Progress", "Done"],
        colors: ["#facc15", "#3b82f6", "#22c55e"],
        legend: { position: "bottom" },
    };
    const chartSeries = [stats.pending, stats.in_progress, stats.done];

    return (
        <AppLayout>
            <div className="container mx-auto p-6 space-y-8">
                {/* Header & Tombol Tambah */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Daftar Todos
                    </h1>
                    <a
                        href="/todos/create"
                        className="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-xl shadow-sm hover:bg-sky-700 hover:shadow-md transition-all duration-200"
                    >
                        + Tambah Todo
                    </a>
                </div>

                {/* 🔍 Form Pencarian dan Filter */}
                <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-5 border border-gray-200 dark:border-slate-700">
                    <form
                        onSubmit={submitSearch}
                        className="flex flex-col md:flex-row items-center gap-3"
                    >
                        <div className="relative w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="🔎 Cari todo..."
                                value={data.q}
                                onChange={(e) => setData("q", e.target.value)}
                                className="w-full border border-gray-300 dark:border-slate-600 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-white shadow-sm"
                            />
                        </div>
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="border border-gray-300 dark:border-slate-600 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:bg-slate-900 dark:text-white"
                        >
                            <option value="">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-sky-300 text-sky-700 font-semibold rounded-xl shadow-sm hover:bg-sky-50 hover:text-sky-800 transition-all duration-200 flex items-center gap-2"
                        >
                            <span>🔍</span> Cari
                        </button>
                    </form>
                </div>

                {/* 📋 Tabel Todos */}
                <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        📋 Daftar Kegiatan
                    </h2>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-800">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                        Judul
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                                        Deadline
                                    </th>
                                    <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-200">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.data.map((t, i) => (
                                    <tr
                                        key={t.id}
                                        className={`border-t border-gray-200 dark:border-slate-700 ${
                                            i % 2 === 0
                                                ? "bg-white dark:bg-slate-900"
                                                : "bg-gray-50 dark:bg-slate-800"
                                        } hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors`}
                                    >
                                        <td className="px-4 py-3">{t.title}</td>
                                        <td className="px-4 py-3 capitalize">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                    t.status === "done"
                                                        ? "bg-green-100 text-green-700"
                                                        : t.status ===
                                                          "in_progress"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {t.due_date
                                                ? new Date(
                                                      t.due_date
                                                  ).toLocaleDateString(
                                                      "id-ID",
                                                      {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                      }
                                                  )
                                                : "-"}
                                        </td>
                                        <td className="px-4 py-3 text-center space-x-2">
                                            <div className="flex justify-center gap-3">
                                                {/* Tombol Edit */}
                                                <a
                                                    href={`/todos/${t.id}/edit`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 bg-gradient-to-r from-sky-100 to-blue-200 hover:from-sky-200 hover:to-blue-300 shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                    ✏️ Edit
                                                </a>

                                                {/* Tombol Hapus */}
                                                <button
                                                    onClick={() =>
                                                        confirmDelete(t.id)
                                                    }
                                                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 📄 Pagination — Enhanced & Styled */}
                {todos.links && todos.links.length > 0 && (
                    <div className="mt-6 flex justify-center gap-2 flex-wrap">
                        {todos.links.map((link, index) => {
                            const label =
                                link.label === "&laquo; Previous" ? (
                                    <span className="flex items-center gap-1">
                                        <ArrowLeft size={16} />
                                        <span>Previous</span>
                                    </span>
                                ) : link.label === "Next &raquo;" ? (
                                    <span className="flex items-center gap-1">
                                        <span>Next</span>
                                        <ArrowRight size={16} />
                                    </span>
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                );

                            return (
                                <button
                                    key={index}
                                    onClick={() =>
                                        link.url && Inertia.get(link.url)
                                    }
                                    disabled={!link.url}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1
                                        ${
                                            link.active
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-700"
                                        }
                                        ${
                                            !link.url
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }
                                    `}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 📊 Statistik */}
                <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                        📊 Statistik Todo
                    </h2>
                    <div className="max-w-sm mx-auto">
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="pie"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
