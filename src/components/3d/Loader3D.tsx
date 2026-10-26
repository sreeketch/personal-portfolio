"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Loader3D() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 1.5;
      groupRef.current.position.y = Math.sin(t * 2) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 1.8;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Rotating Wireframe Gem */}
      <mesh>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#FF6B2B"
          wireframe
          emissive="#FF5500"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#FF8547" />
      </mesh>

      {/* Orbiting Halo Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 16, 48]} />
        <meshBasicMaterial color="#FF5500" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
