"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { CharacterModel } from "./CharacterModel";
import { LightingRig } from "./LightingRig";
import { Loader3D } from "./Loader3D";
import { PosterFallback } from "./PosterFallback";
import { RotateCw, Eye, Sparkles, RefreshCw } from "lucide-react";

export function HeroCanvas() {
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [forceLive, setForceLive] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setIsClient(true);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Check mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebGLSupported(!!gl);
    } catch {
      setWebGLSupported(false);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Graceful degradation decision
  const shouldShowFallback =
    !isClient ||
    !webGLSupported ||
    ((prefersReducedMotion || isMobile) && !forceLive);

  if (shouldShowFallback) {
    const reason = !webGLSupported
      ? "WebGL is not enabled on this device"
      : prefersReducedMotion
      ? "Displaying static preview per reduced-motion preference"
      : "Optimized 2D preview for mobile device performance";

    return (
      <PosterFallback
        reason={reason}
        onEnableLive={
          webGLSupported ? () => setForceLive(true) : undefined
        }
      />
    );
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl bg-[#08080A] border border-[#272730] overflow-hidden select-none group shadow-2xl">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,107,43,0.28)_0%,rgba(224,83,22,0.12)_45%,transparent_75%)] pointer-events-none" />

      {/* React Three Fiber Canvas */}
      <Canvas
        camera={{ position: [0, 1.0, 3.8], fov: 44 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]} // Max 2x DPR for battery/GPU performance
        role="img"
        aria-label="Interactive 3D model of Sreeraj original character. Drag to rotate turntable. Mouse wheel zoom is disabled to preserve page scrolling."
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={<Loader3D />}>
          <LightingRig />
          <CharacterModel autoRotate={autoRotate} />
          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false} // Prevents scroll hijacking on page scroll!
          enablePan={false}
          dampingFactor={0.06}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
          autoRotate={autoRotate}
          autoRotateSpeed={0.9}
        />
      </Canvas>

      {/* Micro Control Overlay (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1 rounded-full bg-[#141418]/80 backdrop-blur-md border border-[#272730] shadow-lg">
        {/* Toggle Auto-Rotation */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547] ${
            autoRotate
              ? "bg-[#FF6B2B] text-[#08080A]"
              : "text-[#94A3B8] hover:text-white"
          }`}
          title={autoRotate ? "Pause Turntable" : "Play Turntable"}
          aria-label={autoRotate ? "Pause 3D rotation" : "Play 3D rotation"}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {/* Device Switch to Poster */}
        <button
          onClick={() => setForceLive(false)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-[#94A3B8] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
          title="Switch to Static 2D Poster"
          aria-label="Switch to 2D view"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Status Ticker */}
      <div className="absolute bottom-4 inset-x-6 z-10 flex items-center justify-between text-[11px] font-mono text-[#94A3B8] pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span>Interactive 3D Turntable (Drag to Orbit)</span>
        </div>
        <span className="text-[#FF6B2B] hidden sm:inline">
          Blender 4.2 LTS / Three.js
        </span>
      </div>
    </div>
  );
}
