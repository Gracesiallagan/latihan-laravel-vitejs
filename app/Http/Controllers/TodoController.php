<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Tampilkan daftar todos (dengan pencarian, filter, dan pagination)
     */
    public function index(Request $request)
    {
        $query = Todo::where('user_id', Auth::id());

        // 🔍 Pencarian (berdasarkan judul atau deskripsi)
        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($builder) use ($q) {
                $builder->where('title', 'like', "%{$q}%")
                        ->orWhere('description', 'like', "%{$q}%")
                        ->orWhere('note', 'like', "%{$q}%");
            });
        }

        // ⚙️ Filter status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // 📄 Pagination (20 per halaman)
        $todos = $query->orderBy('created_at', 'desc')
                       ->paginate(20)
                       ->withQueryString();

        // 📊 Statistik untuk ApexCharts
        $stats = Todo::where('user_id', Auth::id())
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        return Inertia::render('app/todos/Index', [
            'todos' => $todos,
            'filters' => $request->only('q', 'status'),
            'stats' => [
                'pending' => $stats['pending'] ?? 0,
                'in_progress' => $stats['in_progress'] ?? 0,
                'done' => $stats['done'] ?? 0,
            ],
        ]);
    }

    /**
     * Halaman tambah todo
     */
    public function create()
    {
        return Inertia::render('app/todos/Create');
    }

    /**
     * Simpan todo baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'note' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,done',
            'due_date' => 'nullable|date',
            'cover' => 'nullable|image|max:4096',
        ]);

        $validated['user_id'] = Auth::id();

        // Upload cover jika ada
        if ($request->hasFile('cover')) {
            $validated['cover'] = $request->file('cover')->store('todos', 'public');
        }

        Todo::create($validated);

        return redirect()->route('todos.index')->with('success', 'Todo berhasil ditambahkan!');
    }

    /**
     * Halaman edit todo
     */
    public function edit(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('app/todos/Edit', [
            'todo' => $todo
        ]);
    }

    /**
     * Update data todo
     */
    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'note' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,done',
            'due_date' => 'nullable|date',
        ]);

        $todo->update($validated);

        return redirect()->route('todos.index')->with('success', 'Todo berhasil diperbarui!');
    }

    /**
     * Hapus todo
     */
    public function destroy(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $todo->delete();

        return redirect()->route('todos.index')->with('success', 'Todo berhasil dihapus!');
    }

    /**
     * Ganti cover todo
     */
    public function changeCover(Request $request, Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'cover' => 'required|image|max:4096',
        ]);

        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $path = $request->file('cover')->store('todos', 'public');
        $todo->update(['cover' => $path]);

        return redirect()->back()->with('success', 'Cover berhasil diganti!');
    }
}
