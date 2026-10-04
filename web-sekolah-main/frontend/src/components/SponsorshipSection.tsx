"use client";

import React from 'react';
import Link from 'next/link';

export default function SponsorshipSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* BACKGROUND CIRCULAR SCHOOL SEAL WATERMARK (MATCHING REFERENCE SCREENSHOT) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] dark:opacity-[0.04] select-none z-0">
        <svg viewBox="0 0 600 600" className="w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] text-slate-800 dark:text-white" fill="none" stroke="currentColor">
          {/* Concentric Circles */}
          <circle cx="300" cy="300" r="280" strokeWidth="6" />
          <circle cx="300" cy="300" r="260" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="180" strokeWidth="4" />
          
          {/* Circular Text Path for SEKOLAH MENENGAH KEJURUAN PRESTASI PRIMA */}
          <path id="circleTextPathTop" d="M 120 300 A 180 180 0 0 1 480 300" fill="none" stroke="none" />
          <path id="circleTextPathBottom" d="M 480 300 A 180 180 0 0 1 120 300" fill="none" stroke="none" />
          
          <text className="text-[28px] font-black uppercase tracking-[0.25em]" fill="currentColor">
            <textPath href="#circleTextPathTop" startOffset="50%" textAnchor="middle">
              SEKOLAH MENENGAH KEJURUAN
            </textPath>
          </text>
          
          <text className="text-[28px] font-black uppercase tracking-[0.25em]" fill="currentColor">
            <textPath href="#circleTextPathBottom" startOffset="50%" textAnchor="middle">
              PRESTASI PRIMA
            </textPath>
          </text>

          {/* Decorative Stars */}
          <polygon points="100,300 105,310 115,310 108,318 110,328 100,322 90,328 92,318 85,310 95,310" fill="currentColor" />
          <polygon points="500,300 505,310 515,310 508,318 510,328 500,322 490,328 492,318 485,310 495,310" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        
        {/* Title */}
        <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-6">
          SPONSORSHIP BY:
        </h3>

        {/* Sponsor Card (Prambors) */}
        <div className="group relative w-56 sm:w-64 h-28 sm:h-32 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex items-center justify-center p-6 mb-8 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl"></div>
          <img
            src="/images/prambos.webp"
            alt="Prambors Radio Media Partner"
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 relative z-10 filter drop-shadow-sm"
          />
        </div>

        {/* "LIHAT SEMUA MITRA" Button (Matching reference) */}
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FF6B00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            LIHAT SEMUA MITRA
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

      </div>
    </section>
  );
}
