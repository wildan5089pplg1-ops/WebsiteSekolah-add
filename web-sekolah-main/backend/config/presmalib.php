<?php

/**
 * Konfigurasi PresmaLib (Perpustakaan Digital SMK)
 *
 * File ini memisahkan konfigurasi domain dari logika aplikasi.
 * Keuntungan:
 * - Admin/developer bisa menambah grup kategori tanpa menyentuh Controller
 * - Bisa di-cache oleh Laravel config:cache
 * - Mudah diuji secara terpisah
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Konfigurasi Paginasi
    |--------------------------------------------------------------------------
    */
    'per_page' => 18,

    /*
    |--------------------------------------------------------------------------
    | Konfigurasi Cache
    |--------------------------------------------------------------------------
    */
    'cache' => [
        'categories_key' => 'buku_categories_v2',
        'categories_ttl' => 3600, // detik (1 jam)
    ],

    /*
    |--------------------------------------------------------------------------
    | Konfigurasi URL Cover
    |--------------------------------------------------------------------------
    | Backend upload URL diambil dari .env (APP_URL) agar tidak hardcode localhost.
    | Fallback ke OpenLibrary jika tidak ada file cover lokal.
    */
    'cover' => [
        'base_url' => env('APP_URL', 'http://localhost:8000') . '/images/docs/',
    ],

    /*
    |--------------------------------------------------------------------------
    | Validasi Input
    |--------------------------------------------------------------------------
    */
    'search_max_length' => 100,
    'id_max'            => PHP_INT_MAX,

    /*
    |--------------------------------------------------------------------------
    | Hierarki Grup Kategori
    |--------------------------------------------------------------------------
    | Format: 'Nama Grup' => ['keyword1', 'keyword2', ...]
    | Setiap raw tag yang mengandung salah satu keyword (case-insensitive)
    | akan dikelompokkan ke dalam grup tersebut.
    |
    | Untuk menambah grup baru: tambahkan entri baru di sini.
    | Untuk menambah keyword: tambahkan ke array keywords yang relevan.
    */
    'category_groups' => [
        'Fiksi & Novel' => [
            'novel', 'fiksi', 'sastra', 'cerpen', 'prosa', 'dikta', 'kepada gema', 
            'unfamiliar', 'pangeran cilik', 'petit prince', 'romance', 'love', 'puisi',
            'kumpulan cerita', 'folklore'
        ],
        'Misteri, Fantasi & Sci-Fi' => [
            'detektif', 'misteri', 'fantasi', 'teka-teki', 'thriller', 'konspirasi',
            'sci-fi', 'kiamat', 'akhir zaman'
        ],
        'Pengembangan Diri (Self-Help)' => [
            'self improvement', 'motivasi', 'pengembangan diri', 'habits', 'habit',
            'sukses', 'karier', 'menata karier', 'becoming', 'star', 'personality',
            'value', 'filosofi', 'seni menghargai', 'hidup', 'redraw',
            'membangun kebiasaan', 'kebiasaan buruk', 'memikat', 'mario teguh',
            'inspiratif', 'kisah inspiratif'
        ],
        'Psikologi & Kesehatan Mental' => [
            'psikoterapi', 'anxiety', 'loneliness', 'love self', 'sayangi diri',
            'mengatasi kekecewaan', 'luka', 'galau', 'hold on', 'hurts',
            'jiemi', 'kesehatan mental', 'psikologi'
        ],
        'Sains, Pengetahuan & Geografi' => [
            'atlas', 'provinsi', 'peta', 'geografi', 'pengetahuan umum',
            'dunia', 'global', 'indeks', 'keajaiban', 'hutan', 'jenis hutan', 'sains',
            'statistik', 'matematika', 'teknologi', 'ilmu'
        ],
        'Sejarah & Biografi' => [
            'sejarah', 'pahlawan', 'perjuangan', 'bangsa', 'nusantara',
            'kebangsaan', 'kisah pahlawan', 'pertemuan antar tokoh', 'perang',
            'biografi', 'tokoh', 'kerajaan', 'dinasti', 'muhammad al-fatih',
            'konstatinopel', 'singhasari', 'qatar'
        ],
        'Sosial, Budaya & Keluarga' => [
            'keluarga', 'friendship', 'relationship', 'remaja', 'perempuan',
            'perbedaan agama', 'negara', 'kehidupan', 'sosial', 'budaya', 'hukum',
            'masyarakat', 'komunikasi'
        ],
        'Agama & Spiritual' => [
            'agama', 'spiritual', 'islami', 'masjid', 'umat', 'ibadah', 'keyakinan',
            'kristiani', 'tuhan', 'doa'
        ],
        'Seni, Desain & Hiburan' => [
            'seni', 'desain', 'art', 'hiburan', 'musik', 'olahraga', 'exhibition',
            'defacement'
        ],
    ],

];
