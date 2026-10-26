"use client";

import React from "react";
import portfolioData from "@/data/works.json";
import { Sparkles, Clock, Layers, Award } from "lucide-react";

export function AboutSection() {
  const { about } = portfolioData;

  const metrics = [
    { label: "Years in Blender", value: "6+", icon: Clock },
    { label: "Characters Sculpted", value: "50+", icon: Sparkles },
    { label: "Production Rigging", value: "100%", icon: Layers },
    { label: "Client Satisfaction", value: "5.0 ★", icon: Award },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-10">
        {/* Top: Bio & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Bio */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
                About The Artist
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.06]">
                Sculpting Form, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#FF8547]">
                  Anatomy & Motion
                </span>
              </h2>
            </div>

            <div className="space-y-3 text-sm text-[#94A3B8] leading-relaxed">
              {about.bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 reveal-3d">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  data-3d-scroll="card"
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between hover:border-[#FF6B2B]/40 transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#FF6B2B]" />
                  <div className="mt-4 space-y-0.5">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      {m.value}
                    </span>
                    <p className="font-mono text-xs text-[#768597]">{m.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competency Breakdown */}
        <div className="pt-6 border-t border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
                Disciplines
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Technical Craft & Pipeline Focus
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 reveal-3d">
            {about.skills.map((skill) => (
              <div
                key={skill.category}
                data-3d-scroll="card"
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm text-white">
                    {skill.category}
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#FF6B2B]">
                    {skill.level}%
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#08080A] text-[#E2E8F0] border border-white/[0.06]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
