"use client";

import React from 'react';
import Link from 'next/link';
import { NewsItem } from '@/lib/api';

interface SchoolProfileNewsSectionProps {
  articles?: NewsItem[];
}

export default function SchoolProfileNewsSection({ articles = [] }: SchoolProfileNewsSectionProps) {
  // Fallback data if articles are not passed or empty
  const defaultNews: NewsItem[] = [
    {
      id: 'smk-prestasi-prima-raih-akreditasi-a',
      title: 'SMK Prestasi Prima Raih Akreditasi A dengan Inovasi Kurikulum Digital Terpadu',
      slug: 'smk-prestasi-prima-raih-akreditasi-a',
      category: 'Akademik',
      date: '12 Oktober 2026',
      summary: 'Pencapaian luar biasa ini merupakan hasil dedikasi seluruh civitas akademika dalam membangun ekosistem pendidikan masa depan yang berfokus pada kualitas vokasi.',
      content: 'SMK Prestasi Prima secara resmi menerima sertifikat Akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) dengan penekanan pada inovasi kurikulum digital terpadu.',
      image: '/images/students-orange.jpg',
      author: 'Humas Prestasi Prima',
    },
    {
      id: 'ultras-presma-juara-1-supporter',
      title: 'Ultras Presma Raih Juara 1 Most Favorite Supporter DBL 2025',
      slug: 'ultras-presma-most-favorite-supporter-dbl',
      category: 'Prestasi',
      date: '20 September 2026',
      summary: 'Kreativitas tanpa batas suporter basket SMK Prestasi Prima berhasil memukau dewan juri pada ajang Honda DBL seri Jakarta.',
      content: 'Kekompakan koreografi raksasa dan sorakan sportivitas Ultras Presma membawa mereka meraih penghargaan bergengsi suporter terfavorit.',
      image: '/images/supporter.jpg',
      author: 'Humas Prestasi Prima',
    },
    {
      id: 'kunjungan-industri-karier',
      title: 'Kunjungan Industri & Eksplorasi Karier Profesional Bersama Mitra Strategis',
      slug: 'kunjungan-industri-karier',
      category: 'Kunjungan',
      date: '15 September 2026',
      summary: 'Membangun koneksi nyata dan menjajaki karier profesional industri langsung di fasilitas korporasi teknologi terkemuka.',
      content: 'Siswa kelas XI mengikuti kunjungan industri intensif untuk memahami alur kerja produksi teknologi dan persiapan magang industri.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      author: 'Hubungan Industri (BKK)',
    },
  ];

  const newsData = articles && articles.length >= 3 ? articles : defaultNews;
  const featured = newsData[0];
  const rightArticles = newsData.slice(1, 3);

  return (
    <section className="relative w-full pt-12 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. TOP CELEBRATION PHOTO BANNER */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] overflow-hidden">
        <img
          src="/images/balloon-celebration.jpg"
          alt="Perayaan Kampus SMK Prestasi Prima"
          className="w-full h-full object-cover object-center filter brightness-[0.95]"
        />
        
        {/* Soft Gradient Overlay for Smooth Visual Flow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/35 dark:from-slate-950 dark:via-transparent dark:to-black/50"></div>

        {/* Top Right Floating Badge: Logo + SMK PRESTASI PRIMA */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-white/60 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow-xs border border-orange-100">
              <img src="/images/logo-smk.png" alt="Logo SMK" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              SMK PRESTASI PRIMA
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NEWS CARDS CONTAINER (MATCHING BERITA PAGE CARDS) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 md:-mt-36">
        
        {/* Section Heading & View All Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-orange-200 dark:border-orange-500/30 text-[#FF6B00] text-[11px] font-black tracking-widest uppercase mb-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
              BERITA & KEGIATAN TERBARU
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Sekolah Menengah Kejuruan <span className="text-[#FF6B00]">Prestasi Prima</span>
            </h2>
          </div>

          <Link
            href="/news"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-orange-300 hover:text-[#FF6B00] dark:hover:text-orange-400 transition-all duration-200 group"
          >
            Lihat Semua Berita
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* 1 FEATURED ON LEFT + 2 STACKED ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* LEFT: FEATURED NEWS CARD (MATCHING BERITA PAGE ARTICLE STYLING) */}
          <div className="lg:col-span-7 flex">
            <article className="w-full rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-orange-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              
              {/* Image Container with Floating Category Badge */}
              <div className="h-64 sm:h-72 md:h-80 overflow-hidden relative bg-slate-100 dark:bg-slate-800 shrink-0">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-[#FF6B00] text-xs font-black backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm uppercase tracking-wider">
                  {featured.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>📅</span>
                    <span>{featured.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors leading-snug">
                    <Link href={`/news/${featured.slug || featured.id}`}>
                      {featured.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {featured.summary || featured.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/news/${featured.slug || featured.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-orange-600 dark:hover:text-orange-400 transition-colors group/btn"
                  >
                    Baca Artikel Lengkap
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>

                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    {featured.author || 'Humas Prestasi Prima'}
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT: TWO SMALLER NEWS ARTICLES STACKED VERTICALLY */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {rightArticles.map((item) => (
              <article
                key={item.id}
                className="w-full rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-orange-300 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Horizontal / Compact Thumbnail */}
                <div className="w-full sm:w-44 h-48 sm:h-full relative overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 text-[#FF6B00] text-[10px] font-black backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xs uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <span>📅</span>
                      <span>{item.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors leading-snug line-clamp-2">
                      <Link href={`/news/${item.slug || item.id}`}>
                        {item.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {item.summary || item.content}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/news/${item.slug || item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-orange-600 transition-colors group/btn"
                    >
                      Baca Lengkap
                      <span className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
