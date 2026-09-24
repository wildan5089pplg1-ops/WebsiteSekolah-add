import React from "react";
import { CareerItem } from "@/data/keahlianData";
import { ProgramIcon } from "./ProgramIcons";

interface ProgramCareersProps {
  careers: CareerItem[];
  majorName: string;
}

export default function ProgramCareers({ careers, majorName }: ProgramCareersProps) {
  return (
    <section className="w-full py-20 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            Masa Depan Profesional
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Prospek Karir Lulusan <span className="text-[#F96501]">{majorName}</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Lulusan {majorName} dibekali keahlian teknis dan portofolio nyata yang membuka
            jalan karir luas di berbagai sektor industri digital, perusahaan teknologi, maupun rintisan mandiri.
          </p>
        </div>

        {/* Career Cards Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#F96501]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F96501] group-hover:bg-[#F96501] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <ProgramIcon name={career.icon} className="w-6 h-6" />
                  </div>
                  {career.demandTag && (
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/60">
                      {career.demandTag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2.5 group-hover:text-[#F96501] transition-colors">
                  {career.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {career.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#F96501]">
                <span>Peluang Industri Relevan</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
