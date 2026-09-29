import React from "react";
import { FeatureHighlight } from "@/data/keahlianData";

interface ProgramFeatureHighlightProps {
  feature: FeatureHighlight;
  majorName: string;
}

export default function ProgramFeatureHighlight({
  feature,
  majorName,
}: ProgramFeatureHighlightProps) {
  return (
    <section className="w-full py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Column (Large, Immersive) */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Overlay Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F96501]">
                    Standar Laboratorium Industri
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    SMK Prestasi Prima • {majorName}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F96501] flex items-center justify-center font-black text-xs">
                  ✓
                </div>
              </div>
            </div>

            {/* Subtle decorative background blur */}
            <div className="absolute -bottom-6 -left-6 w-56 h-56 bg-orange-500/10 rounded-full blur-2xl -z-10" />
          </div>

          {/* Text & Points Column */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#F96501] text-xs font-black tracking-widest uppercase w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F96501]" />
              {feature.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              {feature.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              {feature.desc}
            </p>

            {/* Structured Points */}
            <div className="space-y-4">
              {feature.points.map((pt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#F96501]/40 transition-colors flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-white shadow-sm border border-slate-200 text-[#F96501] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 mb-1">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pt.desc}
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
