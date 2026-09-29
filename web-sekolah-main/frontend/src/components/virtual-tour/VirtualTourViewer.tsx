"use client";

import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { TourScene } from "@/data/virtualTourScenes";
import { ClickCoordinates } from "./DevDebugCoordinates";
import "pannellum/build/pannellum.css";

declare global {
  interface Window {
    pannellum?: any;
    libpannellum?: any;
  }
}

export interface VirtualTourViewerRef {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  toggleFullscreen: () => void;
  toggleAutoRotate: () => boolean;
  loadScene: (sceneId: string) => void;
  reloadCurrentScene: () => void;
}

interface VirtualTourViewerProps {
  scenes: TourScene[];
  currentSceneId: string;
  onSceneChange: (sceneId: string) => void;
  onCoordinatesClick?: (coords: ClickCoordinates) => void;
  onLiveCoordsUpdate?: (coords: { yaw: number; pitch: number }) => void;
  onLoadingChange?: (loading: boolean) => void;
  onErrorChange?: (error: { message: string; sceneTitle: string; assetPath: string } | null) => void;
  onAutoRotateChange?: (autoRotating: boolean) => void;
  onFullscreenChange?: (fullscreen: boolean) => void;
}

// Robust Pannellum script loader that avoids React StrictMode race conditions
function ensurePannellumLoaded(): Promise<any> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.pannellum) return Promise.resolve(window.pannellum);

  return new Promise((resolve, reject) => {
    if (window.pannellum) {
      return resolve(window.pannellum);
    }

    let script = document.querySelector('script[data-pannellum="true"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.src = "/vendor/pannellum/pannellum.js";
      script.async = true;
      script.dataset.pannellum = "true";
      document.body.appendChild(script);
    }

    const checkInterval = setInterval(() => {
      if (window.pannellum) {
        clearInterval(checkInterval);
        clearTimeout(timeoutId);
        resolve(window.pannellum);
      }
    }, 40);

    const timeoutId = setTimeout(() => {
      clearInterval(checkInterval);
      if (window.pannellum) {
        resolve(window.pannellum);
      } else {
        reject(
          new Error(
            "Timeout memuat library Pannellum (5000ms). Pastikan file /vendor/pannellum/pannellum.js dapat diakses."
          )
        );
      }
    }, 6000);

    script.addEventListener("error", () => {
      clearInterval(checkInterval);
      clearTimeout(timeoutId);
      reject(new Error("Gagal mengunduh script /vendor/pannellum/pannellum.js dari server lokal."));
    });
  });
}

// Check WebGL GPU capabilities and texture size limits
function verifyWebGLSupport(width: number, height: number): { ok: boolean; error?: string } {
  if (typeof window === "undefined") return { ok: true };
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      return {
        ok: false,
        error: "Browser atau perangkat ini tidak mengaktifkan WebGL hardware acceleration.",
      };
    }

    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    // Pannellum splits equirectangular images across 2 textures if width > maxTextureSize
    // Therefore maximum supported width is 2 * maxTextureSize
    const maxSupportedWidth = maxTextureSize * 2;
    if (Math.max(width / 2, height) > maxTextureSize) {
      return {
        ok: false,
        error: `Dimensi panorama (${width}×${height}px) melebihi batas tekstur WebGL GPU perangkat ini (MAX_TEXTURE_SIZE: ${maxTextureSize}px, batas maksimal: ${maxSupportedWidth}px).`,
      };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: true };
  }
}

