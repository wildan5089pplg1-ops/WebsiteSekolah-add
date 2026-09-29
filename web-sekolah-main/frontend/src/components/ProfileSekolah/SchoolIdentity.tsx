import React from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export default function SchoolIdentity() {
  const { identity } = PROFILE_DATA;

  return (
    <section id="identitas" className="w-full py-20 bg-white text-slate-900 scroll-mt-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Label + Headline */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-4 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#F96501]" />
              {identity.label}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              {identity.headline}
            </h2>

            <div className="w-16 h-1 bg-[#F96501] rounded-full mb-6" />

            <p className="text-slate-600 text-base leading-relaxed hidden lg:block">
              Sebuah institusi yang melampaui batasan ruang kelas konvensional, merancang
              lingkungan tempat ide, etos kerja, dan teknologi berpadu melahirkan karya nyata.
            </p>
          </div>

          {/* Right Column: Paragraph + Stats Cards */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Descriptive Paragraphs */}
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
              <p>{identity.descParagraph1}</p>
              <p>{identity.descParagraph2}</p>
            </div>

            {/* Small Stats / Facts Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {identity.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#F96501]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#F96501] transition-colors">
                      {stat.value}
                    </span>
                    {stat.badge && (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-slate-200">
                        {stat.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-800 mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
