"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export default function SchoolVideo() {
  const { video } = PROFILE_DATA;
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = "https://www.youtube-nocookie.com/embed/EYzn0caf0_k?autoplay=1&rel=0";

  return (
    <section className="relative w-full py-24 bg-slate-950 text-white overflow-hidden">
      {/* Decorative Technical Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F96501]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F96501]/15 border border-[#F96501]/30 text-[#F96501] text-xs font-black tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F96501] animate-pulse" />
            {video.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            {video.title}
          </h2>
          <p className="text-lg font-bold text-[#F96501] mb-2">{video.subtitle}</p>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {video.desc}
          </p>
        </div>

        {/* Cinematic Video Player Frame with Embedded YouTube Player */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 aspect-video group">
          {isPlaying ? (
            <div className="relative w-full h-full">
              <iframe
                src={embedUrl}
                title="Video Profil SMK Prestasi Prima"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {/* Close Button to return to thumbnail preview */}
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                aria-label="Tutup video profil dan kembali ke pratinjau"
                className="absolute top-4 right-4 z-40 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 hover:bg-[#F96501] text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200"
              >
                <span>Tutup Video</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="Putar Video Profil SMK Prestasi Prima"
              className="relative w-full h-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F96501]/50 cursor-pointer block"
            >
              <img
                src={video.poster || "/images/gedung.png"}
                alt={video.subtitle || "Video Profil SMK Prestasi Prima"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/40 group-hover:from-slate-950/75 group-hover:via-slate-950/30 transition-colors duration-300" />

              {/* Center Orange Play Button */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F96501] group-hover:bg-orange-600 text-white flex items-center justify-center shadow-2xl shadow-[#F96501]/50 group-hover:scale-110 group-hover:shadow-[#F96501]/70 transition-all duration-300 ring-4 ring-white/20 group-hover:ring-white/40"
              >
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Bottom Video Metadata */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F96501] animate-pulse" />
                  <span className="font-bold text-white">Full HD 1080p Cinematic</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-300 group-hover:text-white transition-colors">
                  <span>Putar Video</span>
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:translate-x-0.5 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
