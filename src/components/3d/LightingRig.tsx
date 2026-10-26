"use client";

import React from "react";

export function LightingRig() {
  return (
    <>
      {/* Ambient Fill: Balanced studio tone */}
      <ambientLight intensity={1.1} color="#252532" />

      {/* Warm Key Light: Front-right 45 degrees */}
      <directionalLight
        position={[4, 5, 4]}
        intensity={3.2}
        color="#FFF8F0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Cool Secondary Fill: Front-left */}
      <directionalLight
        position={[-4, 2, 3]}
        intensity={1.4}
        color="#8FA8CC"
      />

      {/* Soft Front Fill: Illuminates facial details and visor reflections */}
      <directionalLight
        position={[0, 0.5, 4.5]}
        intensity={0.9}
        color="#FFFFFF"
      />

      {/* Signature Molten Ember Rim Light (Behind subject, highlighting helmet contour) */}
      <spotLight
        position={[0, 3.5, -4]}
        target-position={[0, 0, 0]}
        intensity={8.5}
        color="#FF5500"
        angle={1.0}
        penumbra={0.8}
      />

      {/* Under-glow / Volumetric bounce from bottom */}
      <pointLight position={[0, -2, 1]} intensity={2.5} color="#FF7A1A" />
    </>
  );
}
