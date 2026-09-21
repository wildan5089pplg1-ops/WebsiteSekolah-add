<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\News;
use App\Models\Facility;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ]);

        News::create([
            'title' => 'Tim Robotik SMA 1 Meraih Medali Emas Olimpiade Sains Nasional 2026',
            'category' => 'Prestasi',
            'date' => '2026-08-05',
            'summary' => 'Tim robotik siswa SMA Negeri 1 berhasil membawa pulang trofi juara pertama dalam kompetisi OSN bidang Teknologi.',
            'content' => 'Kabar membanggakan datang dari ajang Olimpiade Sains Nasional (OSN) 2026. Tim robotik SMA 1 berhasil mengalahkan puluhan sekolah pesaing dengan inovasi robot pemilah sampah otomatis berbasis AI.',
            'image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
        ]);

        News::create([
            'title' => 'Pelaksanaan Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
            'category' => 'Pengumuman',
            'date' => '2026-08-01',
            'summary' => 'Informasi lengkap mengenai jadwal, jalur pendaftaran, dan persyaratan berkas untuk calon siswa baru.',
            'content' => 'Pendaftaran PPDB SMA 1 Antigravity telah dibuka secara online. Terdapat 3 jalur pendaftaran yaitu Jalur Prestasi, Jalur Zonasi, dan Jalur Afirmasi.',
            'image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
        ]);

        News::create([
            'title' => 'Workshop Digital Literacy dan Etika Media Sosial bagi Siswa Kelas X',
            'category' => 'Kegiatan',
            'date' => '2026-07-28',
            'summary' => 'Meningkatkan kesadaran digital dan literasi informasi di era AI bagi generasi muda.',
            'content' => 'Sekolah menyelenggarakan workshop literasi digital yang menghadirkan pakar cybersecurity dan komunikasi digital untuk membekali siswa dalam menyaring informasi hoax.',
            'image' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
        ]);

        Facility::create([
            'title' => 'Laboratorium Komputer & AI Lab',
            'description' => 'Dilengkapi 40 unit PC spesifikasi tinggi dan koneksi fiber optik 1 Gbps.',
            'icon' => '💻'
        ]);

        Facility::create([
            'title' => 'Perpustakaan Digital (E-Library)',
            'description' => 'Koleksi ribuan buku fisik dan akses gratis ke jurnal ilmiah serta ebook internasional.',
            'icon' => '📚'
        ]);

        Facility::create([
            'title' => 'Laboratorium IPA Terpadu',
            'description' => 'Fasilitas praktikum Fisika, Kimia, dan Biologi lengkap bersertifikasi standar laboratorium.',
            'icon' => '🔬'
        ]);

        Facility::create([
            'title' => 'Lap. Olahraga Multiguna & GOR Indoor',
            'description' => 'Lapangan basket, futsal, bulutangkis, dan sarana kebugaran siswa.',
            'icon' => '🏀'
        ]);

        Facility::create([
            'title' => 'Aula Utama & Auditorium Cyber',
            'description' => 'Kapasitas 1.000 penonton dengan sistem sound & LED display modern.',
            'icon' => '🏛️'
        ]);

        Facility::create([
            'title' => 'Kantin Sehat & Green Garden',
            'description' => 'Area kuliner higienis terverifikasi Dinkes dengan ruang terbuka hijau yang asri.',
            'icon' => '🍃'
        ]);
    }
}
