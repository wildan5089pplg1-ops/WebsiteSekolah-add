'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// SECTION B — Verified Vocational Laboratories & Studios Data
interface VocationalFacility {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
}

const VOCATIONAL_FACILITIES: VocationalFacility[] = [
  {
    id: 'lab-pplg',
    tag: 'PPLG • Software & Game Dev',
    title: 'Laboratorium Rekayasa Perangkat Lunak & Gim',
    desc: 'Workstation komputasi performa tinggi untuk pemrograman web, mobile apps, database arsitektur modern, dan game engine standar industri profesional.',
    image: '/images/hero-pplg.jpg',
  },
  {
    id: 'lab-tjkt',
    tag: 'TJKT • MikroTik Academy',
    title: 'Laboratorium Jaringan Komputer & Keamanan Siber',
    desc: 'Pusat pelatihan infrastruktur jaringan, enterprise server rack, dan fiber optic splicing bersertifikasi resmi MikroTik Academy.',
    image: '/images/hero-tjkt.jpg',
  },
  {
    id: 'studio-bcf',
    tag: 'BCF • Broadcasting & Cinema',
    title: 'Studio Broadcasting & Produksi Multimedia',
    desc: 'Studio penyiaran standar industri pertelevisian dengan sistem multi-kamera live production, ruang kedap suara akustik, dan bilik rekaman audio.',
    image: '/images/hero-bcf.jpg',
  },
  {
    id: 'studio-dkv',
    tag: 'DKV • Creative & Animation',
    title: 'Studio Desain Komunikasi Visual & Animasi',
    desc: 'Ruang kreasi grafis dengan pen tablet display digital, layar terkalibrasi warna sRGB akurat, dan studio lighting fotografi.',
    image: '/images/hero-dkv.png',
  },
];

// SECTION C — Verified Penunjang Facilities Data
interface PenunjangFacility {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
}

const AKADEMIK_FACILITIES: PenunjangFacility[] = [
  {
    id: 'perpustakaan',
    tag: 'Literasi Digital',
    title: 'Perpustakaan Presma Digital',
    desc: 'Pusat literasi terpadu memadukan ribuan koleksi buku fisik dan terminal e-library dalam ruang baca ber-AC yang tenang dan kondusif.',
    image: '/virtual-tour/panoramas/perpustakaan.jpeg',
  },
  {
    id: 'kelas-interaktif',
    tag: 'Ruang Kelas',
    title: 'Ruang Kelas Interaktif Modern',
    desc: 'Ruang pembelajaran full AC ergonomis dengan proyektor multimedia interaktif dan tata ruang modular yang mendukung diskusi kolaboratif.',
    image: '/virtual-tour/panoramas/kelas-bilingual.jpeg',
  },
  {
    id: 'layanan-ppdb',
    tag: 'Pusat Layanan',
    title: 'Ruang Layanan PPDB & Konseling',
    desc: 'Pusat informasi pendaftaran siswa baru yang representatif serta ruang konsultasi bimbingan akademik yang nyaman.',
    image: '/virtual-tour/panoramas/ppdb.jpeg',
  },
  {
    id: 'ruang-rapat',
    tag: 'Ruang Rapat',
    title: 'Executive Conference Room',
    desc: 'Ruang pertemuan representatif untuk koordinasi manajemen sekolah, rapat guru, dan diskusi kemitraan industri.',
    image: '/virtual-tour/panoramas/ruang-rapat.jpeg',
  },
];

const UMUM_FACILITIES: PenunjangFacility[] = [
  {
    id: 'aula-mora',
    tag: 'Aula Serbaguna',
    title: 'Auditorium & Aula Mora',
    desc: 'Gedung pertemuan serbaguna berkapasitas lebih dari 1.000 peserta dengan tata suara modern dan panggung pementasan agenda akbar.',
    image: '/virtual-tour/panoramas/aula-mora.jpeg',
  },
  {
    id: 'lapangan',
    tag: 'Sarana Olahraga',
    title: 'Lapangan Olahraga Multiguna',
    desc: 'Sarana olahraga outdoor luas untuk futsal, bola basket, dan bola voli serta kegiatan upacara dan apel siswa.',
    image: '/virtual-tour/panoramas/lapangan.jpeg',
  },
  {
    id: 'mushola',
    tag: 'Sarana Ibadah',
    title: 'Mushola As-Salam',
    desc: 'Fasilitas ibadah representatif yang bersih dan sejuk dengan tempat wudhu terpisah untuk kenyamanan ibadah berjamaah harian.',
    image: '/virtual-tour/panoramas/mushola.jpeg',
  },
  {
    id: 'kantin',
    tag: 'Kantin Sehat',
    title: 'Kantin Sehat & Ruang Terbuka',
    desc: 'Sentra kuliner sekolah yang higienis dengan area makan terbuka hijau yang asri, menyajikan menu makanan sehat bergizi.',
    image: '/virtual-tour/panoramas/kantin.jpeg',
  },
];

