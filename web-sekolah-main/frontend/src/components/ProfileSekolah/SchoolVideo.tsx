"use client";

import React from "react";
import Link from "next/link";

export default function SchoolVideo() {
  return (
    <section className="relative w-full py-20 sm:py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      {/* Decorative Technical Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F97316]/15 border border-[#F97316]/30 text-[#F97316] text-xs font-black tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            EXPLORE SCHOOL
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Jelajahi SMK Prestasi Prima.
          </h2>

          {/* Supporting Text */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Lihat lebih dekat lingkungan sekolah, ruang belajar, dan berbagai sudut SMK Prestasi Prima melalui pengalaman virtual tour.
          </p>
        </div>

        {/* Centerpiece Visual Preview & CTA Container */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
          <Link
            href="/virtual-tour"
            className="block relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/50 cursor-pointer"
            aria-label="Jelajahi PRESMA TOUR Virtual Tour SMK Prestasi Prima"
          >
            {/* Authentic School Centerpiece Image */}
            <img
              src="/images/gedung.png"
              alt="Gedung Sekolah SMK Prestasi Prima Virtual Tour"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 group-hover:via-slate-950/30 transition-colors duration-300" />

            {/* Badge: Virtual School Experience */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-orange-300 text-[10px] font-black tracking-widest uppercase">
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.4 14.4 0 0 1 0 18M12 3a14.4 14.4 0 0 0 0 18" />
                </svg>
                VIRTUAL SCHOOL EXPERIENCE • 360°
              </span>
            </div>

            {/* Center Interactive 360 Compass Icon */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F97316]/90 group-hover:bg-[#F97316] text-white flex items-center justify-center shadow-2xl shadow-[#F97316]/50 group-hover:scale-110 group-hover:shadow-[#F97316]/70 transition-all duration-300 ring-4 ring-white/20"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-20">
              <div className="max-w-md">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                  Tur Virtual Interaktif 360°
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
                  Eksplorasi Gedung & Laboratorium Vokasi
                </h3>
              </div>

              {/* Primary CTA Button */}
              <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-extrabold text-sm shadow-xl shadow-[#F97316]/40 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap">
                <span>Jelajahi PRESMA TOUR</span>
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
