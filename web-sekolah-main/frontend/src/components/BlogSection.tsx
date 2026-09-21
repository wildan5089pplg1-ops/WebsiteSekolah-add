"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    category: 'Akademik',
    date: '12 Okt 2025',
    title: 'SMK Prestasi Prima Raih Akreditasi A dengan Inovasi Kurikulum Digital Terpadu',
    desc: 'Pencapaian luar biasa ini merupakan hasil dedikasi seluruh civitas akademika dalam membangun ekosistem pendidikan masa depan yang berfokus pada kualitas.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    color: 'bg-orange-500',
    textColor: 'text-orange-500'
  },
  {
    id: 2,
    category: 'Teknologi',
    date: '15 Okt 2025',
    title: 'Pekan Kokurikuler IT: Siswa Sukses Kembangkan Aplikasi Smart School',
    desc: 'Sebuah terobosan baru dalam digitalisasi lingkungan sekolah oleh siswa kelas XI.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    color: 'bg-blue-500',
    textColor: 'text-blue-500'
  },
  {
    id: 3,
    category: 'Olahraga',
    date: '20 Okt 2025',
    title: 'Ultras Presma Menangkan Gelar Most Favorite Supporter DBL 2025',
    desc: 'Kreativitas tanpa batas suporter basket SMK Prestasi Prima di kancah regional.',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop',
    color: 'bg-red-500',
    textColor: 'text-red-500'
  },
  {
    id: 4,
    category: 'Prestasi',
    date: '25 Okt 2025',
    title: 'Tim Robotik Maju ke Kompetisi Internasional di Singapura',
    desc: 'Membawa nama harum bangsa melalui inovasi robot pemilah sampah otomatis.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500'
  }
];

export default function BlogSection() {
  const featured = articles[0];
  const list = articles.slice(1);

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
          <Link href="/blog" className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm shadow-md hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 group">
            Lihat Semua Berita
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>

        {/* Magazine Grid Layout (1 Featured + 3 List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FEATURED ARTICLE (Left Side) */}
          <div className="lg:col-span-7 flex flex-col">
            <Link href={`/blog/${featured.id}`} className="group relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end isolate">
              
              {/* Image & Zoom */}
              <div className="absolute inset-0 z-0">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              
              {/* Heavy Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className={`px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${featured.color}`}>
                  {featured.category}
                </span>
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
                  {featured.desc}
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
                href={`/blog/${article.id}`}
                className="group flex flex-row items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Square Thumbnail */}
                <div className="shrink-0 relative w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden shadow-inner">
                  <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute top-0 left-0 w-1 h-full ${article.color}`}></div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center py-2 pr-2">
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider mb-1 md:mb-2 ${article.textColor}`}>
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
