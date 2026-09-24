"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";
import { ProfileIcon } from "./ProfileIcons";

export default function VisionMission() {
  const { visionMission } = PROFILE_DATA;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleMission = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-slate-50 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            {visionMission.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {visionMission.sectionTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
            Kompas utama dalam memandu langkah strategis, kurikulum, dan tata nilai seluruh
            civitas akademika SMK Prestasi Prima.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Visual Card + Visi Highlight */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Visual Photo Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[4/3] bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                alt="Civitas Akademika SMK Prestasi Prima"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F96501] block">
                  MOTTO SEKOLAH
                </span>
                <p className="text-sm font-extrabold text-slate-900 italic mt-0.5">
                  {visionMission.visionQuote}
                </p>
              </div>
            </div>

            {/* Visi Highlight Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#F96501]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F96501]" />
                <span>VISI INSTITUSI</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white mb-3">
                {visionMission.visionCardTitle}
              </h3>

              <blockquote className="text-base sm:text-lg leading-relaxed text-slate-200 font-medium border-l-2 border-[#F96501] pl-4 py-1">
                &ldquo;{visionMission.visionText}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Column: 7 Misi Numbered Cards / Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F96501]">
                7 Misi Strategis
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Klik kartu untuk rincian
              </span>
            </div>

            {visionMission.missions.map((misi, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={misi.id}
                  onClick={() => toggleMission(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isExpanded
                      ? "bg-white border-[#F96501] shadow-md ring-1 ring-[#F96501]/30"
                      : "bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`text-sm font-black w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isExpanded
                            ? "bg-[#F96501] text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {misi.number}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                        {misi.shortTitle}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-bold transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#F96501]" : "text-slate-400"
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Expandable description */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-slate-100 pl-12 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      <div className="flex items-start gap-2.5">
                        <span className="text-[#F96501] mt-0.5">
                          <ProfileIcon name={misi.iconName} className="w-4 h-4" />
                        </span>
                        <p>{misi.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
