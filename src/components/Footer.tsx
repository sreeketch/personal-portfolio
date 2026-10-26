"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import portfolioData from "@/data/works.json";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#070709] text-[#94A3B8] pt-12 pb-10 mt-14 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2B]" />
              <span className="font-display font-bold text-lg text-white">
                SREERAJ 3D
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              Freelance character designer and 3D animator sculpting expressive
              digital clay and cinematic rigging in Blender.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] text-[#E2E8F0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span>Available for 2026 Commissions</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#works" className="hover:text-[#FF6B2B] transition-colors">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FF6B2B] transition-colors">
                  About & Skills
                </a>
              </li>
              <li>
                <a href="#showreel" className="hover:text-[#FF6B2B] transition-colors">
                  Animation Reel
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#FF6B2B] transition-colors">
                  5-Step Pipeline
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FF6B2B] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white">
              Portals
            </span>
            <ul className="space-y-2 text-xs font-mono">
              {portfolioData.profile.socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF6B2B] transition-colors flex items-center justify-between"
                  >
                    <span>{s.platform}</span>
                    <span className="text-[#768597]">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#768597]">
          <p>© {new Date().getFullYear()} Sreeraj. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono">Next.js • Three.js • Tailwind</span>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white hover:border-[#FF6B2B] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
