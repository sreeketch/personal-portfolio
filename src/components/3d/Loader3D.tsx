"use client";

import React from "react";
import { Html, useProgress } from "@react-three/drei";

export function Loader3D() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-[#0E0E12]/90 border border-[#272730] backdrop-blur-xl shadow-2xl min-w-[180px]"
      >
        {/* Ember Radial Ring */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#22222A]"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#FF6B2B]"
              strokeDasharray={`${progress}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute font-mono text-[10px] text-white font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <p className="font-mono text-[11px] text-[#94A3B8] tracking-wider uppercase">
          Loading 3D Model...
        </p>
      </div>
    </Html>
  );
}
