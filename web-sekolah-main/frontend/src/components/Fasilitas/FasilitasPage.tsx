'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Verified vocational laboratories and studios data
const vocationalFacilities = [
  {
    id: 'lab-pplg',
    major: 'PPLG • SOFTWARE & GAME DEV',
    title: 'Laboratorium Rekayasa Perangkat Lunak & Game',
    desc: 'Workstation PC berkinerja komputasi tinggi dengan koneksi fiber optik gigabit. Dikonfigurasi untuk pengembangan fullstack web, aplikasi mobile, cloud computing, database engineering, serta logika dan grafis engine game standar studio profesional.',
    image: '/virtual-tour/panoramas/lab-pplg.jpg',
    specs: ['Core i7/i9 Workstations', 'Dual-Screen Ergonomic Setup', 'Local Server & Cloud CI/CD', 'Full Gigabit LAN'],
    tourId: 'lab-pplg'
  },
  {
    id: 'lab-tjkt',
    major: 'TJKT • MIKROTIK ACADEMY',
    title: 'Laboratorium Jaringan Komputer & Cyber Security',
    desc: 'Pusat pelatihan infrastruktur telekomunikasi dan keamanan siber bersertifikasi resmi MikroTik Academy. Dilengkapi rack server enterprise, switch manageable, routerboard industri, dan perangkat optical splicing presisi.',
    image: '/images/hero-tjkt.jpg',
    specs: ['MikroTik Certified Lab', 'Enterprise Server Racks', 'Fiber Optic Fusion Splicer', 'Cisco & IoT Sandbox'],
    tourId: 'lorong'
  },
  {
    id: 'lab-dkv',
    major: 'DKV • CREATIVE & ANIMATION',
    title: 'Studio Desain Komunikasi Visual & Animasi',
    desc: 'Ruang kreasi grafis modern dengan pen tablet display beresolusi tinggi, display monitor terkalibrasi warna sRGB/DCI-P3 akurat, serta lighting studio profesional untuk ilustrasi, periklanan kreatif, dan motion graphics.',
    image: '/virtual-tour/panoramas/lab-dkv.jpeg',
    specs: ['Digital Pen Tablet Display', 'Color-Calibrated IPS Screens', 'Professional Studio Lighting', 'Render Station Workspaces'],
    tourId: 'lab-dkv'
  },
  {
    id: 'studio-bcf',
    major: 'BCF • BROADCASTING & CINEMA',
    title: 'Studio Broadcasting & Produksi Multimedia',
    desc: 'Studio penyiaran dan produksi film berstandar pertelevisian profesional. Dilengkapi acoustic treatment soundproof, switcher multi-kamera live production, prompter, mikrofon audio broadcast, dan bilik dubbing kedap suara.',
    image: '/images/hero-bcf.jpg',
    specs: ['Soundproof Acoustic Studio', 'Multi-Cam Live Switcher', 'Podcast & Voice-Over Booth', 'Chroma Key Green Screen'],
    tourId: 'aula-mora'
  }
];

