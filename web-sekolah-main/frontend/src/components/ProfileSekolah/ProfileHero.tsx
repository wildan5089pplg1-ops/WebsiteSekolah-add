"use client";

import React from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export default function ProfileHero() {
  const { hero } = PROFILE_DATA;

  return (
    <section className="relative w-full pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-950 text-white">
      {/* Subtle Background Technical Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F96501]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-slate-500">Tentang Kami</span>
          <span>/</span>
          <span className="text-[#F96501] font-semibold">Profil Sekolah</span>
        </div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F96501]/15 border border-[#F96501]/40 text-[#F96501] text-xs font-black tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#F96501] animate-pulse" />
                <span>{hero.badgeTop}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-bold tracking-wider uppercase">
                <span>{hero.badgeSecondary}</span>
              </div>
            </div>

            {/* Impactful Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-[1.08]">
              {hero.headlinePart1} <br />
              <span className="text-[#F96501] drop-shadow-sm">{hero.headlinePart2}</span>
            </h1>

            {/* Supporting Headline */}
            <div className="text-lg sm:text-xl font-bold text-slate-200 mb-4 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#F96501] shrink-0" />
              <span>{hero.supportingHeadline}</span>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
              {hero.desc}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#identitas"
                className="px-6 py-3.5 rounded-xl bg-[#F96501] hover:bg-orange-600 text-white font-black text-sm tracking-wide shadow-lg shadow-[#F96501]/25 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Pelajari Identitas Kami ↓
              </a>
              <Link
                href="/ppdb"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide border border-slate-700/80 transition-all duration-200"
              >
                Pendaftaran Siswa Baru
              </Link>
            </div>

            {/* Mini Stats Bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-xl">
              {hero.statsPreview.map((item, idx) => (
                <div key={idx}>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-sm sm:text-base font-black text-white mt-0.5">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Column (Editorial crop with subtle orange border) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 aspect-[4/5] max-h-[560px]">
              <img
                src={hero.heroImage}
                alt="Kampus SMK Prestasi Prima"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Metadata Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F96501]">
                    Official School Profile
                  </span>
                  <h4 className="text-sm font-extrabold text-white mt-0.5">
                    SMK Prestasi Prima Jakarta
                  </h4>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#F96501]/20 border border-[#F96501]/40 flex items-center justify-center text-[#F96501] font-black text-xs">
                  ★ A
                </div>
              </div>

              {/* Subtle Technical Grid Corner Element */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE CAMPUS</span>
              </div>
            </div>

            {/* Subtle background orange accent ring */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#F96501]/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
