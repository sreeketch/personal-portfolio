"use client";

import React, { useState } from "react";
import portfolioData from "@/data/works.json";
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export function ContactSection() {
  const { profile } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Character Design",
    timeline: "Within 1 Month",
    message: "",
  });

  const [isCopied, setIsCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }
    setErrorMessage("");
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
            Initiate Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.06]">
            Let’s Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#FF8547]">
              Meaningful Together
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg leading-relaxed">
            Open for character sculpt commissions, 3D lookdev, and cinematic rigging
            contracts. Transmit your project brief below.
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal-3d">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Pill */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3.5">
              <span className="font-mono text-[11px] text-[#768597] uppercase tracking-wider block">
                Direct Transmission
              </span>

              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#08080A] border border-white/[0.06]">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-[#FF6B2B]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-xs text-white truncate">
                    {profile.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-[#FF6B2B] hover:text-[#08080A] text-xs font-mono text-white transition-colors flex items-center gap-1.5"
                  aria-label="Copy email address"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 pt-2 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FF6B2B]" />
                  <span>Remote Worldwide (UTC +5:30)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF6B2B]" />
                  <span>Response Time: Within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#768597] uppercase tracking-wider block">
                  Studio Portals
                </span>
                <span className="text-[11px] font-mono text-[#FF8547]">
                  @sreeketch
                </span>
              </div>

              {/* Featured Instagram Direct Button */}
              <a
                href="https://www.instagram.com/sreeketch?psln=bnpkcmZucnplOW9q"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#FF6B2B]/15 via-pink-500/10 to-purple-500/10 hover:from-[#FF6B2B]/25 border border-[#FF6B2B]/30 hover:border-[#FF6B2B] text-white transition-all duration-200 flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B2B] text-[#08080A] flex items-center justify-center font-bold">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold block text-white group-hover:text-[#FF8547] transition-colors">
                      Instagram Profile
                    </span>
                    <span className="text-[11px] font-mono text-[#94A3B8]">
                      @sreeketch
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#FF6B2B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                {profile.socials
                  .filter((s) => s.platform !== "Instagram")
                  .map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#08080A] hover:border-[#FF6B2B] text-[#94A3B8] hover:text-white border border-white/[0.06] transition-colors flex items-center justify-between group"
                    >
                      <span className="truncate">{social.platform}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#FF6B2B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] relative">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-[#FF6B2B] text-[#08080A] flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(255,107,43,0.4)]">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Inquiry Transmitted
                </h3>
                <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                  Thank you, {formData.name}. Sreeraj will review your project brief
                  and reply promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      projectType: "Character Design",
                      timeline: "Within 1 Month",
                      message: "",
                    });
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-white/[0.05] text-xs font-mono text-white border border-white/[0.08] hover:border-[#FF6B2B] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-[11px] text-[#768597] uppercase tracking-wider block"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B2B] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-[11px] text-[#768597] uppercase tracking-wider block"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@studio.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B2B] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-type"
                      className="font-mono text-[11px] text-[#768597] uppercase tracking-wider block"
                    >
                      Project Type
                    </label>
                    <select
                      id="contact-type"
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#FF6B2B] transition-colors"
                    >
                      <option value="Character Design">Character Design & Sculpt</option>
                      <option value="3D Animation">3D Keyframe Animation</option>
                      <option value="Rigging & Physics">Rigging & Blendshapes</option>
                      <option value="Full Production Pipeline">Full Production</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-timeline"
                      className="font-mono text-[11px] text-[#768597] uppercase tracking-wider block"
                    >
                      Estimated Timeline
                    </label>
                    <select
                      id="contact-timeline"
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#FF6B2B] transition-colors"
                    >
                      <option value="Within 2 Weeks">Urgent (&lt; 2 Weeks)</option>
                      <option value="Within 1 Month">Standard (1 Month)</option>
                      <option value="Q1/Q2 2026">Flexible (Q1/Q2 2026)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[11px] text-[#768597] uppercase tracking-wider block"
                  >
                    Project Brief & Specifications *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Briefly describe your character concept, polygon targets, or animation requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF6B2B] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#FF6B2B] hover:bg-[#FF8547] text-[#08080A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_2px_14px_rgba(255,107,43,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Transmit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
