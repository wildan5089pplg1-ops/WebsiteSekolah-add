"use client";

import React, { useRef } from 'react';

const achievements = [
  {
    id: 1,
    title: 'Juara 1 Lomba Web Design',
    event: 'Olimpiade IT Nasional 2025',
    student: 'Ahmad & Tim',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    title: 'TURNAMEN SILAT TINGKAT NASIONAL',
    event: 'Kejuaraan Tingkat jakarta timur',
    student: 'Muhammad Nabil Syukri',
    image: '/images/prestasi-silat.jpeg',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 3,
    title: 'Juara 2 Animasi 3D',
    event: 'Festival Film Pendek Pelajar',
    student: 'Citra Kirana',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 4,
    title: 'Best System Administrator',
    event: 'LKS SMK Tingkat Nasional',
    student: 'Dimas Anggara',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 5,
    title: 'Juara 2 Turnamen Basket',
    event: 'Buah Hati Annual Festival',
    student: 'Tim Basket',
    image: '/images/prestasi-basket.jpeg',
    color: 'from-yellow-500 to-orange-500'
  }
];

export default function PrestasiSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Scroll by roughly one card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Premium Edge Decoration - Left (Glowing Hexagons) */}
      <div className="absolute top-0 -left-32 sm:-left-20 h-full w-64 md:w-96 flex items-center z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 600" className="w-full h-[150%] text-orange-500 fill-current">
          <path d="M50 100 L100 75 L150 100 L150 150 L100 175 L50 150 Z" className="opacity-20 animate-pulse" />
          <path d="M50 200 L100 175 L150 200 L150 250 L100 275 L50 250 Z" className="opacity-60" />
          <path d="M100 275 L150 250 L200 275 L200 325 L150 350 L100 325 Z" className="opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          <path d="M50 300 L100 275 L150 300 L150 350 L100 375 L50 350 Z" className="opacity-30" />
          <path d="M0 250 L50 225 L100 250 L100 300 L50 325 L0 300 Z" className="opacity-50" />
          <path d="M50 400 L100 375 L150 400 L150 450 L100 475 L50 450 Z" className="opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
        </svg>
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-orange-500/30 blur-[60px] rounded-full"></div>
      </div>

      {/* Premium Edge Decoration - Right (Abstract Flow) */}
      <div className="absolute top-0 -right-32 sm:-right-20 h-full w-64 md:w-96 flex items-center justify-end z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 600" className="w-full h-[150%] text-blue-600 dark:text-cyan-500 stroke-current" fill="none" strokeWidth="2">
          <path d="M200 100 C 100 200, 50 150, 0 300 C 50 450, 100 400, 200 500" className="opacity-80" />
          <path d="M200 120 C 120 220, 70 170, 20 300 C 70 430, 120 380, 200 480" className="opacity-50" />
          <path d="M200 140 C 140 240, 90 190, 40 300 C 90 410, 140 360, 200 460" className="opacity-30" />
          <path d="M200 160 C 160 260, 110 210, 60 300 C 110 390, 160 340, 200 440" className="opacity-10" />
        </svg>
        <div className="absolute top-1/3 right-0 w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <img src="/images/logo-smk.png" alt="Logo SMK" className="h-16 w-auto drop-shadow-md hover:scale-105 transition-transform" />
          </div>
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Prestasi Kami</h2>
          <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            Mengabadikan momen berharga di balik setiap <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">kemenangan</span>
          </h3>
        </div>
      </div>

      {/* Carousel Container (Full Width to prevent cut-off) */}
      <div className="relative z-10 w-full group mt-4">
        
        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Cards Wrapper */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-10 pt-4 px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2))] scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {achievements.map((item) => (
            <div 
              key={item.id}
              className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px] snap-center"
            >
              {/* Premium Glass Card (Smaller Size & Added isolate to fix Safari border-radius clipping) */}
              <div className="relative rounded-[1.5rem] overflow-hidden group bg-slate-900 border border-slate-800 shadow-xl h-[340px] isolate">
                
                {/* Background Image */}
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100" />
                
                {/* Gradient Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-multiply opacity-30 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">{item.event}</span>
                  </div>

                  <div className="transform transition-transform duration-500 translate-y-3 group-hover:translate-y-0">
                    <p className="text-orange-300 font-bold text-xs mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.student}
                    </p>
                    <h4 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                      {item.title}
                    </h4>
                    
                    {/* Interactive Line */}
                    <div className="w-8 h-1 bg-orange-500 mt-4 rounded-full transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
