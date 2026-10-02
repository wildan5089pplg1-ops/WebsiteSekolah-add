"use client";

import React, { useState, useEffect } from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";

export interface CampusVideoItem {
  id: string;
  embedUrl: string;
  title: string;
  shortTitle: string;
  label: string;
  thumbnail: string;
  fallback: string;
}

export const CAMPUS_VIDEOS: CampusVideoItem[] = [
  {
    id: "n3Y3SPu28k8",
    embedUrl: "https://www.youtube-nocookie.com/embed/n3Y3SPu28k8?autoplay=1&rel=0",
    title: "Melakukan Perubahan dan Menjadi Pemimpin Masa Depan LDKS Sekolah Prestasi Prima 2026",
    shortTitle: "LDKS Kepemimpinan",
    label: "LEADERSHIP & KARAKTER",
    thumbnail: "https://img.youtube.com/vi/n3Y3SPu28k8/hqdefault.jpg",
    fallback: "/images/gedung.png",
  },
  {
    id: "4kEM3ga9YPs",
    embedUrl: "https://www.youtube-nocookie.com/embed/4kEM3ga9YPs?autoplay=1&rel=0",
    title: "PRAMBORS TAHUN 2026 SEKOLAH PRESTASI PRIMA",
    shortTitle: "Prambors Prestasi Prima",
    label: "CAMPUS EVENT",
    thumbnail: "https://img.youtube.com/vi/4kEM3ga9YPs/hqdefault.jpg",
    fallback: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "E2SZH47urQY",
    embedUrl: "https://www.youtube-nocookie.com/embed/E2SZH47urQY?autoplay=1&rel=0",
    title: "MPLS SEKOLAH PRESTASI PRIMA AJARAN BARU TAHUN 2026",
    shortTitle: "MPLS Siswa Baru",
    label: "STUDENT ORIENTATION",
    thumbnail: "https://img.youtube.com/vi/E2SZH47urQY/hqdefault.jpg",
    fallback: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "PSZwEf-e334",
    embedUrl: "https://www.youtube-nocookie.com/embed/PSZwEf-e334?autoplay=1&rel=0",
    title: "SELAMAT HARI RAYA IDUL FITRI 1447 H - SEKOLAH PRESTASI PRIMA",
    shortTitle: "Idul Fitri Presma",
    label: "KULTUR & HARMONI",
    thumbnail: "https://img.youtube.com/vi/PSZwEf-e334/hqdefault.jpg",
    fallback: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function CampusGallery() {
  const { gallery } = PROFILE_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Preload YouTube thumbnail images to prevent flash on rotation
  useEffect(() => {
    CAMPUS_VIDEOS.forEach((vid) => {
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

  // Automatic 5000ms video rotation (PAUSED while any video is playing or when hovered)
  useEffect(() => {
    if (reducedMotion || isPaused || playingVideoId !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAMPUS_VIDEOS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reducedMotion, isPaused, playingVideoId]);

  const activeVideo = CAMPUS_VIDEOS[activeIndex];

  // Secondary videos: the other 3 videos with their original index preserved
  const secondaryVideos = CAMPUS_VIDEOS.map((video, originalIndex) => ({
    video,
    originalIndex,
  })).filter((item) => item.originalIndex !== activeIndex);

  const isAnyVideoPlaying = playingVideoId !== null;

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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501] animate-pulse" />
            {gallery.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {gallery.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
            {gallery.subtitle}
          </p>
        </div>

        {/* Minimal Navigation Indicators & Active Playback Status */}
        <div className="flex flex-col items-center gap-3 mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {CAMPUS_VIDEOS.map((video, idx) => {
              const isActive = idx === activeIndex;
              const isThisPlaying = playingVideoId === video.id;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    if (isAnyVideoPlaying) {
                      setPlayingVideoId(video.id);
                    }
                  }}
                  aria-label={`Pilih video ${idx + 1}: ${video.shortTitle}`}
                  aria-pressed={isActive}
                  className={`relative overflow-hidden px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "border-[#F96501] bg-[#F96501]/10 text-slate-900 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? "bg-[#F96501] animate-pulse" : "bg-slate-300"
                    }`}
                  />
                  <span>0{idx + 1}</span>
                  <span className="hidden sm:inline font-semibold text-slate-700">
                    {video.shortTitle}
                  </span>
                  {isThisPlaying && (
                    <span className="text-[10px] font-bold text-orange-600 uppercase bg-orange-100 px-1.5 py-0.5 rounded">
                      Memutar
                    </span>
                  )}

                  {/* 5-second animated progress line on active indicator (only when NOT playing) */}
                  {isActive && !reducedMotion && !isAnyVideoPlaying && (
                    <span
                      key={`nav-prog-${activeIndex}-${isPaused ? "paused" : "running"}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-[#F96501]"
                      style={{
                        animation: isPaused
                          ? "none"
                          : "campusProgressBar 5000ms linear infinite",
                        width: isPaused ? "50%" : undefined,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Player Notice with Return-to-Gallery Action */}
          {isAnyVideoPlaying && (
            <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-full shadow-md text-xs font-semibold animate-fade-in">
              <span className="flex items-center gap-1.5 text-orange-400">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Video sedang diputar langsung
              </span>
              <span className="text-slate-500">•</span>
              <button
                type="button"
                onClick={() => setPlayingVideoId(null)}
                className="text-white hover:text-[#F96501] font-bold underline transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Tutup Pemutar & Lanjutkan Galeri</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Editorial Masonry Grid (Dynamic Asymmetric Composition) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Large Visual (Spans 8 cols, 16/10 aspect) — Primary Active Showcase */}
          <div
            className={`md:col-span-8 group relative rounded-3xl overflow-hidden shadow-xl border-2 ${
              playingVideoId === activeVideo.id
                ? "border-[#F96501] ring-4 ring-[#F96501]/30"
                : "border-[#F96501]/60 hover:border-[#F96501]"
            } aspect-[16/10] bg-slate-950 transition-all duration-300`}
          >
            {playingVideoId === activeVideo.id ? (
              /* Embedded YouTube Player inside Primary Tile */
              <div className="relative w-full h-full bg-black">
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Close Button to return to thumbnail gallery */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlayingVideoId(null);
                  }}
                  aria-label="Tutup pemutar video dan kembali ke galeri"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 z-40 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/90 hover:bg-[#F96501] text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-200 cursor-pointer"
                >
                  <span>Tutup Pemutar</span>
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              /* Clickable Video Preview Thumbnail */
              <button
                type="button"
                onClick={() => {
                  setPlayingVideoId(activeVideo.id);
                }}
                aria-label={`Putar video Campus Life: ${activeVideo.title}`}
                className="relative w-full h-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F96501]/50 cursor-pointer block"
              >
                {/* Smooth Cross-fading Images for all 4 videos */}
                {CAMPUS_VIDEOS.map((video, idx) => {
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

                {/* Cinematic Gradient Overlays */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20 group-hover:from-slate-950/80 transition-colors duration-300 pointer-events-none" />

                {/* Top Bar inside Active Preview */}
                <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 z-30 flex items-center justify-between text-white pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F96501] text-white text-[10px] font-black tracking-widest uppercase shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    VIDEO UTAMA
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-white/90 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 group-hover:border-[#F96501]/50 transition-colors">
                    <span>Klik untuk Putar</span>
                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>

                {/* Center Orange Play Button */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F96501] group-hover:bg-orange-600 text-white flex items-center justify-center shadow-2xl shadow-[#F96501]/50 group-hover:scale-110 group-hover:shadow-[#F96501]/70 transition-all duration-300 ring-4 ring-white/20 group-hover:ring-white/40"
                >
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Bottom Caption & Video Metadata */}
                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 z-30 flex flex-col justify-end text-white pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-orange-200 text-[10px] font-black tracking-widest uppercase mb-1.5 self-start">
                    {activeVideo.label}
                  </span>
                  <h3 className="text-base sm:text-xl md:text-2xl font-black text-white line-clamp-2 leading-tight">
                    {activeVideo.title}
                  </h3>
                </div>

                {/* Progress Bar of 5s Rotation (visible when not playing) */}
                {!reducedMotion && !isAnyVideoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/80 z-30 overflow-hidden">
                    <div
                      key={`main-prog-${activeIndex}-${isPaused ? "paused" : "running"}`}
                      className="h-full bg-gradient-to-r from-orange-500 to-[#F96501]"
                      style={{
                        animation: isPaused
                          ? "none"
                          : "campusProgressBar 5000ms linear infinite",
                        width: isPaused ? "50%" : undefined,
                      }}
                    />
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Side Preview Tile (Spans 4 cols) — Secondary Video 1 */}
          {secondaryVideos[0] && (
            <div
              key={secondaryVideos[0].video.id}
              className={`md:col-span-4 group relative rounded-3xl overflow-hidden shadow-sm border ${
                playingVideoId === secondaryVideos[0].video.id
                  ? "border-[#F96501] ring-4 ring-[#F96501]/30"
                  : "border-slate-200/90 hover:border-[#F96501]/50"
              } aspect-[4/3] md:aspect-auto min-h-[220px] bg-slate-900 transition-all duration-300`}
            >
              {playingVideoId === secondaryVideos[0].video.id ? (
                /* Embedded YouTube Player inside Secondary Tile 1 */
                <div className="relative w-full h-full bg-black min-h-[220px]">
                  <iframe
                    src={secondaryVideos[0].video.embedUrl}
                    title={secondaryVideos[0].video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayingVideoId(null);
                    }}
                    aria-label="Tutup pemutar video dan kembali ke galeri"
                    className="absolute top-3 right-3 z-40 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/90 hover:bg-[#F96501] text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer"
                  >
                    <span>Tutup</span>
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPlayingVideoId(secondaryVideos[0].video.id);
                    setActiveIndex(secondaryVideos[0].originalIndex);
                  }}
                  aria-label={`Putar video ${secondaryVideos[0].video.title}`}
                  className="relative w-full h-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F96501]/50 cursor-pointer block"
                >
                  <img
                    src={secondaryVideos[0].video.thumbnail}
                    alt={secondaryVideos[0].video.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = secondaryVideos[0].video.fallback;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent group-hover:from-slate-950/75 transition-colors duration-300" />

                  {/* Play Badge */}
                  <div
                    aria-hidden="true"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/20 text-[#F96501] group-hover:bg-[#F96501] group-hover:text-white flex items-center justify-center shadow transition-all duration-300 group-hover:scale-110"
                  >
                    <svg className="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/20 text-[#F96501] text-[10px] font-black tracking-widest uppercase mb-1 inline-block">
                      {secondaryVideos[0].video.label}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {secondaryVideos[0].video.title}
                    </h3>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Lower Grid Left (Spans 4 cols) — Secondary Video 2 */}
          {secondaryVideos[1] && (
            <div
              key={secondaryVideos[1].video.id}
              className={`md:col-span-4 group relative rounded-3xl overflow-hidden shadow-sm border ${
                playingVideoId === secondaryVideos[1].video.id
                  ? "border-[#F96501] ring-4 ring-[#F96501]/30"
                  : "border-slate-200/90 hover:border-[#F96501]/50"
              } aspect-[4/3] bg-slate-900 transition-all duration-300`}
            >
              {playingVideoId === secondaryVideos[1].video.id ? (
                /* Embedded YouTube Player inside Secondary Tile 2 */
                <div className="relative w-full h-full bg-black">
                  <iframe
                    src={secondaryVideos[1].video.embedUrl}
                    title={secondaryVideos[1].video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayingVideoId(null);
                    }}
                    aria-label="Tutup pemutar video dan kembali ke galeri"
                    className="absolute top-3 right-3 z-40 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/90 hover:bg-[#F96501] text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer"
                  >
                    <span>Tutup</span>
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPlayingVideoId(secondaryVideos[1].video.id);
                    setActiveIndex(secondaryVideos[1].originalIndex);
                  }}
                  aria-label={`Putar video ${secondaryVideos[1].video.title}`}
                  className="relative w-full h-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F96501]/50 cursor-pointer block"
                >
                  <img
                    src={secondaryVideos[1].video.thumbnail}
                    alt={secondaryVideos[1].video.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = secondaryVideos[1].video.fallback;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent group-hover:from-slate-950/75 transition-colors duration-300" />

                  {/* Play Badge */}
                  <div
                    aria-hidden="true"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/20 text-[#F96501] group-hover:bg-[#F96501] group-hover:text-white flex items-center justify-center shadow transition-all duration-300 group-hover:scale-110"
                  >
                    <svg className="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/20 text-[#F96501] text-[10px] font-black tracking-widest uppercase mb-1 inline-block">
                      {secondaryVideos[1].video.label}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {secondaryVideos[1].video.title}
                    </h3>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Lower Grid Right Wide Banner (Spans 8 cols) — Secondary Video 3 */}
          {secondaryVideos[2] && (
            <div
              key={secondaryVideos[2].video.id}
              className={`md:col-span-8 group relative rounded-3xl overflow-hidden shadow-md border ${
                playingVideoId === secondaryVideos[2].video.id
                  ? "border-[#F96501] ring-4 ring-[#F96501]/30"
                  : "border-slate-200/90 hover:border-[#F96501]/50"
              } aspect-[16/9] md:aspect-auto min-h-[220px] bg-slate-900 transition-all duration-300`}
            >
              {playingVideoId === secondaryVideos[2].video.id ? (
                /* Embedded YouTube Player inside Secondary Tile 3 */
                <div className="relative w-full h-full bg-black min-h-[220px]">
                  <iframe
                    src={secondaryVideos[2].video.embedUrl}
                    title={secondaryVideos[2].video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayingVideoId(null);
                    }}
                    aria-label="Tutup pemutar video dan kembali ke galeri"
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 z-40 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/90 hover:bg-[#F96501] text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer"
                  >
                    <span>Tutup Pemutar</span>
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPlayingVideoId(secondaryVideos[2].video.id);
                    setActiveIndex(secondaryVideos[2].originalIndex);
                  }}
                  aria-label={`Putar video ${secondaryVideos[2].video.title}`}
                  className="relative w-full h-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F96501]/50 cursor-pointer block"
                >
                  <img
                    src={secondaryVideos[2].video.thumbnail}
                    alt={secondaryVideos[2].video.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = secondaryVideos[2].video.fallback;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent group-hover:from-slate-950/75 transition-colors duration-300" />

                  {/* Play Badge */}
                  <div
                    aria-hidden="true"
                    className="absolute top-4 sm:top-5 right-4 sm:right-5 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/20 text-[#F96501] group-hover:bg-[#F96501] group-hover:text-white flex items-center justify-center shadow transition-all duration-300 group-hover:scale-110"
                  >
                    <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white">
                    <div className="max-w-xl">
                      <span className="px-2.5 py-1 rounded-full bg-[#F96501] text-white text-[10px] font-black tracking-widest uppercase mb-1.5 inline-block">
                        {secondaryVideos[2].video.label}
                      </span>
                      <h3 className="text-base sm:text-xl font-black text-white line-clamp-1">
                        {secondaryVideos[2].video.title}
                      </h3>
                    </div>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scoped CSS Keyframe for GPU-accelerated 5-second linear progress */}
      <style jsx>{`
        @keyframes campusProgressBar {
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
