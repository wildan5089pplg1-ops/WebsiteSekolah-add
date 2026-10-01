import React from "react";
import { SkillItem } from "@/data/keahlianData";
import { ProgramIcon } from "./ProgramIcons";

interface ProgramSkillsProps {
  skills: SkillItem[];
  majorName: string;
}

export default function ProgramSkills({ skills, majorName }: ProgramSkillsProps) {
  return (
    <section id="keahlian" className="w-full py-20 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            Kompetensi Kurikulum
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Keahlian yang <span className="text-[#F96501]">Dipelajari</span> di {majorName}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Kurikulum kejuruan dirancang komprehensif memadukan landasan teori esensial dan
            keterampilan teknis terapan yang relevan dengan kebutuhan industri digital saat ini.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group relative p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#F96501]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-7 right-7 h-1 bg-gradient-to-r from-transparent via-[#F96501]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-[#F96501] text-[#F96501] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <ProgramIcon name={skill.icon} className="w-6 h-6" />
                  </div>
                  {skill.tag && (
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-orange-50 group-hover:text-[#F96501] transition-colors">
                      {skill.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2.5 group-hover:text-[#F96501] transition-colors">
                  {skill.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {skill.desc}
                </p>
              </div>

              {/* Bottom detail subtle link */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#F96501] font-semibold transition-colors">
                <span>Modul Keahlian #{idx + 1}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
