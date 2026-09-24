import React from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";
import { ProfileIcon } from "./ProfileIcons";

export default function SchoolHighlights() {
  const { highlights } = PROFILE_DATA;

  return (
    <section className="w-full py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F96501]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F96501]/15 text-[#F96501] border border-[#F96501]/30 text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            {highlights.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {highlights.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-4">
            {highlights.subtitle}
          </p>
        </div>

        {/* 4 Large Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.cards.map((card, idx) => (
            <div
              key={card.id}
              className="p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-[#F96501] hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Icon box */}
                <div className="w-14 h-14 rounded-2xl bg-[#F96501]/15 text-[#F96501] group-hover:bg-[#F96501] group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                  <ProfileIcon name={card.icon} className="w-7 h-7" />
                </div>

                <div className="text-xs font-bold text-[#F96501] uppercase tracking-wider mb-1">
                  0{idx + 1} • {card.subtitle}
                </div>

                <h3 className="text-lg font-black text-white mb-3 group-hover:text-[#F96501] transition-colors leading-snug">
                  {card.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Metric Tag */}
              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Standarisasi</span>
                <span className="font-extrabold text-white group-hover:text-[#F96501] transition-colors">
                  {card.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
