import React from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export default function ProfileCTA() {
  const { cta } = PROFILE_DATA;

  return (
    <section className="relative w-full py-24 bg-slate-950 text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F96501]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F96501]/15 border border-[#F96501]/40 text-[#F96501] text-xs font-black tracking-widest uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-[#F96501]" />
          {cta.badge}
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5 leading-tight">
          {cta.headline}
        </h2>

        {/* Supporting text */}
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          {cta.desc}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={cta.primaryBtnUrl}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F96501] hover:bg-orange-600 text-white font-black text-sm tracking-wide shadow-xl shadow-[#F96501]/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {cta.primaryBtnLabel} →
          </Link>
          <Link
            href={cta.secondaryBtnUrl}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm tracking-wide border border-slate-700/80 shadow-lg transition-all duration-200"
          >
            {cta.secondaryBtnLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
