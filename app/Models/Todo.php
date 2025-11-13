<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    /**
     * Kolom yang bisa diisi (mass assignable)
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'note',
        'is_finished',
        'cover',
        'status',
        'due_date',
    ];

    /**
     * Relasi: setiap todo dimiliki oleh satu user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Accessor: menghasilkan URL publik untuk cover
     * supaya mudah ditampilkan di frontend
     */
    public function getCoverUrlAttribute()
    {
        return $this->cover
            ? asset('storage/' . $this->cover)
            : asset('images/todo.png'); // fallback optional
    }

    /**
     * Scope untuk memfilter berdasarkan user login
     */
    public function scopeOwnedBy($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
