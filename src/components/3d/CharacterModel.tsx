"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import * as THREE from "three";

interface CharacterModelProps {
  autoRotate?: boolean;
}

// Support GitHub Pages subpath and localhost
function getAssetPath(path: string) {
  const envBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/personal-portfolio")) {
    return `/personal-portfolio${path}`;
  }
  if (envBase) {
    return `${envBase}${path}`;
  }
  return path;
}

const MODEL_PATH = "/models/boy-24-bust.glb";
const DRACO_PATH = "/draco/";

function BoyModel() {
  const modelUrl = getAssetPath(MODEL_PATH);
  const dracoUrl = getAssetPath(DRACO_PATH);
  const { scene, animations } = useGLTF(modelUrl, dracoUrl);
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    console.log("=== BOY MODEL STATS ===");
    console.log("Size:", JSON.stringify(size));
    console.log("Center:", JSON.stringify(center));
  }, [scene]);

  // Play subtle idle eye animation if available
  useEffect(() => {
    if (actions) {
      const eyeAction = actions["idle_eyes"] || actions["idle_eyes_2"];
      if (eyeAction) {
        eyeAction.reset().fadeIn(0.5).play();
      }
    }
  }, [actions]);

  // Hide detached hand bones if present in bust avatar
  useEffect(() => {
    const rightHand = scene.getObjectByName("RightHand");
    const leftHand = scene.getObjectByName("LeftHand");
    if (rightHand) rightHand.scale.set(0, 0, 0);
    if (leftHand) leftHand.scale.set(0, 0, 0);
  }, [scene]);
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 1.2;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <Center position={[0, -0.05, 0]}>
        <primitive object={scene} scale={4.2} />
      </Center>
    </group>
  );
}

export function CharacterModel({ autoRotate = true }: CharacterModelProps) {
  const outerGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scrollOffsetRef = useRef(0);

  // Track window scroll for subtle depth and rotation reactivity
  useEffect(() => {
    const handleScroll = () => {
      scrollOffsetRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate 45 warm ember particles floating around the character
  const particleCount = 45;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3.8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.5 - 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.8;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerGroupRef.current) {
      // Subtle organic breathing float
      const breath = Math.sin(t * 1.4) * 0.04;
      
      // Dynamic scroll lerp: subtle Y-rotation and slight depth tilt
      const targetScrollY = Math.min(scrollOffsetRef.current * 0.0008, 0.4);
      const targetScrollRot = scrollOffsetRef.current * 0.0012;

      outerGroupRef.current.position.y = breath - targetScrollY;
      outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.x,
        targetScrollY * 0.35,
        0.08
      );

      // Auto-rotation turntable when enabled
      if (autoRotate) {
        outerGroupRef.current.rotation.y += delta * 0.4;
      } else {
        outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          outerGroupRef.current.rotation.y,
          targetScrollRot,
          0.05
        );
      }
    }

    // Animate particles drifting upward
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.3;
        if (positions[i * 3 + 1] > 2.2) {
          positions[i * 3 + 1] = -1.8;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={outerGroupRef} position={[0, 0, 0]}>
      {/* Boy 24 Character Model */}
      <BoyModel />

      {/* Floating Ember Spark Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#FF6B2B"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Shadow Catcher Ground Plane */}
      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}

// Preload model asset for immediate smooth display
useGLTF.preload(getAssetPath(MODEL_PATH), getAssetPath(DRACO_PATH));
