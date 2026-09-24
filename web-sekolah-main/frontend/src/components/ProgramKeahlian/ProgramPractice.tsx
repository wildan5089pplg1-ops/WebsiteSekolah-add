import React from "react";
import { PracticeItem } from "@/data/keahlianData";
import { ProgramIcon } from "./ProgramIcons";

interface ProgramPracticeProps {
  practices: PracticeItem[];
  majorName: string;
}

export default function ProgramPractice({ practices, majorName }: ProgramPracticeProps) {
  return (
    <section className="w-full py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F96501]/15 text-[#F96501] border border-[#F96501]/30 text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            Metodologi Edukasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Model Pembelajaran Praktik di <span className="text-[#F96501]">{majorName}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Menghubungkan ruang kelas dengan dinamika kerja nyata industri, mempersiapkan
            lulusan yang tidak hanya mengerti konsep namun terampil menyelesaikan masalah.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practices.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-[#F96501] hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F96501]/15 text-[#F96501] group-hover:bg-[#F96501] group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300">
                  <ProgramIcon name={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white mb-2.5 group-hover:text-[#F96501] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Pilar Kejuruan 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
