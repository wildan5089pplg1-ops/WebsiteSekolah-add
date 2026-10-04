"use client";

import React from 'react';

export default function ClosingBanner() {
  return (
    <div className="relative w-full bg-gradient-to-r from-orange-600 via-[#FF6B00] to-amber-600 py-4 sm:py-5 px-4 sm:px-8 overflow-hidden shadow-lg border-y border-orange-500/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Slogan Text */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <p className="text-white font-black text-xs sm:text-base md:text-lg lg:text-xl tracking-wider uppercase whitespace-nowrap drop-shadow-xs">
            — MENCETAK GENERASI BERPRESTASI! • IF BETTER IS POSSIBLE, GOOD IS NOT ENOUGH!
          </p>
        </div>

        {/* Circular School Logo on Right */}
        <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md border-2 border-orange-300">
          <img
            src="/images/logo-smk.png"
            alt="Logo SMK Prestasi Prima"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}
