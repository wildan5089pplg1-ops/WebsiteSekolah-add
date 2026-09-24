'use client';

import React, { useState, useEffect } from 'react';

type TabType = 'dashboard' | 'carasa' | 'kelas';

interface Course {
  id: number;
  title: string;
  category: 'PPLG' | 'TJKT' | 'DKV' | 'BCF' | 'Karir';
  desc: string;
  link: string;
  biaya?: 'Gratis' | 'Biaya tertera';
}

// The COURSES_DATA is now fetched from the API

// =====================================================================
// DATA KUESIONER TES 1: MINAT & BAKAT (Exact 12 Questions from User)
// =====================================================================
type MajorKey = 'pplg' | 'tjkt' | 'bcf' | 'dkv';

interface MinatQuestion {
  question: string;
  options: [string, MajorKey][];
}

const MINAT_QUESTIONS: MinatQuestion[] = [
  {
    question: 'Aktivitas mana yang paling menarik bagimu?',
    options: [
      ['Membuat website, aplikasi, atau game', 'pplg'],
      ['Merakit komputer, memasang jaringan, atau memperbaiki perangkat', 'tjkt'],
      ['Membuat video, film pendek, atau mengatur produksi siaran', 'bcf'],
      ['Membuat poster, ilustrasi, logo, atau desain visual', 'dkv'],
    ],
  },
  {
    question: 'Saat mendapat tugas baru, kamu lebih suka…',
    options: [
      ['Mencari cara kerja lalu memecahkan masalah dengan kode', 'pplg'],
      ['Memasang, mengatur, atau memperbaiki perangkat dan jaringan', 'tjkt'],
      ['Merencanakan pengambilan gambar, merekam video, atau mengedit hasil produksi', 'bcf'],
      ['Menyusun konsep visual, memilih warna, dan membuat desain yang komunikatif', 'dkv'],
    ],
  },
  {
    question: 'Kamu paling menikmati aktivitas yang…',
    options: [
      ['Banyak logika, coding, dan teknologi software', 'pplg'],
      ['Banyak praktik perangkat, jaringan, dan troubleshooting', 'tjkt'],
      ['Berkaitan dengan kamera, video, audio, penyiaran, dan produksi film', 'bcf'],
      ['Berkaitan dengan desain, ilustrasi, tipografi, layout, dan komunikasi visual', 'dkv'],
    ],
  },
  {
    question: 'Kalau membuat proyek kelompok, peran yang kamu pilih?',
    options: [
      ['Programmer / pembuat sistem', 'pplg'],
      ['Teknisi / bagian jaringan dan perangkat', 'tjkt'],
      ['Kameramen / editor video / penata produksi', 'bcf'],
      ['Desainer / ilustrator / visual artist', 'dkv'],
    ],
  },
  {
    question: 'Apa yang paling ingin kamu pelajari?',
    options: [
      ['Programming dan pembuatan aplikasi', 'pplg'],
      ['Networking, server, dan sistem komputer', 'tjkt'],
      ['Videografi, editing video, penyiaran, dan produksi film', 'bcf'],
      ['Desain grafis, ilustrasi, branding, dan komunikasi visual', 'dkv'],
    ],
  },
  {
    question: 'Kamu lebih suka bekerja dengan…',
    options: [
      ['Kode, algoritma, dan data', 'pplg'],
      ['Komputer, server, kabel, dan perangkat jaringan', 'tjkt'],
      ['Kamera, microphone, lighting, footage, dan software editing', 'bcf'],
      ['Warna, gambar, layout, tipografi, dan elemen visual', 'dkv'],
    ],
  },
  {
    question: 'Masalah yang paling seru untuk kamu selesaikan?',
    options: [
      ['Aplikasi atau website tidak berjalan', 'pplg'],
      ['Internet atau jaringan komputer bermasalah', 'tjkt'],
      ['Video kurang menarik, audio bermasalah, atau hasil produksi belum sesuai konsep', 'bcf'],
      ['Desain terlihat kurang menarik atau pesan visualnya belum tersampaikan', 'dkv'],
    ],
  },
  {
    question: 'Di masa depan, kamu tertarik menjadi…',
    options: [
      ['Web Developer / Software Developer / Game Developer', 'pplg'],
      ['Network Technician / IT Support / Network Administrator', 'tjkt'],
      ['Videographer / Video Editor / Camera Operator / Film Producer', 'bcf'],
      ['Graphic Designer / Illustrator / Art Director / Visual Designer', 'dkv'],
    ],
  },
  {
    question: 'Kamu lebih suka hasil kerja yang…',
    options: [
      ['Bisa digunakan dan berjalan sesuai sistem', 'pplg'],
      ['Terhubung dan bekerja dengan stabil', 'tjkt'],
      ['Mampu menyampaikan cerita atau informasi melalui video dan audio', 'bcf'],
      ['Bagus dilihat sekaligus mampu menyampaikan pesan secara visual', 'dkv'],
    ],
  },
  {
    question: 'Saat belajar sesuatu, kamu cenderung…',
    options: [
      ['Mencoba membuat sendiri dengan coding', 'pplg'],
      ['Mencoba perangkat dan konfigurasi jaringan secara langsung', 'tjkt'],
      ['Mencoba mengambil gambar, merekam suara, dan mengedit video', 'bcf'],
      ['Mencoba berbagai gaya desain, komposisi, warna, dan tipografi', 'dkv'],
    ],
  },
  {
    question: 'Kamu lebih tertarik pada…',
    options: [
      ['Software dan teknologi digital', 'pplg'],
      ['Jaringan dan infrastruktur teknologi', 'tjkt'],
      ['Dunia broadcasting, perfilman, videografi, dan produksi audiovisual', 'bcf'],
      ['Desain komunikasi visual, ilustrasi, fotografi, dan seni visual', 'dkv'],
    ],
  },
  {
    question: 'Pilih proyek yang paling ingin kamu kerjakan.',
    options: [
      ['Membuat aplikasi sekolah', 'pplg'],
      ['Membangun dan mengelola jaringan lab sekolah', 'tjkt'],
      ['Membuat film pendek atau video dokumenter sekolah', 'bcf'],
      ['Membuat identitas visual, poster, dan media promosi sekolah', 'dkv'],
    ],
  },
];

