"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "hover" | "orbit">("default");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
  });

  useEffect(() => {
    // Only enable on desktop/fine-pointer devices
    const fineQuery = window.matchMedia("(pointer: fine)");
    if (!fineQuery.matches) return;
    setEnabled(true);

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      setIsVisible(true);

      // Instantly position the precision core dot (zero lag for snappy aiming)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('[data-cursor="orbit"]') || target.closest("canvas")) {
          setHoverState("orbit");
        } else if (
          target.closest('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])')
        ) {
          setHoverState("hover");
        } else {
          setHoverState("default");
        }
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth lerp loop for the ambient outer ring
    const render = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.18;
      pos.y += (pos.targetY - pos.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Precision Molten Ember Core Dot (Snaps with Zero Latency) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] rounded-full bg-[#FF6B2B] shadow-[0_0_10px_rgba(255,107,43,0.9)] pointer-events-none will-change-transform transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${isMouseDown ? 0.75 : hoverState === "hover" ? 1.3 : 1})`,
        }}
      />

      {/* 2. Fluid Lagging Outer Ring with Bespoke Interaction States */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          width: hoverState === "orbit" ? 64 : hoverState === "hover" ? 48 : 32,
          height: hoverState === "orbit" ? 64 : hoverState === "hover" ? 48 : 32,
          marginLeft: hoverState === "orbit" ? -32 : hoverState === "hover" ? -24 : -16,
          marginTop: hoverState === "orbit" ? -32 : hoverState === "hover" ? -24 : -16,
          transform: `scale(${isMouseDown ? 0.82 : 1})`,
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-200 flex items-center justify-center ${
            hoverState === "orbit"
              ? "border-2 border-dashed border-[#FF8547] bg-[#FF6B2B]/10 animate-[spin_8s_linear_infinite]"
              : hoverState === "hover"
              ? "border border-[#FF6B2B] bg-[#FF6B2B]/15 shadow-[0_0_16px_rgba(255,107,43,0.35)]"
              : "border border-[#FF8547]/50 bg-[#FF6B2B]/[0.03]"
          }`}
        >
          {hoverState === "orbit" && (
            <span className="font-mono text-[9px] uppercase tracking-tighter text-[#FFC247] font-bold select-none">
              3D
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
