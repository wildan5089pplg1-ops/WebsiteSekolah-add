"use client";

import React from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  sceneTitle?: string;
  assetPath?: string;
  errorMessage?: string | null;
  onRetry?: () => void;
}

export default function LoadingScreen({
  isLoading,
  sceneTitle,
  assetPath,
  errorMessage,
  onRetry,
}: LoadingScreenProps) {
  const isVisible = isLoading || Boolean(errorMessage);

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl text-white transition-opacity duration-500 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-lg w-full">
        {errorMessage ? (
          /* ========================================= */
          /* ERROR STATE (RULE 8)                      */
          /* ========================================= */
          <div className="w-full p-6 rounded-3xl bg-slate-900/90 border border-red-500/30 shadow-[0_12px_40px_rgba(239,68,68,0.25)] flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            {/* Error Icon */}
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            <span className="text-[11px] font-bold tracking-widest text-red-400 uppercase mb-1">
              GAGAL MEMUAT
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Virtual Tour gagal dimuat
            </h2>

            {/* Error Details */}
            <div className="w-full text-left p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono space-y-2 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-2">
                <span className="text-slate-400">Nama Scene:</span>
                <span className="font-semibold text-white">{sceneTitle || "Tidak diketahui"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-2">
                <span className="text-slate-400">Path Asset:</span>
                <span className="text-amber-300 break-all">{assetPath || "-"}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-400 block mb-1">Error Message:</span>
                <p className="text-red-300 font-sans text-xs leading-relaxed bg-red-950/40 p-2 rounded-lg border border-red-900/40">
                  {errorMessage}
                </p>
              </div>
            </div>

            {/* Coba Lagi Button */}
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F96501] hover:bg-[#F96501]/90 active:scale-95 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(249,101,1,0.4)] flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span>Coba Lagi</span>
              </button>
            )}
          </div>
        ) : (
          /* ========================================= */
          /* NORMAL LOADING STATE                      */
          /* ========================================= */
          <>
            {/* Animated Brand Pulse */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#F96501]/30 animate-ping absolute" />
              <div className="w-16 h-16 rounded-full border-2 border-t-[#F96501] border-r-[#F96501] border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-[#F96501] to-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,101,1,0.6)]">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <span className="text-xs font-bold tracking-widest text-[#F96501] uppercase mb-1">
              SMK PRESTASI PRIMA
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
              Memuat Virtual Tour...
            </h2>
            {sceneTitle && (
              <p className="text-xs text-slate-400 font-medium bg-slate-900/80 px-3 py-1 rounded-full border border-white/5">
                Mempersiapkan: <span className="text-slate-200">{sceneTitle}</span>
              </p>
            )}

            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-6">
              <div className="w-full h-full bg-gradient-to-r from-[#F96501] to-amber-400 -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
