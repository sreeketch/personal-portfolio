"use client";

import React from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import portfolioData from "@/data/works.json";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#272730] bg-[#0A0A0E] text-[#94A3B8] pt-16 pb-12 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#272730]">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E05316] to-[#FF8547] flex items-center justify-center text-[#08080A]">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                SREERAJ 3D
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              Freelance 3D artist, character designer, and animator sculpting
              expressive characters and cinematic worlds in Blender.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141418] border border-[#272730] text-xs text-[#E2E8F0]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>Available for Select Freelance Commissions</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#works"
                  className="hover:text-[#FF6B2B] transition-colors"
                >
                  Selected Works
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#FF6B2B] transition-colors"
                >
                  About & Skills
                </a>
              </li>
              <li>
                <a
                  href="#showreel"
                  className="hover:text-[#FF6B2B] transition-colors"
                >
                  Animation Showreel
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="hover:text-[#FF6B2B] transition-colors"
                >
                  5-Step Process
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#FF6B2B] transition-colors"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4">
              Studio Channels
            </h4>
            <ul className="space-y-2.5 text-sm">
              {portfolioData.profile.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF6B2B] transition-colors flex items-center justify-between group"
                  >
                    <span>{social.platform}</span>
                    <span className="font-mono text-xs text-[#768597] group-hover:text-white transition-colors">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#768597]">
          <p>
            © {new Date().getFullYear()} Sreeraj. All rights reserved. 3D assets &
            renders belong to respective projects.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px]">
              Engineered with Next.js, R3F & Tailwind CSS
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-[#141418] border border-[#272730] flex items-center justify-center text-[#E2E8F0] hover:text-white hover:border-[#FF6B2B] hover:shadow-[0_0_12px_rgba(255,107,43,0.3)] transition-all"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