// SECTION E — Mandatory Preserved Student Records
const ALUMNI_DATA = [
  {
    name: 'Haikal Idris',
    major: 'Teknik Informatika',
    ptn: 'Politeknik Negeri Jember',
    avatar: 'https://ui-avatars.com/api/?name=Haikal+Idris&background=f97316&color=fff&size=150',
  },
  {
    name: 'Fariz Novalino',
    major: 'Teknologi Rekayasa Multimedia',
    ptn: 'Politeknik Negeri Media Kreatif',
    avatar: 'https://ui-avatars.com/api/?name=Fariz+Novalino&background=f97316&color=fff&size=150',
  },
  {
    name: 'Kholifatulhusna Fitriana',
    major: 'Desain Grafis',
    ptn: 'Politeknik Negeri Media Kreatif',
    avatar: 'https://ui-avatars.com/api/?name=Kholifatulhusna+Fitriana&background=f97316&color=fff&size=150',
  },
  {
    name: 'Muhammad Davi Abdullah',
    major: 'Teknologi Rekayasa Perangkat Lunak',
    ptn: 'Politeknik Negeri Cilacap',
    avatar: 'https://ui-avatars.com/api/?name=Muhammad+Davi&background=f97316&color=fff&size=150',
  },
  {
    name: 'Ade Rayhan',
    major: 'Teknik Informatika',
    ptn: 'Universitas Khairun',
    avatar: 'https://ui-avatars.com/api/?name=Ade+Rayhan&background=f97316&color=fff&size=150',
  },
];

