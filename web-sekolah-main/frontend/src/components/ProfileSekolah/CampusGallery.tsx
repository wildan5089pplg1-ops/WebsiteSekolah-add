import React from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export default function CampusGallery() {
  const { gallery } = PROFILE_DATA;

  return (
    <section className="w-full py-20 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            {gallery.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {gallery.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
            {gallery.subtitle}
          </p>
        </div>

        {/* Editorial Masonry Grid (Dynamic Asymmetric Composition) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Large Visual (Spans 8 cols, row-span 2) */}
          <div className="md:col-span-8 group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 aspect-[16/10] bg-slate-900">
            <img
              src={gallery.photos[0].image}
              alt={gallery.photos[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-[#F96501] text-white text-[10px] font-black tracking-widest uppercase mb-1.5 inline-block">
                  {gallery.photos[0].label}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {gallery.photos[0].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Side Image 1 (Spans 4 cols) */}
          <div className="md:col-span-4 group relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 aspect-[4/3] md:aspect-auto bg-slate-900">
            <img
              src={gallery.photos[1].image}
              alt={gallery.photos[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/20 text-[#F96501] text-[10px] font-black tracking-widest uppercase mb-1 inline-block">
                {gallery.photos[1].label}
              </span>
              <h3 className="text-sm font-bold text-white line-clamp-1">
                {gallery.photos[1].title}
              </h3>
            </div>
          </div>

          {/* Lower Grid: 3 Balanced Images */}
          {gallery.photos.slice(2, 5).map((photo, idx) => (
            <div
              key={photo.id}
              className="md:col-span-4 group relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 aspect-[4/3] bg-slate-900"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/20 text-[#F96501] text-[10px] font-black tracking-widest uppercase mb-1 inline-block">
                  {photo.label}
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}

          {/* Bottom Banner Image (Spans 12 cols, wide aspect) */}
          <div className="md:col-span-12 group relative rounded-3xl overflow-hidden shadow-md border border-slate-200/90 aspect-[21/9] max-h-[340px] bg-slate-900">
            <img
              src={gallery.photos[5].image}
              alt={gallery.photos[5].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-[#F96501] text-white text-[10px] font-black tracking-widest uppercase mb-1.5 inline-block">
                  {gallery.photos[5].label}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white">
                  {gallery.photos[5].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
