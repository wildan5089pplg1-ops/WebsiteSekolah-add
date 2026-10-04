"use client";

import React, { useState, useEffect } from 'react';

interface IndustriPartner {
  id: number;
  name: string;
  image?: string;
  acronym: string;
  color: string;
  desc: string;
}

const industri: IndustriPartner[] = [
  { id: 1, name: 'Penerbit Erlangga', acronym: 'ERL', color: 'from-blue-600 to-indigo-800', desc: 'Kolaborasi penyediaan literatur digital dan kurikulum industri modern.' },
  { id: 2, name: 'WIKA', acronym: 'WIKA', color: 'from-sky-500 to-cyan-700', desc: 'Program magang teknologi infrastruktur berskala nasional.' },
  { id: 3, name: 'Telkom Indonesia', image: 'https://logo.clearbit.com/telkom.co.id', acronym: 'TLKM', color: 'from-red-600 to-rose-800', desc: 'Inkubasi startup siswa & sertifikasi jaringan telekomunikasi.' },
  { id: 4, name: 'KOMATSU', acronym: 'KMT', color: 'from-indigo-600 to-blue-900', desc: 'Pelatihan sistem mekanik industri presisi tinggi.' },
  { id: 5, name: 'KemenkopUKM', acronym: 'UKM', color: 'from-emerald-500 to-teal-700', desc: 'Akselerasi wirausaha dan bisnis digital lulusan vokasi.' },
  { id: 6, name: 'Jatelindo', acronym: 'JTL', color: 'from-blue-500 to-blue-700', desc: 'Pengembangan sistem pembayaran digital (payment gateway).' },
];

