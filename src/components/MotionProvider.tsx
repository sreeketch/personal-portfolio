"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Responsive & Accessible motion configuration
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Staggered Scroll Reveal for Section Headlines
      gsap.utils.toArray<HTMLElement>("h2").forEach((heading) => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 16,
          duration: 0.45,
          ease: "power2.out",
        });
      });

      // 2. Project Cards Stagger Entrance
      const cards = gsap.utils.toArray<HTMLElement>(".project-card-3d");
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: "#works",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        });
      }

      // 3. Clamped Magnetic CTA Pull on Desktop
      if (window.matchMedia("(pointer: fine)").matches) {
        const magneticButtons = document.querySelectorAll<HTMLElement>(".btn-primary-ember");

        magneticButtons.forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3" });

          const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            // Clamp to 0.25 max displacement factor
            xTo(x * 0.25);
            yTo(y * 0.25);
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
          };

          btn.addEventListener("mousemove", handleMouseMove);
          btn.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Instantly reveal all elements in final static state
      gsap.set(["h2", ".project-card-3d", ".hero-container-card"], {
        opacity: 1,
        y: 0,
        clearProps: "all",
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return <>{children}</>;
}
