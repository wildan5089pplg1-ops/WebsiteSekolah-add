import React from "react";
import Link from "next/link";

interface ProgramCTAProps {
  currentMajorId: string;
}

const ALL_MAJORS_CTA = [
  { id: "pplg", name: "PPLG", label: "Pengembangan Software & Gim" },
  { id: "dkv", name: "DKV", label: "Desain Komunikasi Visual" },
  { id: "tjkt", name: "TJKT", label: "Jaringan Komputer & Cyber" },
  { id: "bcf", name: "BCF", label: "Broadcasting & Perfilman" },
];

export default function ProgramCTA({ currentMajorId }: ProgramCTAProps) {
  return (
    <section className="relative w-full py-20 bg-slate-950 text-white overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F96501]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F96501]/15 border border-[#F96501]/40 text-[#F96501] text-xs font-black tracking-widest uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-[#F96501]" />
          Langkah Awal Menuju Masa Depan
        </div>

        {/* CTA Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
          Kenali Bidang <span className="text-[#F96501]">Keahlianmu</span>
        </h2>

        {/* Short Text */}
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          Temukan minat terbaikmu dan kembangkan potensimu bersama ekosistem pendidikan
          vokasi unggulan di SMK Prestasi Prima. Siap menjadi bagian dari generasi inovator masa depan?
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/program"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm tracking-wide shadow-xl transition-all duration-200"
          >
            Lihat Program Keahlian
          </Link>
          <Link
            href="/ppdb"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F96501] hover:bg-orange-600 text-white font-black text-sm tracking-wide shadow-xl shadow-[#F96501]/25 transition-all duration-200"
          >
            Daftar PPDB Sekarang →
          </Link>
        </div>

        {/* Quick links to other majors */}
        <div className="pt-8 border-t border-slate-800/80">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Eksplorasi Program Lainnya:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {ALL_MAJORS_CTA.filter((m) => m.id !== currentMajorId).map((m) => (
              <Link
                key={m.id}
                href={`/program/${m.id}`}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#F96501] text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                <span className="text-[#F96501] mr-1.5">{m.name}</span>
                <span>— {m.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
