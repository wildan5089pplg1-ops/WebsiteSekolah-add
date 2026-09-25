"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TourScene } from "@/data/virtualTourScenes";

interface SceneInfoProps {
  currentScene?: TourScene;
  sceneIndex: number;
  totalScenes: number;
}

export default function SceneInfo({
  currentScene,
  sceneIndex,
  totalScenes,
}: SceneInfoProps) {
  const [showHint, setShowHint] = useState(true);

  return (
    <div className="absolute top-4 left-4 z-40 flex flex-col gap-2 max-w-[280px] sm:max-w-md pointer-events-auto">
      {/* Top Glass Badge */}
      <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-slate-900/75 dark:bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.36)] text-white">
        {/* Back Link */}
        <Link
          href="/"
          className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all active:scale-95 shrink-0"
          title="Kembali ke Beranda"
          aria-label="Kembali ke Beranda"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Scene Info */}
        <div className="min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F96501]">
              Virtual Tour 360°
            </span>
            <span className="text-slate-500 text-[10px]">•</span>
            <span className="text-[10px] font-medium text-slate-400">
              {sceneIndex + 1}/{totalScenes}
            </span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-white truncate leading-tight">
            {currentScene?.title || "Virtual Tour SMK"}
          </h1>
        </div>
      </div>

      {/* Interactive Helper Pill (Dismissable) */}
      {showHint && (
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-1.5">
            <span className="text-[#F96501]">✦</span>
            <span>Drag untuk melihat sekeliling • Scroll/Pinch untuk zoom</span>
          </div>
          <button
            type="button"
            onClick={() => setShowHint(false)}
            aria-label="Tutup petunjuk"
            className="text-slate-400 hover:text-white ml-1 text-xs"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
