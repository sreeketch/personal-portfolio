"use client";

import React from "react";

export function LightingRig() {
  return (
    <>
      {/* Ambient Fill: Deep neutral atmosphere */}
      <ambientLight intensity={0.65} color="#181822" />

      {/* Warm Key Light: Front-right 45 degrees */}
      <directionalLight
        position={[4, 5, 4]}
        intensity={2.8}
        color="#FFF4E0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Cool Secondary Fill: Front-left */}
      <directionalLight
        position={[-4, 2, 2]}
        intensity={0.9}
        color="#88A0C0"
      />

      {/* Signature Molten Ember Rim Light (Behind subject, pointing toward camera) */}
      <spotLight
        position={[0, 3, -4.5]}
        target-position={[0, 0, 0]}
        intensity={9.5}
        color="#FF5500"
        angle={0.9}
        penumbra={0.8}
      />

      {/* Secondary Ember Ground Rim / Volumetric bounce */}
      <pointLight position={[0, -2.5, -2]} intensity={4.0} color="#FF7A1A" />

      {/* Subtle Crown Specular Glint */}
      <pointLight position={[0, 4, 1]} intensity={1.5} color="#FFE0A0" />
    </>
  );
}
