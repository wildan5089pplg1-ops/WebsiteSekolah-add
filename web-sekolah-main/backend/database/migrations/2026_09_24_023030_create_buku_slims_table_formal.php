<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * PERBAIKAN ESENSIAL #1: Migrasi Formal CREATE TABLE buku_slims
 *
 * Masalah sebelumnya: tabel buku_slims tidak memiliki file migrasi Laravel.
 * Tabel dibuat manual atau diimpor dari SLiMS sehingga tidak bisa di-reproduce
 * di environment baru hanya dengan `php artisan migrate`.
 *
 * Solusi: Migrasi ini mendokumentasikan skema resmi di Laravel.
 * Guard `hasTable()` memastikan migrasi aman dijalankan di server yang
 * sudah memiliki tabel (tidak akan gagal/overwrite data).
 */
return new class extends Migration
{
    public function up(): void
    {
        // Guard: jika tabel sudah ada (server production/dev yang sudah import SLiMS),
        // lewati pembuatan — tabel sudah terdokumentasi di migrasi ini.
        if (Schema::hasTable('buku_slims')) {
            return;
        }

        Schema::create('buku_slims', function (Blueprint $table) {
            // Primary key — auto increment dari SLiMS
            $table->id();

            // === IDENTITAS BUKU ===
            $table->string('judul', 255)->nullable()->comment('Judul lengkap buku');
            $table->string('pengarang', 255)->nullable()->comment('Nama pengarang/penulis');
            $table->string('isbn_issn', 100)->nullable()->comment('Kode ISBN atau ISSN');
            $table->string('penerbit', 255)->nullable()->comment('Nama penerbit');
            $table->smallInteger('tahun_terbit')->nullable()->unsigned()->comment('Tahun terbit (SMALLINT setelah migrasi fix)');
            $table->string('edisi', 100)->nullable()->comment('Edisi/cetakan buku');

            // === KLASIFIKASI & KATALOG ===
            $table->string('gmd', 100)->nullable()->comment('General Material Designation (jenis media)');
            $table->string('no_panggil', 100)->nullable()->comment('Nomor panggil perpustakaan (call number)');
            $table->string('klasifikasi', 100)->nullable()->comment('Kode klasifikasi DDC/UDC');
            $table->string('bahasa', 100)->nullable()->comment('Bahasa buku');
            $table->string('tempat_terbit', 255)->nullable()->comment('Kota tempat terbit');
            $table->string('judul_seri', 255)->nullable()->comment('Judul seri jika buku berseri');
            // Format: <Tag1><Tag2><Tag3> (format SLiMS) — kandidat normalisasi di masa depan
            $table->string('subjek_kategori', 255)->nullable()->comment('Kategori dalam format XML-tag SLiMS');

            // === DESKRIPSI FISIK & DIGITAL ===
            $table->string('deskripsi_fisik', 255)->nullable()->comment('Deskripsi fisik buku (tebal, ukuran, dll)');
            $table->text('deskripsi_abstrak')->nullable()->comment('Sinopsis atau abstrak buku');
            $table->string('nama_file_cover', 255)->nullable()->comment('Nama file gambar sampul buku');

            // === INVENTARIS ===
            $table->string('barcode_item', 100)->nullable()->comment('Barcode eksemplar fisik buku');

            // Tidak ada timestamps — SLiMS tidak menggunakan created_at/updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buku_slims');
    }
};
