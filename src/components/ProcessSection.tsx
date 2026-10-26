"use client";

import React, { useState } from "react";
import portfolioData from "@/data/works.json";
import {
  PenTool,
  Boxes,
  Bone,
  Film,
  Sun,
  ArrowRight,
} from "lucide-react";

export function ProcessSection() {
  const { process } = portfolioData;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [PenTool, Boxes, Bone, Film, Sun];
  const activeStep = process[activeStepIndex];
  const ActiveIcon = stepIcons[activeStepIndex] || Boxes;

  return (
    <section id="process" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
            Production Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.06]">
            From 2D Concept to Final Keyframe
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
            A structured 5-stage pipeline engineered to balance anatomical fidelity,
            clean quad topology, and cinematic deformation.
          </p>
        </div>

        {/* 5-Step Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {process.map((step, idx) => {
            const Icon = stepIcons[idx] || Boxes;
            const isActive = idx === activeStepIndex;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547] ${
                  isActive
                    ? "bg-[#FF6B2B]/10 border-[#FF6B2B] shadow-[0_0_20px_rgba(255,107,43,0.2)]"
                    : "bg-white/[0.02] border-white/[0.08] hover:border-white/[0.18]"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-[#FF6B2B]" : "text-[#768597]"
                    }`}
                  >
                    0{step.step}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#FF6B2B]" : "text-[#768597]"
                    }`}
                  />
                </div>
                <div className="mt-3">
                  <p
                    className={`font-display font-bold text-xs sm:text-sm line-clamp-1 ${
                      isActive ? "text-white" : "text-[#94A3B8]"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail */}
        <div data-3d-scroll="card" className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden reveal-3d">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#FF6B2B] uppercase tracking-wider block">
                  Stage 0{activeStep.step} • {activeStep.shortDesc}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {activeStep.name}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed">
                {activeStep.details}
              </p>

              <div>
                <span className="font-mono text-[11px] text-[#768597] block mb-2 uppercase tracking-wider">
                  Software & Tools:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStep.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#08080A] text-white border border-white/[0.08]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prev / Next Stage Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-1.5 rounded-full bg-white/[0.04] disabled:opacity-30 text-xs text-white border border-white/[0.08] hover:border-white/[0.2] transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={activeStepIndex === process.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) =>
                      Math.min(process.length - 1, prev + 1)
                    )
                  }
                  className="px-4 py-1.5 rounded-full bg-[#FF6B2B] disabled:opacity-30 text-xs font-semibold text-[#08080A] flex items-center gap-1 hover:bg-[#FF8547] transition-colors"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-40 h-40 rounded-3xl bg-[#08080A] border border-white/[0.08] flex flex-col items-center justify-center p-6 text-center">
                <ActiveIcon className="w-14 h-14 text-[#FF6B2B] mb-2" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#768597]">
                  Phase 0{activeStep.step}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
