"use client";

import React from "react";

interface TourControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onToggleFullscreen: () => void;
  onToggleAutoRotate: () => void;
  isFullscreen: boolean;
  isAutoRotating: boolean;
}

export default function TourControls({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleFullscreen,
  onToggleAutoRotate,
  isFullscreen,
  isAutoRotating,
}: TourControlsProps) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-1.5 rounded-2xl bg-slate-900/70 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.36)] text-white">
      {/* Zoom In */}
      <button
        type="button"
        onClick={onZoomIn}
        aria-label="Perbesar (Zoom In)"
        title="Zoom In (+)"
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-white/5 hover:bg-white/15 active:scale-95 text-slate-200 hover:text-white"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Zoom Out */}
      <button
        type="button"
        onClick={onZoomOut}
        aria-label="Perkecil (Zoom Out)"
        title="Zoom Out (−)"
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-white/5 hover:bg-white/15 active:scale-95 text-slate-200 hover:text-white"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>

      {/* Reset View */}
      <button
        type="button"
        onClick={onResetView}
        aria-label="Reset Tampilan"
        title="Reset Tampilan (⟳)"
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-white/5 hover:bg-white/15 active:scale-95 text-slate-200 hover:text-white"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      {/* Divider */}
      <div className="w-6 h-px bg-white/10 self-center my-0.5" />

      {/* Auto Rotate */}
      <button
        type="button"
        onClick={onToggleAutoRotate}
        aria-label="Rotasi Otomatis"
        title={isAutoRotating ? "Hentikan Rotasi Otomatis" : "Mulai Rotasi Otomatis (↻)"}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
          isAutoRotating
            ? "bg-[#F96501] text-white shadow-[0_0_15px_rgba(249,101,1,0.5)] ring-2 ring-[#F96501]/40"
            : "bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white"
        }`}
      >
        <svg
          className={`w-5 h-5 ${isAutoRotating ? "animate-spin" : ""}`}
          style={{ animationDuration: "6s" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>

      {/* Fullscreen */}
      <button
        type="button"
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (Fullscreen)"}
        title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (⛶)"}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
          isFullscreen
            ? "bg-[#F96501]/20 text-[#F96501] border border-[#F96501]/50"
            : "bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white"
        }`}
      >
        {isFullscreen ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9L4 4m0 0h4m-4 0v4m11 0l5-5m0 0h-4m4 0v4M9 15l-5 5m0 0h4m-4 0v-4m11 0l5 5m0 0h-4m4 0v-4"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
