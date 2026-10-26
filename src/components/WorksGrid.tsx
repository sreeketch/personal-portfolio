"use client";

import React, { useState } from "react";
import portfolioData from "@/data/works.json";
import { ProjectItem } from "@/types/portfolio";
import { ProjectModal } from "./ProjectModal";
import { ArrowUpRight, Box, Film, Sparkles, Layers } from "lucide-react";

export function WorksGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = portfolioData.categories;
  const allProjects = portfolioData.projects as unknown as ProjectItem[];
  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const currentIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filteredProjects.length - 1;

  const handlePrev = () => {
    if (hasPrev) setSelectedProject(filteredProjects[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) setSelectedProject(filteredProjects[currentIndex + 1]);
  };

  // 3D Perspective Tilt with Specular Lighting
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
  };

  return (
    <section id="works" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Clean Minimal Header with Integrated Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1.5 max-w-lg">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.06]">
            Selected 3D Works <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#FF8547]">
              & Character Designs
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pt-1">
            Interactive character sculpts, rigging studies, and Blender animations.
            Hover for 3D depth, click to inspect model topology.
          </p>
        </div>

        {/* Minimal Category Filter Tabs Aligned in Header */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            const count =
              cat === "All"
                ? allProjects.length
                : allProjects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547] ${
                  isActive
                    ? "bg-[#FF6B2B] text-[#08080A] font-semibold shadow-[0_0_16px_rgba(255,107,43,0.3)]"
                    : "bg-white/[0.03] text-[#94A3B8] hover:text-white border border-white/[0.06] hover:border-white/[0.15]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-[#08080A]/20 text-[#08080A]" : "text-[#768597]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Showcase Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            data-3d-scroll="card"
            onClick={() => setSelectedProject(project)}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="group cursor-pointer relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-[#FF6B2B]/50 transition-all duration-300 overflow-hidden shadow-xl reveal-3d"
            style={{ willChange: "transform" }}
          >
            {/* Interactive Dynamic Specular Glare (Moves with Cursor on Card) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 107, 43, 0.15), transparent 60%)",
              }}
            />

            {/* Card Interior */}
            <div className="aspect-[4/5] p-6 flex flex-col justify-between relative select-none">
              {/* Top Tags */}
              <div className="flex items-center justify-between z-20">
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#08080A]/90 border border-white/[0.08] text-[#FF8547]">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-[#768597]">
                  {project.year}
                </span>
              </div>

              {/* 3D Visual Center Piece */}
              <div className="my-auto text-center space-y-3 z-20 transition-transform duration-300 group-hover:scale-105">
                <div className="w-20 h-20 rounded-2xl bg-[#08080A]/90 border border-white/[0.08] group-hover:border-[#FF6B2B]/60 text-[#FF6B2B] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,107,43,0.2)] group-hover:shadow-[0_0_40px_rgba(255,107,43,0.4)] transition-all">
                  {project.category === "3D Animation" ? (
                    <Film className="w-8 h-8" />
                  ) : (
                    <Box className="w-8 h-8" />
                  )}
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-white/90 font-medium block">
                    {project.polycount}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FF8547] group-hover:underline">
                    <span>Inspect 3D Asset</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Bottom Project Metadata */}
              <div className="z-20 space-y-2">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FF8547] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-[#94A3B8] line-clamp-1 leading-relaxed">
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#08080A]/80 text-[#E2E8F0] border border-white/[0.06]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Universal 3D Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigatePrev={handlePrev}
        onNavigateNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </section>
  );
}
