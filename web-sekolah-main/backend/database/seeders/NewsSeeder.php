<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;

class NewsSeeder extends Seeder
{
    public function run()
    {
        $newsItems = [
            [
                'title' => 'Siswa PPLG Kembangkan Aplikasi Pemantau Kualitas Udara Berbasis IoT',
                'slug' => 'siswa-pplg-kembangkan-aplikasi-iot',
                'category' => 'Teknologi',
                'date' => '2026-09-01',
                'summary' => 'Inovasi teknologi IoT karya siswa untuk memantau kualitas udara di lingkungan sekolah.',
                'content' => 'Siswa kelas XII dari program keahlian Pengembangan Perangkat Lunak dan Gim (PPLG) berhasil merancang purwarupa sistem pemantau udara berbasis Internet of Things (IoT). Alat ini terintegrasi dengan aplikasi mobile yang memberikan peringatan jika tingkat polusi udara melebihi batas wajar. Proyek ini mendapat apresiasi dari Dinas Lingkungan Hidup setempat.',
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 450,
                'author_id' => 1,
            ],
            [
                'title' => 'SMK Prestasi Prima Teken MoU dengan 5 Perusahaan Teknologi Terkemuka',
                'slug' => 'mou-dengan-5-perusahaan-teknologi',
                'category' => 'Pengumuman',
                'date' => '2026-09-05',
                'summary' => 'Kerjasama strategis untuk menjamin penyerapan lulusan ke dunia kerja.',
                'content' => 'Sebagai wujud komitmen link and match dengan dunia industri, SMK Prestasi Prima secara resmi menandatangani Nota Kesepahaman (MoU) dengan 5 raksasa teknologi nasional. Kerjasama ini mencakup penyelarasan kurikulum, program magang eksklusif, hingga rekrutmen langsung bagi lulusan terbaik. Kepala Sekolah menyatakan ini adalah lompatan besar untuk sekolah.',
                'image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 1200,
                'author_id' => 1,
            ],
            [
                'title' => 'Tim Futsal Sekolah Berhasil Menembus Final Liga Pelajar Nasional',
                'slug' => 'tim-futsal-masuk-final',
                'category' => 'Olahraga',
                'date' => '2026-09-10',
                'summary' => 'Kemenangan dramatis melalui adu penalti membawa tim sekolah ke puncak klasemen.',
                'content' => 'Pertandingan sengit melawan juara bertahan dari provinsi sebelah berakhir manis bagi tim futsal SMK Prestasi Prima. Melalui drama adu penalti yang mendebarkan, penjaga gawang kita berhasil menepis dua tendangan krusial. Mari dukung tim kebanggaan kita di laga final hari Minggu besok di GOR Utama!',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 3200,
                'author_id' => 1,
            ],
            [
                'title' => 'Karya Film Pendek Siswa BCF Terpilih Diputar di Festival Film Indie',
                'slug' => 'karya-film-siswa-bcf-terpilih',
                'category' => 'Prestasi',
                'date' => '2026-09-12',
                'summary' => 'Film dokumenter berjudul "Jejak Langkah" diakui kualitasnya oleh sineas profesional.',
                'content' => 'Film dokumenter pendek berdurasi 15 menit karya kelompok siswa jurusan Broadcast dan Perfilman (BCF) masuk dalam nominasi Karya Pelajar Terbaik di Festival Film Indie Nasional. Film yang mengangkat tema perjuangan anak pulau dalam menempuh pendidikan ini dinilai memiliki sinematografi yang setara dengan rumah produksi profesional.',
                'image' => 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 980,
                'author_id' => 1,
            ],
            [
                'title' => 'Workshop UI/UX Design Bersama Praktisi dari Startup Unicorn',
                'slug' => 'workshop-ui-ux-design',
                'category' => 'Kegiatan',
                'date' => '2026-09-15',
                'summary' => 'Siswa jurusan DKV dibekali ilmu desain aplikasi berstandar global.',
                'content' => 'Lebih dari 100 siswa antusias mengikuti workshop intensif bertema "Designing for the Future" yang diisi langsung oleh Senior Product Designer dari salah satu startup Unicorn ternama di Indonesia. Dalam sesi ini, siswa diajak melakukan bedah kasus desain antarmuka dan mencoba tools kolaborasi terkini seperti Figma dan FigJam.',
                'image' => 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 670,
                'author_id' => 1,
            ],
            [
                'title' => 'Pembaruan Fasilitas Lab Komputer TJKT dengan Server Generasi Terbaru',
                'slug' => 'pembaruan-fasilitas-lab-komputer-tjkt',
                'category' => 'Akademik',
                'date' => '2026-09-18',
                'summary' => 'Investasi sekolah untuk menunjang praktik jaringan dan komputasi awan (Cloud).',
                'content' => 'Merespon perkembangan industri Cloud Computing, pihak Yayasan telah resmi memperbarui infrastruktur Laboratorium Teknik Jaringan Komputer dan Telekomunikasi (TJKT). Lab kini dilengkapi dengan dua unit server enterprise baru serta perombakan topologi jaringan fiber optik internal guna menunjang praktik para siswa.',
                'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 520,
                'author_id' => 1,
            ],
            [
                'title' => 'Jadwal Ujian Tengah Semester (UTS) Ganjil Tahun 2026',
                'slug' => 'jadwal-uts-ganjil-2026',
                'category' => 'Pengumuman',
                'date' => '2026-09-20',
                'summary' => 'Pelaksanaan UTS akan diselenggarakan secara full digital menggunakan sistem sekolah.',
                'content' => 'Diinformasikan kepada seluruh siswa dan wali murid bahwa Ujian Tengah Semester Ganjil akan dimulai pada tanggal 5 Oktober 2026. Berbeda dengan tahun sebelumnya, seluruh ujian akan dilaksanakan menggunakan CBT (Computer Based Test) melalui portal E-Learning sekolah untuk mengurangi penggunaan kertas.',
                'image' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 2100,
                'author_id' => 1,
            ],
            [
                'title' => 'Siswa SMK Ciptakan Game Edukasi Sejarah Berbasis Virtual Reality',
                'slug' => 'game-edukasi-vr-karya-siswa',
                'category' => 'Teknologi',
                'date' => '2026-09-22',
                'summary' => 'Belajar sejarah proklamasi kemerdekaan kini lebih nyata lewat teknologi VR.',
                'content' => 'Kolaborasi antar jurusan PPLG dan DKV kembali membuahkan hasil memukau. Mereka sukses menciptakan purwarupa gim edukasi sejarah menggunakan teknologi Virtual Reality (VR). Pengguna dapat merasakan sensasi berada langsung di rumah Soekarno pada saat perumusan naskah proklamasi.',
                'image' => 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 1430,
                'author_id' => 1,
            ],
            [
                'title' => 'Pelepasan Kontingen Pramuka ke Jambore Nasional',
                'slug' => 'pelepasan-kontingen-pramuka',
                'category' => 'Kegiatan',
                'date' => '2026-09-25',
                'summary' => 'Tim Pramuka sekolah siap mengharumkan nama daerah di tingkat nasional.',
                'content' => 'Suasana haru dan bangga menyelimuti lapangan upacara saat Kepala Sekolah melepas 10 anggota Pramuka Penegak Bantara terpilih untuk mengikuti Jambore Nasional. Mereka telah menjalani pelatihan fisik dan mental selama 3 bulan penuh. Semoga kembali membawa piala dan pengalaman berharga!',
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 890,
                'author_id' => 1,
            ],
            [
                'title' => 'Juara Umum Lomba Keterampilan Siswa (LKS) Tingkat Provinsi',
                'slug' => 'juara-umum-lks-provinsi',
                'category' => 'Prestasi',
                'date' => '2026-09-28',
                'summary' => 'Sekolah menyabet 4 medali emas di ajang bergengsi vokasi tahunan.',
                'content' => 'Luar biasa! SMK Prestasi Prima kembali mempertahankan gelar Juara Umum di Lomba Keterampilan Siswa (LKS) tingkat provinsi. Medali emas diraih dari bidang IT Software Solutions for Business, Web Technologies, Graphic Design Technology, dan Information Network Cabling. Selanjutnya mereka bersiap menuju LKS Nasional.',
                'image' => 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop',
                'status' => 'published',
                'views_count' => 3800,
                'author_id' => 1,
            ]
        ];

        foreach ($newsItems as $item) {
            News::updateOrCreate(
                ['slug' => $item['slug']], // hindari duplikat jika seeder dijalankan ulang
                $item
            );
        }
    }
}
