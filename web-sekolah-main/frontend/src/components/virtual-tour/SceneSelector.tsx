"use client";

import React, { useState, useMemo, useRef } from "react";
import { TourScene } from "@/data/virtualTourScenes";

interface SceneSelectorProps {
  scenes: TourScene[];
  currentSceneId: string;
  pendingSceneId?: string | null;
  onSelectScene: (sceneId: string) => void;
}

export default function SceneSelector({
  scenes,
  currentSceneId,
  pendingSceneId,
  onSelectScene,
}: SceneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ["Semua", "Fasilitas Umum", "Kelas", "Lab & Praktik"];

  const filteredScenes = useMemo(() => {
    return scenes.filter((scene) => {
      const matchesCategory =
        selectedCategory === "Semua" || scene.category === selectedCategory;
      const matchesSearch = scene.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [scenes, selectedCategory, searchQuery]);

  const currentScene = scenes.find((s) => s.id === currentSceneId);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[94%] max-w-4xl z-40 transition-all duration-300">
      {/* TOGGLE / STATUS BAR */}
      <div className="flex items-center justify-between gap-3 p-2 px-3 sm:px-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-white">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F96501] shadow-[0_0_8px_#F96501] shrink-0" />
          <div className="min-w-0">
            <span className="block text-[10px] font-bold tracking-wider uppercase text-slate-400">
              Lokasi Aktif
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {currentScene?.title || "Virtual Tour"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Scene Counter Badge */}
          <span className="hidden sm:inline-block text-xs px-2.5 py-1 rounded-full bg-white/10 text-slate-300 font-medium">
            {scenes.findIndex((s) => s.id === currentSceneId) + 1} / {scenes.length} Lokasi
          </span>

          {/* Toggle Panel Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F96501]/90 hover:bg-[#F96501] active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
          >
            <span>{isOpen ? "Tutup Daftar" : "Pilih Lokasi"}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* EXPANDABLE SCENE DRAWER */}
      {isOpen && (
        <div className="mt-2 p-3 sm:p-4 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* FILTERS & SEARCH */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#F96501] text-white shadow-[0_0_12px_rgba(249,101,1,0.4)]"
                      : "bg-white/5 hover:bg-white/10 text-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lokasi..."
                className="w-full sm:w-44 text-xs bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 pl-8 text-white placeholder-slate-400 focus:outline-none focus:border-[#F96501] transition-colors"
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* SCENE CARD CAROUSEL */}
          <div className="relative group">
            {/* Scroll Navigation Chevrons */}
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Geser ke kiri"
              className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900/90 text-white items-center justify-center border border-white/20 shadow-lg hover:bg-slate-800 transition"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Geser ke kanan"
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900/90 text-white items-center justify-center border border-white/20 shadow-lg hover:bg-slate-800 transition"
            >
              ›
            </button>

            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2.5 overflow-x-auto pb-2 scroll-smooth scrollbar-thin scrollbar-thumb-white/20"
              style={{ maxHeight: "170px" }}
            >
              {filteredScenes.length === 0 ? (
                <div className="w-full text-center py-6 text-xs text-slate-400">
                  Tidak ada lokasi yang cocok dengan pencarian.
                </div>
              ) : (
                filteredScenes.map((scene) => {
                  const isActive = scene.id === currentSceneId;
                  const isPending = scene.id === pendingSceneId;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      disabled={isPending}
                      onClick={() => {
                        onSelectScene(scene.id);
                        if (window.innerWidth < 768) {
                          setIsOpen(false);
                        }
                      }}
                      className={`group/card shrink-0 w-36 sm:w-44 text-left p-2 rounded-xl transition-all duration-200 border ${
                        isActive
                          ? "bg-[#F96501]/15 border-[#F96501] ring-2 ring-[#F96501]/40 shadow-[0_0_20px_rgba(249,101,1,0.3)]"
                          : isPending
                          ? "bg-[#F96501]/10 border-[#F96501]/60 ring-1 ring-[#F96501]/30 opacity-90 cursor-wait"
                          : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Image Thumbnail Preview */}
                      <div className="relative w-full h-16 sm:h-20 rounded-lg overflow-hidden mb-2 bg-slate-800">
                        <img
                          src={scene.thumbnail}
                          alt={scene.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#F96501]/25 flex items-center justify-center">
                            <span className="text-[10px] font-bold bg-[#F96501] text-white px-2 py-0.5 rounded-full shadow-md">
                              Aktif
                            </span>
                          </div>
                        )}
                        {isPending && !isActive && (
                          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center gap-1">
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-t-[#F96501] border-r-transparent border-b-[#F96501] border-l-transparent animate-spin" />
                            <span className="text-[9px] font-bold text-white">Memuat...</span>
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-white font-mono">
                          {scene.aspectRatio}:1
                        </span>
                      </div>

                      {/* Scene Title */}
                      <div className="flex items-center justify-between gap-1">
                        <p
                          className={`text-xs font-semibold truncate ${
                            isActive || isPending ? "text-[#F96501]" : "text-white"
                          }`}
                        >
                          {scene.title}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {scene.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
