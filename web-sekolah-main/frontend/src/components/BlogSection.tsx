"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    category: 'Akademik',
    title: 'SMK PRESTASI PRIMA raih Akreditasi A dengan inovasi kurikulum digital terpadu',
    image: '/images/gedung.png', 
  },
  {
    id: 2,
    category: 'Supporter',
    title: 'Ultras presma raih juara 1 most favorite supporter dbl 2025 East Jakata',
    image: '/images/supporter.jpg', 
  },
  {
    id: 3,
    category: 'Kunjungan',
    title: 'Membangun kolaborasi menciptakan generasi siap industri',
    image: '/images/kepsek.png', 
  },
  {
    id: 4,
    category: 'Supporter',
    title: 'Ultras presma raih juara 1 most favorite supporter dbl 2025 East Jakata',
    image: '/images/supporter.jpg', 
  }
];

export default function BlogSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  // Reorder articles based on activeIndex so it functions like an infinite carousel
  const reorderedArticles = [
    ...articles.slice(activeIndex),
    ...articles.slice(0, activeIndex)
  ];

  const featured = reorderedArticles[0];
  const list = reorderedArticles.slice(1, 4);

  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <img src="/images/logo.png" alt="Watermark" className="w-[800px] h-[800px] object-contain grayscale" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h4 className="text-sm font-black text-[#f87f22] mb-1">Blog & Artikel</h4>
          <h2 className="text-3xl md:text-[2.5rem] font-black text-slate-900 leading-tight mb-4">
            Cerita & <span className="text-[#f87f22]">Kabar Terbaru</span>
          </h2>
          <div className="relative inline-block">
            <p className="text-base md:text-lg font-bold text-slate-900 z-10 relative">
              Wadah <span className="text-[#f87f22]">informasi dan cerita</span> menarik tentang kegiatan serta kabar<br className="hidden sm:block" />
              terbaru sekolah.
            </p>
          </div>
        </div>

        {/* Magazine Grid Layout (1 Featured + 3 List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* FEATURED ARTICLE (Left Side) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Added a key to the Link so React unmounts/remounts the animation for image transition smoothly */}
            <Link key={`featured-${featured.id}`} href={`/blog/${featured.id}`} className="group relative w-full h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden shadow-lg transition-all flex flex-col justify-end isolate">
              
              {/* Image & Zoom */}
              <div className="absolute inset-0 z-0">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              
              {/* Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              
              {/* Content Overlay */}
              <div className="relative z-20 p-6 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <h3 className="text-2xl md:text-3xl lg:text-[2.5rem] font-black text-white leading-[1.15] max-w-[85%] drop-shadow-md">
                  {featured.category === 'Akademik' ? (
                    <>
                      <span className="text-[#f87f22]">SMK PRESTASI PRIMA</span> raih<br/>
                      Akreditasi A dengan inovasi<br/>
                      kurikulum digital terpadu
                    </>
                  ) : (
                    featured.title
                  )}
                </h3>
                
                <div className="shrink-0 pb-2">
                  <button className="bg-[#f87f22] hover:bg-[#e06c17] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md transition-colors">
                    baca artikel
                  </button>
                </div>
              </div>
            </Link>
          </div>

          {/* LIST ARTICLES (Right Side) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            {list.map((article, idx) => (
              <Link 
                key={`${article.id}-${idx}`} 
                href={`/blog/${article.id}`}
                className="group flex flex-row items-center gap-5 p-4 rounded-3xl bg-[#f3f4f6] hover:bg-[#e5e7eb] transition-colors duration-300 shadow-sm"
              >
                {/* Square Thumbnail */}
                <div className="shrink-0 relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-2xl overflow-hidden shadow-inner">
                  {article.category === 'Kunjungan' ? (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#ff5f2e] to-[#ff2a00] p-1.5 rounded-2xl">
                       <img src={article.image} alt={article.title} className="w-full h-full object-cover rounded-[10px]" />
                    </div>
                  ) : (
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center pr-2 py-2">
                  <span className="text-xs font-black text-[#d32f2f] mb-1">
                    {article.category}
                  </span>
                  <h3 className="text-sm md:text-[15px] font-black text-slate-800 leading-snug group-hover:text-[#f87f22] transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Navigation Buttons (Bottom Right) */}
        <div className="flex justify-end gap-3 mt-8 pr-2">
           <button 
             onClick={handlePrev}
             className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
             aria-label="Artikel Sebelumnya"
           >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
             </svg>
           </button>
           <button 
             onClick={handleNext}
             className="w-12 h-12 rounded-xl bg-[#f87f22] flex items-center justify-center text-white hover:bg-[#e06c17] active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
             aria-label="Artikel Selanjutnya"
           >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
             </svg>
           </button>
        </div>

      </div>
    </section>
  );
}
