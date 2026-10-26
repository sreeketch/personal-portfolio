"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
    { label: "Showreel", href: "#showreel" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? "bg-[#0E0E12]/90 backdrop-blur-xl border border-[#272730] shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
            : "bg-[#0E0E12]/60 backdrop-blur-md border border-[#272730]/60"
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Sreeraj 3D Home"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E05316] to-[#FF8547] flex items-center justify-center text-[#08080A] shadow-[0_0_12px_rgba(255,107,43,0.4)] group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-white text-base leading-none">
              SREERAJ
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#FF6B2B] uppercase mt-0.5">
              3D Artist
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-150 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Primary CTA Button (WCAG AAA Contrast Fix: Dark text on Ember fill) */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF7A38] to-[#FF5500] text-[#08080A] font-semibold text-xs tracking-wide shadow-[0_4px_18px_rgba(255,85,0,0.35)] hover:shadow-[0_6px_24px_rgba(255,85,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
          >
            <span>Get in touch</span>
            <span className="w-5 h-5 rounded-full bg-[#08080A] text-[#FF6B2B] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#E2E8F0] hover:text-white bg-[#141418] border border-[#272730] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-[#0E0E12]/95 backdrop-blur-2xl border border-[#272730] rounded-3xl p-6 shadow-2xl pointer-events-auto transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#E2E8F0] hover:text-[#FF6B2B] py-2 border-b border-[#272730]/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#FF7A38] to-[#FF5500] text-[#08080A] font-semibold text-sm shadow-[0_4px_18px_rgba(255,85,0,0.35)]"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
