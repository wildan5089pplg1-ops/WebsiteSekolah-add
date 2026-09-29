import React from "react";
import { ToolItem } from "@/data/keahlianData";
import { ProgramIcon } from "./ProgramIcons";

interface ProgramToolsProps {
  tools: ToolItem[];
  majorName: string;
}

export default function ProgramTools({ tools, majorName }: ProgramToolsProps) {
  return (
    <section className="w-full py-20 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            Industri Standard Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Tools & Teknologi di <span className="text-[#F96501]">{majorName}</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Perangkat lunak, hardware, dan teknologi industri mutakhir yang dikuasai siswa
            selama menempuh pendidikan untuk menjamin kesiapan kerja pascakelulusan.
          </p>
        </div>

        {/* Tools Grid (2 col mobile, 4 col tablet/desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#F96501]/50 hover:-translate-y-1 transition-all duration-200 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F96501] flex items-center justify-center shrink-0 border border-orange-100/80">
                <ProgramIcon name={tool.iconType} className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-black text-slate-900 truncate">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                  {tool.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
