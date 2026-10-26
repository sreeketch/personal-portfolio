"use client";

import React, { useState } from "react";
import portfolioData from "@/data/works.json";
import { ProjectItem } from "@/types/portfolio";
import { ProjectModal } from "./ProjectModal";
import { ArrowUpRight, Box, Film } from "lucide-react";

export function WorksGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = portfolioData.categories;
  const allProjects = portfolioData.projects as unknown as ProjectItem[];
  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  // Navigate between projects in modal
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

  // Card mouse movement for 3D perspective tilt & dynamic pointer spotlight
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <section id="works" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Asymmetric Header (Reference Design Alignment) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-12 border-b border-[#272730]">
        <div className="md:col-span-7 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B2B]">
            Behind the Designs
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08]">
            Sculpting Stories That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#FF8547]">
              Resonate Beyond The Screen
            </span>
          </h2>
        </div>
        <div className="md:col-span-5 space-y-4">
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            From initial topological sculpt to final keyframe animation, every
            character is engineered with narrative weight, expressive deformation,
            and cinematic lighting.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white font-medium">
              Ready to collaborate on a character or 3D reel?
            </span>
            <a href="#contact" className="btn-primary-ember text-xs py-2 px-4">
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Filterable Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-8 pb-4">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8547] ${
                isActive
                  ? "bg-[#FF6B2B] text-[#08080A] font-bold shadow-[0_0_16px_rgba(255,107,43,0.35)]"
                  : "bg-[#141418] text-[#94A3B8] hover:text-white border border-[#272730]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Column Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="project-card-3d group cursor-pointer"
          >
            {/* 4:5 Vertical Aspect Ratio Card Frame */}
            <div className="aspect-[4/5] bg-gradient-to-b from-[#181822] via-[#121218] to-[#0A0A0E] relative overflow-hidden flex flex-col justify-between p-6 select-none">
              {/* Card Top Category & Year */}
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#08080A]/85 border border-[#272730] text-[#FF8547]">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-[#768597]">
                  {project.year}
                </span>
              </div>

              {/* Center Artistic Icon / Thumbnail Presentation */}
              <div className="my-auto text-center space-y-3 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#0E0E12] border border-[#272730] text-[#FF6B2B] flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(255,107,43,0.25)] group-hover:border-[#FF6B2B]/60 transition-colors">
                  {project.category === "3D Animation" ? (
                    <Film className="w-7 h-7" />
                  ) : (
                    <Box className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <p className="font-mono text-xs text-white/90 font-medium">
                    {project.polycount}
                  </p>
                  <p className="font-mono text-[10px] text-[#768597] uppercase">
                    Click to Inspect 3D Model
                  </p>
                </div>
              </div>

              {/* Card Bottom Metadata */}
              <div className="z-10 space-y-2">
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
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#08080A]/90 text-[#E2E8F0] border border-[#272730]/60"
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

      {/* Universal Lightbox Modal Dialog */}
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
