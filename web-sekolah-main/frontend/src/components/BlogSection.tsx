"use client";

import React from 'react';
import Link from 'next/link';

import { NewsItem } from '@/lib/api';

// Colors for category badges
const categoryColors: Record<string, { bg: string, text: string }> = {
  'Akademik': { bg: 'bg-orange-500', text: 'text-orange-500' },
  'Teknologi': { bg: 'bg-blue-500', text: 'text-blue-500' },
  'Olahraga': { bg: 'bg-red-500', text: 'text-red-500' },
  'Prestasi': { bg: 'bg-emerald-500', text: 'text-emerald-500' },
  'Pengumuman': { bg: 'bg-purple-500', text: 'text-purple-500' },
  'Kegiatan': { bg: 'bg-amber-500', text: 'text-amber-500' }
};

const getCategoryColor = (category: string) => {
  return categoryColors[category] || { bg: 'bg-slate-500', text: 'text-slate-500' };
};

interface BlogSectionProps {
  articles: NewsItem[];
}

export default function BlogSection({ articles }: BlogSectionProps) {
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const list = articles.slice(1, 4); // Ambil maksimal 3 berita untuk list

  return (
    <section className="relative w-full py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3">Blog & Artikel</h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              Cerita & <span className="text-orange-500">Kabar Terbaru</span>
            </h2>
          </div>
          <Link href="/news" className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 group">
            Lihat Semua Berita
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>

        {/* Magazine Grid Layout (1 Featured + 3 List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FEATURED ARTICLE (Left Side) */}
          <div className="lg:col-span-7 flex flex-col">
            <Link href={`/news/${featured.slug || featured.id}`} className="group relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end isolate">
              
              {/* Image & Zoom */}
              <div className="absolute inset-0 z-0">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              
              {/* Heavy Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 z-20 flex gap-2">
                <span className={`px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${getCategoryColor(featured.category).bg}`}>
                  {featured.category}
                </span>
                {featured.views_count !== undefined && (
                  <span className="px-3 py-1.5 rounded-full text-white text-xs font-semibold backdrop-blur-md bg-black/30 border border-white/10 shadow-lg flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    {featured.views_count}
                  </span>
                )}
              </div>

              {/* Content Overlay */}
              <div className="relative z-20 p-6 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-xs font-semibold text-slate-300">{featured.date}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 group-hover:text-orange-400 transition-colors drop-shadow-lg">
                  {featured.title}
                </h3>
                
                <p className="text-slate-200 text-sm md:text-base font-medium line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {featured.summary}
                </p>

                <div className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full transition-all">
                  Baca Artikel
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>
          </div>

          {/* LIST ARTICLES (Right Side) */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 justify-between">
            {list.map((article) => (
              <Link 
                key={article.id} 
                href={`/news/${article.slug || article.id}`}
                className="group flex flex-row items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Square Thumbnail */}
                <div className="shrink-0 relative w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden shadow-inner">
                  <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute top-0 left-0 w-1 h-full ${getCategoryColor(article.category).bg}`}></div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center py-2 pr-2">
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider mb-1 md:mb-2 ${getCategoryColor(article.category).text}`}>
                    {article.category}
                  </span>
                  
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-orange-500 transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 mt-auto text-slate-500 dark:text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-[10px] md:text-xs font-semibold">{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
