"use client";

import React from 'react';
import Link from 'next/link';

export default function SchoolProfileNewsSection() {
  return (
    <section className="relative w-full pt-16 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. TOP BACKGROUND PHOTO: CAMPUS BALLOON CELEBRATION (MATCHING REFERENCE SCREENSHOT) */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] overflow-hidden">
        <img
          src="/images/balloon-celebration.jpg"
          alt="Perayaan Kampus SMK Prestasi Prima"
          className="w-full h-full object-cover object-center filter brightness-[0.95]"
        />
        
        {/* Soft Gradient Overlay for readable transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/30 dark:from-slate-950 dark:via-transparent dark:to-black/40"></div>

        {/* Top Right Floating Badge: Logo + SMK PRESTASI PRIMA */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-white/60 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-xs">
              <img src="/images/logo-smk.png" alt="Logo SMK" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              SMK PRESTASI PRIMA
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (FLOATING CARDS - EXACT REFERENCE LAYOUT) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-36 md:-mt-48">
        
        {/* Section Heading Tag */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#FF6B00] uppercase tracking-wide drop-shadow-sm">
            SEKOLAH MENENGAH KEJURUAN PRESTASI PRIMA
          </h2>
        </div>

        {/* Two-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* LEFT FEATURED CARD: Akreditasi A & Student Photo */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row gap-5 sm:gap-6 items-center">
            
            {/* Student Image Thumbnail */}
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 shadow-inner">
              <img
                src="/images/students-orange.jpg"
                alt="Siswa SMK Prestasi Prima"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content & Action */}
            <div className="w-full md:w-1/2 flex flex-col justify-between py-1">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 text-[#FF6B00] font-bold text-[10px] uppercase tracking-widest mb-3">
                  Akreditasi A Unggul
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                  Raih Akreditasi A dengan Inovasi Kurikulum Digital Terpadu.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Pencapaian dedikasi seluruh civitas akademika dalam membangun ekosistem pendidikan vokasi masa depan berstandar nasional dan industri.
                </p>
              </div>

              <div>
                <Link
                  href="/news/smk-prestasi-prima-raih-akreditasi-a"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/30 transition-all duration-200"
                >
                  Baca Riset
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: TWO ACTIVITY / NEWS CARDS */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
            
            {/* Card 1: Prestasi Gemilang */}
            <Link
              href="/news"
              className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex items-center gap-4"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-xs">
                <img
                  src="/images/supporter.jpg"
                  alt="Prestasi Gemilang Terbaru"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-rose-500 text-white font-black text-[9px] uppercase tracking-wider mb-1.5">
                  Sekolah
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#FF6B00] transition-colors truncate">
                  Prestasi Gemilang Terbaru di Ajang Nasional
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">
                  Meraih penghargaan bergengsi tingkat SMK Se-Indonesia dan olimpiade teknologi terapan.
                </p>
              </div>
            </Link>

            {/* Card 2: Kunjungan Industri */}
            <Link
              href="/news"
              className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex items-center gap-4"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                  alt="Kunjungan Industri Karier"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FF6B00] text-white font-black text-[9px] uppercase tracking-wider mb-1.5">
                  Kunjungan
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#FF6B00] transition-colors truncate">
                  Membangun koneksi dan menjajaki karier profesional industri
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">
                  Eksplorasi ekosistem kerja langsung bersama mitra korporasi terkemuka di bidang teknologi dan kreatif.
                </p>
              </div>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
