<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BukuSlims;
use App\Models\KelasPelatihan;

class DummyDataSeeder extends Seeder
{
    public function run()
    {
        // Seed KelasPelatihan
        KelasPelatihan::create([
            'judul' => 'Pengenalan React dan Tailwind',
            'deskripsi' => 'Belajar membuat UI interaktif dengan React dan Tailwind CSS.',
            'tipe' => 'PPLG',
            'link' => 'https://example.com/react',
            'biaya' => 'Gratis'
        ]);

        KelasPelatihan::create([
            'judul' => 'Dasar Jaringan Komputer',
            'deskripsi' => 'Mempelajari subnetting dan konfigurasi router Cisco.',
            'tipe' => 'TJKT',
            'link' => 'https://example.com/network',
            'biaya' => 'Gratis'
        ]);

        KelasPelatihan::create([
            'judul' => 'Mastering Adobe Illustrator',
            'deskripsi' => 'Teknik membuat logo profesional dengan vector.',
            'tipe' => 'DKV',
            'link' => 'https://example.com/dkv',
            'biaya' => 'Biaya tertera'
        ]);
        
        KelasPelatihan::create([
            'judul' => 'Pembuatan Film Dokumenter',
            'deskripsi' => 'Cara meriset dan mengambil gambar untuk film dokumenter.',
            'tipe' => 'BCF',
            'link' => 'https://example.com/bcf',
            'biaya' => 'Gratis'
        ]);
        
        KelasPelatihan::create([
            'judul' => 'Persiapan Wawancara Kerja',
            'deskripsi' => 'Tips dan trik lulus wawancara HRD dan user.',
            'tipe' => 'Karir',
            'link' => 'https://example.com/karir',
            'biaya' => 'Gratis'
        ]);

        // Seed BukuSlims
        BukuSlims::create([
            'judul' => 'Atomic Habits',
            'pengarang' => 'James Clear',
            'isbn_issn' => '9780735211292',
            'penerbit' => 'Avery',
            'tahun_terbit' => 2018,
            'subjek_kategori' => '<Pengembangan Diri>',
            'deskripsi_abstrak' => 'Cara mudah dan terbukti untuk membangun kebiasaan baik dan menghilangkan yang buruk.',
        ]);

        BukuSlims::create([
            'judul' => 'Clean Code',
            'pengarang' => 'Robert C. Martin',
            'isbn_issn' => '9780132350884',
            'penerbit' => 'Prentice Hall',
            'tahun_terbit' => 2008,
            'subjek_kategori' => '<Teknologi><Pemrograman>',
            'deskripsi_abstrak' => 'Panduan menulis kode yang bersih, mudah dibaca, dan dipelihara.',
        ]);
        
        BukuSlims::create([
            'judul' => 'Sapiens: A Brief History of Humankind',
            'pengarang' => 'Yuval Noah Harari',
            'isbn_issn' => '9780062316097',
            'penerbit' => 'Harper',
            'tahun_terbit' => 2015,
            'subjek_kategori' => '<Sejarah>',
            'deskripsi_abstrak' => 'Eksplorasi mendalam tentang sejarah umat manusia dari zaman batu hingga abad ke-21.',
        ]);
        // Seed News
        \App\Models\News::create([
            'title' => 'SMK Prestasi Prima Raih Akreditasi A dengan Inovasi Kurikulum Digital Terpadu',
            'slug' => 'smk-prestasi-prima-raih-akreditasi-a',
            'category' => 'Akademik',
            'date' => '2025-10-12',
            'summary' => 'Pencapaian luar biasa ini merupakan hasil dedikasi seluruh civitas akademika dalam membangun ekosistem pendidikan masa depan yang berfokus pada kualitas.',
            'content' => 'Tahun ini, SMK Prestasi Prima secara resmi menerima sertifikat Akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M). Penilaian ini difokuskan pada terobosan sekolah dalam menerapkan Kurikulum Merdeka yang dipadukan dengan infrastruktur digital modern. Kepala Sekolah menyampaikan apresiasi setinggi-tingginya kepada para guru, staf, dan siswa yang terus menjaga standar keunggulan.',
            'image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
            'status' => 'published',
            'views_count' => 1520,
            'author_id' => 1,
        ]);

        \App\Models\News::create([
            'title' => 'Pekan Kokurikuler IT: Siswa Sukses Kembangkan Aplikasi Smart School',
            'slug' => 'siswa-kembangkan-aplikasi-smart-school',
            'category' => 'Teknologi',
            'date' => '2025-10-15',
            'summary' => 'Sebuah terobosan baru dalam digitalisasi lingkungan sekolah oleh siswa kelas XI.',
            'content' => 'Dalam rangka Pekan Kokurikuler IT, siswa-siswi jurusan Rekayasa Perangkat Lunak (RPL) mempresentasikan purwarupa (prototype) aplikasi "Smart Presma". Aplikasi ini dirancang untuk mempermudah presensi kehadiran menggunakan pemindai wajah (Face Recognition) serta notifikasi otomatis ke WhatsApp orang tua. Pengembangan memakan waktu 2 bulan dan didampingi langsung oleh guru ahli dari industri.',
            'image' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
            'status' => 'published',
            'views_count' => 840,
            'author_id' => 1,
        ]);

        \App\Models\News::create([
            'title' => 'Ultras Presma Menangkan Gelar Most Favorite Supporter DBL 2025',
            'slug' => 'ultras-presma-most-favorite-supporter-dbl',
            'category' => 'Olahraga',
            'date' => '2025-10-20',
            'summary' => 'Kreativitas tanpa batas suporter basket SMK Prestasi Prima di kancah regional.',
            'content' => 'Kabar gembira datang dari lapangan basket! Meski tim utama harus puas di posisi runner-up, basis pendukung sekolah "Ultras Presma" berhasil dinobatkan sebagai Most Favorite Supporter di ajang DBL tingkat regional. Koreografi tiga dimensi bertema "Future Tech" yang mereka tampilkan di babak final berhasil memukau dewan juri dan seluruh penonton di arena.',
            'image' => 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop',
            'status' => 'published',
            'views_count' => 2105,
            'author_id' => 1,
        ]);

        \App\Models\News::create([
            'title' => 'Tim Robotik Maju ke Kompetisi Internasional di Singapura',
            'slug' => 'tim-robotik-maju-ke-singapura',
            'category' => 'Prestasi',
            'date' => '2025-10-25',
            'summary' => 'Membawa nama harum bangsa melalui inovasi robot pemilah sampah otomatis.',
            'content' => 'Prestasi membanggakan kembali diukir oleh ekskul Robotik. Setelah menjuarai kompetisi tingkat nasional, tim robotik SMK Prestasi Prima secara resmi diundang untuk mewakili Indonesia dalam "Asian Youth Robotics Innovation" di Singapura. Robot "Eco-Bot 2.0" andalan mereka terbukti efektif memisahkan sampah organik dan anorganik dengan tingkat akurasi 98% berkat implementasi sensor cerdas.',
            'image' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
            'status' => 'published',
            'views_count' => 3450,
            'author_id' => 1,
        ]);
    }
}
