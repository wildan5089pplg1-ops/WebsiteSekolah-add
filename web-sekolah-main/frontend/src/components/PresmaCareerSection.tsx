'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type TabType = 'dashboard' | 'carasa' | 'kelas';

interface Course {
  id: number;
  title: string;
  category: 'PPLG' | 'TJKT' | 'DKV' | 'BCF' | 'Karir';
  instructor: string;
  duration: string;
  modules: number;
  level: string;
  rating: number;
  enrolled: number;
  desc: string;
  topics: string[];
}

const COURSES_DATA: Course[] = [
  {
    id: 1,
    title: 'Fullstack Web Development with Next.js & TypeScript',
    category: 'PPLG',
    instructor: 'Ir. Hendra Pratama (Senior Tech Lead)',
    duration: '24 Jam',
    modules: 12,
    level: 'Menengah',
    rating: 4.9,
    enrolled: 184,
    desc: 'Pelatihan komprehensif membangun web app modern berbasis Next.js App Router, Tailwind CSS, REST API, dan deployment ke cloud Vercel.',
    topics: ['Next.js 14 App Router', 'TypeScript Essentials', 'REST API & State', 'Database Integration', 'CI/CD Deployment'],
  },
  {
    id: 2,
    title: 'Cloud Infrastructure & MikroTik Network Engineering',
    category: 'TJKT',
    instructor: 'Rian Syahputra, S.Kom., MTCNA',
    duration: '20 Jam',
    modules: 10,
    level: 'Menengah - Lanjutan',
    rating: 4.8,
    enrolled: 152,
    desc: 'Konfigurasi router MikroTik profesional, VLAN, routing BGP/OSPF, firewall keamanan jaringan, serta integrasi AWS/GCP cloud basics.',
    topics: ['MikroTik RouterOS v7', 'Routing & Switching', 'Firewall & Security', 'VLAN Management', 'Cloud Virtual Private Server'],
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass: Figma to Design System',
    category: 'DKV',
    instructor: 'Nadia Larasati (Lead Product Designer)',
    duration: '18 Jam',
    modules: 9,
    level: 'Semua Tingkat',
    rating: 4.9,
    enrolled: 210,
    desc: 'Eksplorasi user research, wireframing, interactive prototyping tingkat lanjut, dan perancangan Design System standar industri startup unicorn.',
    topics: ['Design Thinking & User Persona', 'Wireframing & Auto-Layout', 'Interactive Component Prototyping', 'Design Tokens & Variables', 'Hand-off ke Developer'],
  },
  {
    id: 4,
    title: 'Broadcasting & Multi-Camera Live Production',
    category: 'BCF',
    instructor: 'Bambang Sudiro (Broadcasting Director)',
    duration: '16 Jam',
    modules: 8,
    level: 'Menengah',
    rating: 4.7,
    enrolled: 128,
    desc: 'Keahlian teknis pengoperasian studio siaran TV & streaming live, visual switcher vMix/OBS, lighting panggung, dan manajemen audio mixer.',
    topics: ['Multi-Cam Setup & Switching', 'Audio Production & Mixing', 'Lighting Studio Setup', 'Live Stream Encoding', 'Post-Production Workflow'],
  },
  {
    id: 5,
    title: 'Mastering Job Interview & ATS-Friendly CV Strategy',
    category: 'Karir',
    instructor: 'Dra. Maya Anggraini (HR Consultant & BKK)',
    duration: '8 Jam',
    modules: 5,
    level: 'Semua Tingkat',
    rating: 5.0,
    enrolled: 340,
    desc: 'Persiapan matang menghadapi seleksi kerja dan magang PKL di perusahaan nasional maupun multinasional, teknik menjawab pertanyaan HR & User.',
    topics: ['Struktur CV Standar ATS', 'Portfolio Showcase Online', 'STAR Method Interview Technique', 'Simulasi Tes Psikotes Kerja', 'Etika & Negosiasi Gaji Pemula'],
  },
  {
    id: 6,
    title: 'Cybersecurity Essentials & Penetration Testing',
    category: 'TJKT',
    instructor: 'Fajar Nugroho, CEH, CHFI',
    duration: '22 Jam',
    modules: 11,
    level: 'Lanjutan',
    rating: 4.9,
    enrolled: 115,
    desc: 'Pemahaman fundamental keamanan siber, analisis celah kerentanan aplikasi web, pertahanan jaringan, dan etika ethical hacking bersertifikat.',
    topics: ['Network Reconnaissance', 'OWASP Top 10 Web Vulnerabilities', 'Wireshark & Packet Analysis', 'Hardening Server Linux', 'Incident Handling'],
  },
];