export default function FasilitasPage() {
  const [penunjangTab, setPenunjangTab] = useState<'akademik' | 'umum'>('akademik');
  const [selectedPhoto, setSelectedPhoto] = useState<{
    title: string;
    image: string;
    desc: string;
    tag: string;
  } | null>(null);

  const activePenunjangList = penunjangTab === 'akademik' ? AKADEMIK_FACILITIES : UMUM_FACILITIES;
  const featuredPenunjang = activePenunjangList[0];
  const supportingPenunjang = activePenunjangList.slice(1);

  const featuredVocational = VOCATIONAL_FACILITIES[0];
  const supportingVocational = VOCATIONAL_FACILITIES.slice(1);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">

      {/* =========================================================================
          SECTION A — HERO
          Editorial two-column hero with authentic school photograph & compact height
         ========================================================================= */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-5 font-medium">
            <Link href="/" className="hover:text-[#F97316] transition-colors">
              Beranda
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/tentang/profile-sekolah" className="hover:text-[#F97316] transition-colors">
              Tentang Kami
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold" aria-current="page">
              Fasilitas
            </span>
          </nav>

          {/* Refined Two-Column Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[#F97316] text-xs font-bold tracking-wider uppercase mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                FASILITAS SEKOLAH
              </div>

              {/* Exact Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18] mb-4">
                Ruang untuk Belajar, <br className="hidden sm:inline" />
                <span className="text-[#F97316]">Berkarya, dan Bertumbuh.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
                Kenali lingkungan belajar dan fasilitas SMK Prestasi Prima yang mendukung kegiatan akademik, praktik kejuruan, dan pengembangan diri siswa.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <Link
                  href="/virtual-tour"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold text-sm tracking-wide shadow-md shadow-orange-600/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.4 14.4 0 010 18M12 3a14.4 14.4 0 000 18" />
                  </svg>
                  Jelajahi PRESMA TOUR
                </Link>

                <a
                  href="#praktik"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-slate-700 hover:text-[#F97316] font-semibold text-sm transition-colors cursor-pointer"
                >
                  Lihat Fasilitas Praktik
                  <svg className="w-4 h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              {/* Verified Editorial Facts (Clean Line) */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-5 border-t border-slate-200/80 w-full">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">4 Lab</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Praktik Vokasi</p>
                </div>
                <div className="hidden sm:block w-px h-7 bg-slate-200" />
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">1.000+</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Kapasitas Aula</p>
                </div>
                <div className="hidden sm:block w-px h-7 bg-slate-200" />
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#F97316] leading-none">360°</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Virtual Tour</p>
                </div>
              </div>

            </div>

            {/* Right Column: Large Authentic School Photograph */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 group">
                <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden relative">
                  <img
                    src="/images/gedung.png"
                    alt="Gedung Utama SMK Prestasi Prima"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-0.5">
                        Gedung Utama
                      </p>
                      <p className="text-base sm:text-lg font-bold text-white drop-shadow-sm">
                        SMK Prestasi Prima Jakarta
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shrink-0">
                      Akreditasi A Unggul
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION B — BELAJAR LEWAT PENGALAMAN NYATA (Fasilitas Praktik)
          Editorial photo layout: 1 wide featured composition + 3 varied supporting photos
         ========================================================================= */}
      <section id="praktik" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[#F97316] text-xs font-bold tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            FASILITAS PRAKTIK
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Belajar Lewat Pengalaman Nyata.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Ruang praktik menjadi bagian penting dari proses belajar siswa dalam mengembangkan keterampilan sesuai bidang keahliannya.
          </p>
        </div>

        {/* Editorial Photo Composition */}
        <div className="space-y-6">
          
          {/* Featured Wide Laboratory (PPLG) */}
          <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-[16/9] overflow-hidden bg-slate-900 cursor-pointer"
              onClick={() => setSelectedPhoto({
                title: featuredVocational.title,
                image: featuredVocational.image,
                desc: featuredVocational.desc,
                tag: featuredVocational.tag,
              })}
            >
              <img
                src={featuredVocational.image}
                alt={featuredVocational.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#F97316] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                  {featuredVocational.tag}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-center">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider mb-2 block">
                Unggulan Praktik Vokasi
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
                {featuredVocational.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {featuredVocational.desc}
              </p>
              <button
                type="button"
                onClick={() => setSelectedPhoto({
                  title: featuredVocational.title,
                  image: featuredVocational.image,
                  desc: featuredVocational.desc,
                  tag: featuredVocational.tag,
                })}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F97316] hover:text-orange-700 self-start cursor-pointer"
              >
                Lihat Foto Penuh
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>

          {/* 3 Supporting Practical Facilities (TJKT, BCF, DKV) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportingVocational.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setSelectedPhoto({
                  title: item.title,
                  image: item.image,
                  desc: item.desc,
                  tag: item.tag,
                })}
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-[#F97316] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION C — LEBIH DARI SEKADAR RUANG KELAS (Fasilitas Penunjang)
          Refined composition: 1 large featured image on left + clean vertical list on right
         ========================================================================= */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header & Tab Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 text-[#F97316] text-xs font-bold tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                LINGKUNGAN SEKOLAH
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">
                Lebih dari Sekadar Ruang Kelas.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl">
                Fasilitas penunjang melengkapi kegiatan belajar, interaksi, dan aktivitas siswa sehari-hari.
              </p>
            </div>

            {/* Refined Tab Selector */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200/80 shadow-sm shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setPenunjangTab('akademik')}
                className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  penunjangTab === 'akademik'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={penunjangTab === 'akademik'}
              >
                Akademik
              </button>
              <button
                type="button"
                onClick={() => setPenunjangTab('umum')}
                className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  penunjangTab === 'umum'
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={penunjangTab === 'umum'}
              >
                Fasilitas Umum
              </button>
            </div>
          </div>

          {/* New Composition: Large Image on Left, Vertical List on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Featured Image + Caption Directly Below */}
            <div className="lg:col-span-7">
              <div 
                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm group cursor-pointer"
                onClick={() => setSelectedPhoto({
                  title: featuredPenunjang.title,
                  image: featuredPenunjang.image,
                  desc: featuredPenunjang.desc,
                  tag: featuredPenunjang.tag,
                })}
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                  <img
                    src={featuredPenunjang.image}
                    alt={featuredPenunjang.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#F97316] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                      {featuredPenunjang.tag}
                    </span>
                  </div>
                </div>

                {/* Short Title & Description Directly Below */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-[#F97316] transition-colors">
                    {featuredPenunjang.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {featuredPenunjang.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Clean Vertical List of Supporting Facilities */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-slate-200/80 bg-white rounded-2xl border border-slate-200/80 p-2 sm:p-3 shadow-sm">
              {supportingPenunjang.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto({
                    title: item.title,
                    image: item.image,
                    desc: item.desc,
                    tag: item.tag,
                  })}
                  className="p-4 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-4 group cursor-pointer"
                >
                  {/* Small Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Concise Title & Description */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316] block mb-0.5">
                      {item.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-[#F97316] transition-colors mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION D — PRESMA TOUR
          Promotional section: dark navy, text on left, panorama on right, single orange CTA
         ========================================================================= */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl bg-slate-900 text-white overflow-hidden shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 lg:p-14">
            
            {/* Left Column: Heading, Description, CTA */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/30 text-[#F97316] text-xs font-bold tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                EXPLORE THE SCHOOL
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
                Jelajahi Sekolah Lebih Dekat.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                Lihat berbagai sudut SMK Prestasi Prima melalui pengalaman virtual tour interaktif 360°. Telusuri laboratorium, ruang kelas, dan aula sekolah kapan saja.
              </p>

              <Link
                href="/virtual-tour"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold text-sm tracking-wide shadow-md shadow-orange-600/25 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.4 14.4 0 010 18M12 3a14.4 14.4 0 000 18" />
                </svg>
                Jelajahi PRESMA TOUR
              </Link>
            </div>

            {/* Right Column: One Large Authentic Panorama */}
            <div className="lg:col-span-6">
              <Link
                href="/virtual-tour"
                className="block relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 aspect-[16/10] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                aria-label="Buka Virtual Tour SMK Prestasi Prima"
              >
                <img
                  src="/virtual-tour/panoramas/aula-mora.jpeg"
                  alt="Virtual Tour Aula Mora SMK Prestasi Prima"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-7 h-7 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.4 14.4 0 010 18M12 3a14.4 14.4 0 000 18" />
                  </svg>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-200">
                    Klik untuk Membuka Tour 360°
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E (ITEM 7) — PRESMA LIB (NATURAL VISUAL INTEGRATION)
          Integrated library portal feature seamlessly placed in the page rhythm
         ========================================================================= */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 text-[#F97316] text-xs font-bold tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                PERPUSTAKAAN DIGITAL
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                Presma Lib — Literasi & Referensi Digital
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 max-w-xl">
                Akses ribuan katalog buku kejuruan, referensi ilmiah, modul pembelajaran digital, dan informasi peminjaman buku kapan saja melalui portal resmi perpustakaan online SMK Prestasi Prima.
              </p>
              <Link
                href="/program/presmalib"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#F97316] text-white font-bold text-xs sm:text-sm transition-colors duration-200 cursor-pointer shadow-sm"
              >
                Buka Portal Presma Lib
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900 shadow-sm aspect-[16/10]">
                <img
                  src="/virtual-tour/panoramas/perpustakaan-2.jpg"
                  alt="Ruang Perpustakaan Presma Lib"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-bold text-white drop-shadow-sm">
                    Koleksi Lengkap & E-Library Terpadu
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F — DAFTAR BINTANG PRESTASI
          MANDATORY PRESERVED SECTION
          Preserves all original student records, university names, and orange initials
         ========================================================================= */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Preserved Poster Showcase (Naturally Integrated) */}
        <div className="mb-14 flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-white inline-block max-w-[700px] w-full group relative">
            <img 
              src="/images/poster-alumni-ptn.png" 
              alt="Poster Alumni Lolos PTN SMK Prestasi Prima" 
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>

        {/* Section Heading Hierarchy */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[#F97316] text-xs font-bold tracking-wider uppercase mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            PRESTASI LULUSAN
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-wider mb-2.5">
            Daftar Bintang Prestasi
          </h2>
          <div className="w-16 h-1 bg-[#F97316] mx-auto rounded-full" />
        </div>

        {/* Preserved Student Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
          {ALUMNI_DATA.map((alumni, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group"
            >
              {/* Preserved Orange Circular Avatar */}
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-orange-400 to-[#F97316] mb-4 shadow-sm">
                <img 
                  src={alumni.avatar} 
                  alt={alumni.name} 
                  className="w-full h-full rounded-full border-2 border-white object-cover" 
                />
              </div>

              {/* Graduate Name */}
              <h3 className="text-lg font-black text-slate-900 mb-1.5 group-hover:text-[#F97316] transition-colors">
                {alumni.name}
              </h3>

              {/* Major Badge */}
              <span className="px-3 py-1 bg-orange-50 text-[#F97316] font-bold text-xs rounded-full uppercase tracking-wider mb-3.5 border border-orange-200/50">
                {alumni.major}
              </span>

              {/* PTN Destination */}
              <p className="text-slate-600 font-semibold text-sm flex items-center justify-center gap-1.5">
                <svg className="w-4 h-4 text-[#F97316] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.221 4.626c-.114.632-.636 1.053-1.251 1.053h-.46a1 1 0 01-.781-.378l-1.06-1.302a1 1 0 00-1.228-.276l-3.803 1.943a.998.998 0 00-.222.102z" />
                </svg>
                {alumni.ptn}
              </p>
            </div>
          ))}
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
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200"
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
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-[#F97316] text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
                aria-label="Tutup pratinjau"
              >
                ✕
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F97316] font-bold text-xs uppercase tracking-wider mb-2 inline-block">
                {selectedPhoto.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedPhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
