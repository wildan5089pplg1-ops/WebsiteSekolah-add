"use client";

import React, { useState } from "react";

export interface ClickCoordinates {
  pitch: number;
  yaw: number;
  sceneId: string;
}

interface DevDebugCoordinatesProps {
  currentSceneId: string;
  currentYaw: number;
  currentPitch: number;
  clickedCoords: ClickCoordinates | null;
}

export default function DevDebugCoordinates({
  currentSceneId,
  currentYaw,
  currentPitch,
  clickedCoords,
}: DevDebugCoordinatesProps) {
  // Only render in development environment
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = () => {
    const yaw = clickedCoords ? clickedCoords.yaw : currentYaw;
    const pitch = clickedCoords ? clickedCoords.pitch : currentPitch;
    const coordString = `yaw: ${yaw.toFixed(3)}, pitch: ${pitch.toFixed(3)}`;

    navigator.clipboard.writeText(coordString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="absolute top-4 right-4 z-50 text-xs select-none">
      <div className="p-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-amber-500/40 text-amber-300 font-mono shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-xs">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-amber-500/20">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="tracking-wide text-white">DEV HOTSPOT DEBUG</span>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="text-slate-400 hover:text-white text-[11px] underline"
          >
            {collapsed ? "Buka" : "Kecilkan"}
          </button>
        </div>

        {!collapsed && (
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Scene ID:</span>
              <span className="font-semibold text-white truncate max-w-[140px]">
                {currentSceneId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Live Yaw:</span>
              <span className="text-amber-200">{currentYaw.toFixed(3)}°</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Live Pitch:</span>
              <span className="text-amber-200">{currentPitch.toFixed(3)}°</span>
            </div>

            {/* Clicked Coords */}
            <div className="mt-2 pt-2 border-t border-amber-500/20">
              <span className="text-[10px] text-slate-400 block mb-1">
                {clickedCoords ? "Terakhir Diklik pada Panorama:" : "Klik pada panorama untuk koordinat hotspot"}
              </span>

              {clickedCoords ? (
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 font-bold text-amber-300 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Yaw:</span>
                    <span>{clickedCoords.yaw.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pitch:</span>
                    <span>{clickedCoords.pitch.toFixed(3)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-[10px] italic text-slate-500">
                  Belum ada titik yang diklik
                </div>
              )}
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className={`w-full mt-2.5 py-1.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                copied
                  ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40"
              }`}
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy Coordinates</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
