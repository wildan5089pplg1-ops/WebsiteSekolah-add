const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface SchoolInfo {
  name: string;
  tagline: string;
  description: string;
  accreditation: string;
  principal: string;
  address: string;
  phone: string;
  email: string;
  stats: {
    students: number;
    teachers: number;
    extracurriculars: number;
    graduatesRate: string;
  };
}

export interface NewsItem {
  id: number | string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  image: string;
}

export interface FacilityItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export async function getSchoolInfo(): Promise<SchoolInfo> {
  try {
    const res = await fetch(`${API_BASE_URL}/school-info`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch school info');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Fallback to local mockup data:', error);
    return {
      name: 'SMK Prestasi Prima',
      tagline: 'Mewujudkan Generasi Unggul, Berkarakter, dan Berdaya Saing Global',
      description: 'SMK Prestasi Prima adalah sekolah unggulan yang berkomitmen menyediakan pendidikan berkualitas tinggi berbasis teknologi dan nilai-nilai luhur bangsa.',
      accreditation: 'A (Sangat Baik)',
      principal: 'Dr. H. Ahmad Fauzi, M.Pd.',
      address: 'Jl. Pendidikan No. 45, Jakarta Selatan',
      phone: '(021) 7890-1234',
      email: 'info@smkprestasiprima.sch.id',
      stats: {
        students: 1250,
        teachers: 85,
        extracurriculars: 24,
        graduatesRate: '98.5%'
      }
    };
  }
}

export async function getNewsList(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/news`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch news');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [
      {
        id: 'pengumuman',
        title: 'Ultras Presma Raih Juara 1 Most Favorite Supporter DBL 2025',
        category: 'Pengumuman Resmi',
        date: '20 September 2026',
        summary: 'Kreativitas tanpa batas, Ultras Presma berhasil memenangkan gelar 1st Place Best Supporter pada ajang Honda DBL 2025 East Jakarta.',
        content: 'Kabar membanggakan datang dari barisan suporter setia SMK Prestasi Prima, Ultras Presma! Pada ajang basket pelajar terbesar di Indonesia, Honda DBL 2025 seri Jakarta Timur, Ultras Presma berhasil menyabet gelar "1st Place Best Supporter". Kekompakan, kreativitas koreografi raksasa, serta sorakan semangat yang tak henti-hentinya menggema di arena menjadi kunci kemenangan ini.\n\nKeberhasilan ini membuktikan bahwa siswa SMK Prestasi Prima tidak hanya unggul dalam bidang akademik dan teknologi, namun juga memiliki solidaritas, kreativitas, dan jiwa korsa yang tinggi di luar ruang kelas. Seluruh civitas akademika mengucapkan selamat untuk Ultras Presma! Teruslah mendukung dengan sportif dan satu hati.',
        image: '/images/supporter.jpg'
      },
      {
        id: 1,
        title: 'Tim Robotik SMA 1 Meraih Medali Emas Olimpiade Sains Nasional 2026',
        category: 'Prestasi',
        date: '05 Agustus 2026',
        summary: 'Tim robotik siswa SMA Negeri 1 berhasil membawa pulang trofi juara pertama dalam kompetisi OSN bidang Teknologi.',
        content: 'Kabar membanggakan datang dari ajang Olimpiade Sains Nasional (OSN) 2026. Tim robotik SMA 1 berhasil mengalahkan puluhan sekolah pesaing dengan inovasi robot pemilah sampah otomatis berbasis AI.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 2,
        title: 'Pelaksanaan Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
        category: 'Pengumuman',
        date: '01 Agustus 2026',
        summary: 'Informasi lengkap mengenai jadwal, jalur pendaftaran, dan persyaratan berkas untuk calon siswa baru.',
        content: 'Pendaftaran PPDB SMK Prestasi Prima telah dibuka secara online. Terdapat 3 jalur pendaftaran yaitu Jalur Prestasi, Jalur Zonasi, dan Jalur Afirmasi.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 3,
        title: 'Workshop Digital Literacy dan Etika Media Sosial bagi Siswa Kelas X',
        category: 'Kegiatan',
        date: '28 Juli 2026',
        summary: 'Meningkatkan kesadaran digital dan literasi informasi di era AI bagi generasi muda.',
        content: 'Sekolah menyelenggarakan workshop literasi digital yang menghadirkan pakar cybersecurity dan komunikasi digital untuk membekali siswa dalam menyaring informasi hoax.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
      }
    ];
  }
}

export async function getNewsItem(id: string | number): Promise<NewsItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    const allNews = await getNewsList();
    return allNews.find(n => n.id.toString() === id.toString()) || null;
  }
}

export async function getFacilities(): Promise<FacilityItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/facilities`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch facilities');
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [
      {
        id: 1,
        title: 'Laboratorium Komputer & AI Lab',
        description: 'Dilengkapi 40 unit PC spesifikasi tinggi dan koneksi fiber optik 1 Gbps.',
        icon: '💻'
      },
      {
        id: 2,
        title: 'Perpustakaan Digital (E-Library)',
        description: 'Koleksi ribuan buku fisik dan akses gratis ke jurnal ilmiah serta ebook internasional.',
        icon: '📚'
      },
      {
        id: 3,
        title: 'Laboratorium IPA Terpadu',
        description: 'Fasilitas praktikum Fisika, Kimia, dan Biologi lengkap bersertifikasi standar laboratorium.',
        icon: '🔬'
      },
      {
        id: 4,
        title: 'Lap. Olahraga Multiguna & GOR Indoor',
        description: 'Lapangan basket, futsal, bulutangkis, dan sarana kebugaran siswa.',
        icon: '🏀'
      },
      {
        id: 5,
        title: 'Aula Utama & Auditorium Cyber',
        description: 'Kapasitas 1.000 penonton dengan sistem sound & LED display modern.',
        icon: '🏛️'
      },
      {
        id: 6,
        title: 'Kantin Sehat & Green Garden',
        description: 'Area kuliner higienis terverifikasi Dinkes dengan ruang terbuka hijau yang asri.',
        icon: '🍃'
      }
    ];
  }
}
