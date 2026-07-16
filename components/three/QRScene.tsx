"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { useQrStore } from "@/lib/store";
import type { MaterialKind } from "@/lib/qr/types";

function useQrTexture(url: string | null) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (!url) return;
    const loader = new THREE.TextureLoader();
    let disposed = false;
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      if (disposed) {
        tex.dispose();
        return;
      }
      setTexture((prev) => {
        prev?.dispose();
        return tex;
      });
    });
    return () => {
      disposed = true;
    };
  }, [url]);
  return texture;
}

function FrameMaterial({ kind, color }: { kind: MaterialKind; color: string }) {
  switch (kind) {
    case "glass":
      return (
        <meshPhysicalMaterial
          color={color}
          transmission={1}
          thickness={1.2}
          roughness={0.08}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
        />
      );
    case "metallic":
      return (
        <meshStandardMaterial color={color} metalness={1} roughness={0.18} />
      );
    case "holographic":
      return (
        <meshPhysicalMaterial
          color={color}
          metalness={0.6}
          roughness={0.15}
          iridescence={1}
          iridescenceIOR={1.6}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      );
    case "matte":
    default:
      return (
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.85} />
      );
  }
}

function QrTile() {
  const material = useQrStore((s) => s.material);
  const fgColor = useQrStore((s) => s.style.fgColor);
  const qrDataUrl = useQrStore((s) => s.qrDataUrl);
  const autoRotate = useQrStore((s) => s.settings.autoRotate);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const texture = useQrTexture(qrDataUrl);
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current || reducedMotion || !autoRotate) return;
    group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[3.3, 3.3, 0.35]} radius={0.16} smoothness={6}>
        <FrameMaterial kind={material} color={fgColor} />
      </RoundedBox>
      {texture && (
        <mesh position={[0, 0, 0.181]}>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
      {texture && (
        <mesh position={[0, 0, -0.181]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function Burst() {
  const generations = useQrStore((s) => s.generations);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const points = useRef<THREE.Points>(null);
  const start = useRef(0);
  const [active, setActive] = useState(false);
  const count = 220;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 2 + Math.random() * 3;
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i * 3 + 2] = Math.cos(phi) * speed;
    }
    return { positions, velocities };
  }, []);

  useEffect(() => {
    if (generations === 0 || reducedMotion) return;
    start.current = performance.now();
    setActive(true);
    const geo = points.current?.geometry;
    if (geo) {
      const arr = geo.attributes.position.array as Float32Array;
      arr.fill(0);
      geo.attributes.position.needsUpdate = true;
    }
  }, [generations, reducedMotion]);

  useFrame(() => {
    if (!active || !points.current) return;
    const elapsed = (performance.now() - start.current) / 1000;
    const geo = points.current.geometry;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] = velocities[i * 3] * elapsed;
      arr[i * 3 + 1] = velocities[i * 3 + 1] * elapsed - 1.5 * elapsed * elapsed;
      arr[i * 3 + 2] = velocities[i * 3 + 2] * elapsed;
    }
    geo.attributes.position.needsUpdate = true;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - elapsed / 1.4);
    if (elapsed > 1.4) setActive(false);
  });

  return (
    <points ref={points} visible={active}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#12e6ff"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function QRScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#12e6ff" />
      <pointLight position={[3, -3, 4]} intensity={30} color="#ff2d95" />
      <QrTile />
      <Burst />
      <Environment resolution={256}>
        <Lightformer
          intensity={2}
          position={[0, 3, 3]}
          scale={[6, 3, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.8}
          position={[-4, 1, 2]}
          scale={[3, 5, 1]}
          color="#9d3bff"
        />
        <Lightformer
          intensity={1.8}
          position={[4, -1, 2]}
          scale={[3, 5, 1]}
          color="#12e6ff"
        />
        <Lightformer
          intensity={1.4}
          position={[0, -3, 2]}
          scale={[5, 2, 1]}
          color="#ff2d95"
        />
      </Environment>
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={10}
        enableDamping
      />
    </Canvas>
  );
}