// Verified general / penunjang facilities
const generalFacilities = [
  {
    id: 'aula-mora',
    category: 'Akademik & Literasi',
    tag: 'MULTIFUNCTION HALL',
    title: 'Auditorium & Aula Mora',
    desc: 'Gedung serbaguna berkapasitas lebih dari 1.000 peserta dengan sistem audio visual modern, panggung pertunjukan akustik, dan pencahayaan pementasan untuk wisuda, seminar nasional, serta perhelatan akbar sekolah.',
    image: '/virtual-tour/panoramas/aula-mora.jpeg',
    capacity: '1.000+ Orang',
    badge: 'Auditorium Utama'
  },
  {
    id: 'perpustakaan',
    category: 'Akademik & Literasi',
    tag: 'DIGITAL LIBRARY',
    title: 'Perpustakaan Presma Digital',
    desc: 'Pusat literasi terpadu memadukan ribuan koleksi buku fisik dan terminal komputer e-library. Menyediakan akses ke jurnal ilmiah, ruang baca hening ber-AC, dan area riset kolaboratif yang kondusif.',
    image: '/virtual-tour/panoramas/perpustakaan.jpeg',
    capacity: 'Koleksi Digital & Fisik',
    badge: 'E-Library Hub'
  },
  {
    id: 'smart-class',
    category: 'Akademik & Literasi',
    tag: 'SMART CLASSROOM',
    title: 'Ruang Kelas Bilingual & Interaktif',
    desc: 'Ruang pembelajaran berpendingin udara (full AC) yang dirancang ergonomis dengan proyektor multimedia, pencahayaan alami optimal, dan tata letak modular untuk metode belajar kolaboratif modern.',
    image: '/virtual-tour/panoramas/kelas-bilingual.jpeg',
    capacity: '32 Siswa / Kelas',
    badge: 'Full AC & Proyektor'
  },
  {
    id: 'lapangan',
    category: 'Komunal & Olahraga',
    tag: 'SPORTS ARENA',
    title: 'Lapangan Olahraga Multiguna',
    desc: 'Sarana olahraga outdoor luas berstandar kompetisi untuk futsal, bola basket, bulutangkis, dan bola voli. Dilengkapi tribun penonton dan pencahayaan malam untuk pengembangan bakat atletik siswa.',
    image: '/virtual-tour/panoramas/lapangan.jpeg',
    capacity: 'Futsal • Basket • Voli',
    badge: 'Standar Turnamen'
  },
  {
    id: 'kantin',
    category: 'Komunal & Olahraga',
    tag: 'HEALTHY CANTEEN',
    title: 'Kantin Sehat & Ruang Komunal',
    desc: 'Pusat kuliner sekolah yang higienis, bersih, dan nyaman. Menyajikan hidangan bergizi dengan pengawasan standar sanitasi, terintegrasi dengan area duduk terbuka hijau yang asri dan sejuk.',
    image: '/virtual-tour/panoramas/kantin.jpeg',
    capacity: 'Higienis & Sehat',
    badge: 'Area Terbuka Hijau'
  },
  {
    id: 'mushola',
    category: 'Komunal & Olahraga',
    tag: 'WORSHIP CENTER',
    title: 'Mushola As-Salam',
    desc: 'Fasilitas ibadah representatif yang bersih, sejuk, dan tertata rapi. Dilengkapi area wudhu higienis terpisah putra-putri untuk membina karakter spiritual dan kenyamanan ibadah berjamaah harian.',
    image: '/virtual-tour/panoramas/mushola.jpeg',
    capacity: '200+ Jamaah',
    badge: 'Spiritual Center'
  },
  {
    id: 'ppdb',
    category: 'Akademik & Literasi',
    tag: 'STUDENT CENTER',
    title: 'Ruang Layanan PPDB & Informasi',
    desc: 'Pusat informasi dan konsultasi pendaftaran siswa baru yang ramah dan representatif. Menyediakan ruang tunggu nyaman ber-AC, pusat bantuan digital, serta layanan bimbingan konseling akademik.',
    image: '/virtual-tour/panoramas/ppdb.jpeg',
    capacity: 'Layanan Terpadu',
    badge: 'Pusat Layanan'
  },
  {
    id: 'ruang-rapat',
    category: 'Akademik & Literasi',
    tag: 'EXECUTIVE SUITE',
    title: 'Executive Conference Room',
    desc: 'Ruang pertemuan manajemen sekolah dan kemitraan industri yang representatif. Dilengkapi perangkat video conference canggih, proyektor nirkabel, dan meja bundar kolaboratif.',
    image: '/virtual-tour/panoramas/ruang-rapat.jpeg',
    capacity: '30 Eksekutif',
    badge: 'Meeting Room'
  }
];

