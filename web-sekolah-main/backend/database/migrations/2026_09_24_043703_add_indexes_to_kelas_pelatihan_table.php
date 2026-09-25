<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('kelas_pelatihan', function (Blueprint $table) {
            $table->index('tipe');
            $table->fullText(['judul', 'deskripsi']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kelas_pelatihan', function (Blueprint $table) {
            $table->dropIndex(['tipe']);
            $table->dropFullText(['judul', 'deskripsi']);
        });
    }
};
