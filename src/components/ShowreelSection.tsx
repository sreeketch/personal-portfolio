"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Play, X, ChevronLeft, ChevronRight, Film, Sparkles } from "lucide-react";
import portfolioData from "@/data/works.json";
import { ShowreelItem } from "@/types/portfolio";

export function ShowreelSection() {
  const showreels = (portfolioData.showreels || [portfolioData.showreel]) as ShowreelItem[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentReel = showreels[currentIndex] || showreels[0];

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? showreels.length - 1 : prev - 1));
  }, [showreels.length]);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev === showreels.length - 1 ? 0 : prev + 1));
  }, [showreels.length]);

  // Keyboard navigation when focusing the reel section (guarded against inputs & modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      const isModalOpen = !!document.querySelector("[role='dialog']");
      if (isInput || isModalOpen) return;

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section id="showreel" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-6">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Showreels & Breakdowns</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.06]">
              {currentReel.title}
            </h2>
          </div>

          {/* Carousel Arrows & Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] pr-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#FF8547]">
                {currentReel.duration}
              </span>
              <span>{currentReel.resolution || "4K 60FPS"}</span>
              <span>•</span>
              <span className="text-white/60">{currentReel.engine || "Cycles X"}</span>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#08080A] hover:bg-[#FF6B2B] transition-colors focus:outline-none"
                aria-label="Previous video reel"
                title="Previous video"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="px-2 font-mono text-xs text-white select-none">
                0{currentIndex + 1} / 0{showreels.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#08080A] hover:bg-[#FF6B2B] transition-colors focus:outline-none"
                aria-label="Next video reel"
                title="Next video"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Canvas Frame */}
        <div data-3d-scroll="card" className="relative rounded-3xl bg-[#08080A] border border-white/[0.08] overflow-hidden shadow-2xl group reveal-3d">
          <div className="relative aspect-video w-full flex items-center justify-center">
            {isPlaying ? (
              <div className="w-full h-full relative">
                <iframe
                  src={`${currentReel.videoUrl}?autoplay=1&rel=0`}
                  title={currentReel.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#08080A]/90 hover:bg-[#FF6B2B] hover:text-[#08080A] text-white flex items-center justify-center border border-white/[0.1] transition-colors focus:outline-none"
                  aria-label="Close video player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsPlaying(true)}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer relative select-none group/play"
              >
                {/* Background Ambient Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,43,0.18)_0%,transparent_70%)]" />

                {/* Subtitle / Tag Badge */}
                <div className="relative z-10 mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#FF8547]">
                  <Sparkles className="w-3 h-3 text-[#FF6B2B]" />
                  <span>{currentReel.tag || "Cinematic Reel"}</span>
                </div>

                {/* Center Glowing Minimal Play Button */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-[#FF6B2B] text-[#08080A] flex items-center justify-center shadow-[0_0_35px_rgba(255,107,43,0.45)] group-hover/play:scale-110 group-hover/play:shadow-[0_0_50px_rgba(255,107,43,0.65)] transition-all duration-300">
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </div>

                <div className="relative z-10 mt-6 space-y-2 max-w-lg">
                  <h3 className="font-display font-bold text-xl text-white">
                    {currentReel.subtitle || currentReel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {currentReel.description}
                  </p>
                </div>
              </div>
            )}

            {/* Side Floating Overlay Arrows (Visible on Desktop for quick switching) */}
            {!isPlaying && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#08080A]/80 hover:bg-[#FF6B2B] text-white hover:text-[#08080A] flex items-center justify-center border border-white/[0.08] backdrop-blur-md transition-all duration-200 shadow-xl opacity-0 group-hover:opacity-100 hover:scale-105"
                  aria-label="Previous reel"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#08080A]/80 hover:bg-[#FF6B2B] text-white hover:text-[#08080A] flex items-center justify-center border border-white/[0.08] backdrop-blur-md transition-all duration-200 shadow-xl opacity-0 group-hover:opacity-100 hover:scale-105"
                  aria-label="Next reel"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Selector Tabs Below */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {showreels.map((reel, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={reel.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 border ${
                  isActive
                    ? "bg-white/[0.05] border-[#FF6B2B] shadow-[0_0_20px_rgba(255,107,43,0.15)]"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-mono text-[11px] ${isActive ? "text-[#FF6B2B] font-bold" : "text-[#768597]"}`}>
                    0{index + 1}
                  </span>
                  <span className="font-mono text-[10px] text-[#768597]">
                    {reel.duration}
                  </span>
                </div>
                <h4 className={`text-xs font-medium truncate ${isActive ? "text-white font-semibold" : "text-[#94A3B8]"}`}>
                  {reel.tag || reel.title}
                </h4>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
