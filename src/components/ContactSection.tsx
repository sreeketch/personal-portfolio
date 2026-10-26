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
  Sparkles,
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
      setErrorMessage("Please complete all required fields before submitting.");
      return;
    }
    setErrorMessage("");
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
            Initiate Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let’s Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#FF8547]">
              Extraordinary Together
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
            Whether you have a game protagonist in need of sculpting, a cinematic
            commercial requiring character animation, or an original lookdev study,
            my inbox is open.
          </p>
        </div>

        {/* Contact Grid: Details + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Cols: Quick Inquiries & Direct Studio Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Email Card */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-[#272730] space-y-4">
              <span className="font-mono text-xs text-[#768597] uppercase tracking-wider block">
                Direct Inquiries
              </span>

              <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#08080A] border border-[#272730]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-[#1C1C22] flex items-center justify-center text-[#FF6B2B]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-white truncate">
                    {profile.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-full bg-[#1C1C22] hover:bg-[#FF6B2B] hover:text-[#08080A] text-xs font-mono text-[#E2E8F0] transition-colors flex items-center gap-1.5"
                  title="Copy email to clipboard"
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

              <a
                href={`mailto:${profile.email}?subject=Project%20Inquiry%20for%20Sreeraj%203D`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#1C1C22] hover:bg-[#272730] text-xs font-medium text-white border border-[#272730] transition-colors"
              >
                <span>Open Mail Client</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B2B]" />
              </a>
            </div>

            {/* Studio Availability & Location */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-[#272730] space-y-4">
              <span className="font-mono text-xs text-[#768597] uppercase tracking-wider block">
                Studio Logistics
              </span>
              <div className="space-y-3 text-xs text-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#FF6B2B]" />
                  <span>Remote Worldwide (IST / UTC +5:30)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#FF6B2B]" />
                  <span>Avg Response Time: Within 24 Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#FF6B2B]" />
                  <span>NDA & Proprietary Assets Respected</span>
                </div>
              </div>
            </div>

            {/* Social Studio Links */}
            <div className="p-6 rounded-3xl bg-[#141418] border border-[#272730] space-y-4">
              <span className="font-mono text-xs text-[#768597] uppercase tracking-wider block">
                Portfolio Platforms
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {profile.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#08080A] hover:border-[#FF6B2B] text-[#94A3B8] hover:text-white border border-[#272730] transition-colors flex items-center justify-between"
                  >
                    <span>{social.platform}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#FF6B2B]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#141418] via-[#0E0E12] to-[#08080A] border border-[#272730] shadow-2xl relative">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E05316] to-[#FF8547] text-[#08080A] flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(255,107,43,0.4)]">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Message Transmitted!
                </h3>
                <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Sreeraj will review your project
                  specifications and respond within 24 hours.
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
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#1C1C22] text-xs font-mono text-white border border-[#272730] hover:border-[#FF6B2B] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-red-900/30 border border-red-500/50 text-xs text-red-300"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider block"
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
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#272730] text-sm text-white placeholder-[#768597] focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider block"
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
                      className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#272730] text-sm text-white placeholder-[#768597] focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-type"
                      className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider block"
                    >
                      Project Type
                    </label>
                    <select
                      id="contact-type"
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#272730] text-sm text-white focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
                    >
                      <option value="Character Design">Character Design & Sculpt</option>
                      <option value="3D Animation">3D Keyframe Animation</option>
                      <option value="Rigging & Physics">Rigging & Blendshapes</option>
                      <option value="Full Production Pipeline">Full 3D Production</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-timeline"
                      className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider block"
                    >
                      Estimated Timeline
                    </label>
                    <select
                      id="contact-timeline"
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#272730] text-sm text-white focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
                    >
                      <option value="Within 2 Weeks">Urgent (&lt; 2 Weeks)</option>
                      <option value="Within 1 Month">Standard (1 Month)</option>
                      <option value="Q1/Q2 2026">Flexible (Q1/Q2 2026)</option>
                      <option value="Exploratory">Exploratory / Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider block"
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
                    placeholder="Describe your character concept, art style, polygon target, or key deliverables..."
                    className="w-full px-4 py-3 rounded-xl bg-[#08080A] border border-[#272730] text-sm text-white placeholder-[#768597] focus:outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full btn-primary-ember justify-center py-3.5 text-sm font-bold shadow-[0_4px_24px_rgba(255,85,0,0.4)]"
                >
                  <span>Transmit Inquiry</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