export default function KerjaSamaIndustriSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play the 3D coverflow carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % industri.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Background Subtle Gradient & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50/40 via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 z-0 pointer-events-none"></div>

      {/* Decorative Network Polygon - Top Right */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-96 flex items-start justify-end z-0 opacity-40 dark:opacity-20 pointer-events-none translate-x-10 -translate-y-10">
        <svg viewBox="0 0 400 400" className="w-full h-full text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
          <g className="animate-[pulse_5s_ease-in-out_infinite]" stroke="currentColor" fill="none" strokeWidth="1.5">
            <circle cx="300" cy="100" r="4" fill="currentColor" />
            <circle cx="200" cy="50" r="3" fill="currentColor" />
            <circle cx="350" cy="200" r="5" fill="currentColor" />
            <circle cx="150" cy="150" r="3" fill="currentColor" />
            <circle cx="250" cy="250" r="4" fill="currentColor" />
            <circle cx="300" cy="350" r="3" fill="currentColor" />
            
            <path d="M300 100 L200 50 L150 150 L250 250 L350 200 Z" className="opacity-60" />
            <path d="M300 100 L350 200 L300 350 L250 250 Z" className="opacity-40" />
            <path d="M200 50 L250 250" className="opacity-30" />
            <path d="M300 100 L250 250" className="opacity-50" />
            <path d="M150 150 L350 200" className="opacity-20" />
          </g>
        </svg>
        <div className="absolute top-20 right-20 w-48 h-48 bg-orange-500/15 blur-[100px] rounded-full"></div>
      </div>

      {/* Decorative Prism Polygon - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-64 md:w-80 h-80 flex items-end justify-start z-0 opacity-40 dark:opacity-20 pointer-events-none -translate-x-10 translate-y-10">
        <svg viewBox="0 0 300 300" className="w-full h-full text-orange-500" fill="none" stroke="currentColor">
          <g className="animate-[spin_35s_linear_infinite]" style={{ transformOrigin: '150px 150px' }}>
            <polygon points="150,20 280,95 280,245 150,320 20,245 20,95" strokeWidth="1" className="opacity-30" />
            <polygon points="150,60 240,115 240,215 150,270 60,215 60,115" strokeWidth="2" className="opacity-50" />
            <polygon points="150,100 200,135 200,195 150,230 100,195 100,135" strokeWidth="1" className="opacity-80" />
            <line x1="150" y1="20" x2="150" y2="100" className="opacity-40" />
            <line x1="280" y1="95" x2="200" y2="135" className="opacity-40" />
            <line x1="280" y1="245" x2="200" y2="195" className="opacity-40" />
            <line x1="150" y1="320" x2="150" y2="230" className="opacity-40" />
            <line x1="20" y1="245" x2="100" y2="195" className="opacity-40" />
            <line x1="20" y1="95" x2="100" y2="135" className="opacity-40" />
          </g>
        </svg>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-500/15 blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-500/30 text-[#FF6B00] text-xs font-black tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
            KEMITRAAN STRATEGIS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 uppercase tracking-tight drop-shadow-xs mb-4">
            Kerja Sama Industri
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Membangun ekosistem pendidikan yang relevan dengan masa depan. Jelajahi kolaborasi strategis kami bersama para pemimpin industri.
          </p>
        </div>

        {/* COVERFLOW 3D CAROUSEL (PRESERVED ANIMATION & TRANSITIONS) */}
        <div className="relative w-full mt-10 mb-8 flex flex-col items-center">
          
          {/* The 3D Carousel Area */}
          <div className="relative w-full h-[220px] md:h-[300px] flex items-center justify-center perspective-[1200px] overflow-hidden md:overflow-visible">
            {industri.map((mitra, index) => {
              const offset = (index - activeIndex + industri.length) % industri.length;
              let normalizedOffset = offset;
              if (normalizedOffset === 4) normalizedOffset = -2;
              if (normalizedOffset === 5) normalizedOffset = -1;
              if (normalizedOffset === 3) normalizedOffset = 3;

              const isActive = normalizedOffset === 0;

              // Calculate pseudo-3D transforms
              let transform = '';
              let opacity = 0;
              let zIndex = 0;
              let filter = '';

              if (normalizedOffset === 0) {
                // Center active card
                transform = 'translateX(0px) scale(1) translateZ(0px)';
                opacity = 1;
                zIndex = 30;
                filter = 'blur(0px)';
              } else if (normalizedOffset === 1) {
                // Right 1
                transform = 'translateX(105%) scale(0.85) translateZ(-50px) rotateY(-15deg)';
                opacity = 0.75;
                zIndex = 20;
                filter = 'blur(0.5px)';
              } else if (normalizedOffset === -1) {
                // Left 1
                transform = 'translateX(-105%) scale(0.85) translateZ(-50px) rotateY(15deg)';
                opacity = 0.75;
                zIndex = 20;
                filter = 'blur(0.5px)';
              } else if (normalizedOffset === 2) {
                // Right 2
                transform = 'translateX(190%) scale(0.7) translateZ(-100px) rotateY(-25deg)';
                opacity = 0.45;
                zIndex = 10;
                filter = 'blur(2px)';
              } else if (normalizedOffset === -2) {
                // Left 2
                transform = 'translateX(-190%) scale(0.7) translateZ(-100px) rotateY(25deg)';
                opacity = 0.45;
                zIndex = 10;
                filter = 'blur(2px)';
              } else {
                // Hidden back
                transform = 'translateX(0px) scale(0.5) translateZ(-200px)';
                opacity = 0;
                zIndex = 0;
                filter = 'blur(4px)';
              }

              return (
                <div
                  key={mitra.id}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[180px] h-[110px] sm:w-[220px] sm:h-[130px] md:w-[290px] md:h-[170px] rounded-2xl bg-white dark:bg-slate-800 border-2 cursor-pointer flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive
                      ? 'border-[#FF6B00] shadow-[0_12px_45px_-10px_rgba(249,115,22,0.45)] scale-105'
                      : 'border-slate-200 dark:border-slate-700 shadow-lg hover:border-slate-300'
                  }`}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    filter,
                    transformStyle: 'preserve-3d',
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Partner ${mitra.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveIndex(index);
                    }
                  }}
                >
                  {/* Glowing background on active */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mitra.color} opacity-0 transition-opacity duration-700 rounded-xl ${
                      isActive ? 'opacity-5' : 'group-hover:opacity-[0.02]'
                    }`}
                  ></div>

                  {/* Logo Container */}
                  <div className="relative w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900/60 rounded-xl overflow-hidden group-hover:bg-slate-100 transition-colors p-2">
                    {mitra.image ? (
                      <img
                        src={mitra.image}
                        alt={mitra.name}
                        className="w-3/4 h-3/4 object-contain relative z-10 drop-shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const span = e.currentTarget.nextElementSibling;
                          if (span) span.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <span
                      className={`text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${mitra.color} drop-shadow-xs ${
                        mitra.image ? 'hidden' : ''
                      }`}
                    >
                      {mitra.acronym}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Description Area */}
          <div className="mt-8 md:mt-12 h-24 flex flex-col items-center justify-start text-center px-4">
            {industri.map((mitra, index) => (
              <div
                key={`desc-${mitra.id}`}
                className={`transition-all duration-500 transform ${
                  index === activeIndex
                    ? 'opacity-100 translate-y-0 relative'
                    : 'opacity-0 translate-y-4 absolute pointer-events-none'
                }`}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {mitra.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                  {mitra.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {industri.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                type="button"
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 h-2 bg-[#FF6B00]'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-orange-300'
                }`}
                aria-label={`Pilih mitra ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
