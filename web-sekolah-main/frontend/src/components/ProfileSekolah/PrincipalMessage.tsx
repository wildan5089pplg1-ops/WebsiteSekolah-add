import React from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export default function PrincipalMessage() {
  const { principal } = PROFILE_DATA;

  return (
    <section className="w-full py-20 bg-slate-50 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Photo Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src={principal.photo}
                  alt={principal.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100">
                  <div className="text-base font-black text-slate-900">
                    {principal.name}
                  </div>
                  <div className="text-xs font-bold text-[#F96501] uppercase tracking-wider mt-0.5">
                    {principal.role}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {principal.school}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Message Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-4 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#F96501]" />
                {principal.label}
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                {principal.title}
              </h2>

              {/* Greeting */}
              <p className="text-base font-bold text-[#F96501] italic mb-6">
                {principal.greeting}
              </p>

              {/* Key Quote */}
              <blockquote className="p-4 rounded-2xl bg-orange-50/80 border-l-4 border-[#F96501] text-slate-800 text-sm sm:text-base italic leading-relaxed mb-6 font-medium">
                &ldquo;{principal.quote}&rdquo;
              </blockquote>

              {/* Message Paragraphs */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                {principal.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                <p className="font-semibold text-slate-800 italic">{principal.closing}</p>
              </div>

              {/* Signature / Headmaster Hierarchy Box (Strictly Position BELOW Name) */}
              <div className="pt-6 border-t border-slate-100 flex flex-col">
                <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {principal.name}
                </span>
                <span className="text-sm font-extrabold text-[#F96501] uppercase tracking-wider mt-1">
                  {principal.role}
                </span>
                <span className="text-xs font-bold text-slate-500 mt-0.5">
                  {principal.school}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