const MAJOR_LABELS: Record<MajorKey, string> = {
  pplg: 'PPLG — Pengembangan Perangkat Lunak dan Gim',
  tjkt: 'TJKT — Teknik Jaringan Komputer dan Telekomunikasi',
  bcf: 'BCF — Broadcasting dan Film',
  dkv: 'DKV — Desain Komunikasi Visual',
};

const MAJOR_DETAILS: Record<MajorKey, { code: string; name: string; desc: string; careers: string[] }> = {
  pplg: {
    code: 'PPLG',
    name: 'Pengembangan Perangkat Lunak dan Gim',
    desc: 'Programming, website, aplikasi, dan pengembangan gim.',
    careers: ['Web Developer', 'Software Developer', 'Game Developer', 'Backend Engineer'],
  },
  tjkt: {
    code: 'TJKT',
    name: 'Teknik Jaringan Komputer dan Telekomunikasi',
    desc: 'Jaringan komputer, perangkat, troubleshooting, dan infrastruktur teknologi.',
    careers: ['Network Technician', 'IT Support', 'Network Administrator', 'Cloud Specialist'],
  },
  bcf: {
    code: 'BCF',
    name: 'Broadcasting dan Film',
    desc: 'Broadcasting dan Film, pemasaran konten audiovisual, penyiaran siaran live, dan produksi video.',
    careers: ['Videographer', 'Video Editor', 'Camera Operator', 'Film & Live Producer'],
  },
  dkv: {
    code: 'DKV',
    name: 'Desain Komunikasi Visual',
    desc: 'Desain, ilustrasi, branding, layouting, tipografi, dan komunikasi visual.',
    careers: ['Graphic Designer', 'UI Designer', 'Illustrator', 'Visual Art Director'],
  },
};

interface MinatResultData {
  scores: Record<MajorKey, number>;
  topMajor: MajorKey;
  topPercentage: number;
  sortedScores: [MajorKey, number][];
}

// =====================================================================
// DATA KUESIONER TES 2: REKOMENDASI KARIR & INDUSTRI (Distinct 8 Questions)
// =====================================================================
type CareerKey = 'swe' | 'infra' | 'creative' | 'media';

interface CareerQuestion {
  question: string;
  options: [string, CareerKey][];
}

const CAREER_QUESTIONS: CareerQuestion[] = [
  {
    question: 'Gaya kerja profesional seperti apa yang paling kamu sukai saat magang di industri?',
    options: [
      ['Membangun arsitektur perangkat lunak yang bersih, cepat, dan scalable', 'swe'],
      ['Menjaga sistem jaringan dan server tetap aman dari downtime maupun serangan siber', 'infra'],
      ['Merancang antarmuka aplikasi intuitif dan estetika visual yang disukai pengguna', 'creative'],
      ['Memimpin alur produksi siaran, mengelola tata kamera, audio, dan live streaming', 'media'],
    ],
  },
  {
    question: 'Ketika perusahaan mitra menghadapi kendala teknis kritis, kamu paling ingin berkontribusi dalam…',
    options: [
      ['Debugging kode sistem, optimasi query database, dan perbaikan API', 'swe'],
      ['Analisis lalu lintas jaringan, audit firewall, dan failover server', 'infra'],
      ['Redesain alur antarmuka yang membingungkan user untuk menaikkan konversi', 'creative'],
      ['Mengatur siaran darurat, penataan audio jernih, dan stabilitas output video', 'media'],
    ],
  },
  {
    question: 'Sertifikasi keahlian industri mana yang menjadi target utamamu sebelum lulus?',
    options: [
      ['AWS Certified Developer / Oracle Certified Java / BNSP Pemrogram Senior', 'swe'],
      ['MikroTik MTCNA/MTCRE / Cisco CCNA / CompTIA Security+', 'infra'],
      ['Adobe Certified Professional / Google UX Design Professional', 'creative'],
      ['DaVinci Resolve Colorist / BNSP Tata Kelola Produksi Penyiaran', 'media'],
    ],
  },
  {
    question: 'Lingkungan perusahaan seperti apa yang paling kamu impikan setelah lulus SMK?',
    options: [
      ['Perusahaan Tech Unicorn, Software House, atau SaaS Enterprise', 'swe'],
      ['Data Center Tier-3, Internet Service Provider (ISP), atau Divisi Cyber Defense', 'infra'],
      ['Design Consultancy, Creative Agency, atau Studio Game Internasional', 'creative'],
      ['Lembaga Penyiaran TV Nasional, Production House Film, atau Media Digital Kreatif', 'media'],
    ],
  },
  {
    question: 'Dalam project tim industri, peran kepemimpinan (lead) mana yang paling cocok denganmu?',
    options: [
      ['Tech Lead: Mengawasi kualitas kode dan integrasi teknologi tim engineer', 'swe'],
      ['Infrastructure Lead: Menjamin 99.9% uptime server dan kesiapan disaster recovery', 'infra'],
      ['Design Lead: Mengarahkan pedoman visual (Design System) dan brand experience', 'creative'],
      ['Production Lead: Mengatur jadwal shooting, tim operator alat, dan siaran live', 'media'],
    ],
  },
  {
    question: 'Bagaimana kamu memandang pemanfaatan Artificial Intelligence (AI) di bidang pekerjaanmu?',
    options: [
      ['Memanfaatkan AI coding assistant untuk mempercepat pengembangan fitur software', 'swe'],
      ['Menggunakan AI network anomaly detection untuk mendeteksi ancaman intrusi siber', 'infra'],
      ['Mengintegrasikan generative AI visual sebagai bahan eksplorasi ide desain kreatif', 'creative'],
      ['Menggunakan AI untuk automated captioning, color grading, dan audio enhancement', 'media'],
    ],
  },
  {
    question: 'Proyek portfolio apa yang paling ingin kamu tunjukkan kepada perekrut HR saat seleksi kerja?',
    options: [
      ['Web aplikasi interaktif terintegrasi database dengan dokumentasi API lengkap', 'swe'],
      ['Topologi jaringan multi-router MikroTik dengan konfigurasi VPN dan firewall aktif', 'infra'],
      ['Prototype interaktif aplikasi mobile lengkap dengan case study riset UX nyata', 'creative'],
      ['Video promosi komersial atau rekaman live event multi-kamera berkualitas broadcast', 'media'],
    ],
  },
  {
    question: 'Kriteria hasil kerja yang paling kamu banggakan setelah menuntaskan tugas magang industri?',
    options: [
      ['Sistem dapat menampung ribuan concurrent user tanpa delay atau lag', 'swe'],
      ['Seluruh infrastruktur kantor cabang terhubung aman tanpa celah kebocoran', 'infra'],
      ['Desain diapresiasi klien dan meningkatkan kepuasan pengguna secara nyata', 'creative'],
      ['Siaran berjalan mulus tepat waktu dengan kualitas visual audio standar TV nasional', 'media'],
    ],
  },
];

