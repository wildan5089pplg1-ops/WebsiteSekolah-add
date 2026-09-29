import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MAJORS_DATA } from "@/data/keahlianData";

export const metadata: Metadata = {
  title: "Program Keahlian Unggulan | SMK Prestasi Prima",
  description:
    "Empat bidang keahlian unggulan berstandar industri: PPLG, DKV, TJKT, dan BCF di SMK Prestasi Prima Jakarta.",
};

const MAJORS_LIST = [
  MAJORS_DATA.bcf,
  MAJORS_DATA.dkv,
  MAJORS_DATA.tjkt,
  MAJORS_DATA.pplg,
];

export default function ProgramOverviewPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F96501]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F96501]/15 border border-[#F96501]/40 text-[#F96501] text-xs font-black tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            SMK Pusat Keunggulan
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Bidang <span className="text-[#F96501]">Keahlian</span> Unggulan
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            SMK Prestasi Prima menyelenggarakan 4 program keahlian teknologi dan industri kreatif
            yang dikembangkan bersama mitra industri terkemuka.
          </p>
        </div>
      </section>

      {/* Majors Cards Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MAJORS_LIST.map((major) => (
              <div
                key={major.id}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#F96501]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={major.heroImage}
                    alt={`${major.name} - ${major.fullName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-black">
                    <img src={major.logoIcon} alt={major.name} className="w-4 h-4 object-contain" />
                    <span>{major.name}</span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {major.fullName}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {major.shortDesc}
                    </p>

                    {/* Key skills previews */}
                    <div className="mb-6">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Kompetensi Utama:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {major.skills.slice(0, 4).map((sk, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                          >
                            {sk.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/program/${major.id}`}
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-[#F96501] text-white font-black text-sm tracking-wide text-center transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Jelajahi Program {major.name}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
