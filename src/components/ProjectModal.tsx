"use client";

import React, { useState, useEffect, useRef } from "react";
import { ProjectItem } from "@/types/portfolio";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Box,
  Layers,
  Sparkles,
  Maximize2,
} from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

type ShaderMode = "shaded" | "wireframe" | "clay";

export function ProjectModal({
  project,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  hasPrev,
  hasNext,
}: ProjectModalProps) {
  const [shaderMode, setShaderMode] = useState<ShaderMode>("shaded");
  const [isRotating, setIsRotating] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0C0C0F] border border-white/[0.1] shadow-2xl text-[#E2E8F0] flex flex-col focus:outline-none"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0C0C0F]/90 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[#FF8547] border border-white/[0.08]">
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
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white disabled:opacity-20 hover:border-[#FF6B2B] transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onNavigateNext}
                disabled={!hasNext}
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white disabled:opacity-20 hover:border-[#FF6B2B] transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#FF6B2B] hover:text-[#08080A] text-[#94A3B8] flex items-center justify-center border border-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
              aria-label="Close modal dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* 3D Model Stage or Video Embed */}
          <div className="relative aspect-video rounded-2xl bg-[#08080A] border border-white/[0.08] overflow-hidden flex items-center justify-center select-none">
            {project.videoUrl ? (
              <iframe
                src={`${project.videoUrl}?autoplay=1&rel=0`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,107,43,0.18)_0%,transparent_70%)] pointer-events-none" />

                {/* Interactive 3D Model Representation */}
                <div
                  className={`w-36 h-36 rounded-3xl flex items-center justify-center transition-all duration-300 ${
                    shaderMode === "wireframe"
                      ? "bg-[#0A0A0E] border-2 border-[#FF6B2B] shadow-[0_0_30px_rgba(255,107,43,0.35)]"
                      : shaderMode === "clay"
                      ? "bg-[#2A2A30] border-2 border-[#60606A] shadow-xl"
                      : "bg-[#141418] border-2 border-white/[0.1] shadow-2xl"
                  }`}
                >
                  <Box
                    className={`w-18 h-18 transition-colors ${
                      shaderMode === "wireframe"
                        ? "text-[#FF8547]"
                        : shaderMode === "clay"
                        ? "text-[#E2E8F0]"
                        : "text-[#FF6B2B]"
                    }`}
                  />
                </div>

                <div className="mt-4 space-y-0.5">
                  <p className="font-display font-bold text-base text-white">
                    {project.title}
                  </p>
                  <p className="font-mono text-xs text-[#FF6B2B]">
                    {shaderMode === "wireframe"
                      ? "Wireframe Quad Topology (Clean Deformations)"
                      : shaderMode === "clay"
                      ? "Digital Clay Shader (Anatomical Volume Check)"
                      : "Cycles X Physically Based Shading"}
                  </p>
                </div>

                {/* Shader Viewport Switchers */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 p-1 rounded-full bg-[#0E0E12]/90 border border-white/[0.08] backdrop-blur-md">
                  {(["shaded", "wireframe", "clay"] as ShaderMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setShaderMode(mode)}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono capitalize transition-all ${
                        shaderMode === mode
                          ? "bg-[#FF6B2B] text-[#08080A] font-bold"
                          : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details & Specifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <h3 id="modal-title" className="font-display font-extrabold text-2xl text-white">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#FF6B2B]">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {project.description}
              </p>

              <div className="pt-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#768597] block mb-2">
                  Pipeline & Shaders:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.03] text-[#E2E8F0] border border-white/[0.08]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specifications Drawer */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#FF6B2B] block border-b border-white/[0.06] pb-2">
                Asset Specifications
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-[#768597]">Polycount</span>
                  <span className="font-mono text-white font-medium">{project.polycount}</span>
                </div>
                {project.stats &&
                  Object.entries(project.stats).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-[#768597]">{k}</span>
                      <span className="font-mono text-white font-medium">{v}</span>
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