const VirtualTourViewer = forwardRef<VirtualTourViewerRef, VirtualTourViewerProps>(
  function VirtualTourViewer(
    {
      scenes,
      currentSceneId,
      onSceneChange,
      onCoordinatesClick,
      onLiveCoordsUpdate,
      onLoadingChange,
      onErrorChange,
      onAutoRotateChange,
      onFullscreenChange,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerInstanceRef = useRef<any>(null);
    const isAutoRotatingRef = useRef(false);
    const [renderKey, setRenderKey] = useState(0);

    const activeScene = scenes.find((s) => s.id === currentSceneId) || scenes[0];

    const initScene = useCallback(
      async (scene: TourScene) => {
        if (!containerRef.current) return;

        // Reset previous errors and announce loading
        onErrorChange?.(null);
        onLoadingChange?.(true);

        // 1. Verify WebGL Support & texture size limit
        const webglCheck = verifyWebGLSupport(scene.width, scene.height);
        if (!webglCheck.ok) {
          console.error("WebGL Texture Limit Check Failed:", webglCheck.error);
          onErrorChange?.({
            message: webglCheck.error || "WebGL Texture Error",
            sceneTitle: scene.title,
            assetPath: scene.panorama,
          });
          onLoadingChange?.(false);
          return;
        }

        // 2. Ensure Pannellum library is ready
        let pannellumLib: any;
        try {
          pannellumLib = await ensurePannellumLoaded();
        } catch (loadErr: any) {
          console.error("Pannellum script load error:", loadErr);
          onErrorChange?.({
            message: loadErr?.message || "Gagal menginisialisasi library Pannellum viewer.",
            sceneTitle: scene.title,
            assetPath: scene.panorama,
          });
          onLoadingChange?.(false);
          return;
        }

        if (!containerRef.current) return;

        // 3. Destroy old instance if any
        if (viewerInstanceRef.current) {
          try {
            viewerInstanceRef.current.destroy();
          } catch {
            // ignore
          }
          viewerInstanceRef.current = null;
        }

        // 4. Pre-check file accessibility via fetch
        try {
          const res = await fetch(scene.panorama, { method: "HEAD" });
          if (!res.ok) {
            throw new Error(`File panorama mengembalikan status HTTP ${res.status} (${res.statusText})`);
          }
        } catch (fetchErr: any) {
          console.error("Asset check error:", fetchErr);
          onErrorChange?.({
            message: fetchErr?.message || "File panorama tidak ditemukan atau tidak dapat diakses.",
            sceneTitle: scene.title,
            assetPath: scene.panorama,
          });
          onLoadingChange?.(false);
          return;
        }

        // 5. Watchdog timeout: if image takes longer than 20 seconds, report error
        let isDone = false;
        const watchdog = setTimeout(() => {
          if (!isDone) {
            onErrorChange?.({
              message:
                "Proses decoding panorama melebihi batas waktu (20 detik). Gambar mungkin terlalu berat untuk GPU perangkat ini.",
              sceneTitle: scene.title,
              assetPath: scene.panorama,
            });
            onLoadingChange?.(false);
          }
        }, 20000);

        // 6. Build config for the single active scene (STEP 9: avoid preloading all 20 scenes at once)
        const sceneConfig = {
          type: "equirectangular",
          panorama: scene.panorama,
          haov: scene.haov,
          vaov: scene.vaov,
          vOffset: scene.vOffset,
          minPitch: scene.minPitch,
          maxPitch: scene.maxPitch,
          pitch: scene.defaultPitch || 0,
          yaw: scene.defaultYaw || 0,
          hfov: scene.defaultHfov || 100,
          minHfov: 40,
          maxHfov: 120,
          autoLoad: true,
          showControls: false,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          hotSpotDebug: false,
          compass: false,
          crossOrigin: "anonymous",
          hotSpots: [],
        };

        try {
          const viewer = pannellumLib.viewer(containerRef.current, sceneConfig);
          viewerInstanceRef.current = viewer;

          viewer.on("load", () => {
            isDone = true;
            clearTimeout(watchdog);
            onErrorChange?.(null);
            onLoadingChange?.(false);
          });

          viewer.on("error", (err: any) => {
            isDone = true;
            clearTimeout(watchdog);
            console.error("Pannellum runtime error:", err);
            const errStr = typeof err === "string" ? err : err?.message || JSON.stringify(err);
            onErrorChange?.({
              message: errStr || "Terjadi kesalahan saat memuat tekstur panorama WebGL.",
              sceneTitle: scene.title,
              assetPath: scene.panorama,
            });
            onLoadingChange?.(false);
          });

          viewer.on("fullscreenchange", (active: boolean) => {
            onFullscreenChange?.(active);
          });
        } catch (err: any) {
          isDone = true;
          clearTimeout(watchdog);
          console.error("Synchronous error during viewer initialization:", err);
          onErrorChange?.({
            message: err?.message || "Kesalahan inisialisasi viewer WebGL.",
            sceneTitle: scene.title,
            assetPath: scene.panorama,
          });
          onLoadingChange?.(false);
        }
      },
      [onErrorChange, onLoadingChange, onFullscreenChange]
    );

    // Initialize or switch scene
    useEffect(() => {
      let isMounted = true;
      let animFrameId: number;

      if (activeScene) {
        initScene(activeScene);
      }

      // Live coordinate tracking
      const trackCoords = () => {
        if (viewerInstanceRef.current && isMounted) {
          try {
            const yaw = viewerInstanceRef.current.getYaw() || 0;
            const pitch = viewerInstanceRef.current.getPitch() || 0;
            onLiveCoordsUpdate?.({ yaw, pitch });
          } catch {
            // ignore
          }
        }
        animFrameId = requestAnimationFrame(trackCoords);
      };
      trackCoords();

      return () => {
        isMounted = false;
        cancelAnimationFrame(animFrameId);
        if (viewerInstanceRef.current) {
          try {
            viewerInstanceRef.current.destroy();
          } catch {
            // ignore
          }
          viewerInstanceRef.current = null;
        }
      };
    }, [activeScene, initScene, renderKey, onLiveCoordsUpdate]);

    // Handle canvas clicks to capture hotspot coordinates
    const handleViewerClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!viewerInstanceRef.current) return;
        try {
          const coords = viewerInstanceRef.current.mouseEventToCoords(e.nativeEvent);
          if (coords && coords.length >= 2) {
            onCoordinatesClick?.({
              pitch: coords[0],
              yaw: coords[1],
              sceneId: currentSceneId,
            });
          }
        } catch {
          // ignore
        }
      },
      [currentSceneId, onCoordinatesClick]
    );

    // Expose control methods to parent via Ref
    useImperativeHandle(
      ref,
      () => ({
        zoomIn: () => {
          if (!viewerInstanceRef.current) return;
          const currentHfov = viewerInstanceRef.current.getHfov();
          viewerInstanceRef.current.setHfov(Math.max(40, currentHfov - 12));
        },
        zoomOut: () => {
          if (!viewerInstanceRef.current) return;
          const currentHfov = viewerInstanceRef.current.getHfov();
          viewerInstanceRef.current.setHfov(Math.min(120, currentHfov + 12));
        },
        resetView: () => {
          if (!viewerInstanceRef.current || !activeScene) return;
          viewerInstanceRef.current.lookAt(
            activeScene.defaultPitch ?? 0,
            activeScene.defaultYaw ?? 0,
            activeScene.defaultHfov ?? 100,
            800
          );
        },
        toggleFullscreen: () => {
          if (!viewerInstanceRef.current) return;
          viewerInstanceRef.current.toggleFullscreen();
        },
        toggleAutoRotate: () => {
          if (!viewerInstanceRef.current) return false;
          if (isAutoRotatingRef.current) {
            viewerInstanceRef.current.stopAutoRotate();
            isAutoRotatingRef.current = false;
            onAutoRotateChange?.(false);
            return false;
          } else {
            viewerInstanceRef.current.startAutoRotate(-1.8);
            isAutoRotatingRef.current = true;
            onAutoRotateChange?.(true);
            return true;
          }
        },
        loadScene: (sceneId: string) => {
          onSceneChange(sceneId);
        },
        reloadCurrentScene: () => {
          setRenderKey((k) => k + 1);
        },
      }),
      [activeScene, onAutoRotateChange, onSceneChange]
    );

    return (
      <div
        className="w-full h-full relative cursor-grab active:cursor-grabbing select-none overflow-hidden"
        onClick={handleViewerClick}
      >
        <div
          ref={containerRef}
          id="pannellum-tour-viewer"
          className="w-full h-full"
          tabIndex={0}
        />
      </div>
    );
  }
);

export default VirtualTourViewer;