export default function PresmaCareerSection({ initialTab = 'dashboard' }: { initialTab?: TabType }) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Modals state
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Questionnaire quiz state inside Test Modal
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // Read URL query parameters on initial mount if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
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

  // Filter courses
  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
      
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
                {/* Clipboard / Career Checklist Icon */}
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
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pelatihan Siap Ikut</span>
                    <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-sm">6+</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">12 Modul</div>
                  <span className="text-[11px] text-green-600 dark:text-green-400 font-medium mt-1 block">Tersertifikasi Industri</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Asesmen CARASA</span>
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm">✓</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">Tersedia</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 block">Minat Bakat &amp; Karir</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mitra Industri (PKL)</span>
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-sm">50+</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">Perusahaan</div>
                  <span className="text-[11px] text-orange-500 font-medium mt-1 block">Kerja Sama Aktif</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Indeks Kesiapan Kerja</span>
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">92%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">Grade A+</div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 block">Kompetensi Siap Pakai</span>
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
                      Belum Mengetahui Jalur Karir yang Tepat?
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      Ikuti tes psikometrik CARASA untuk memetakan potensi diri, kecocokan jurusan, serta proyeksi karir masa depan setelah lulus dari SMK Prestasi Prima.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() => setIsTestModalOpen(true)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Mulai Tes Sekarang
                    </button>
                    <button
                      onClick={() => setIsResultModalOpen(true)}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
                    >
                      Lihat Sampel Hasil
                    </button>
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
                      {COURSES_DATA.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedCourse(item);
                          }}
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
                              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                {item.duration} · {item.modules} Modul
                              </p>
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
          {/* TAB 2: CARASA (Matching Screen 2 in Reference Screenshot) */}
          {/* ========================================================= */}
          {activeTab === 'carasa' && (
            <div className="relative p-6 sm:p-10 flex flex-col gap-10 animate-fadeIn">
              
              {/* Background Watermark (Circular Hand / School Logo from Reference) */}
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

              {/* 4 Cards Grid (2x2 matching screenshot 2) */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                
                {/* Card 1: Tes Minat dan Bakat */}
                <div className="bg-[#e9ecef]/80 dark:bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between shadow-sm min-h-[160px]">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      Tes Minat dan Bakat
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Evaluasi potensi dominan, preferensi kejuruan, dan pemetaan kecerdasan personal.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setQuizStep(1);
                        setIsQuizSubmitted(false);
                        setIsTestModalOpen(true);
                      }}
                      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                    >
                      Mulai Tes
                    </button>
                  </div>
                </div>

                {/* Card 2: Tes Kesiapan Karir & Industri */}
                <div className="bg-[#e9ecef]/80 dark:bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between shadow-sm min-h-[160px]">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      Tes Kesiapan Karir &amp; Industri
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Uji kompetensi soft skills, mentalitas kerja, dan standar etika industri.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setQuizStep(1);
                        setIsQuizSubmitted(false);
                        setIsTestModalOpen(true);
                      }}
                      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                    >
                      Mulai Tes
                    </button>
                  </div>
                </div>

                {/* Card 3: Hasil Tes Minat Bakat */}
                <div className="bg-[#e9ecef]/80 dark:bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between shadow-sm min-h-[160px]">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      Hasil Tes Minat Bakat
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Lihat laporan lengkap skor kecenderungan dan analisis potensi bakatmu.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setIsResultModalOpen(true)}
                      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                    >
                      Lihat Hasil
                    </button>
                  </div>
                </div>

                {/* Card 4: Rekomendasi Karir & Konseling */}
                <div className="bg-[#e9ecef]/80 dark:bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-300/80 dark:border-slate-700 flex flex-col justify-between shadow-sm min-h-[160px]">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      Rekomendasi Karir &amp; Konseling
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Jalur profesi ideal, peta karir masa depan, serta bimbingan guru BK/BKK.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setIsResultModalOpen(true)}
                      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
                    >
                      Lihat Hasil
                    </button>
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
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      Tidak ada kelas yang sesuai dengan pencarian "{searchQuery}"
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('Semua');
                      }}
                      className="mt-3 text-xs text-orange-500 font-bold hover:underline"
                    >
                      Reset Filter
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
                        {/* Course Badge / Thumbnail (Matching screenshot card box) */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#e9ecef] dark:bg-slate-700 border border-slate-300/80 dark:border-slate-600 flex flex-col items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform">
                          <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 tracking-wider">
                            {course.category}
                          </span>
                          <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 text-center leading-none mt-1">
                            {course.level}
                          </span>
                        </div>

                        {/* Title and details */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                              {course.category}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              • {course.duration} ({course.modules} Modul)
                            </span>
                            <span className="text-xs text-amber-500 font-semibold flex items-center gap-0.5">
                              ★ {course.rating}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                            Instruktur: <span className="font-medium text-slate-700 dark:text-slate-300">{course.instructor}</span>
                          </p>
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
                          onClick={() => {
                            setSelectedCourse(course);
                          }}
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
      {/* MODAL 1: TEST CARASA (Interactive Questionnaire) */}
      {/* ========================================================= */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsTestModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            {!isQuizSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-orange-500 text-white text-[10px] font-black rounded-md uppercase">
                    CARASA Assessment
                  </span>
                  <span className="text-xs text-slate-500">Soal {quizStep} dari 3</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Tes Pemetaan Minat &amp; Bakat Kejuruan
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Pilih pernyataan yang paling menggambarkan kecenderungan dan kenyamanan kerjamu.
                </p>

                {quizStep === 1 && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      1. Aktivitas pemecahan masalah apa yang paling kamu sukai?
                    </p>
                    {[
                      'Menulis logika kode, algoritma, atau membuat fitur website/aplikasi (PPLG)',
                      'Mengatur konfigurasi router, switch jaringan, dan troubleshoot server (TJKT)',
                      'Merancang visual, poster estetis, animasi, dan user interface kreatif (DKV)',
                      'Merekam video, shooting kamera, tata suara, dan podcast broadcasting (BCF)',
                    ].map((opt, i) => (
                      <label
                        key={i}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          quizAnswers[1] === opt
                            ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="q1"
                          checked={quizAnswers[1] === opt}
                          onChange={() => setQuizAnswers({ ...quizAnswers, 1: opt })}
                          className="mt-0.5 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-xs leading-relaxed font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      2. Lingkungan kerja seperti apa yang paling kamu impikan?
                    </p>
                    {[
                      'Software house atau tech startup yang fleksibel dan penuh tantangan inovasi',
                      'Data center, perusahaan telekomunikasi, atau lab infrastruktur jaringan berskala besar',
                      'Creative design agency, branding studio, atau industri game & multimedia',
                      'Stasiun televisi, production house siaran live, atau media kreatif digital',
                    ].map((opt, i) => (
                      <label
                        key={i}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          quizAnswers[2] === opt
                            ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="q2"
                          checked={quizAnswers[2] === opt}
                          onChange={() => setQuizAnswers({ ...quizAnswers, 2: opt })}
                          className="mt-0.5 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-xs leading-relaxed font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      3. Kekuatan utama apa yang paling menonjol pada dirimu?
                    </p>
                    {[
                      'Analitis, detail-oriented, dan rasa ingin tahu mendalam tentang cara kerja teknologi',
                      'Sistematis, cekatan menangani perangkat keras, dan tanggap atas gangguan jaringan',
                      'Sense of art yang tinggi, peka terhadap warna, komposisi visual, dan estetika',
                      'Komunikatif, percaya diri bekerja di bawah tekanan live show, dan kolaboratif',
                    ].map((opt, i) => (
                      <label
                        key={i}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          quizAnswers[3] === opt
                            ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="q3"
                          checked={quizAnswers[3] === opt}
                          onChange={() => setQuizAnswers({ ...quizAnswers, 3: opt })}
                          className="mt-0.5 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-xs leading-relaxed font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {quizStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setQuizStep(quizStep - 1)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    >
                      &larr; Sebelumnya
                    </button>
                  ) : <div />}

                  {quizStep < 3 ? (
                    <button
                      type="button"
                      disabled={!quizAnswers[quizStep]}
                      onClick={() => setQuizStep(quizStep + 1)}
                      className="px-5 py-2 bg-orange-500 disabled:opacity-50 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      Lanjut &rarr;
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!quizAnswers[3]}
                      onClick={() => setIsQuizSubmitted(true)}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      Kirim &amp; Proses Hasil
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Asesmen CARASA Selesai!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto mt-2 leading-relaxed">
                  Jawabanmu telah dianalisis oleh algoritma pemetaan karir SMK Prestasi Prima. Kamu memiliki potensi tertinggi di bidang <strong>Teknologi Terapan &amp; Rekayasa Perangkat Lunak</strong>.
                </p>

                <div className="bg-orange-50 dark:bg-orange-950/40 p-4 rounded-xl border border-orange-200 dark:border-orange-900/50 mt-5 text-left text-xs space-y-1">
                  <div className="font-bold text-orange-900 dark:text-orange-200">Rekomendasi Jalur Karir:</div>
                  <div className="text-slate-700 dark:text-slate-300">• Software Engineer / Web Developer</div>
                  <div className="text-slate-700 dark:text-slate-300">• Cloud &amp; DevOps Specialist</div>
                  <div className="text-slate-700 dark:text-slate-300">• UI/UX Technical Specialist</div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsTestModalOpen(false);
                      setIsResultModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Buka Laporan Hasil Lengkap
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: HASIL CARASA (Result Report & Recommendations) */}
      {/* ========================================================= */}
      {isResultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsResultModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-black">
                ★
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400">
                  Laporan Hasil Tes
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  Pemetaan Potensi CARASA
                </h3>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-3 my-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Logika &amp; Rekayasa Software (PPLG)</span>
                  <span className="text-orange-500">92%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Infrastruktur &amp; Keamanan Jaringan (TJKT)</span>
                  <span className="text-blue-500">84%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Kreativitas Visual &amp; Desain (DKV)</span>
                  <span className="text-purple-500">78%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Komunikasi &amp; Live Production (BCF)</span>
                  <span className="text-emerald-500">75%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 mb-6">
              <h4 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">
                Saran Pengembangan Karir Siswa:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Kamu memiliki kekuatan logika komputasi yang sangat dominan. Disarankan mengambil pelatihan lanjutan seperti <strong>Fullstack Web Development</strong> dan <strong>Cloud Infrastructure</strong> untuk memaksimalkan portofolio siap kerja.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setIsResultModalOpen(false);
                  handleTabChange('kelas');
                }}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Pilih Kelas Rekomendasi &rarr;
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: DETAIL KELAS & DAFTAR PELATIHAN */}
      {/* ========================================================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-orange-500 text-white text-[10px] font-black uppercase">
                {selectedCourse.category}
              </span>
              <span className="text-xs text-slate-500">Level: {selectedCourse.level}</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
              {selectedCourse.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {selectedCourse.desc}
            </p>

            <div className="grid grid-cols-3 gap-2 my-4 text-center">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Durasi</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedCourse.duration}</span>
              </div>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Materi</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedCourse.modules} Modul</span>
              </div>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Peserta</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedCourse.enrolled} Siswa</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                Topik yang Dipelajari:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {selectedCourse.topics.map((t, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Biaya Siswa</span>
                <span className="text-sm font-black text-green-600 dark:text-green-400">Gratis (Program BKK)</span>
              </div>
              <button
                onClick={() => {
                  alert(`Pendaftaran kelas "${selectedCourse.title}" berhasil dicatat! Tim BKK akan mengonfirmasi jadwal pelatihanmu.`);
                  setSelectedCourse(null);
                }}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
              >
                Konfirmasi Daftar Kelas
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
