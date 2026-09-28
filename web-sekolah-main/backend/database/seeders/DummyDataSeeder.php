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
    }
}
