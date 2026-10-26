"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CharacterModelProps {
  autoRotate?: boolean;
}

export function CharacterModel({ autoRotate = true }: CharacterModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate 60 warm ember particles floating around the character
  const particleCount = 60;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle breathing float and idle sway
    if (groupRef.current && autoRotate) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08 - 0.2;
      groupRef.current.rotation.y += delta * 0.45;
    }

    // Visor subtle pulsation
    if (visorRef.current) {
      const pulse = 1.8 + Math.sin(t * 3.0) * 0.4;
      (visorRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }

    // Animate particles drifting upward
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.35; // Move up
        if (positions[i * 3 + 1] > 2.5) {
          positions[i * 3 + 1] = -2.0; // Reset to bottom
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.15}>
      {/* ===================== CHARACTER BUST ===================== */}

      {/* Head / Helmet Base (Sculpted Obsidian Polygon Structure) */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <octahedronGeometry args={[0.75, 2]} />
        <meshStandardMaterial
          color="#16161D"
          metalness={0.88}
          roughness={0.22}
          wireframe={false}
        />
      </mesh>

      {/* Glowing Cybernetic Visor / Eye Slit (Signature Ember Glow) */}
      <mesh ref={visorRef} position={[0, 1.18, 0.62]}>
        <boxGeometry args={[0.62, 0.12, 0.15]} />
        <meshStandardMaterial
          color="#FF5500"
          emissive="#FF5500"
          emissiveIntensity={2.2}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Armored Collar & Cervical Spine */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.65, 0.6, 8]} />
        <meshStandardMaterial
          color="#101015"
          metalness={0.92}
          roughness={0.3}
        />
      </mesh>

      {/* Torso & Shoulder Plating (Broad Heroic Anatomy) */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.9, 0.85]} />
        <meshStandardMaterial
          color="#181822"
          metalness={0.85}
          roughness={0.35}
        />
      </mesh>

      {/* Left Shoulder Pauldron */}
      <mesh position={[-1.05, 0.05, 0]} rotation={[0, 0, 0.25]} castShadow>
        <octahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#121218"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Right Shoulder Pauldron */}
      <mesh position={[1.05, 0.05, 0]} rotation={[0, 0, -0.25]} castShadow>
        <octahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#121218"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Core Power Reactor / Chest Jewel (Amber Pulse) */}
      <mesh position={[0, -0.15, 0.45]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#FF7A1A"
          emissive="#FF7A1A"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
      </mesh>

      {/* Floating Orbital Halo Ring (Blender Viewport / Wireframe Homage) */}
      <mesh position={[0, 1.25, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.05, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#FF8547"
          emissive="#FF6B2B"
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Floating Ember Spark Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#FF6B2B"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Shadow Catcher Plane under Character */}
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
}
