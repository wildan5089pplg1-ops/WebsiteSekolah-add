"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { TOUR_SCENES, DEFAULT_SCENE_ID, getSceneById } from "@/data/virtualTourScenes";
import SceneSelector from "./SceneSelector";
import "pannellum/build/pannellum.css";

declare global {
  interface Window {
    pannellum?: any;
    libpannellum?: any;
  }
}

interface TourError {
  title: string;
  path: string;
  message: string;
}

// Robust, idempotent Pannellum script loader
function loadPannellumScript(): Promise<any> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.pannellum) return Promise.resolve(window.pannellum);

  return new Promise((resolve, reject) => {
    if (window.pannellum) return resolve(window.pannellum);

    let script = document.querySelector('script[data-pannellum="true"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.src = "/vendor/pannellum/pannellum.js";
      script.async = true;
      script.dataset.pannellum = "true";
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.pannellum) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(window.pannellum);
      }
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (window.pannellum) {
        resolve(window.pannellum);
      } else {
        reject(new Error("Timeout memuat file /vendor/pannellum/pannellum.js (5 detik)."));
      }
    }, 5000);

    script.addEventListener("error", () => {
      clearInterval(interval);
      clearTimeout(timeout);
      reject(new Error("Gagal mengunduh script /vendor/pannellum/pannellum.js dari server."));
    });
  });
}

