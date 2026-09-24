import React from "react";
import { ProjectItem } from "@/data/keahlianData";

interface ProgramProjectsProps {
  projects: ProjectItem[];
  majorName: string;
}

export default function ProgramProjects({ projects, majorName }: ProgramProjectsProps) {
  return (
    <section className="w-full py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            Portofolio Unggulan
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Hasil Karya & Project Siswa <span className="text-[#F96501]">{majorName}</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Representasi karya nyata dan produk kreatif yang dihasilkan siswa selama proses
            pembelajaran berbasis proyek industri dan tugas akhir kejuruan.
          </p>
        </div>

        {/* Project Cards Gallery (1 col mobile, 2 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#F96501]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                  {proj.category}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2.5 group-hover:text-[#F96501] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {proj.desc}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
