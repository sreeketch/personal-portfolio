"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

    // 1. Clamped Magnetic CTA Pull on Desktop
    if (isDesktop) {
      const magneticButtons = document.querySelectorAll<HTMLElement>(".btn-primary-ember");

      magneticButtons.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          xTo(x * 0.25);
          yTo(y * 0.25);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        cleanups.push(() => {
          btn.removeEventListener("mousemove", handleMouseMove);
          btn.removeEventListener("mouseleave", handleMouseLeave);
        });
      });
    }

    // 2. Global 3D Perspective Scroll Engine (Gives the whole website an authentic 3D spatial feel)
    const cards3D = document.querySelectorAll<HTMLElement>('[data-3d-scroll="card"]');
    let animationFrameId: number;
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const update3DScroll = () => {
      // Smooth lerp for scroll physics
      currentScroll += (targetScroll - currentScroll) * 0.1;
      const viewH = window.innerHeight;

      cards3D.forEach((card) => {
        // Skip mouse-hovered cards so cursor tilt stays responsive
        if (card.matches(":hover")) return;

        const rect = card.getBoundingClientRect();

        // Only compute for cards currently in or near viewport
        if (rect.bottom >= -80 && rect.top <= viewH + 80) {
          const centerY = rect.top + rect.height / 2;
          const progress = (centerY - viewH / 2) / (viewH / 2); // -1.0 (top) to +1.0 (bottom)
          const clamped = Math.max(-1.1, Math.min(1.1, progress));

          // 3D Perspective Tilt: tilts toward viewer at bottom, flat in center, tilts away at top
          const rotateX = clamped * 5.5;
          const translateZ = (1 - Math.abs(clamped) * 0.45) * 12; // pops closer in 3D space when centered

          card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) translateZ(${translateZ.toFixed(1)}px)`;
        }
      });

      animationFrameId = requestAnimationFrame(update3DScroll);
    };

    animationFrameId = requestAnimationFrame(update3DScroll);
    cleanups.push(() => cancelAnimationFrame(animationFrameId));

    // 3. Smooth Initial 3D Entrance Reveal (Plays once per element, stays permanently visible)
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );

      const targets = document.querySelectorAll(".reveal-3d");
      targets.forEach((el) => observer.observe(el));

      cleanups.push(() => {
        observer.disconnect();
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return <>{children}</>;
}
