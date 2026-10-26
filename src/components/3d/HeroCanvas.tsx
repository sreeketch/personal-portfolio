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

  // Graceful degradation decision: only fallback if WebGL is genuinely unavailable
  const shouldShowFallback = !isClient || !webGLSupported;

  if (shouldShowFallback) {
    return (
      <PosterFallback
        reason="WebGL is not enabled on this device"
      />
    );
  }

  return (
    <div
      data-cursor="orbit"
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[500px] select-none flex items-center justify-center"
    >
      {/* Soft Borderless Ambient Radial Glow & Floor Contact Shadow */}
      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
        {/* Soft volumetric warm ember aura */}
        <div className="w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,107,43,0.18)_0%,rgba(255,133,71,0.05)_48%,transparent_70%)] blur-3xl" />
        {/* Grounded soft floor drop shadow */}
        <div className="absolute bottom-6 sm:bottom-8 w-[240px] sm:w-[340px] h-8 rounded-[100%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.2)_40%,transparent_75%)] blur-lg" />
      </div>

      {/* React Three Fiber Canvas with Soft Perimeter Fade Mask (Zero Box Boundary) */}
      <div
        className="w-full h-full"
        style={{
          maskImage: "radial-gradient(ellipse 88% 86% at 50% 50%, black 72%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 88% 86% at 50% 50%, black 72%, transparent 100%)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0.7, 4.6], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]} // Max 2x DPR for battery/GPU performance
          role="img"
          aria-label="Interactive 3D model of Sreeraj original character. Drag to rotate turntable. Mouse wheel zoom is disabled to preserve page scrolling."
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={<Loader3D />}>
            <LightingRig />
            <CharacterModel autoRotate={autoRotate} />
            <Preload all />
          </Suspense>

          <OrbitControls
            target={[0, 0.25, 0]}
            enableZoom={false} // Prevents scroll hijacking on page scroll!
            enablePan={false}
            dampingFactor={0.06}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate={autoRotate}
            autoRotateSpeed={0.9}
          />
        </Canvas>
      </div>

      {/* Floating Micro Controls (Top Right) */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-lg">
        {/* Toggle Auto-Rotation */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547] ${
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
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-[#94A3B8] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
          title="Switch to Static 2D Poster"
          aria-label="Switch to 2D view"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Bottom Status Pill */}
      <div className="absolute bottom-2 inset-x-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-[11px] font-mono text-[#94A3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B] animate-pulse" />
          <span>Interactive 3D Turntable • Drag to Orbit</span>
        </div>
      </div>
    </div>
  );
}
