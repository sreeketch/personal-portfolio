"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Film, Sparkles } from "lucide-react";
import portfolioData from "@/data/works.json";
import { PosterFallback } from "./3d/PosterFallback";

// Dynamically import HeroCanvas with SSR disabled so WebGL only initializes on the client
const HeroCanvas = dynamic(
  () => import("./3d/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <PosterFallback reason="Loading interactive 3D viewport..." />
    ),
  }
);

export function HeroSection() {
  const { profile, about } = portfolioData;

  return (
    <section className="relative">
      {/* Curved Hero Container Card */}
      <div className="hero-container-card pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Ticker: Status & Engine info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141418]/85 border border-[#272730] backdrop-blur-md text-xs text-[#E2E8F0]">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2B] animate-pulse" />
              <span className="font-mono tracking-tight">{profile.status}</span>
            </div>

            <div className="flex items-center gap-2.5 font-mono text-xs text-[#768597]">
              <span>BLENDER 4.2 LTS</span>
              <span>•</span>
              <span>CYCLES X</span>
              <span>•</span>
              <span>EEVEE NEXT</span>
            </div>
          </div>

          {/* Two-Column Asymmetric Hero Split (Reference Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[480px]">
            {/* Left 7 Columns: Headline, Subtitle & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#FF6B2B]">
                  Hey, I am Sreeraj —
                </p>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.04]">
                  Character Designer <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#FF8547]">
                    & 3D Animator
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl leading-relaxed">
                {profile.subheading}
              </p>

              {/* Primary Dual Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#works" className="btn-primary-ember">
                  <span>Explore Selected Works</span>
                  <span className="w-5 h-5 rounded-full bg-[#08080A] text-[#FF6B2B] flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a href="#showreel" className="btn-secondary-dark">
                  <Film className="w-4 h-4 text-[#FF6B2B]" />
                  <span>Watch 2026 Showreel</span>
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Interactive 3D Turntable Viewport */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <HeroCanvas />
            </div>
          </div>

          {/* 4-Pillar Competency Strip (Matching Reference Layout) */}
          <div className="mt-16 pt-8 border-t border-[#272730]/60 grid grid-cols-2 md:grid-cols-4 gap-6">
            {profile.heroStats.map((stat) => (
              <div key={stat.id} className="space-y-1.5 group">
                <span className="font-mono text-xs font-semibold text-[#FF6B2B]">
                  #{stat.id}
                </span>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#FF8547] transition-colors">
                  {stat.label}
                </h3>
                <p className="text-xs text-[#768597] line-clamp-2 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Production Pipeline Tool Ticker Strip */}
      <div className="py-8 border-b border-[#272730] bg-[#0A0A0E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#768597]">
              Production-Proven Pipeline
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#94A3B8]">
              {about.pipelineTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" />
                  <span className="text-white font-medium">{tool.name}</span>
                  <span className="text-[10px] text-[#768597] px-1.5 py-0.5 rounded bg-[#141418] border border-[#272730]/60">
                    {tool.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
