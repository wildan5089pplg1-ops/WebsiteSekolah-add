"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    category: 'Prestasi',
    date: '18 FEB 2026',
    title: 'SMK PRESTASI PRIMA raih Akreditasi A dengan inovasi kurikulum digital terpadu',
    desc: 'Dari wireframe yang berantakan sampai demo produk yang meyakinkan—perjalanan tim menuju akreditasi unggul berkat kurikulum yang selaras dengan industri.',
    image: '/images/gedung.png', 
    color: 'bg-[#e65c4f]' // Orange/Red
  },
  {
    id: 2,
    category: 'Kabar Sekolah',
    date: '07 FEB 2026',
    title: 'Ultras presma raih juara 1 most favorite supporter dbl 2025 East Jakarta',
    desc: 'Semangat membara di tribun DBL Jakarta, Ultras Presma membuktikan solidaritas dan kreativitas tanpa batas di setiap pertandingannya.',
    image: '/images/supporter.jpg', 
    color: 'bg-[#297096]' // Blue
  },
  {
    id: 3,
    category: 'Cerita Alumni',
    date: '29 JAN 2026',
    title: 'Membangun kolaborasi menciptakan generasi siap industri',
    desc: 'Bincang inspiratif bersama para guru dan kepala sekolah mengenai visi misi kolaborasi berkelanjutan dengan perusahaan digital terkemuka.',
    image: '/images/kepsek.png', 
    color: 'bg-[#e2b938]' // Yellow
  }
];

export default function BlogSection() {
  return (
    <section className="relative w-full py-24 bg-[#fdfbf7] border-y border-slate-100 overflow-hidden">
      
      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-[#e65c4f] font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e65c4f]"></span>
              05 / Blog & Artikel
              <div className="h-px bg-[#e65c4f]/30 w-12 sm:w-24 ml-2"></div>
            </div>
            <h2 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-black text-[#1a2b3c] leading-[1.05] tracking-tight">
              Cerita & kabar terbaru.
            </h2>
          </div>
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#e65c4f] font-bold text-sm sm:text-base border-b border-transparent hover:border-[#e65c4f] hover:gap-3 transition-all pb-1 mb-2 md:mb-4">
            Lihat semua
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group flex flex-col bg-[#f5f0e6] rounded-[2rem] overflow-hidden border border-[#e8dfcd] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-sm h-full"
            >
              {/* Top Colored Bar */}
              <div className={`h-3.5 w-full ${article.color}`}></div>
              
              <div className="p-6 sm:p-8 flex flex-col flex-1 bg-[#f5f0e6]">
                {/* Category & Date */}
                <div className="flex justify-between items-center text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.15em] mb-6">
                  <span>{article.category}</span>
                  <span>{article.date}</span>
                </div>

                {/* Photo Container (Original Real Images) */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-200 border border-black/5">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>

                {/* Title & Desc */}
                <h3 className="text-[#1a2b3c] text-[1.25rem] sm:text-[1.35rem] font-black leading-[1.3] mb-4 group-hover:text-[#e65c4f] transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed mb-8 line-clamp-3">
                  {article.desc}
                </p>

                {/* Footer Link */}
                <div className="mt-auto pt-5 border-t border-slate-200/60">
                  <Link href={`/blog/${article.id}`} className="inline-flex items-center gap-2 text-[#e65c4f] font-bold text-[13px] hover:gap-3 transition-all">
                    Baca selengkapnya
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
