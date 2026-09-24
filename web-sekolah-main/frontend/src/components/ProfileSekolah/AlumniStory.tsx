import React from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export default function AlumniStory() {
  const { testimonials } = PROFILE_DATA;

  return (
    <section className="w-full py-20 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            TESTIMONIAL & JEJAK ALUMNI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Suara dari Hati.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
            Pengalaman nyata para alumni yang telah membuktikan keunggulan kompetensi dan
            karakter lulusan SMK Prestasi Prima di panggung karir profesional dan perguruan tinggi.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#F96501]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-4xl font-serif text-[#F96501]/40 mb-4 select-none">
                  “
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-8 font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-6 border-t border-slate-200/80 flex items-center gap-4">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-[#F96501] truncate">
                    {item.role} • {item.company}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.major} ({item.gradYear})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
