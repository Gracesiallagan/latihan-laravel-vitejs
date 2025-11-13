<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('todos', function (Blueprint $table) {
            if (!Schema::hasColumn('todos', 'status')) {
                $table->enum('status', ['pending', 'in_progress', 'done'])->default('pending');
            }
            if (!Schema::hasColumn('todos', 'note')) {
                $table->text('note')->nullable();
            }
            if (!Schema::hasColumn('todos', 'due_date')) {
                $table->date('due_date')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('todos', function (Blueprint $table) {
            $table->dropColumn(['status', 'note', 'due_date']);
        });
    }
};