// MANDATORY PRESERVED DATA: Daftar Bintang Prestasi (Original student data and university names)
const alumniData = [
  {
    name: 'Haikal Idris',
    major: 'Teknik Informatika',
    ptn: 'Politeknik Negeri Jember',
    avatar: 'https://ui-avatars.com/api/?name=Haikal+Idris&background=f97316&color=fff&size=150'
  },
  {
    name: 'Fariz Novalino',
    major: 'Teknologi Rekayasa Multimedia',
    ptn: 'Politeknik Negeri Media Kreatif',
    avatar: 'https://ui-avatars.com/api/?name=Fariz+Novalino&background=f97316&color=fff&size=150'
  },
  {
    name: 'Kholifatulhusna Fitriana',
    major: 'Desain Grafis',
    ptn: 'Politeknik Negeri Media Kreatif',
    avatar: 'https://ui-avatars.com/api/?name=Kholifatulhusna+Fitriana&background=f97316&color=fff&size=150'
  },
  {
    name: 'Muhammad Davi Abdullah',
    major: 'Teknologi Rekayasa Perangkat Lunak',
    ptn: 'Politeknik Negeri Cilacap',
    avatar: 'https://ui-avatars.com/api/?name=Muhammad+Davi&background=f97316&color=fff&size=150'
  },
  {
    name: 'Ade Rayhan',
    major: 'Teknik Informatika',
    ptn: 'Universitas Khairun',
    avatar: 'https://ui-avatars.com/api/?name=Ade+Rayhan&background=f97316&color=fff&size=150'
  }
];

