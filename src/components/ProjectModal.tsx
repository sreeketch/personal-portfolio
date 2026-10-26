"use client";

import React, { useState, useEffect, useRef } from "react";
import { ProjectItem } from "@/types/portfolio";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Box,
  Film,
  Sparkles,
  ExternalLink,
  Layers,
  RotateCw,
} from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function ProjectModal({
  project,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  hasPrev,
  hasNext,
}: ProjectModalProps) {
  const [wireframeMode, setWireframeMode] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Keyboard navigation (ESC, ArrowLeft, ArrowRight)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        onNavigatePrev();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNavigateNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, onNavigatePrev, onNavigateNext, hasPrev, hasNext]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0E0E12] border border-[#272730] shadow-2xl text-[#E2E8F0] flex flex-col focus:outline-none"
      >
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0E0E12]/95 backdrop-blur-md border-b border-[#272730]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#1C1C22] text-[#FF8547] border border-[#272730]">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#768597]">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next controls */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={onNavigatePrev}
                disabled={!hasPrev}
                className="w-8 h-8 rounded-full bg-[#141418] border border-[#272730] flex items-center justify-center text-white disabled:opacity-30 hover:border-[#FF6B2B] transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onNavigateNext}
                disabled={!hasNext}
                className="w-8 h-8 rounded-full bg-[#141418] border border-[#272730] flex items-center justify-center text-white disabled:opacity-30 hover:border-[#FF6B2B] transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1C1C22] hover:bg-[#FF6B2B] hover:text-[#08080A] text-[#94A3B8] flex items-center justify-center border border-[#272730] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
              aria-label="Close modal dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Media Showcase Stage (3D Viewer or Video Embed) */}
          <div className="relative aspect-video rounded-2xl bg-[#08080A] border border-[#272730] overflow-hidden flex items-center justify-center">
            {project.videoUrl ? (
              /* Video Player */
              <iframe
                src={`${project.videoUrl}?autoplay=1&rel=0`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* 3D Model Inspection Stage */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
                {/* Radial Lighting Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,107,43,0.2)_0%,transparent_70%)] pointer-events-none" />

                {/* 3D Model Representation / Inspection Mesh */}
                <div
                  className={`w-32 h-32 rounded-3xl bg-[#141418] border-2 flex items-center justify-center shadow-2xl transition-all duration-300 ${
                    wireframeMode
                      ? "border-[#FF6B2B] shadow-[0_0_30px_rgba(255,107,43,0.35)]"
                      : "border-[#272730]"
                  }`}
                >
                  <Box
                    className={`w-16 h-16 transition-colors ${
                      wireframeMode ? "text-[#FF8547]" : "text-white"
                    }`}
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <p className="font-display font-bold text-base text-white">
                    {project.title}
                  </p>
                  <p className="font-mono text-xs text-[#FF6B2B]">
                    {wireframeMode ? "Wireframe Topology Mode" : "PBR Shaded Mode"}
                  </p>
                </div>

                {/* Micro Stage Controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWireframeMode(!wireframeMode)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                      wireframeMode
                        ? "bg-[#FF6B2B] text-[#08080A] border-[#FF6B2B] font-semibold"
                        : "bg-[#141418] text-[#94A3B8] border-[#272730] hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{wireframeMode ? "Solid Shading" : "Wireframe Mode"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Title, Subtitle, Full Narrative */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <h3
                  id="modal-title"
                  className="font-display font-extrabold text-2xl sm:text-3xl text-white"
                >
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#FF6B2B]">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {project.description}
              </p>

              {/* Software Tools Employed */}
              <div className="pt-2">
                <span className="font-mono text-xs text-[#768597] block mb-2 uppercase tracking-wider">
                  Pipeline & Shaders:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#141418] text-[#E2E8F0] border border-[#272730]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Technical Metadata Specs */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-[#141418] border border-[#272730] space-y-3">
              <span className="font-mono text-xs text-[#FF6B2B] uppercase tracking-wider block border-b border-[#272730] pb-2">
                Asset Specifications
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#272730]/40">
                  <span className="text-[#768597]">Polycount</span>
                  <span className="font-mono text-white font-medium">
                    {project.polycount}
                  </span>
                </div>
                {project.stats &&
                  Object.entries(project.stats).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-1 border-b border-[#272730]/40"
                    >
                      <span className="text-[#768597]">{k}</span>
                      <span className="font-mono text-white font-medium">
                        {v}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
