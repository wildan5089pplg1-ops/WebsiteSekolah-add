"use client";

import React, { useState, useEffect } from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export interface SchoolVideoItem {
  id: string;
  embedUrl: string;
  title: string;
  shortTitle: string;
  label: string;
  thumbnail: string;
  fallback: string;
}

export const SCHOOL_VIDEOS: SchoolVideoItem[] = [
  {
    id: "topZzBLdxK8",
    embedUrl: "https://www.youtube-nocookie.com/embed/topZzBLdxK8?autoplay=1&rel=0",
    title: "Teaser LDKS Sekolah Prestasi Prima 2026 Membawa Kepemimpinan",
    shortTitle: "Teaser LDKS",
    label: "LEADERSHIP & KARAKTER",
    thumbnail: "https://img.youtube.com/vi/topZzBLdxK8/hqdefault.jpg",
    fallback: "/images/gedung.png",
  },
  {
    id: "4kEM3ga9YPs",
    embedUrl: "https://www.youtube-nocookie.com/embed/4kEM3ga9YPs?autoplay=1&rel=0",
    title: "PRAMBORS TAHUN 2026 SEKOLAH PRESTASI PRIMA",
    shortTitle: "Prambors Prestasi Prima",
    label: "SCHOOL EVENT",
    thumbnail: "https://img.youtube.com/vi/4kEM3ga9YPs/hqdefault.jpg",
    fallback: "/images/gedung.png",
  },
  {
    id: "E2SZH47urQY",
    embedUrl: "https://www.youtube-nocookie.com/embed/E2SZH47urQY?autoplay=1&rel=0",
    title: "MPLS SEKOLAH PRESTASI PRIMA AJARAN BARU TAHUN 2026",
    shortTitle: "MPLS Siswa Baru",
    label: "STUDENT ORIENTATION",
    thumbnail: "https://img.youtube.com/vi/E2SZH47urQY/hqdefault.jpg",
    fallback: "/images/gedung.png",
  },
  {
    id: "PSZwEf-e334",
    embedUrl: "https://www.youtube-nocookie.com/embed/PSZwEf-e334?autoplay=1&rel=0",
    title: "SELAMAT HARI RAYA IDUL FITRI 1447 H - SEKOLAH PRESTASI PRIMA",
    shortTitle: "Idul Fitri Presma",
    label: "KULTUR & HARMONI",
    thumbnail: "https://img.youtube.com/vi/PSZwEf-e334/hqdefault.jpg",
    fallback: "/images/gedung.png",
  },
];

export default function SchoolGallery() {
  const { gallery } = PROFILE_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Preload YouTube thumbnail images to prevent flash on rotation
  useEffect(() => {
    SCHOOL_VIDEOS.forEach((vid) => {
      const img = new Image();
      img.src = vid.thumbnail;
    });
  }, []);

  // Listen to user preference for reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener?.("change", handleMotionChange);
    return () => {
      mediaQuery.removeEventListener?.("change", handleMotionChange);
    };
  }, []);

  // Automatic 5000ms rotation (strictly PAUSED while video is playing or user hovers)
  useEffect(() => {
    if (reducedMotion || isPaused || isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SCHOOL_VIDEOS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reducedMotion, isPaused, isPlaying]);

  const activeVideo = SCHOOL_VIDEOS[activeIndex];

  return (
    <section
      className="w-full py-20 bg-white text-slate-900 border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-[#F97316] text-xs font-black tracking-widest uppercase mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            {gallery.label}
          </div>

          {/* Heading — Adjusted size so it fits on ONE line on desktop viewports */}
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-4xl font-black text-slate-900 tracking-tight whitespace-normal lg:whitespace-nowrap">
            {gallery.title}
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            {gallery.subtitle}
          </p>
        </div>

        {/* Gallery Area — Single Large Video Frame with ONE visible border */}
        <div className="max-w-5xl mx-auto w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950 aspect-video group">
            {isPlaying ? (
              /* Active Embedded YouTube Player */
              <div className="relative w-full h-full bg-black">
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                {/* Small, unobtrusive return button to exit player */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  aria-label="Tutup video dan kembali ke pratinjau"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 z-40 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 hover:bg-[#F97316] text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <span>Tutup Video</span>
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              /* Clickable Video Preview Thumbnail */
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Putar video School Life: ${activeVideo.title}`}
                className="relative w-full h-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F97316]/50 cursor-pointer block"
              >
                {/* Smooth cross-fading previews for all 4 videos */}
                {SCHOOL_VIDEOS.map((video, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <div
                      key={video.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        isSelected ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = video.fallback;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  );
                })}

                {/* Cinematic Dark Gradient Overlays */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20 group-hover:from-slate-950/80 transition-colors duration-300 pointer-events-none" />

                {/* Top Eyebrow Tag */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316] text-white text-[10px] font-black tracking-widest uppercase shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {activeVideo.label}
                  </span>
                </div>

                {/* Visually Prominent Centered Orange Play Button */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F97316] group-hover:bg-orange-600 text-white flex items-center justify-center shadow-2xl shadow-[#F97316]/50 group-hover:scale-110 group-hover:shadow-[#F97316]/70 transition-all duration-300 ring-4 ring-white/20 group-hover:ring-white/40"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Bottom Caption & Verified Metadata */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-30 flex flex-col justify-end text-white pointer-events-none">
                  <h3 className="text-base sm:text-xl md:text-2xl font-black text-white line-clamp-2 leading-tight drop-shadow-md">
                    {activeVideo.title}
                  </h3>
                </div>

                {/* Subtle 5-Second Interval Progress Bar */}
                {!reducedMotion && !isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/80 z-30 overflow-hidden">
                    <div
                      key={`main-prog-${activeIndex}-${isPaused ? "paused" : "running"}`}
                      className="h-full bg-gradient-to-r from-orange-500 to-[#F97316]"
                      style={{
                        animation: isPaused
                          ? "none"
                          : "schoolProgressBar 5000ms linear infinite",
                        width: isPaused ? "50%" : undefined,
                      }}
                    />
                  </div>
                )}
              </button>
            )}
          </div>

          {/* 4 Minimal Rotation Indicators below the Video Frame */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            {SCHOOL_VIDEOS.map((video, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                  }}
                  aria-label={`Pilih video ${idx + 1}: ${video.shortTitle}`}
                  aria-pressed={isActive}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 sm:w-10 bg-[#F97316] shadow-sm shadow-[#F97316]/50"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Scoped CSS Keyframe for GPU-accelerated 5-second linear progress */}
      <style jsx>{`
        @keyframes schoolProgressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