export default function FasilitasPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; image: string; desc: string; tag: string } | null>(null);

  const categories = ['Semua', 'Akademik & Literasi', 'Komunal & Olahraga'];

  const filteredFacilities = activeCategory === 'Semua'
    ? generalFacilities
    : generalFacilities.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Inline styles for Marquee and Editorial Typography */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
        .text-mask-hero {
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
      `}</style>

      {/* =========================================================================
          1. HERO SECTION: Strong editorial hero with genuine school photograph
         ========================================================================= */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800/60">
        
        {/* Subtle Ghost Outline Background Text (Inspired by reference page) */}
        <div 
          aria-hidden="true" 
          className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none font-black text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] tracking-widest text-orange-600/[0.03] dark:text-orange-500/[0.04] uppercase whitespace-nowrap z-0"
        >
          FACILITIES
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Category Pill with Pulsing Dot */}
          <div className="flex flex-col items-start gap-4 mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-100/80 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-500/30 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600 dark:bg-orange-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                Sarana & Lingkungan Kampus Modern
              </span>
            </div>
          </div>

          {/* Editorial Headline */}
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-12">
              <h1 className="text-mask-hero text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-900 dark:text-white">
                Ruang Belajar Modern, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Inspirasi Masa Depan.
                </span>
              </h1>
            </div>
          </div>

          {/* Subtitle & Editorial Narrative */}
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8">
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl lg:text-2xl font-normal leading-relaxed tracking-tight">
                SMK Prestasi Prima menghadirkan ekosistem pembelajaran berstandar industri dengan fasilitas vokasi mutakhir, koneksi internet gigabit terpadu, dan ruang kolaborasi inspiratif demi mencetak generasi emas berdaya saing global.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap sm:flex-nowrap items-center gap-3 lg:justify-end">
              <Link 
                href="/virtual-tour" 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-600/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Virtual Tour 360°
              </Link>
              <a 
                href="#laboratorium" 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all duration-300"
              >
                Lihat Sarana
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Genuine School Photograph Feature Banner */}
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white dark:border-slate-800 bg-slate-900 group">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
              <img 
                src="/images/gedung.png" 
                alt="Gedung Kampus SMK Prestasi Prima" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              
              {/* Overlay Badges */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-black text-xs uppercase tracking-wider mb-2 inline-block shadow-md">
                    Kampus Utama
                  </span>
                  <h2 className="text-white font-black text-xl sm:text-2xl md:text-3xl drop-shadow-md">
                    SMK Prestasi Prima Jakarta
                  </h2>
                  <p className="text-slate-200 text-xs sm:text-sm max-w-xl line-clamp-2 drop-shadow">
                    Jl. Hankam Raya No. 89, Cilangkap, Cipayung, Jakarta Timur — Kampus berakreditasi 'A' dengan standar sarana teknologi terintegrasi.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center">
                    <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">Akreditasi</p>
                    <p className="text-lg font-black leading-tight">Unggul 'A'</p>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center">
                    <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">Konektivitas</p>
                    <p className="text-lg font-black leading-tight">1 Gbps Fiber</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-center">
              <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">4 Lab</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Kejuruan Vokasi Terpadu</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-center">
              <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">1.000+</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Kapasitas Aula Mora</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-center">
              <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">100%</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Ruangan Ber-AC & Multimedia</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-center">
              <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">360°</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Eksplorasi Virtual Tour</p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. LABORATORIUM & STUDIO: Verified vocational facilities with authentic images
         ========================================================================= */}
      <section id="laboratorium" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-500/20 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              Sarana Vokasi Unggulan
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            Laboratorium & Studio Kejuruan
          </h2>
          <div className="w-20 h-1.5 bg-orange-500 rounded-full mt-3 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl">
            Empat pilar fasilitas praktikum berstandar industri yang dirancang menyimulasikan lingkungan kerja profesional software house, data center, studio multimedia, dan stasiun broadcast.
          </p>
        </div>

        {/* Vocational Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {vocationalFacilities.map((facility) => (
            <div 
              key={facility.id}
              className="group rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
            >
              {/* Facility Image with Visual Tag */}
              <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden relative bg-slate-800">
                <img 
                  src={facility.image} 
                  alt={facility.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                {/* Major Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md">
                    {facility.major}
                  </span>
                </div>

                {/* Inspect button overlay */}
                <button
                  type="button"
                  onClick={() => setSelectedPhoto({ title: facility.title, image: facility.image, desc: facility.desc, tag: facility.major })}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-orange-600 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Perbesar Foto
                </button>
              </div>

              {/* Facility Content & Specifications */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {facility.desc}
                  </p>
                </div>

                {/* Spec badges */}
                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Spesifikasi Fasilitas:</p>
                  <div className="flex flex-wrap gap-2">
                    {facility.specs.map((spec, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs border border-slate-200/50 dark:border-slate-700/60"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          3. FASILITAS PENUNJANG: Editorial Photo Gallery of general verified facilities
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-500/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                  Sarana Pendukung & Komunal
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                Fasilitas Penunjang Sekolah
              </h2>
              <div className="w-20 h-1.5 bg-orange-500 rounded-full mt-3 mb-2"></div>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
                Galeri sarana prasarana penunjang yang memastikan kenyamanan belajar, kesehatan, ibadah, dan kebugaran seluruh civitas akademika.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFacilities.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedPhoto({ title: item.title, image: item.image, desc: item.desc, tag: item.tag })}
                className="group rounded-[1.75rem] bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col cursor-pointer"
              >
                {/* Photo Aspect Ratio */}
                <div className="aspect-[4/3] overflow-hidden relative bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-white font-bold text-[10px] uppercase tracking-wider shadow">
                      {item.tag}
                    </span>
                  </div>

                  {/* Corner Capacity Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-orange-300 drop-shadow">{item.badge}</span>
                    <span className="opacity-80 drop-shadow text-[11px]">{item.capacity}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-orange-600 dark:text-orange-400 font-bold">
                    <span>Lihat Rincian</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. DAFTAR BINTANG PRESTASI (MANDATORY PRESERVED SECTION)
             Preserve the existing section, its student information, initials, cards,
             and rendering logic without altering original names or PTN destinations.
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Poster Showcase (Preserved) */}
        <div className="mb-20 flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-[10px] border-white dark:border-slate-800 bg-white inline-block max-w-[800px] w-full group relative">
            <img 
              src="/images/poster-alumni-ptn.png" 
              alt="Poster Alumni Lolos PTN" 
              className="w-full h-auto object-cover" 
            />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Text Roster Header (Preserved) */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Daftar Bintang Prestasi
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-8"></div>
        </div>

        {/* Student Cards Grid (Preserved) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 justify-center">
          {alumniData.map((alumni, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/50 hover:-translate-y-2 hover:shadow-orange-500/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-orange-400 to-red-500 mb-5 shadow-md">
                <img 
                  src={alumni.avatar} 
                  alt={alumni.name} 
                  className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 object-cover" 
                />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                {alumni.name}
              </h3>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 font-bold text-xs rounded-full uppercase tracking-wider mb-4">
                {alumni.major}
              </span>
              <p className="text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.221 4.626c-.114.632-.636 1.053-1.251 1.053h-.46a1 1 0 01-.781-.378l-1.06-1.302a1 1 0 00-1.228-.276l-3.803 1.943a.998.998 0 00-.222.102z"></path>
                </svg>
                {alumni.ptn}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          5. CLOSING SECTION: Motto Marquee & Concise Invitation to SMK Prestasi Prima
         ========================================================================= */}
      
      {/* Running Motto Marquee (Visual style directly from reference page) */}
      <section className="relative flex items-center justify-between bg-gradient-to-r from-orange-950 via-orange-900 to-orange-800 text-white overflow-hidden py-5 border-y border-orange-700/40">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          <div className="flex items-center gap-8 text-sm sm:text-base md:text-lg font-black tracking-widest uppercase">
            <span>SMK PRESTASI PRIMA — MENCETAK GENERASI BERPRESTASI!</span>
            <span className="text-orange-400">✦</span>
            <span>IF BETTER IS POSSIBLE, GOOD IS NOT ENOUGH!</span>
            <span className="text-orange-400">✦</span>
            <span>BERANI HEBAT, BERANI BERPRESTASI!</span>
            <span className="text-orange-400">✦</span>
            <span>SMK PRESTASI PRIMA — MENCETAK GENERASI BERPRESTASI!</span>
            <span className="text-orange-400">✦</span>
            <span>IF BETTER IS POSSIBLE, GOOD IS NOT ENOUGH!</span>
            <span className="text-orange-400">✦</span>
            <span>BERANI HEBAT, BERANI BERPRESTASI!</span>
            <span className="text-orange-400">✦</span>
          </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950 p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <span className="px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-xs uppercase tracking-widest mb-6 inline-block">
              Kunjungan & Penerimaan
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              Siap Menjadi Bagian dari <br className="hidden sm:inline" />
              <span className="text-orange-500">SMK Prestasi Prima?</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Jelajahi setiap sudut sarana kami melalui pengalaman Virtual Tour 360° interaktif atau jadwalkan kunjungan langsung ke kampus untuk merasakan atmosfer pendidikan vokasi masa depan.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/virtual-tour" 
                className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-600/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Buka Virtual Tour 360°
              </Link>
              <Link 
                href="/ppdb" 
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              >
                Pendaftaran Siswa Baru (PPDB)
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold text-sm tracking-wide transition-all duration-300"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIGHTBOX MODAL FOR INSPECTING PHOTOS
         ========================================================================= */}
      {selectedPhoto && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/10] relative bg-black">
              <img 
                src={selectedPhoto.image} 
                alt={selectedPhoto.title} 
                className="w-full h-full object-cover" 
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-orange-600 text-white flex items-center justify-center text-xl font-bold transition-colors"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-wider mb-2 inline-block">
                {selectedPhoto.tag}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {selectedPhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