const CAREER_LABELS: Record<CareerKey, string> = {
  swe: 'Software Engineering & Cloud Computing',
  infra: 'Cybersecurity & Network Infrastructure',
  creative: 'Digital Design, UI/UX & Art Direction',
  media: 'Broadcast Media & Live Production Management',
};

const CAREER_DETAILS: Record<CareerKey, { title: string; subtitle: string; desc: string; roles: string[]; skills: string[] }> = {
  swe: {
    title: 'Software Engineering & Cloud Computing',
    subtitle: 'Arsitektur Aplikasi & Rekayasa Perangkat Lunak',
    desc: 'Kamu memiliki kecakapan analitis tinggi untuk membangun sistem aplikasi modern, otomasi backend, dan arsitektur cloud terdistribusi.',
    roles: ['Fullstack Web Developer', 'Mobile App Engineer', 'DevOps Specialist', 'API & Backend Engineer'],
    skills: ['Next.js / React', 'Node.js & Python', 'PostgreSQL / Supabase', 'Docker & Cloud Deployment'],
  },
  infra: {
    title: 'Cybersecurity & Network Infrastructure',
    subtitle: 'Keamanan Siber & Keandalan Infrastruktur Jaringan',
    desc: 'Keahlianmu berpusat pada stabilitas sistem jaringan tingkat korporat, pencegahan peretasan siber, dan manajemen server data center.',
    roles: ['Network Security Engineer', 'Cyber Incident Analyst', 'System Administrator', 'Cloud Infrastructure Engineer'],
    skills: ['MikroTik RouterOS v7', 'Firewall & VPN Security', 'Linux Server Hardening', 'Packet Analysis & Wireshark'],
  },
  creative: {
    title: 'Digital Design, UI/UX & Art Direction',
    subtitle: 'Desain Produk Digital & Komunikasi Visual Interaktif',
    desc: 'Kekuatan utamamu adalah merancang pengalaman antarmuka digital yang estetis, riset perilaku pengguna, dan perancangan Design System.',
    roles: ['UI/UX Product Designer', 'Creative Art Director', 'Motion Graphics Designer', 'Design System Lead'],
    skills: ['Figma Prototyping', 'Design Thinking & UX Research', 'Adobe Illustrator / Photoshop', 'Design Tokens & Typography'],
  },
  media: {
    title: 'Broadcast Media & Live Production Management',
    subtitle: 'Manajemen Penyiaran, Videografi & Produksi Audiovisual',
    desc: 'Kamu memiliki bakat koordinasi produksi konten penyiaran, live streaming skala besar, pengoperasian kamera studio, dan audio engineering.',
    roles: ['Live Broadcast Director', 'Broadcast Technical Operator', 'Senior Video Editor', 'Audiovisual Producer'],
    skills: ['vMix / OBS Multi-Camera', 'DaVinci Resolve / Premiere Pro', 'Studio Lighting & Acoustics', 'Live Stream Protocol & Encoding'],
  },
};

interface CareerResultData {
  scores: Record<CareerKey, number>;
  topTrack: CareerKey;
  readinessScore: number;
  sortedScores: [CareerKey, number][];
}

