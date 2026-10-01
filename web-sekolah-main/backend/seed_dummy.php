<?php

use Illuminate\Support\Facades\DB;

// Seed Buku Slims (PresmaLib)
DB::table('buku_slims')->insert([
    [
        'judul' => 'Pemrograman Web dengan Laravel 11',
        'pengarang' => 'Budi Raharjo',
        'penerbit' => 'Informatika',
        'tahun_terbit' => 2026,
        'isbn_issn' => '978-623-7131-00-1',
        'subjek_kategori' => 'Komputer',
        'deskripsi_fisik' => 'x, 300 hlm.; 24 cm',
    ],
    [
        'judul' => 'Dasar-Dasar Kecerdasan Buatan (AI)',
        'pengarang' => 'Sri Kusumadewi',
        'penerbit' => 'Graha Ilmu',
        'tahun_terbit' => 2025,
        'isbn_issn' => '978-979-756-000-2',
        'subjek_kategori' => 'Teknologi Informasi',
        'deskripsi_fisik' => 'xii, 400 hlm.; 21 cm',
    ],
]);

// Seed Kelas Pelatihan (PresmaCareer)
DB::table('kelas_pelatihan')->insert([
    [
        'judul' => 'Bootcamp Fullstack Developer Next.js & Laravel',
        'deskripsi' => 'Pelatihan intensif 3 bulan menjadi fullstack developer profesional.',
        'tipe' => 'PPLG',
        'link' => 'https://example.com/bootcamp-pplg',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'judul' => 'Sertifikasi Jaringan Cisco CCNA',
        'deskripsi' => 'Persiapan ujian sertifikasi CCNA dengan praktik di lab langsung.',
        'tipe' => 'TJKT',
        'link' => 'https://example.com/ccna',
        'created_at' => now(),
        'updated_at' => now(),
    ]
]);

echo "Berhasil menambahkan data dummy Buku dan Kelas Pelatihan!\n";
