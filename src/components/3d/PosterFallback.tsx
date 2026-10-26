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
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-2xl bg-gradient-to-b from-[#141418] via-[#0E0E12] to-[#08080A] border border-[#272730] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      {/* Background Volumetric Ember Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,107,43,0.3)_0%,rgba(224,83,22,0.1)_45%,transparent_80%)] pointer-events-none" />

      {/* Stylized Silhouette Representation */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Glowing Character Silhouette Emblem */}
        <div className="relative w-28 h-28 sm:w-36 sm:sm:h-36 rounded-full bg-[#101015] border-2 border-[#FF6B2B]/40 shadow-[0_0_36px_rgba(255,107,43,0.35)] flex items-center justify-center overflow-hidden group">
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5500]/20 to-transparent" />
          <div className="relative flex flex-col items-center">
            {/* Glowing Visor */}
            <div className="w-12 h-2.5 rounded-full bg-[#FF6B2B] shadow-[0_0_12px_#FF6B2B] mb-2 animate-pulse" />
            <Box className="w-12 h-12 text-white/90" />
          </div>
        </div>

        {/* Informative Label */}
        <div className="space-y-1 max-w-xs">
          <p className="font-display font-bold text-lg text-white">
            Kaelen: The Cyber Ronin
          </p>
          <p className="font-mono text-xs text-[#FF6B2B]">
            Blender 4.2 • High-Res Character Sculpt
          </p>
          <p className="text-xs text-[#768597] pt-1">{reason}</p>
        </div>

        {/* Manual Interactive 3D Activation Button */}
        {onEnableLive && (
          <button
            onClick={onEnableLive}
            type="button"
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1C22] hover:bg-[#272730] text-xs font-medium text-[#E2E8F0] hover:text-white border border-[#272730] hover:border-[#FF6B2B] transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
          >
            <Play className="w-3.5 h-3.5 fill-[#FF6B2B] text-[#FF6B2B]" />
            <span>Launch Live 3D Scene</span>
          </button>
        )}
      </div>

      {/* Bottom Micro Details */}
      <div className="absolute bottom-4 inset-x-6 flex items-center justify-between font-mono text-[11px] text-[#768597]">
        <span>48.2k Quads</span>
        <span>Cycles PBR Materials</span>
      </div>
    </div>
  );
}
