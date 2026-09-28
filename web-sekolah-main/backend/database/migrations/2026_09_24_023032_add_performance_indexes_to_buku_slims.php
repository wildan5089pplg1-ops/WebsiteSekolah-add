<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Tambahkan indeks kinerja ke tabel buku_slims:
     *
     * 1. idx_judul          - mempercepat WHERE, ORDER BY, dan GROUP BY pada kolom judul
     * 2. idx_pengarang      - mempercepat WHERE pada kolom pengarang
     * 3. idx_subjek_kategori - mempercepat WHERE LIKE pada kolom kategori
     * 4. ft_judul_pengarang - FULLTEXT index untuk pencarian teks bebas
     *                         menggantikan LIKE '%...%' yang tidak bisa pakai indeks B-Tree
     */
    public function up(): void
    {
        Schema::table('buku_slims', function (Blueprint $table) {
            // B-Tree indexes untuk filter & sort exact/prefix
            $table->index('judul', 'idx_judul');
            $table->index('pengarang', 'idx_pengarang');
            $table->index('subjek_kategori', 'idx_subjek_kategori');
        });

        // FULLTEXT harus ditambahkan via raw SQL karena Blueprint::fullText()
        // membutuhkan engine MyISAM di beberapa versi Laravel lama.
        // MySQL 8.x InnoDB sudah mendukung FULLTEXT natively.
        DB::statement('ALTER TABLE buku_slims ADD FULLTEXT INDEX ft_judul_pengarang (judul, pengarang)');
    }

    /**
     * Kembalikan tabel ke kondisi semula.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE buku_slims DROP INDEX ft_judul_pengarang');

        Schema::table('buku_slims', function (Blueprint $table) {
            $table->dropIndex('idx_judul');
            $table->dropIndex('idx_pengarang');
            $table->dropIndex('idx_subjek_kategori');
        });
    }
};
