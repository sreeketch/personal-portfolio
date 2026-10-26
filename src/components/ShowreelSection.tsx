"use client";

import React, { useState } from "react";
import { Play, Film, Sparkles, X, Volume2, Maximize2 } from "lucide-react";
import portfolioData from "@/data/works.json";

export function ShowreelSection() {
  const { showreel } = portfolioData;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="showreel" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#272730]">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
              Cinematic Reel
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              2026 Animation & 3D Breakdown
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#94A3B8]">
            <span className="px-3 py-1 rounded-full bg-[#141418] border border-[#272730] text-[#FF8547]">
              {showreel.duration}
            </span>
            <span>4K 60FPS</span>
            <span>•</span>
            <span>Cycles X Path Traced</span>
          </div>
        </div>

        {/* Cinematic Video Showcase Frame */}
        <div className="relative rounded-3xl bg-[#08080A] border border-[#272730] overflow-hidden shadow-2xl group">
          {/* Volumetric Ember Backlight Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,107,43,0.22)_0%,transparent_70%)] pointer-events-none" />

          {/* 16:9 Video Canvas Container */}
          <div className="relative aspect-video w-full flex items-center justify-center">
            {isPlaying ? (
              <div className="w-full h-full relative">
                <iframe
                  src={`${showreel.videoUrl}?autoplay=1&rel=0`}
                  title={showreel.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#08080A]/90 hover:bg-[#FF6B2B] hover:text-[#08080A] text-white flex items-center justify-center border border-[#272730] transition-colors focus:outline-none"
                  aria-label="Close showreel player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* High-Impact Video Poster & Play Trigger */
              <div
                onClick={() => setIsPlaying(true)}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer relative select-none"
              >
                {/* Background Poster Visual Grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#0E0E12]/80 opacity-90" />

                {/* Center Glowing Play Button */}
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#E05316] via-[#FF6B2B] to-[#FF8547] text-[#08080A] flex items-center justify-center shadow-[0_0_40px_rgba(255,107,43,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(255,107,43,0.7)] transition-all duration-300">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" />
                </div>

                {/* Reel Meta Description */}
                <div className="relative z-10 mt-8 space-y-2 max-w-lg">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Watch Full 3D Showreel
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {showreel.description}
                  </p>
                </div>

                {/* Bottom Pill Ticker */}
                <div className="absolute bottom-6 inset-x-8 flex items-center justify-between z-10 font-mono text-xs text-[#768597]">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#FF6B2B]" />
                    <span>Blender Animation • Rigging • Hair Sim</span>
                  </div>
                  <span className="hidden sm:inline text-white/80">
                    Click to Play Interactive Reel
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
