"use client";

import React, { useState } from "react";
import portfolioData from "@/data/works.json";
import { Sparkles, Award, Clock, Cpu, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const { about } = portfolioData;
  const [activeSkillCategory, setActiveSkillCategory] = useState<string | null>(null);

  const stats = [
    { label: "Years in Blender", value: "6+", icon: Clock },
    { label: "Original Characters", value: "50+", icon: Sparkles },
    { label: "Pipeline Efficiency", value: "100%", icon: Cpu },
    { label: "Client Satisfaction", value: "5.0 ★", icon: Award },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-16">
        {/* Top Split: Bio & Experience Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
                About The Artist
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                Sculpting Form, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#FF8547]">
                  Anatomy & Motion
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {about.bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core Values Bullets */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2B]" />
                <span>Production-Clean Quad Topology</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2B]" />
                <span>Custom Deformable Armatures</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2B]" />
                <span>52 Apple ARKit Facial Blendshapes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2B]" />
                <span>Cinematic Volumetric Lighting</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Studio Metrics */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-6 rounded-3xl bg-gradient-to-b from-[#141418] to-[#0E0E12] border border-[#272730] flex flex-col justify-between hover:border-[#FF6B2B]/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#1C1C22] border border-[#272730] flex items-center justify-center text-[#FF6B2B] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="mt-8 space-y-1">
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                      {stat.value}
                    </span>
                    <p className="font-mono text-xs text-[#94A3B8]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Split: Interactive Skills Matrix */}
        <div className="space-y-6 pt-8 border-t border-[#272730]/60">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
                Competency Matrix
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Technical Craft & Pipeline Proficiency
              </h3>
            </div>
            <p className="text-xs font-mono text-[#768597]">
              Hover or click any discipline to inspect sub-specializations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {about.skills.map((skill) => {
              const isSelected = activeSkillCategory === skill.category;

              return (
                <div
                  key={skill.category}
                  onClick={() =>
                    setActiveSkillCategory(isSelected ? null : skill.category)
                  }
                  className={`p-6 rounded-3xl bg-[#141418] border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#FF6B2B] shadow-[0_0_24px_rgba(255,107,43,0.25)]"
                      : "border-[#272730] hover:border-[#272730]/80 hover:bg-[#181820]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display font-bold text-base text-white">
                      {skill.category}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-[#FF6B2B] px-2 py-0.5 rounded bg-[#08080A] border border-[#272730]">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-[#08080A] h-2 rounded-full overflow-hidden p-0.5 border border-[#272730]/60 mb-4">
                    <div
                      className="bg-gradient-to-r from-[#FF5500] via-[#FF7A1A] to-[#FFB020] h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Sub-Specialization Tags */}
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#08080A] text-[#E2E8F0] border border-[#272730]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
