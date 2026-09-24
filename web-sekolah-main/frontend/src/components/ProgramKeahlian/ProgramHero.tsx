"use client";

import React from "react";
import Link from "next/link";
import { MajorData } from "@/data/keahlianData";

interface ProgramHeroProps {
  major: MajorData;
}

const ALL_MAJORS = [
  { id: "bcf", name: "BCF", title: "Broadcasting" },
  { id: "dkv", name: "DKV", title: "Desain Komunikasi Visual" },
  { id: "tjkt", name: "TJKT", title: "Jaringan Komputer" },
  { id: "pplg", name: "PPLG", title: "Software & Gim" },
];

export default function ProgramHero({ major }: ProgramHeroProps) {
  return (
    <section className="relative w-full pt-28 pb-14 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F96501]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/program" className="hover:text-white transition-colors">
            Program Keahlian
          </Link>
          <span>/</span>
          <span className="text-[#F96501] font-semibold">{major.name}</span>
        </div>

        {/* Major Quick Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-2 border-b border-slate-800/80">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline-block">
            Pilih Jurusan:
          </span>
          {ALL_MAJORS.map((m) => {
            const isActive = m.id === major.id;
            return (
              <Link
                key={m.id}
                href={`/program/${m.id}`}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#F96501] text-white shadow-lg shadow-[#F96501]/25 ring-2 ring-[#F96501]/50"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                }`}
              >
                <span>{m.name}</span>
                <span className="text-[11px] font-normal opacity-80 hidden md:inline">
                  — {m.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Hero Split Grid (Compact, Premium Typography) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F96501]/15 border border-[#F96501]/40 text-[#F96501] text-xs font-black tracking-widest uppercase w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F96501] animate-pulse" />
              <span>Program Keahlian Unggulan</span>
            </div>

            {/* Main Acronym (H1) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 leading-none">
              {major.name}
            </h1>

            {/* Full Program Name (H2) */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F96501] mb-4 leading-snug">
              {major.fullName}
            </h2>

            {/* Short Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 font-normal">
              {major.shortDesc}
            </p>

            {/* Supporting Focus Statement */}
            <div className="p-4 rounded-xl bg-slate-800/60 border-l-4 border-[#F96501] border-slate-700/60 text-slate-200 text-sm sm:text-base leading-relaxed mb-8">
              <span className="font-bold text-white block mb-1">Fokus Bidang:</span>
              {major.heroFocus}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#keahlian"
                className="px-6 py-3 rounded-xl bg-[#F96501] hover:bg-orange-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F96501]/25 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Pelajari Kompetensi
              </a>
              <Link
                href="/ppdb"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm tracking-wide border border-slate-700 transition-all duration-200"
              >
                Daftar PPDB Online
              </Link>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-800 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={major.heroImage}
                alt={`${major.name} - ${major.fullName}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F96501]/20 flex items-center justify-center p-1.5 border border-[#F96501]/40">
                    <img
                      src={major.logoIcon}
                      alt={major.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{major.name}</h4>
                    <p className="text-[11px] text-slate-400">SMK Prestasi Prima</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F96501]/20 text-[#F96501] text-xs font-bold border border-[#F96501]/30">
                  Akreditasi A
                </span>
              </div>
            </div>

            {/* Quick Stats Grid underneath */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {major.stats.slice(0, 2).map((st, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center"
                >
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    {st.label}
                  </div>
                  <div className="text-sm font-extrabold text-white mt-0.5">{st.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
