"use client";

import React, { useState } from 'react';

const universities = [
  { id: 1, name: 'Universitas Indonesia', image: '/images/ptn/ui3.png' },
  { id: 2, name: 'Institut Pertanian Bogor', image: '/images/ptn/ipb.png' },
  { id: 3, name: 'Universitas Negeri Jakarta', image: '/images/ptn/unj.png' },
  { id: 4, name: 'Universitas Padjadjaran', image: '/images/ptn/unpad.png' },
  { id: 5, name: 'UIN Syarif Hidayatullah', image: '/images/ptn/uin2.png' },
  { id: 6, name: 'Politeknik Negeri', image: '/images/ptn/politeknik.png' },
  { id: 7, name: 'Institut Seni Indonesia', image: '/images/ptn/isi2.png' },
  { id: 8, name: 'Universitas Trisakti', image: '/images/ptn/trisakti.png' },
];

export default function AlumniPTNSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list to form a seamless infinite loop
  const loopList = [...universities, ...universities];

  return (
    <section className="relative w-full py-16 sm:py-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-900/40 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FF6B00] uppercase tracking-widest drop-shadow-xs">
            LULUSAN PTN
          </h2>
          <div className="w-16 h-1 bg-[#FF6B00] mx-auto rounded-full mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
            Lulusan kami secara konsisten diterima di berbagai Perguruan Tinggi Negeri dan Vokasi terkemuka di Indonesia.
          </p>
        </div>

      </div>

      {/* CONTINUOUS HORIZONTAL MOVING TRACK */}
      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Soft edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-20 pointer-events-none"></div>

        {/* Moving marquee container */}
        <div 
          className={`flex items-center gap-4 sm:gap-6 w-max ${isPaused ? 'paused-animation' : 'running-animation'}`}
          style={{
            animation: 'marquee-left 28s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {loopList.map((uni, idx) => (
            <div
              key={`${uni.id}-${idx}`}
              className="shrink-0 w-[150px] sm:w-[190px] h-[95px] sm:h-[115px] rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 flex items-center justify-center p-4 sm:p-5 group cursor-pointer"
            >
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-full max-h-[60px] sm:max-h-[75px] object-contain group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation & Prefers-reduced-motion */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .running-animation {
            animation: none !important;
            transform: none !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
