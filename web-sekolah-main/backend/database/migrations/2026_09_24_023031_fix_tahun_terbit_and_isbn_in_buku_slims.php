<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

/**
 * PERBAIKAN ESENSIAL #2: Fix Tipe Data & Kualitas Data
 *
 * Masalah yang diperbaiki:
 *
 * A) tahun_terbit: VARCHAR(50) → SMALLINT UNSIGNED NULL
 *    - VARCHAR tidak bisa digunakan untuk filter rentang tahun (BETWEEN)
 *    - Dua baris berisi nilai non-numerik ('New Leaf Literary') → diset NULL
 *    - 22 baris sudah NULL, sisanya berisi tahun valid (1800–2100)
 *    - SMALLINT UNSIGNED (0–65535) cukup untuk semua tahun terbit buku
 *
 * B) isbn_issn: Bersihkan nilai placeholder '-' → NULL
 *    - 4 baris berisi '-' yang bukan ISBN valid → lebih jujur sebagai NULL
 *    - Mencegah confusion saat fitur OpenLibrary cover lookup menggunakan ISBN
 */
return new class extends Migration
{
    public function up(): void
    {
        // === A: Bersihkan tahun_terbit yang tidak valid ===
        // Nilai non-numerik atau di luar range wajar → NULL
        DB::statement("
            UPDATE buku_slims
            SET tahun_terbit = NULL
            WHERE tahun_terbit IS NOT NULL
              AND (
                tahun_terbit NOT REGEXP '^[0-9]{4}$'
                OR CAST(tahun_terbit AS UNSIGNED) < 1800
                OR CAST(tahun_terbit AS UNSIGNED) > 2100
              )
        ");

        // Ubah tipe kolom: VARCHAR(50) → SMALLINT UNSIGNED NULL
        // Gunakan raw SQL karena Blueprint::smallInteger() bisa membutuhkan
        // konversi data eksplisit pada beberapa versi MySQL
        DB::statement("
            ALTER TABLE buku_slims
            MODIFY COLUMN tahun_terbit SMALLINT UNSIGNED NULL
            COMMENT 'Tahun terbit buku (1800-2100)'
        ");

        // === B: Bersihkan ISBN placeholder ===
        // Nilai '-', '0', 'N/A' tidak memiliki makna ISBN → jadikan NULL
        DB::statement("
            UPDATE buku_slims
            SET isbn_issn = NULL
            WHERE isbn_issn IN ('-', '0', 'N/A', 'n/a', 'null', 'NULL', '00')
        ");
    }

    public function down(): void
    {
        // Kembalikan tahun_terbit ke VARCHAR(50)
        DB::statement("
            ALTER TABLE buku_slims
            MODIFY COLUMN tahun_terbit VARCHAR(50) NULL
            COMMENT ''
        ");
        // Catatan: data yang sudah di-clean (nilai non-numerik → NULL) tidak
        // bisa dikembalikan ke nilai asal karena tidak disimpan.
    }
};
