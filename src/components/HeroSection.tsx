"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Play } from "lucide-react";
import portfolioData from "@/data/works.json";
import { PosterFallback } from "./3d/PosterFallback";

const HeroCanvas = dynamic(
  () => import("./3d/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => <PosterFallback reason="Loading 3D viewport..." />,
  }
);

export function HeroSection() {
  const { profile, about } = portfolioData;

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-14 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      {/* Top Status & Engine Specs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-xs text-[#E2E8F0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B] animate-pulse" />
          <span className="font-mono text-[11px] tracking-tight">{profile.status}</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[#768597] tracking-wider uppercase">
          <span>Blender 4.2 LTS</span>
          <span>•</span>
          <span>Cycles X</span>
          <span>•</span>
          <span>EEVEE Next</span>
        </div>
      </div>

      {/* Main Hero Split: Editorial Typography + 3D Model Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Bold Minimalist Typography */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-3">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#FF6B2B]">
              Hey, I am Sreeraj —
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              Character <br />
              Designer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#E2E8F0]">
                & 3D{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA066] to-[#FF5500]">
                Animator
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-lg font-normal leading-relaxed">
            {profile.subheading}
          </p>

          {/* Minimalist Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#works"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6B2B] hover:bg-[#FF8547] text-[#08080A] font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(255,107,43,0.35)] hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>Explore Selected Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#showreel"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] hover:border-[#FF6B2B]/40 text-xs font-medium tracking-wide transition-all duration-200 backdrop-blur-md"
            >
              <Play className="w-3.5 h-3.5 fill-[#FF6B2B] text-[#FF6B2B]" />
              <span>Watch Showreel</span>
            </a>
          </div>
        </div>

        {/* Right Column: Seamless Blended 3D Interactive Turntable */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center relative min-h-[420px] sm:min-h-[460px]">
          <HeroCanvas />
        </div>
      </div>

      {/* 4 Minimalist Competency Pillars */}
      <div className="mt-10 pt-6 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4">
        {profile.heroStats.map((stat) => (
          <div
            key={stat.id}
            data-3d-scroll="card"
            className="space-y-1 group p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6B2B]/40 transition-all duration-200"
          >
            <span className="font-mono text-xs text-[#FF6B2B] font-semibold">
              0{stat.id}
            </span>
            <h3 className="text-sm font-semibold text-white group-hover:text-[#FF8547] transition-colors">
              {stat.label}
            </h3>
            <p className="text-xs text-[#768597] leading-relaxed">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Pipeline Strip */}
      <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#768597]">
        <span className="text-[11px] uppercase tracking-wider text-white/50">
          Core Pipeline
        </span>
        <div className="flex flex-wrap items-center gap-5 text-[#94A3B8]">
          {about.pipelineTools.map((tool) => (
            <span key={tool.name} className="hover:text-white transition-colors">
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
