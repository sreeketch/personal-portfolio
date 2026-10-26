"use client";

import React, { useEffect, useRef, useState } from "react";

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
  orbitRadius: number;
  angle: number;
  speed: number;
}

export function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isCursorHovering, setIsCursorHovering] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  useEffect(() => {
    // 1. Detect touch devices
    const touchCheck = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(touchCheck);

    // 2. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (current and lerped smooth coordinates)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      smoothX: width / 2,
      smoothY: height / 2,
      radius: 180,
      isDown: false,
    };

    // Color palette matching "Obsidian & Ember Studio"
    const colors = [
      "#FF6B2B", // Molten Ember
      "#FF8547", // Radiant Ember
      "#FFC247", // Amber Specular
      "#E05316", // Deep Ember
      "#FFFFFF", // Pure White spark
    ];

    // Create particles field
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = 0.25 + Math.random() * 0.55;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1.2 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        orbitRadius: 20 + Math.random() * 40,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.012,
      });
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse pointer movement
    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      setIsCursorVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest("textarea") ||
          target.closest(".project-card-3d") ||
          target.closest('[role="button"]') ||
          target.closest("canvas"))
      ) {
        setIsCursorHovering(true);
      } else {
        setIsCursorHovering(false);
      }
    };

    const handlePointerDown = () => {
      mouse.isDown = true;
      // Click burst: push nearby particles outward
      particles.forEach((p) => {
        const dx = p.x - mouse.targetX;
        const dy = p.y - mouse.targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          const force = (260 - dist) / 260;
          p.vx += (dx / (dist || 1)) * force * 10;
          p.vy += (dy / (dist || 1)) * force * 10;
        }
      });
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
    };

    const handlePointerLeave = () => {
      setIsCursorVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handlePointerLeave);

    // Animation Loop
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth lerp mouse coordinates
      mouse.smoothX += (mouse.targetX - mouse.smoothX) * 0.08;
      mouse.smoothY += (mouse.targetY - mouse.smoothY) * 0.08;
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;

      // Update interactive background spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouse.smoothX}px, ${mouse.smoothY}px, 0)`;
      }

      // Update custom cursor reticle position
      if (cursorDotRef.current && !touchCheck) {
        cursorDotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorRingRef.current && !touchCheck) {
        cursorRingRef.current.style.transform = `translate3d(${mouse.smoothX}px, ${mouse.smoothY}px, 0) translate(-50%, -50%)`;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Antigravity drift
          p.angle += p.speed;
          p.originY -= 0.25; // Gentle upward drift
          if (p.originY < -50) p.originY = height + 50;

          // Target resting position
          const restX = p.originX + Math.cos(p.angle) * p.orbitRadius;
          const restY = p.originY + Math.sin(p.angle) * p.orbitRadius;

          // Spring pull toward resting position
          p.vx += (restX - p.x) * 0.015;
          p.vy += (restY - p.y) * 0.015;

          // Antigravity cursor interaction
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Repulsion vector
            p.vx += (dx / dist) * force * 1.6;
            p.vy += (dy / dist) * force * 1.6;
            // Flare opacity when near cursor
            p.alpha = Math.min(1.0, p.baseAlpha + force * 0.5);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }

          // Friction / velocity dampening
          p.vx *= 0.93;
          p.vy *= 0.93;

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
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with subtle ember thread lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "#FF6B2B";
            ctx.globalAlpha = (1 - distBetween / 95) * 0.18;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <>
      {/* 1. Full-Screen Antigravity Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* 2. Fluid Dynamic Spotlight Glow Following Cursor */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[640px] h-[640px] -mt-[320px] -ml-[320px] pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 107, 43, 0.15) 0%, rgba(255, 133, 71, 0.05) 35%, transparent 70%)",
          opacity: isCursorVisible ? 1 : 0.4,
          willChange: "transform",
        }}
      />

      {/* 3. Subtle Perspective Grid Parallax Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 107, 43, 0.25) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* 4. Interactive Custom Cursor Reticle & Lens (Hidden on touch devices) */}
      {!isTouchDevice && (
        <div
          className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-200 ${
            isCursorVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Outer Fluid Trailing Ring */}
          <div
            ref={cursorRingRef}
            className={`fixed top-0 left-0 rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
              isCursorHovering
                ? "w-14 h-14 -mt-7 -ml-7 border-2 border-[#FF6B2B] bg-[#FF6B2B]/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,107,43,0.4)]"
                : "w-8 h-8 -mt-4 -ml-4 border border-[#FF8547]/50 shadow-[0_0_12px_rgba(255,107,43,0.25)]"
            }`}
            style={{ willChange: "transform" }}
          />

          {/* Inner High-Precision Cursor Center Dot */}
          <div
            ref={cursorDotRef}
            className={`fixed top-0 left-0 w-2 h-2 rounded-full transition-transform duration-100 ${
              isCursorHovering
                ? "bg-[#FFC247] scale-150 shadow-[0_0_10px_#FFC247]"
                : "bg-[#FF6B2B] shadow-[0_0_8px_#FF6B2B]"
            }`}
            style={{ willChange: "transform" }}
          />
        </div>
      )}
    </>
  );
}
