"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  speed: number;
  angle: number;
  orbitRadius: number;
}

export function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (interpolated for silky smooth gliding)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      smoothX: width / 2,
      smoothY: height / 2,
      radius: 190,
      active: false,
    };

    // Minimal palette: Molten ember, radiant amber, and subtle star white
    const colors = ["#FF6B2B", "#FF8547", "#FFC247", "#FFFFFF"];

    // Balanced particle count for clean, minimal aesthetics (never cluttered)
    const particleCount = Math.min(Math.floor((width * height) / 24000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = 0.15 + Math.random() * 0.45;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1.0 + Math.random() * 1.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        speed: 0.004 + Math.random() * 0.008,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: 15 + Math.random() * 35,
      });
    }

    let scrollY = window.scrollY;
    let smoothScrollY = scrollY;
    let prevSmoothScrollY = scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    const animate = () => {
      // Fluid spring lerp towards target mouse position and scroll
      mouse.smoothX += (mouse.targetX - mouse.smoothX) * 0.065;
      mouse.smoothY += (mouse.targetY - mouse.smoothY) * 0.065;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      smoothScrollY += (scrollY - smoothScrollY) * 0.08;
      const scrollDelta = smoothScrollY - prevSmoothScrollY;
      prevSmoothScrollY = smoothScrollY;

      // 1. Move the ambient fluid background spotlight with cursor & subtle 3D scroll flow
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouse.smoothX}px, ${mouse.smoothY}px, 0)`;
      }

      // 2. Subtle 3D background grid parallax shift on mouse & scroll
      if (gridRef.current) {
        const parallaxX = (mouse.smoothX - width / 2) * -0.015;
        const parallaxY = (mouse.smoothY - height / 2) * -0.015 - (smoothScrollY * 0.05) % 44;
        gridRef.current.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Render weightless antigravity particles with 3D Z-depth scroll response
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Multi-plane 3D parallax scroll shift (larger particles move faster, creating real depth)
          p.originY -= scrollDelta * (p.size * 0.14);

          // Weightless upward drift
          p.angle += p.speed;
          p.originY -= 0.22;
          if (p.originY < -40) p.originY = height + 40;
          if (p.originY > height + 40) p.originY = -40;

          // Resting float position
          const restX = p.originX + Math.cos(p.angle) * p.orbitRadius;
          const restY = p.originY + Math.sin(p.angle) * p.orbitRadius;

          p.vx += (restX - p.x) * 0.012;
          p.vy += (restY - p.y) * 0.012;

          // Antigravity cursor interaction
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Gentle fluid repulsion away from cursor
            p.vx += (dx / dist) * force * 1.4;
            p.vy += (dy / dist) * force * 1.4;
            p.alpha = Math.min(0.9, p.baseAlpha + force * 0.4);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.04;
          }

          // Damping
          p.vx *= 0.94;
          p.vy *= 0.94;

          p.x += p.vx;
          p.y += p.vy;
        }

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Subtle glowing connection filaments between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "#FF6B2B";
            ctx.globalAlpha = (1 - distBetween / 80) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Obsidian Base Gradient */}
      <div className="absolute inset-0 bg-[#08080A]" />

      {/* 2. Fluid Dynamic Spotlight Following Cursor (Google Antigravity style) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] -mt-[400px] -ml-[400px] rounded-full pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 43, 0.14) 0%, rgba(255, 133, 71, 0.04) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* 3. Subtle Parallax Grid Texture with slight mouse shift */}
      <div
        ref={gridRef}
        className="absolute inset-[-40px] pointer-events-none opacity-[0.14] transition-transform duration-700 ease-out"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          willChange: "transform",
        }}
      />

      {/* 4. Full-Screen Antigravity Particle Field Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* 5. Edge Vignette for Cinematic Lookdev Framing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_50%,#08080A_100%)] pointer-events-none opacity-80" />
    </div>
  );
}