// =====================================================================
// MAIN COMPONENT
// =====================================================================
export default function PresmaCareerSection({ initialTab = 'dashboard' }: { initialTab?: TabType }) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  // Completed Test Results (Stored in localStorage)
  const [minatResult, setMinatResult] = useState<MinatResultData | null>(null);
  const [careerResult, setCareerResult] = useState<CareerResultData | null>(null);

  // Modals state
  const [isMinatQuizOpen, setIsMinatQuizOpen] = useState(false);
  const [isMinatResultOpen, setIsMinatResultOpen] = useState(false);
  const [isCareerQuizOpen, setIsCareerQuizOpen] = useState(false);
  const [isCareerResultOpen, setIsCareerResultOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Minat Quiz state
  const [minatIdx, setMinatIdx] = useState(0);
  const [minatAnswers, setMinatAnswers] = useState<number[]>([]);

  // Career Quiz state
  const [careerIdx, setCareerIdx] = useState(0);
  const [careerAnswers, setCareerAnswers] = useState<number[]>([]);

  // Load saved results and fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoadingCourses(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/kelas-pelatihan');
        const data = await response.json();
        if (data.success) {
          // Map backend fields to frontend interface
          const mappedCourses: Course[] = data.data.map((c: any) => ({
            id: c.id,
            title: c.judul,
            category: c.tipe,
            desc: c.deskripsi,
            link: c.link,
            biaya: c.biaya,
          }));
          setCourses(mappedCourses);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setIsLoadingCourses(false);
      }
    };

    fetchCourses();
    if (typeof window !== 'undefined') {
      try {
        const savedMinat = localStorage.getItem('presma_carasa_minat_result');
        if (savedMinat) {
          setMinatResult(JSON.parse(savedMinat));
        }
        const savedCareer = localStorage.getItem('presma_carasa_career_result');
        if (savedCareer) {
          setCareerResult(JSON.parse(savedCareer));
        }
      } catch (err) {
        console.error('Error loading saved CARASA results:', err);
      }

      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam === 'carasa' || tabParam === 'kelas' || tabParam === 'dashboard') {
        setActiveTab(tabParam as TabType);
      }
    }
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // =====================================================================
  // ACTIONS: TES MINAT & BAKAT
  // =====================================================================
  const startMinatTest = () => {
    setMinatIdx(0);
    setMinatAnswers([]);
    setIsMinatQuizOpen(true);
  };

  const handleSelectMinatOption = (optionIndex: number) => {
    const updated = [...minatAnswers];
    updated[minatIdx] = optionIndex;
    setMinatAnswers(updated);
  };

  const handleNextMinat = () => {
    if (minatAnswers[minatIdx] === undefined) {
      alert('Pilih salah satu jawaban dulu ya.');
      return;
    }
    if (minatIdx < MINAT_QUESTIONS.length - 1) {
      setMinatIdx(minatIdx + 1);
    } else {
      finishMinatTest();
    }
  };

  const finishMinatTest = () => {
    const scores: Record<MajorKey, number> = { pplg: 0, tjkt: 0, bcf: 0, dkv: 0 };
    minatAnswers.forEach((ansIndex, qIndex) => {
      if (ansIndex !== undefined && MINAT_QUESTIONS[qIndex]) {
        const majorKey = MINAT_QUESTIONS[qIndex].options[ansIndex][1];
        scores[majorKey] += 1;
      }
    });

    const sorted = (Object.entries(scores) as [MajorKey, number][]).sort((a, b) => b[1] - a[1]);
    const topMajor = sorted[0][0];
    const topPercentage = Math.round((sorted[0][1] / MINAT_QUESTIONS.length) * 100);

    const resultData: MinatResultData = {
      scores,
      topMajor,
      topPercentage,
      sortedScores: sorted,
    };

    setMinatResult(resultData);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('presma_carasa_minat_result', JSON.stringify(resultData));
      } catch (e) {
        console.error(e);
      }
    }
    setIsMinatQuizOpen(false);
    setIsMinatResultOpen(true);
  };

  const resetMinatTest = () => {
    setMinatAnswers([]);
    setMinatIdx(0);
    setMinatResult(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('presma_carasa_minat_result');
    }
    setIsMinatResultOpen(false);
    setIsMinatQuizOpen(true);
  };

  // =====================================================================
  // ACTIONS: TES REKOMENDASI KARIR & INDUSTRI
  // =====================================================================
  const startCareerTest = () => {
    setCareerIdx(0);
    setCareerAnswers([]);
    setIsCareerQuizOpen(true);
  };

  const handleSelectCareerOption = (optionIndex: number) => {
    const updated = [...careerAnswers];
    updated[careerIdx] = optionIndex;
    setCareerAnswers(updated);
  };

  const handleNextCareer = () => {
    if (careerAnswers[careerIdx] === undefined) {
      alert('Pilih salah satu jawaban terlebih dahulu.');
      return;
    }
    if (careerIdx < CAREER_QUESTIONS.length - 1) {
      setCareerIdx(careerIdx + 1);
    } else {
      finishCareerTest();
    }
  };

  const finishCareerTest = () => {
    const scores: Record<CareerKey, number> = { swe: 0, infra: 0, creative: 0, media: 0 };
    careerAnswers.forEach((ansIndex, qIndex) => {
      if (ansIndex !== undefined && CAREER_QUESTIONS[qIndex]) {
        const trackKey = CAREER_QUESTIONS[qIndex].options[ansIndex][1];
        scores[trackKey] += 1;
      }
    });

    const sorted = (Object.entries(scores) as [CareerKey, number][]).sort((a, b) => b[1] - a[1]);
    const topTrack = sorted[0][0];
    const readinessScore = Math.round((sorted[0][1] / CAREER_QUESTIONS.length) * 100);

    const resultData: CareerResultData = {
      scores,
      topTrack,
      readinessScore,
      sortedScores: sorted,
    };

    setCareerResult(resultData);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('presma_carasa_career_result', JSON.stringify(resultData));
      } catch (e) {
        console.error(e);
      }
    }
    setIsCareerQuizOpen(false);
    setIsCareerResultOpen(true);
  };

  const resetCareerTest = () => {
    setCareerAnswers([]);
    setCareerIdx(0);
    setCareerResult(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('presma_carasa_career_result');
    }
    setIsCareerResultOpen(false);
    setIsCareerQuizOpen(true);
  };

  // Filter courses for tab 3
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 font-sans">
      
      {/* Outer Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row min-h-[720px]">
        
        {/* ========================================================= */}
        {/* SIDEBAR NAVIGATION (Matching Screenshot Reference) */}
        {/* ========================================================= */}
        <aside className="w-full md:w-72 lg:w-80 bg-[#e9ecef] dark:bg-slate-800/80 p-6 flex flex-col justify-between border-r border-slate-300/80 dark:border-slate-700/60 shrink-0">
          <div>
            {/* Header Brand */}
            <div className="flex items-start gap-3 mb-8">
              <div className="w-11 h-11 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  PRESMA CAREER
                </h1>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight mt-1">
                  Pusat bimbingan karir, <span className="text-orange-600 dark:text-orange-400 font-bold">tes minat bakat</span> &amp; <span className="text-orange-600 dark:text-orange-400 font-bold">pelatihan siswa</span> SMK Prestasi Prima.
                </p>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="flex flex-col gap-2.5" aria-label="Menu Presma Career">
              {/* 1. Dashboard Tab */}
              <button
                type="button"
                onClick={() => handleTabChange('dashboard')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-slate-700/60'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </button>

              {/* 2. CARASA Tab */}
              <button
                type="button"
                onClick={() => handleTabChange('carasa')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 text-left ${
                  activeTab === 'carasa'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-slate-700/60'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>CARASA</span>
              </button>

              {/* 3. Kelas & Pelatihan Tab */}
              <button
                type="button"
                onClick={() => handleTabChange('kelas')}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 text-left ${
                  activeTab === 'kelas'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-slate-700/60'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Kelas &amp; Pelatihan</span>
              </button>
            </nav>
          </div>

          {/* Quick Info & BKK Contact Card */}
          <div className="mt-8 pt-6 border-t border-slate-300/70 dark:border-slate-700/60">
            <div className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
                Layanan BKK Sekolah
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                Butuh konsultasi penyaluran PKL atau magang kerja? Hubungi tim karir kami.
              </p>
              <a
                href="https://wa.me/6285195928886?text=Halo%20BKK%20SMK%20Prestasi%20Prima,%20saya%20ingin%20konsultasi%20karir"
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
              >
                <span>Chat Admin BKK</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN CONTENT AREA */}
        {/* ========================================================= */}
        <div className="flex-1 relative flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
          
          {/* Top Center School Logo (Referenced in all 3 panels) */}
          <div className="pt-6 pb-2 flex justify-center items-center z-10">
            <div className="w-12 h-12 rounded-full p-1 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <img
                src="/images/logo-smk.png"
                alt="Logo SMK Prestasi Prima"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'https://ui-avatars.com/api/?name=SP&background=f97316&color=fff';
                }}
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="relative p-6 sm:p-8 flex flex-col gap-8 animate-fadeIn">
              
              {/* Background Watermark */}
              <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src="/images/logo-smk.png" alt="Watermark" className="w-[500px] h-auto object-contain" />
              </div>

              {/* Welcome Banner */}
              <div className="relative z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-orange-500/20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold mb-3">
                      <span>✦ Portal Karir &amp; Talenta Siswa</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      Selamat Datang di Presma Career!
                    </h2>
                    <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                      Wadah terintegrasi bagi siswa SMK Prestasi Prima untuk mengukur kesiapan karir melalui asesmen <strong>CARASA</strong>, mengikuti <strong>kelas pelatihan industri</strong>, serta bersiap menuju dunia kerja nyata.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleTabChange('carasa')}
                      className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      Buka CARASA &rarr;
                    </button>
                    <button
                      onClick={() => handleTabChange('kelas')}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors"
                    >
                      Jelajahi Kelas
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistics Metric Cards */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pelatihan Aktif</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                    {isLoadingCourses ? '...' : `${courses.length} Kelas`}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tes Minat Bakat</span>
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${minatResult ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-500'}`}>
                      {minatResult ? '✓' : '—'}
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white mt-2 truncate">
                    {minatResult ? MAJOR_DETAILS[minatResult.topMajor].code : 'Belum Tes'}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 block">
                    {minatResult ? `Kecocokan: ${minatResult.topPercentage}%` : 'Siap Dikerjakan'}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Kesiapan Karir</span>
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${careerResult ? 'bg-blue-500/10 text-blue-600' : 'bg-purple-500/10 text-purple-500'}`}>
                      {careerResult ? '✓' : '—'}
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-900 dark:text-white mt-2 truncate">
                    {careerResult ? `${careerResult.readinessScore}%` : 'Belum Tes'}
                  </div>
                  <span className="text-[11px] text-orange-500 font-medium mt-1 block">
                    {careerResult ? CAREER_DETAILS[careerResult.topTrack].title.split(' ')[0] : 'Siap Diuji'}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mitra Industri (PKL)</span>
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-sm">50+</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">Perusahaan</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 block">Kerja Sama Aktif BKK</span>
                </div>
              </div>

              {/* 2 Feature Highlights: CARASA Quick Hub & Featured Classes */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* CARASA Quick Assessment Banner */}
                <div className="p-6 rounded-2xl border border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50/60 to-white dark:from-slate-800/80 dark:to-slate-800/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider">
                        CARASA
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Asesmen Minat &amp; Bakat</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {minatResult ? `Profil Minatmu: ${MAJOR_LABELS[minatResult.topMajor]}` : 'Belum Mengetahui Jalur Karir yang Tepat?'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {minatResult
                        ? `Berdasarkan tes 12 pertanyaan, kamu paling condong ke jurusan ${MAJOR_DETAILS[minatResult.topMajor].name}. Buka hasil lengkap untuk melihat saran karir.`
                        : 'Ikuti tes CARASA 12 pertanyaan untuk memetakan potensi diri, kecocokan jurusan, serta proyeksi karir masa depan di SMK Prestasi Prima.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    {minatResult ? (
                      <>
                        <button
                          onClick={() => setIsMinatResultOpen(true)}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                        >
                          Lihat Hasil Minat
                        </button>
                        <button
                          onClick={resetMinatTest}
                          className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <span>🔄</span>
                          <span>Ulangi Tes</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={startMinatTest}
                        className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                      >
                        Mulai Tes Minat &amp; Bakat
                      </button>
                    )}
                  </div>
                </div>

                {/* Popular Classes Mini List */}
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Pelatihan Unggulan Siswa
                      </h3>
                      <button
                        onClick={() => handleTabChange('kelas')}
                        className="text-xs text-orange-500 hover:text-orange-600 font-bold"
                      >
                        Lihat Semua &rarr;
                      </button>
                    </div>
                    <div className="space-y-3 mt-4">
                      {courses.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedCourse(item)}
                          className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/70 hover:border-orange-400 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center text-xs font-black">
                              {item.category}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                          <span className="text-[11px] text-orange-600 font-semibold shrink-0 ml-2">Detail</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Industrial Partners Preview */}
              <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-4">
                  Didukung Mitra Industri &amp; BKK SMK Prestasi Prima:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-center">
                  {['Axioo Class Program', 'MikroTik Academy', 'Telkom Indonesia', 'Samsung Tech Institute', 'BCA Synrgy', 'Kompas Gramedia'].map((partner, idx) => (
                    <div key={idx} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
                      {partner}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: CARASA (Updated per User Instructions) */}
          {/* ========================================================= */}
          {activeTab === 'carasa' && (
            <div className="relative p-6 sm:p-10 flex flex-col gap-10 animate-fadeIn">
              
              {/* Background Watermark */}
              <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
                <img src="/images/logo-smk.png" alt="Watermark CARASA" className="w-[520px] h-auto object-contain" />
              </div>

              {/* Subheader */}
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  C A R A S A
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
                  Career Readiness &amp; Aptitude Self-Assessment SMK Prestasi Prima
                </p>
              </div>

              {/* 2 Focused Assessment Cards (Bottom static "Lihat Hasil" cards REMOVED as requested) */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                
                {/* Card 1: Tes Minat dan Bakat (CARASA 12 Questions) */}
                <div className="bg-[#e9ecef]/80 dark:bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between shadow-sm min-h-[190px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        Tes Minat dan Bakat
                      </h3>
                      {minatResult && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
                          <span>✓</span>
                          <span>Selesai</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Evaluasi preferensi jurusan (PPLG, TJKT, BCF, DKV) melalui kuesioner 12 pertanyaan pemetaan potensi diri.
                    </p>
                    {minatResult && (
                      <div className="mt-3 p-2.5 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Profil paling menonjol: </span>
                        <strong className="text-orange-600 dark:text-orange-400">
                          {MAJOR_DETAILS[minatResult.topMajor].code} ({minatResult.topPercentage}%)
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* Actions: Show "Mulai Tes" OR "Lihat Hasil" + "Ulangi Tes" side-by-side */}
                  <div className="mt-5 flex items-center gap-3">
                    {!minatResult ? (
                      <button
                        type="button"
                        onClick={startMinatTest}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                      >
                        Mulai Tes
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsMinatResultOpen(true)}
                          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                        >
                          Lihat Hasil
                        </button>
                        <button
                          type="button"
                          onClick={resetMinatTest}
                          className="px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <span>🔄</span>
                          <span>Ulangi Tes</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Card 2: Tes Rekomendasi Karir & Kesiapan Industri (Distinct 8 Questions) */}
                <div className="bg-[#e9ecef]/80 dark:bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between shadow-sm min-h-[190px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        Tes Rekomendasi Karir &amp; Industri
                      </h3>
                      {careerResult && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 flex items-center gap-1">
                          <span>✓</span>
                          <span>Selesai</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Uji kesiapan etika kerja, target sertifikasi profesional, dan arah spesialisasi karir di dunia industri nyata.
                    </p>
                    {careerResult && (
                      <div className="mt-3 p-2.5 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Jalur Karir: </span>
                        <strong className="text-blue-600 dark:text-blue-400">
                          {CAREER_DETAILS[careerResult.topTrack].title.split('&')[0]} ({careerResult.readinessScore}%)
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* Actions: Show "Mulai Tes" OR "Lihat Hasil" + "Ulangi Tes" side-by-side */}
                  <div className="mt-5 flex items-center gap-3">
                    {!careerResult ? (
                      <button
                        type="button"
                        onClick={startCareerTest}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                      >
                        Mulai Tes
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsCareerResultOpen(true)}
                          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                        >
                          Lihat Hasil
                        </button>
                        <button
                          type="button"
                          onClick={resetCareerTest}
                          className="px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <span>🔄</span>
                          <span>Ulangi Tes</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Section: PROGRAM KELAS LAIN DI LUAR KELAS (Matching screenshot 2) */}
              <div className="relative z-10 pt-4 max-w-4xl mx-auto w-full">
                <div className="text-center mb-6">
                  <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                    PROGRAM KELAS LAIN DI LUAR KELAS
                  </h3>
                </div>

                {/* 3 Bottom Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Card 1: KELAS DALAM KELAS */}
                  <div className="bg-[#e9ecef]/70 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between min-h-[140px] text-center">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider mb-2">
                        KELAS DALAM KELAS
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        Integrasi project-based learning industri langsung ke dalam mata pelajaran kejuruan harian siswa.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 mt-4 block">
                      Kurikulum Industri
                    </span>
                  </div>

                  {/* Card 2: KELAS INDUSTRI */}
                  <div className="bg-[#e9ecef]/70 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between min-h-[140px] text-center">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider mb-2">
                        KELAS INDUSTRI
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        Kelas intensif khusus dengan mentor praktisi langsung dari Axioo, Mikrotik, dan perusahaan mitra.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 mt-4 block">
                      Sertifikasi Kompetensi
                    </span>
                  </div>

                  {/* Card 3: KARIR DAN INDUSTRI */}
                  <div className="bg-[#e9ecef]/70 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between min-h-[140px] text-center">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider mb-2">
                        KARIR DAN INDUSTRI
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        Penyaluran Praktik Kerja Lapangan (PKL), job matching, dan rekrutmen kerja lulusan SMK Prestasi Prima.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 mt-4 block">
                      Bursa Kerja Khusus (BKK)
                    </span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: KELAS & PELATIHAN (Matching Screen 0 & 3 in Screenshot) */}
          {/* ========================================================= */}
          {activeTab === 'kelas' && (
            <div className="relative p-6 sm:p-8 flex flex-col gap-6 animate-fadeIn">
              
              {/* Header Bar with Title and Search Input (Matching Screenshot 0 & 3) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black text-orange-500 tracking-tight">
                  Kelas &amp; Pelatihan
                </h2>

                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Cari pelatihan / kelas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {['Semua', 'PPLG', 'TJKT', 'DKV', 'BCF', 'Karir'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of Class Cards (Row layout matching screenshot 0: Left box + Right info) */}
              <div className="space-y-4">
                {isLoadingCourses ? (
                  <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      Memuat kelas & pelatihan...
                    </p>
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-100/50 dark:from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="w-24 h-24 mb-6 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center relative z-10 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                      <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 relative z-10 tracking-tight">Oops! Kelas Belum Tersedia</h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 max-w-md relative z-10 leading-relaxed">
                      Waduh, sepertinya tidak ada kelas yang cocok dengan kata kunci <strong className="text-slate-700 dark:text-slate-200">"{searchQuery}"</strong> di kategori <strong className="text-slate-700 dark:text-slate-200">{selectedCategory}</strong>. Coba kata kunci lain yuk!
                    </p>
                    
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('Semua');
                      }}
                      className="relative z-10 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/30"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Reset Filter Pencarian
                    </button>
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 hover:border-orange-400 dark:hover:border-orange-500 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm group"
                    >
                      {/* Left: Thumbnail & Main info */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Course Badge / Thumbnail */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#e9ecef] dark:bg-slate-700 border border-slate-300/80 dark:border-slate-600 flex flex-col items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform">
                          <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 tracking-wider">
                            {course.category}
                          </span>
                        </div>

                        {/* Title and details */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                              {course.category}
                            </span>
                            {course.biaya && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${course.biaya === 'Gratis' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'}`}>
                                {course.biaya}
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 hidden sm:block">
                            {course.desc}
                          </p>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-700/60">
                        <button
                          type="button"
                          onClick={() => setSelectedCourse(course)}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
                        >
                          Detail Silabus
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCourse(course)}
                          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                        >
                          Ikuti Kelas
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}



        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: KUESIONER TES MINAT & BAKAT (12 Questions) */}
      {/* ========================================================= */}
      {isMinatQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsMinatQuizOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>

            {/* Quiz Header & Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-orange-500 text-white text-[10px] font-black rounded-md uppercase tracking-wider">
                  CARASA — TES MINAT &amp; BAKAT
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Pertanyaan {minatIdx + 1} dari {MINAT_QUESTIONS.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((minatIdx + 1) / MINAT_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="my-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {MINAT_QUESTIONS[minatIdx].question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {MINAT_QUESTIONS[minatIdx].options.map((option, optIdx) => {
                const isSelected = minatAnswers[minatIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectMinatOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10 text-orange-950 dark:text-orange-200 ring-2 ring-orange-500/30'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {option[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-200 dark:border-slate-800">
              {minatIdx > 0 ? (
                <button
                  type="button"
                  onClick={() => setMinatIdx(minatIdx - 1)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  &larr; Sebelumnya
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextMinat}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-105"
              >
                {minatIdx === MINAT_QUESTIONS.length - 1 ? 'Lihat Hasil →' : 'Lanjut →'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: HASIL CARASA MINAT & BAKAT (Matching User Format) */}
      {/* ========================================================= */}
      {isMinatResultOpen && minatResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsMinatResultOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>

            {/* Header: sectiontitle */}
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-orange-500 text-white text-[11px] font-black rounded-full uppercase tracking-wider mb-2">
                HASIL CARASA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {MAJOR_LABELS[minatResult.topMajor]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                Hasil ini adalah bahan eksplorasi, bukan penentuan mutlak jurusan.
              </p>
            </div>

            {/* resultgrid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              
              {/* Card 1: Profil Minat */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                  Profil Minat
                </h3>
                <div className="space-y-4">
                  {minatResult.sortedScores.map(([majorKey, score]) => {
                    const percentage = Math.round((score / MINAT_QUESTIONS.length) * 100);
                    return (
                      <div key={majorKey} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                          <span className="truncate pr-2">{MAJOR_DETAILS[majorKey].code}</span>
                          <span className="text-orange-500 shrink-0">{percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-orange-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Jurusan yang Dapat Kamu Eksplorasi */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                    Jurusan yang Dapat Kamu Eksplorasi
                  </h3>
                  
                  <div className="p-3.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 rounded-xl mb-3">
                    <span className="text-[10px] font-black uppercase text-orange-600 dark:text-orange-400 block mb-1">
                      Profil Paling Menonjol
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {MAJOR_DETAILS[minatResult.topMajor].name} ({MAJOR_DETAILS[minatResult.topMajor].code})
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {MAJOR_DETAILS[minatResult.topMajor].desc}
                    </p>
                  </div>

                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Prospek Profesi Karir:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {MAJOR_DETAILS[minatResult.topMajor].careers.map((career, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-lg"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  <strong>💡 Eksplorasi lebih lanjut:</strong> Gunakan hasil ini sebagai titik awal untuk mengenali pilihanmu. Pelajari jurusan dan karier yang menarik bagimu sebelum menentukan pilihan.
                </div>
              </div>

            </div>

            {/* Action buttons: Ulangi Assessment and Close */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={resetMinatTest}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>Ulangi Assessment</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMinatResultOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                Tutup &amp; Simpan Hasil
              </button>
            </div>

            {/* Footer reference copyright */}
            <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-6 pt-3 border-t border-slate-100 dark:border-slate-800">
              CARASA — Career &amp; Study Assessment · Prototype Presma v.1.0 ©2026
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: KUESIONER TES REKOMENDASI KARIR (Distinct 8 Questions) */}
      {/* ========================================================= */}
      {isCareerQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsCareerQuizOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>

            {/* Quiz Header & Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded-md uppercase tracking-wider">
                  ASESMEN KESIAPAN KARIR &amp; INDUSTRI
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Pertanyaan {careerIdx + 1} dari {CAREER_QUESTIONS.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((careerIdx + 1) / CAREER_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="my-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {CAREER_QUESTIONS[careerIdx].question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {CAREER_QUESTIONS[careerIdx].options.map((option, optIdx) => {
                const isSelected = careerAnswers[careerIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectCareerOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-blue-950 dark:text-blue-200 ring-2 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {option[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-200 dark:border-slate-800">
              {careerIdx > 0 ? (
                <button
                  type="button"
                  onClick={() => setCareerIdx(careerIdx - 1)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  &larr; Sebelumnya
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextCareer}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105"
              >
                {careerIdx === CAREER_QUESTIONS.length - 1 ? 'Lihat Hasil Karir →' : 'Lanjut →'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: HASIL TES REKOMENDASI KARIR & INDUSTRI */}
      {/* ========================================================= */}
      {isCareerResultOpen && careerResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsCareerResultOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>

            {/* Header: sectiontitle */}
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[11px] font-black rounded-full uppercase tracking-wider mb-2">
                HASIL ASESMEN KARIR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {CAREER_LABELS[careerResult.topTrack]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                Pemetaan kesiapan kerja industri dan rekomendasi spesialisasi profesi siswa.
              </p>
            </div>

            {/* resultgrid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              
              {/* Card 1: Skor Kesiapan Karir */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                  Skor Bidang Karir
                </h3>
                <div className="space-y-4">
                  {careerResult.sortedScores.map(([trackKey, score]) => {
                    const percentage = Math.round((score / CAREER_QUESTIONS.length) * 100);
                    return (
                      <div key={trackKey} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                          <span className="truncate pr-2">{CAREER_DETAILS[trackKey].title.split('&')[0]}</span>
                          <span className="text-blue-600 shrink-0">{percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Jalur Spesialisasi & Rekomendasi Karir */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                    Jalur Karir Unggulanmu
                  </h3>
                  
                  <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl mb-3">
                    <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 block mb-1">
                      Kesiapan Kerja: {careerResult.readinessScore}% (Sangat Siap)
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {CAREER_DETAILS[careerResult.topTrack].subtitle}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {CAREER_DETAILS[careerResult.topTrack].desc}
                    </p>
                  </div>

                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Rekomendasi Jabatan Karir:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {CAREER_DETAILS[careerResult.topTrack].roles.map((role, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-lg"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  <strong>💡 Konsultasi Lanjutan BKK:</strong> Hasil ini dapat dibawa saat sesi bimbingan karir dan penyaluran PKL dengan guru BKK di sekolah.
                </div>
              </div>

            </div>

            {/* Action buttons: Ulangi Assessment and Close */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={resetCareerTest}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>Ulangi Assessment</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCareerResultOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                Tutup &amp; Simpan Hasil
              </button>
            </div>

            {/* Footer reference */}
            <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-6 pt-3 border-t border-slate-100 dark:border-slate-800">
              CARASA Career Readiness Assessment · Prototype Presma v.1.0 ©2026
            </div>

          </div>
        </div>
      )}
      {/* ========================================================= */}
      {/* MODAL 5: DETAIL KELAS & DAFTAR PELATIHAN */}
      {/* ========================================================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-hidden flex flex-col">
            
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center text-lg font-bold transition-colors z-10"
            >
              ✕
            </button>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4 mt-2">
                <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 text-xs font-black uppercase">
                  {selectedCourse.category}
                </span>
                {selectedCourse.biaya && (
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedCourse.biaya === 'Gratis' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'}`}>
                    {selectedCourse.biaya}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug mb-6 pr-8">
                {selectedCourse.title}
              </h3>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 mt-4">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informasi &amp; Deskripsi
                </h4>
                <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed text-justify whitespace-pre-line">
                  {selectedCourse.desc}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-white dark:bg-slate-900 z-10">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-bold tracking-wider mb-1">Status Biaya</span>
                <span className={`text-sm font-black ${selectedCourse.biaya === 'Gratis' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {selectedCourse.biaya === 'Gratis' ? 'Gratis (Fasilitas BKK)' : 'Biaya Tertera'}
                </span>
              </div>
              <button
                onClick={() => {
                  window.open(selectedCourse.link, '_blank', 'noopener,noreferrer');
                }}
                className="w-full sm:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Konfirmasi Daftar Kelas</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
