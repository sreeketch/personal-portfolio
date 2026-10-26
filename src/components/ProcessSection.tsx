"use client";

import React, { useState } from "react";
import portfolioData from "@/data/works.json";
import {
  PenTool,
  Boxes,
  Bone,
  Film,
  Sun,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function ProcessSection() {
  const { process } = portfolioData;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [PenTool, Boxes, Bone, Film, Sun];
  const activeStep = process[activeStepIndex];
  const ActiveIcon = stepIcons[activeStepIndex] || Boxes;

  return (
    <section id="process" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
            Production Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From 2D Concept to Final Keyframe
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Every character follows a rigorous 5-stage production methodology
            designed to deliver expressive deformation, clean topology, and
            uncompromising visual impact.
          </p>
        </div>

        {/* 5-Step Stepper Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {process.map((step, idx) => {
            const Icon = stepIcons[idx] || Boxes;
            const isActive = idx === activeStepIndex;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[110px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547] ${
                  isActive
                    ? "bg-[#1C1C22] border-[#FF6B2B] shadow-[0_0_20px_rgba(255,107,43,0.25)]"
                    : "bg-[#141418] border-[#272730] hover:border-[#383844] hover:bg-[#181820]"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-[#FF6B2B]" : "text-[#768597]"
                    }`}
                  >
                    #{step.step}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#FF6B2B]" : "text-[#768597]"
                    }`}
                  />
                </div>
                <div className="mt-4">
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

        {/* Active Stage Detailed Breakdown Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#141418] via-[#0E0E12] to-[#08080A] border border-[#272730] shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Flare */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B2B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Stage Description & Methodology */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08080A] border border-[#272730] text-xs font-mono text-[#FF6B2B]">
                  <span>Stage #{activeStep.step}</span>
                  <span>•</span>
                  <span>{activeStep.shortDesc}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {activeStep.name}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed">
                {activeStep.details}
              </p>

              {/* Tools Employed in this Stage */}
              <div className="pt-2">
                <span className="font-mono text-xs text-[#768597] block mb-2 uppercase tracking-wider">
                  Software & Addons Employed:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStep.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-[#1C1C22] text-white border border-[#272730] shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Stepper Controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#272730]/60">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-full bg-[#1C1C22] disabled:opacity-40 text-xs font-medium text-white border border-[#272730] hover:border-[#FF6B2B] transition-colors"
                >
                  Previous Stage
                </button>
                <button
                  type="button"
                  disabled={activeStepIndex === process.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) =>
                      Math.min(process.length - 1, prev + 1)
                    )
                  }
                  className="px-4 py-2 rounded-full bg-[#FF6B2B] disabled:opacity-40 text-xs font-semibold text-[#08080A] flex items-center gap-1.5 hover:bg-[#FF8547] transition-colors"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stage Visual Icon / Technical Emblem */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl bg-[#08080A] border-2 border-[#272730] flex flex-col items-center justify-center p-8 shadow-inner group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,43,0.18)_0%,transparent_70%)]" />
                <ActiveIcon className="w-20 h-20 text-[#FF6B2B] mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#768597] relative z-10">
                  Phase {activeStep.step} Deliverable
                </span>
                <span className="font-display font-bold text-sm text-white mt-1 relative z-10 text-center">
                  Production Validated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
