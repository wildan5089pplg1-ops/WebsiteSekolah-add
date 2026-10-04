"use client";

import React from 'react';

export default function SponsorshipSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white dark:from-slate-950 dark:via-orange-950/20 dark:to-slate-950 transition-colors duration-300">
      
      {/* TASTEFUL LOW-CONTRAST ORANGE DECORATIVE ELEMENTS BEHIND CONTENT */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Center-Right Orange Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[250px] sm:h-[320px] bg-gradient-to-r from-orange-400/10 via-[#FF6B00]/10 to-amber-400/10 dark:from-orange-500/5 dark:via-orange-600/5 dark:to-transparent rounded-full blur-3xl"></div>

        {/* Abstract Floating Dots & Subtle Rings */}
        <div className="absolute top-8 left-[15%] w-3 h-3 rounded-full bg-[#FF6B00]/20 dark:bg-orange-500/20 blur-[1px]"></div>
        <div className="absolute bottom-10 right-[18%] w-4 h-4 rounded-full bg-[#FF6B00]/25 dark:bg-orange-500/20 blur-[1px]"></div>
        <div className="absolute top-1/3 right-[12%] w-2 h-2 rounded-full bg-[#FF6B00]/30"></div>
        <div className="absolute bottom-1/3 left-[10%] w-2.5 h-2.5 rounded-full bg-[#FF6B00]/20"></div>

        {/* Subtle Geometric Circle Accents */}
        <svg
          className="absolute -top-12 -left-12 w-64 h-64 text-[#FF6B00]/5 dark:text-orange-500/5"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="100" cy="100" r="70" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="90" strokeWidth="1" />
        </svg>

        <svg
          className="absolute -bottom-16 -right-16 w-72 h-72 text-[#FF6B00]/5 dark:text-orange-500/5"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="100" cy="100" r="80" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="100" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        
        {/* Heading: SPONSORSHIP BY */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
          <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.25em]">
            SPONSORSHIP BY:
          </h3>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
        </div>

        {/* Centered Sponsor Card (Prambors) */}
        <div className="group relative w-64 sm:w-72 h-28 sm:h-32 rounded-3xl bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-lg shadow-orange-500/5 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200 dark:hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center p-6 cursor-pointer">
          {/* Subtle Hover Glow Inside Card */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
          
          <img
            src="/images/prambos.webp"
            alt="Prambors Radio Media Partner"
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 relative z-10 filter drop-shadow-xs"
          />
        </div>

      </div>
    </section>
  );
}