export default function VirtualTourPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<any>(null);
  const pendingSceneIdRef = useRef<string | null>(null);

  const [currentSceneId, setCurrentSceneId] = useState<string>(DEFAULT_SCENE_ID);
  const [pendingSceneId, setPendingSceneId] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [transitionLoading, setTransitionLoading] = useState<boolean>(false);
  const [switchingTitle, setSwitchingTitle] = useState<string>("");
  const [error, setError] = useState<TourError | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeScene = getSceneById(currentSceneId) || TOUR_SCENES[0];
  const activeSceneIndex = TOUR_SCENES.findIndex((s) => s.id === currentSceneId);

  // Initialize Pannellum once with all 20 scenes registered
  const initViewer = useCallback(async () => {
    if (!containerRef.current) return;

    setError(null);
    setInitialLoading(true);

    // Clean up previous instance if any
    if (viewerInstanceRef.current) {
      try {
        viewerInstanceRef.current.destroy();
      } catch {
        // ignore
      }
      viewerInstanceRef.current = null;
    }

    try {
      const pannellum = await loadPannellumScript();
      if (!containerRef.current) return;

      // Build data-driven scene dictionary for all available panoramas
      const scenesDict: Record<string, any> = {};
      TOUR_SCENES.forEach((scene) => {
        scenesDict[scene.id] = {
          title: scene.title,
          type: "equirectangular",
          panorama: scene.panorama,
          haov: scene.haov,
          vaov: scene.vaov,
          vOffset: scene.vOffset,
          minPitch: scene.minPitch,
          maxPitch: scene.maxPitch,
          pitch: scene.defaultPitch,
          yaw: scene.defaultYaw,
          hfov: scene.defaultHfov,
          minHfov: 40,
          maxHfov: 120,
          autoLoad: true,
          sceneFadeDuration: 800,
          showControls: false,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          hotSpotDebug: false,
          compass: false,
          crossOrigin: "anonymous",
          hotSpots: [],
        };
      });

      const config = {
        default: {
          firstScene: DEFAULT_SCENE_ID,
          sceneFadeDuration: 800,
          autoLoad: true,
          showControls: false,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          hotSpotDebug: false,
          compass: false,
          crossOrigin: "anonymous",
          minHfov: 40,
          maxHfov: 120,
        },
        scenes: scenesDict,
      };

      console.log("[Pannellum] Initializing persistent multiscene viewer with", TOUR_SCENES.length, "scenes");
      const viewer = pannellum.viewer(containerRef.current, config);
      viewerInstanceRef.current = viewer;

      // Fires when panorama WebGL texture finishes loading
      viewer.on("load", () => {
        const loadedId = viewerInstanceRef.current?.getScene() || pendingSceneIdRef.current || DEFAULT_SCENE_ID;
        console.log("[Pannellum] Scene successfully loaded:", loadedId);
        
        // Update activeScene only after successful load
        setCurrentSceneId(loadedId);
        pendingSceneIdRef.current = null;
        setPendingSceneId(null);
        setInitialLoading(false);
        setTransitionLoading(false);
        setError(null);
      });

      // Fires when a scene transition starts
      viewer.on("scenechange", (sceneId: string) => {
        console.log("[Pannellum] Scene change initiated:", sceneId);
        const target = getSceneById(sceneId);
        if (target) {
          setSwitchingTitle(target.title);
        }
        setTransitionLoading(true);
        setError(null);
      });

      // Fires when fade animation completes
      viewer.on("scenechangefadedone", () => {
        console.log("[Pannellum] Scene fade done");
        setTransitionLoading(false);
      });

      // Fires on error
      viewer.on("error", (err: any) => {
        console.error("[Pannellum] Scene runtime error:", err);
        setInitialLoading(false);
        setTransitionLoading(false);
        
        const failedId = pendingSceneIdRef.current || viewerInstanceRef.current?.getScene() || DEFAULT_SCENE_ID;
        const failedScene = getSceneById(failedId);
        const msg = typeof err === "string" ? err : err?.message || "Terjadi kesalahan saat memproses tekstur WebGL.";
        
        console.error(`[Pannellum Error] Failed to load panorama at URL: ${failedScene?.panorama}`);

        setError({
          title: failedScene?.title || "Lokasi",
          path: failedScene?.panorama || "",
          message: msg,
        });
        pendingSceneIdRef.current = null;
        setPendingSceneId(null);
      });

      viewer.on("fullscreenchange", (active: boolean) => {
        setIsFullscreen(active);
      });
    } catch (err: any) {
      console.error("[Pannellum] Initialization failure:", err);
      setInitialLoading(false);
      setTransitionLoading(false);
      const defaultScene = getSceneById(DEFAULT_SCENE_ID) || TOUR_SCENES[0];
      console.error(`[Pannellum Init Error] Path: ${defaultScene.panorama}`);
      setError({
        title: defaultScene.title,
        path: defaultScene.panorama,
        message: err?.message || "Gagal menginisialisasi panorama viewer.",
      });
    }
  }, []); // Strictly empty dependencies so viewer is NEVER recreated on scene change!

  // Run strictly once on mount, clean up on unmount
  useEffect(() => {
    initViewer();

    return () => {
      if (viewerInstanceRef.current) {
        try {
          viewerInstanceRef.current.destroy();
        } catch {
          // ignore
        }
        viewerInstanceRef.current = null;
      }
    };
  }, [initViewer]);

  // Handle scene switching via SceneSelector
  const handleSelectScene = (sceneId: string) => {
    if (sceneId === currentSceneId && !error) return;
    if (transitionLoading) return; // Ignore rapid clicks while transitioning

    const targetScene = getSceneById(sceneId);
    if (!targetScene) {
      console.warn("[Virtual Tour] Scene not found:", sceneId);
      return;
    }

    console.log(`[Virtual Tour] Switching to scene "${targetScene.title}" (${sceneId})`);
    console.log(`[Virtual Tour] Target panorama URL: ${targetScene.panorama}`);

    pendingSceneIdRef.current = sceneId;
    setPendingSceneId(sceneId);
    setSwitchingTitle(targetScene.title);
    setTransitionLoading(true);
    setError(null);

    if (viewerInstanceRef.current) {
      try {
        viewerInstanceRef.current.loadScene(sceneId);
      } catch (err: any) {
        console.error("[Virtual Tour] loadScene error:", err);
        setTransitionLoading(false);
        setError({
          title: targetScene.title,
          path: targetScene.panorama,
          message: err?.message || "Gagal beralih ke lokasi ini.",
        });
        pendingSceneIdRef.current = null;
        setPendingSceneId(null);
      }
    } else {
      console.error("[Virtual Tour] Viewer instance not ready yet");
      setTransitionLoading(false);
      setError({
        title: targetScene.title,
        path: targetScene.panorama,
        message: "Viewer belum siap. Silakan muat ulang halaman.",
      });
    }
  };

  // Floating controls
  const handleZoomIn = () => {
    if (!viewerInstanceRef.current) return;
    const currentHfov = viewerInstanceRef.current.getHfov();
    viewerInstanceRef.current.setHfov(Math.max(40, currentHfov - 12));
  };

  const handleZoomOut = () => {
    if (!viewerInstanceRef.current) return;
    const currentHfov = viewerInstanceRef.current.getHfov();
    viewerInstanceRef.current.setHfov(Math.min(120, currentHfov + 12));
  };

  const handleResetView = () => {
    if (!viewerInstanceRef.current || !activeScene) return;
    viewerInstanceRef.current.lookAt(
      activeScene.defaultPitch,
      activeScene.defaultYaw,
      activeScene.defaultHfov,
      800
    );
  };

  const handleToggleFullscreen = () => {
    if (!viewerInstanceRef.current) return;
    viewerInstanceRef.current.toggleFullscreen();
  };

  const handleRetry = () => {
    const retrySceneId = pendingSceneIdRef.current || currentSceneId;
    const retryScene = getSceneById(retrySceneId);
    if (viewerInstanceRef.current && retrySceneId) {
      console.log(`[Virtual Tour] Retrying scene: ${retrySceneId} (${retryScene?.panorama})`);
      setError(null);
      setTransitionLoading(true);
      pendingSceneIdRef.current = retrySceneId;
      setPendingSceneId(retrySceneId);
      try {
        viewerInstanceRef.current.loadScene(retrySceneId);
      } catch {
        initViewer();
      }
    } else {
      initViewer();
    }
  };

  return (
    <div
      id="virtual-tour-container"
      className="relative w-full h-[100dvh] overflow-hidden bg-slate-950 font-sans select-none"
    >
      {/* 
        PERMANENT VIEWER CONTAINER
        Viewer stays permanently mounted in the DOM.
      */}
      <div
        ref={containerRef}
        id="pannellum-tour-viewer"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        tabIndex={0}
      />

      {/* TOP-LEFT SCENE INFO BADGE */}
      <div className="absolute top-4 left-4 z-40 flex flex-col gap-2 max-w-[280px] sm:max-w-md pointer-events-auto">
        <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg text-white">
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

          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F96501]">
                Virtual Tour 360°
              </span>
              <span className="text-slate-500 text-[10px]">•</span>
              <span className="text-[10px] font-medium text-slate-400">
                {activeSceneIndex + 1}/{TOUR_SCENES.length}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white truncate leading-tight">
              {activeScene.title}
            </h1>
          </div>
        </div>
      </div>

      {/* RIGHT FLOATING CONTROLS */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-1.5 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-xl text-white">
        <button
          type="button"
          onClick={handleZoomIn}
          aria-label="Zoom In"
          title="Zoom In (+)"
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white/5 hover:bg-white/15 active:scale-95 text-slate-200 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          aria-label="Zoom Out"
          title="Zoom Out (−)"
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white/5 hover:bg-white/15 active:scale-95 text-slate-200 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleResetView}
          aria-label="Reset View"
          title="Reset Tampilan (⟳)"
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white/5 hover:bg-white/15 active:scale-95 text-slate-200 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleToggleFullscreen}
          aria-label="Fullscreen"
          title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (⛶)"}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
            isFullscreen
              ? "bg-[#F96501]/20 text-[#F96501] border border-[#F96501]/50"
              : "bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </div>

      {/* FLOATING SCENE SELECTOR (Desktop: bottom-center, Mobile: bottom-sheet) */}
      <SceneSelector
        scenes={TOUR_SCENES}
        currentSceneId={currentSceneId}
        pendingSceneId={pendingSceneId}
        onSelectScene={handleSelectScene}
      />

      {/* SUBTLE SCENE TRANSITION BADGE */}
      {transitionLoading && !initialLoading && !error && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/85 backdrop-blur-xl border border-white/15 text-white text-xs font-semibold shadow-2xl">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-t-[#F96501] border-r-transparent border-b-[#F96501] border-l-transparent animate-spin" />
            <span>Memuat {switchingTitle || "Lokasi"}...</span>
          </div>
        </div>
      )}

      {/* INITIAL FULLSCREEN LOADING OVERLAY */}
      {initialLoading && !error && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md text-white transition-opacity duration-500 pointer-events-auto"
          aria-live="polite"
        >
          <div className="flex flex-col items-center text-center px-6 max-w-md">
            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#F96501]/30 animate-ping absolute" />
              <div className="w-14 h-14 rounded-full border-2 border-t-[#F96501] border-r-[#F96501] border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-[#F96501] to-amber-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>

            <span className="text-[10px] font-bold tracking-widest text-[#F96501] uppercase mb-1">
              SMK PRESTASI PRIMA
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2">
              Memuat Virtual Tour...
            </h2>
            <p className="text-xs text-slate-400 font-medium bg-slate-900/80 px-3 py-1 rounded-full border border-white/5">
              Mempersiapkan: <span className="text-slate-200">{activeScene.title}</span>
            </p>
          </div>
        </div>
      )}

      {/* ERROR OVERLAY WITH COBA LAGI */}
      {error && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl text-white p-6 pointer-events-auto">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900/90 border border-red-500/30 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-3 shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase mb-1">
              GAGAL MEMUAT
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
              Virtual Tour gagal dimuat
            </h2>

            <div className="w-full text-left p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono space-y-1.5 mb-4">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Scene:</span>
                <span className="font-semibold text-white">{error.title}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Path:</span>
                <span className="text-amber-300 break-all text-[11px]">{error.path}</span>
              </div>
              <div className="pt-0.5">
                <span className="text-slate-400 block mb-1">Pesan Error:</span>
                <p className="text-red-300 font-sans text-xs leading-relaxed bg-red-950/40 p-2 rounded-lg border border-red-900/40">
                  {error.message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRetry}
              className="px-5 py-2.5 rounded-xl bg-[#F96501] hover:bg-[#F96501]/90 active:scale-95 text-white font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Coba Lagi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
