"use client";

import React from "react";
import { Sparkles, Play, Box } from "lucide-react";

interface PosterFallbackProps {
  onEnableLive?: () => void;
  reason?: string;
}

export function PosterFallback({
  onEnableLive,
  reason = "Optimized for your device performance",
}: PosterFallbackProps) {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center p-4 select-none">
      {/* Background Volumetric Ember Glow & Floor Drop Shadow */}
      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,107,43,0.18)_0%,rgba(255,133,71,0.05)_48%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-6 sm:bottom-8 w-[240px] sm:w-[320px] h-7 rounded-[100%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.2)_40%,transparent_75%)] blur-md" />
      </div>

      {/* Stylized Silhouette Representation */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3.5">
        {/* Glowing Character Silhouette Emblem */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#101015] border-2 border-[#FF6B2B]/40 shadow-[0_0_36px_rgba(255,107,43,0.35)] flex items-center justify-center overflow-hidden group">
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5500]/20 to-transparent" />
          <div className="relative flex flex-col items-center">
            {/* Glowing Visor */}
            <div className="w-10 h-2 rounded-full bg-[#FF6B2B] shadow-[0_0_12px_#FF6B2B] mb-2 animate-pulse" />
            <Box className="w-10 h-10 text-white/90" />
          </div>
        </div>

        {/* Informative Label */}
        <div className="space-y-1 max-w-xs">
          <p className="font-display font-bold text-base sm:text-lg text-white">
            Boy 24: Cyber Racer
          </p>
          <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-[#FF8547]">
            <span>Blender 4.2</span>
            <span>•</span>
            <span>Custom Rig & Shaders</span>
          </div>
          <p className="text-[11px] text-[#768597] pt-0.5">{reason}</p>
        </div>

        {/* Manual Interactive 3D Activation Button */}
        {onEnableLive && (
          <button
            onClick={onEnableLive}
            type="button"
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1C22] hover:bg-[#272730] text-xs font-medium text-[#E2E8F0] hover:text-white border border-[#272730] hover:border-[#FF6B2B] transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
          >
            <Play className="w-3.5 h-3.5 fill-[#FF6B2B] text-[#FF6B2B]" />
            <span>Launch Live 3D Scene</span>
          </button>
        )}
      </div>
    </div>
  );
}
