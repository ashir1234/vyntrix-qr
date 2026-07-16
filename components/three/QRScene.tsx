"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { useQrStore } from "@/lib/store";
import type { MaterialKind, SceneMode } from "@/lib/qr/types";

/** Vyntrix QR product palette (distinct from Vyntrix Labs purple/magenta). */
const C = {
  emerald: "#10b981",
  sky: "#0ea5e9",
  amber: "#f59e0b",
  teal: "#14b8a6",
} as const;

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

function QrTile({
  scale = 1,
  autoSpin = true,
  doubleSided = true,
}: {
  scale?: number;
  autoSpin?: boolean;
  doubleSided?: boolean;
}) {
  const material = useQrStore((s) => s.material);
  const fgColor = useQrStore((s) => s.style.fgColor);
  const qrDataUrl = useQrStore((s) => s.qrDataUrl);
  const autoRotate = useQrStore((s) => s.settings.autoRotate);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const texture = useQrTexture(qrDataUrl);
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current || reducedMotion || !autoSpin || !autoRotate) return;
    group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group} scale={scale}>
      <RoundedBox args={[3.3, 3.3, 0.35]} radius={0.16} smoothness={6}>
        <FrameMaterial kind={material} color={fgColor} />
      </RoundedBox>
      {texture && (
        <mesh position={[0, 0, 0.181]}>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
      {texture && doubleSided && (
        <mesh position={[0, 0, -0.181]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.7, 2.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

/** Cursor chases the QR — it flees when you get close. */
function RunawayScene() {
  const group = useRef<THREE.Group>(null);
  const pos = useRef(new THREE.Vector3(0, 0, 0));
  const vel = useRef(new THREE.Vector3());
  const { pointer, viewport } = useThree();
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const wobble = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (reducedMotion) {
      group.current.position.set(0, 0, 0);
      return;
    }

    const cursor = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0,
    );
    const toCursor = cursor.clone().sub(pos.current);
    const dist = toCursor.length();

    if (dist < 2.4 && dist > 0.001) {
      const flee = toCursor.normalize().multiplyScalar(-10 / Math.max(dist, 0.35));
      vel.current.add(flee.multiplyScalar(delta));
      wobble.current = Math.min(1, wobble.current + delta * 4);
    } else {
      // Gently return toward center when safe.
      vel.current.add(pos.current.clone().multiplyScalar(-0.8 * delta));
      wobble.current = Math.max(0, wobble.current - delta * 1.5);
    }

    vel.current.multiplyScalar(0.92);
    pos.current.add(vel.current.clone().multiplyScalar(delta));
    pos.current.x = THREE.MathUtils.clamp(pos.current.x, -3.2, 3.2);
    pos.current.y = THREE.MathUtils.clamp(pos.current.y, -2.2, 2.2);

    group.current.position.copy(pos.current);
    group.current.rotation.z = Math.sin(performance.now() / 90) * 0.18 * wobble.current;
    group.current.rotation.y += delta * (0.4 + wobble.current);
  });

  return (
    <group ref={group}>
      <QrTile autoSpin={false} scale={0.85} />
    </group>
  );
}

/** Soft toon materials for chibi characters. */
function ToonSkin({ color = "#ffd7b5" }: { color?: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.55}
      metalness={0}
      envMapIntensity={0.35}
    />
  );
}

function CartoonEye({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh scale={[1, 1.15, 0.7]}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} />
      </mesh>
      <mesh position={[0.01, 0, 0.055]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#1a3a4a" roughness={0.2} />
      </mesh>
      <mesh position={[0.025, 0.02, 0.085]}>
        <sphereGeometry args={[0.018, 10, 10]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

/** Chibi cartoon buddy holding the QR — not a stick-figure of capsules. */
function BuddyScene() {
  const body = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const accent = useQrStore((s) => s.style.fgColor);

  useFrame(({ clock }) => {
    if (!body.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    body.current.position.y = Math.sin(t * 2.1) * 0.06 - 0.55;
    body.current.rotation.y = Math.sin(t * 0.7) * 0.1;
  });

  return (
    <group ref={body} position={[0, -0.55, 0]}>
      {/* shoes */}
      <mesh position={[-0.22, -0.72, 0.08]} scale={[1.15, 0.55, 1.35]}>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshStandardMaterial color="#0f1c18" roughness={0.7} />
      </mesh>
      <mesh position={[0.22, -0.72, 0.08]} scale={[1.15, 0.55, 1.35]}>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshStandardMaterial color="#0f1c18" roughness={0.7} />
      </mesh>

      {/* legs */}
      <mesh position={[-0.2, -0.42, 0]}>
        <capsuleGeometry args={[0.11, 0.28, 8, 14]} />
        <meshStandardMaterial color="#1e3a32" roughness={0.65} />
      </mesh>
      <mesh position={[0.2, -0.42, 0]}>
        <capsuleGeometry args={[0.11, 0.28, 8, 14]} />
        <meshStandardMaterial color="#1e3a32" roughness={0.65} />
      </mesh>

      {/* hoodie torso */}
      <mesh position={[0, 0.12, 0]} scale={[1, 1.05, 0.9]}>
        <sphereGeometry args={[0.48, 28, 28]} />
        <meshStandardMaterial
          color={accent}
          roughness={0.55}
          metalness={0.08}
        />
      </mesh>
      {/* hoodie pocket */}
      <mesh position={[0, -0.02, 0.38]} scale={[1.1, 0.7, 0.35]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={accent} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* hoodie hood fluff */}
      <mesh position={[0, 0.55, -0.05]} scale={[1.15, 0.55, 0.9]}>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color={accent} roughness={0.6} />
      </mesh>

      {/* neck */}
      <mesh position={[0, 0.58, 0.05]}>
        <cylinderGeometry args={[0.12, 0.14, 0.12, 16]} />
        <ToonSkin />
      </mesh>

      {/* oversized chibi head */}
      <mesh position={[0, 0.95, 0.05]} scale={[1, 1.05, 0.95]}>
        <sphereGeometry args={[0.48, 36, 36]} />
        <ToonSkin />
      </mesh>

      {/* soft hair volume */}
      <mesh position={[0, 1.18, -0.05]} scale={[1.05, 0.7, 1]}>
        <sphereGeometry args={[0.42, 28, 28]} />
        <meshStandardMaterial color="#1a2e28" roughness={0.85} />
      </mesh>
      <mesh position={[-0.28, 1.15, 0.15]} scale={[0.7, 0.55, 0.65]}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <meshStandardMaterial color="#1a2e28" roughness={0.85} />
      </mesh>
      <mesh position={[0.28, 1.15, 0.15]} scale={[0.7, 0.55, 0.65]}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <meshStandardMaterial color="#1a2e28" roughness={0.85} />
      </mesh>
      {/* front bang */}
      <mesh position={[0, 1.22, 0.28]} scale={[1.2, 0.45, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1a2e28" roughness={0.85} />
      </mesh>

      {/* ears */}
      <mesh position={[-0.42, 0.98, 0]}>
        <sphereGeometry args={[0.09, 14, 14]} />
        <ToonSkin />
      </mesh>
      <mesh position={[0.42, 0.98, 0]}>
        <sphereGeometry args={[0.09, 14, 14]} />
        <ToonSkin />
      </mesh>

      <CartoonEye position={[-0.15, 0.98, 0.4]} />
      <CartoonEye position={[0.15, 0.98, 0.4]} />

      {/* blush */}
      <mesh position={[-0.28, 0.86, 0.36]} scale={[1.2, 0.7, 0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color="#ff8fab"
          transparent
          opacity={0.45}
          roughness={1}
        />
      </mesh>
      <mesh position={[0.28, 0.86, 0.36]} scale={[1.2, 0.7, 0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color="#ff8fab"
          transparent
          opacity={0.45}
          roughness={1}
        />
      </mesh>

      {/* nose */}
      <mesh position={[0, 0.9, 0.46]} scale={[0.7, 0.55, 0.5]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <ToonSkin color="#f0c09a" />
      </mesh>

      {/* smile */}
      <mesh position={[0, 0.78, 0.42]} rotation={[0.35, 0, 0]}>
        <torusGeometry args={[0.08, 0.016, 10, 20, Math.PI]} />
        <meshStandardMaterial color="#c45c6a" roughness={0.4} />
      </mesh>

      {/* arms */}
      <mesh position={[-0.58, 0.22, 0.25]} rotation={[0.55, 0.1, 0.85]}>
        <capsuleGeometry args={[0.1, 0.42, 8, 14]} />
        <ToonSkin />
      </mesh>
      <mesh position={[0.58, 0.22, 0.25]} rotation={[0.55, -0.1, -0.85]}>
        <capsuleGeometry args={[0.1, 0.42, 8, 14]} />
        <ToonSkin />
      </mesh>
      {/* hands */}
      <mesh position={[-0.42, 0.42, 0.72]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <ToonSkin />
      </mesh>
      <mesh position={[0.42, 0.42, 0.72]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <ToonSkin />
      </mesh>

      {/* QR held out front */}
      <group position={[0, 0.55, 0.95]} rotation={[-0.12, 0, 0]}>
        <QrTile scale={0.4} autoSpin={false} doubleSided={false} />
      </group>
    </group>
  );
}

function GiftBox({ packageStyle = false }: { packageStyle?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const accent = useQrStore((s) => s.style.fgColor);
  const lid = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      group.current.position.y = Math.sin(t * 1.6) * 0.04 - 0.35;
    }
    if (lid.current && !packageStyle) {
      lid.current.rotation.x = -0.08 + Math.sin(t * 1.2) * 0.05;
    }
  });

  const boxColor = packageStyle ? "#c4a574" : accent;
  const ribbon = packageStyle ? "#7a5a2e" : C.sky;

  return (
    <group ref={group}>
      {/* box body */}
      <RoundedBox args={[2.4, 1.5, 2.4]} radius={0.08} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={boxColor}
          roughness={packageStyle ? 0.85 : 0.35}
          metalness={packageStyle ? 0.05 : 0.25}
        />
      </RoundedBox>

      {packageStyle ? (
        <>
          {/* packing tape */}
          <mesh position={[0, 0.76, 0]}>
            <boxGeometry args={[2.45, 0.12, 0.45]} />
            <meshStandardMaterial color="#e8d9a8" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.76, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[2.45, 0.12, 0.45]} />
            <meshStandardMaterial color="#e8d9a8" roughness={0.7} />
          </mesh>
          {/* label stub */}
          <mesh position={[0.7, 0.2, 1.22]}>
            <boxGeometry args={[0.7, 0.45, 0.02]} />
            <meshStandardMaterial color="#fff8e7" />
          </mesh>
        </>
      ) : (
        <>
          {/* ribbon wrap */}
          <mesh position={[0, 0.05, 1.21]}>
            <boxGeometry args={[0.28, 1.55, 0.04]} />
            <meshStandardMaterial color={ribbon} metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[1.21, 0.05, 0]}>
            <boxGeometry args={[0.04, 1.55, 0.28]} />
            <meshStandardMaterial color={ribbon} metalness={0.4} roughness={0.3} />
          </mesh>
          {/* lid */}
          <mesh ref={lid} position={[0, 0.95, 0]}>
            <boxGeometry args={[2.55, 0.28, 2.55]} />
            <meshStandardMaterial color={boxColor} roughness={0.35} metalness={0.2} />
          </mesh>
          {/* bow */}
          <mesh position={[-0.22, 1.22, 0]} rotation={[0, 0, 0.4]}>
            <torusGeometry args={[0.18, 0.06, 8, 16]} />
            <meshStandardMaterial color={ribbon} metalness={0.5} roughness={0.25} />
          </mesh>
          <mesh position={[0.22, 1.22, 0]} rotation={[0, 0, -0.4]}>
            <torusGeometry args={[0.18, 0.06, 8, 16]} />
            <meshStandardMaterial color={ribbon} metalness={0.5} roughness={0.25} />
          </mesh>
          <mesh position={[0, 1.18, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </>
      )}

      {/* QR on top */}
      <group
        position={[0, packageStyle ? 1.15 : 1.45, 0]}
        rotation={[-0.55, 0.25, 0]}
      >
        <QrTile scale={0.48} autoSpin={false} doubleSided={false} />
      </group>
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
      arr[i * 3 + 1] =
        velocities[i * 3 + 1] * elapsed - 1.5 * elapsed * elapsed;
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color={C.sky}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Cursor magnet — QR sticks to / follows the pointer. */
function StickyScene() {
  const group = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const target = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!group.current) return;
    if (reducedMotion) {
      group.current.position.set(0, 0, 0);
      return;
    }
    target.current.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0,
    );
    group.current.position.lerp(target.current, 1 - Math.exp(-8 * delta));
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      pointer.x * 0.35,
      0.1,
    );
  });

  return (
    <group ref={group}>
      <QrTile autoSpin={false} scale={0.8} />
    </group>
  );
}

function BounceScene() {
  const qr = useRef<THREE.Group>(null);
  const mat = useRef<THREE.Mesh>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    // Bounce curve: abs(sin) with squash
    const b = Math.abs(Math.sin(t * 3.2));
    const impact = 1 - b; // 1 when on the mat

    if (qr.current) {
      qr.current.position.y = b * 1.85 - 0.15;
      const squash = 1 + impact * 0.28;
      qr.current.scale.set(squash, 1 / squash, squash);
      qr.current.rotation.y = t * 0.55;
    }
    if (mat.current) {
      // Mat dips when the QR lands
      mat.current.scale.y = 1 - impact * 0.45;
      mat.current.position.y = -1.18 - impact * 0.08;
    }
  });

  const legPositions: [number, number][] = [
    [-1.15, -1.15],
    [1.15, -1.15],
    [-1.15, 1.15],
    [1.15, 1.15],
  ];

  return (
    <group>
      {/* floor shadow disc */}
      <mesh position={[0, -1.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.9, 40]} />
        <meshStandardMaterial
          color="#061210"
          transparent
          opacity={0.45}
          roughness={1}
        />
      </mesh>

      {/* padded outer frame */}
      <mesh position={[0, -1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.18, 18, 48]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.35} metalness={0.15} />
      </mesh>
      {/* soft safety pad stripe on frame */}
      <mesh position={[0, -1.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.1, 12, 48]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.45} metalness={0.05} />
      </mesh>

      {/* bouncing fabric mat */}
      <mesh ref={mat} position={[0, -1.18, 0]} scale={[1, 0.22, 1]}>
        <sphereGeometry args={[1.35, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.55}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* mat center stitch / logo ring */}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.48, 32]} />
        <meshStandardMaterial color="#d97706" roughness={0.6} />
      </mesh>

      {/* springs around the rim */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x = Math.cos(a) * 1.42;
        const z = Math.sin(a) * 1.42;
        return (
          <mesh key={`spring-${i}`} position={[x, -1.28, z]}>
            <cylinderGeometry args={[0.04, 0.04, 0.28, 8]} />
            <meshStandardMaterial
              color="#cbd5e1"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        );
      })}

      {/* legs + feet */}
      {legPositions.map(([x, z], i) => (
        <group key={`leg-${i}`} position={[x, 0, z]}>
          <mesh position={[0, -1.58, 0]}>
            <cylinderGeometry args={[0.07, 0.09, 0.7, 10]} />
            <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0, -1.9, 0]} scale={[1.4, 0.35, 1.4]}>
            <sphereGeometry args={[0.14, 14, 14]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
        </group>
      ))}

      <group ref={qr}>
        <QrTile autoSpin={false} scale={0.52} />
      </group>
    </group>
  );
}

function UfoScene() {
  const ufo = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);
  const qr = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ufo.current && !reducedMotion) {
      ufo.current.position.x = Math.sin(t * 0.7) * 0.6;
      ufo.current.rotation.y = t * 0.8;
    }
    if (qr.current && !reducedMotion) {
      // Float up and down in the beam
      qr.current.position.y = -0.2 + Math.sin(t * 1.8) * 0.55;
      qr.current.rotation.y = t * 1.2;
    }
    if (beam.current) {
      const mat = beam.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + Math.sin(t * 4) * 0.06;
    }
  });

  return (
    <group>
      <group ref={ufo} position={[0, 1.8, 0]}>
        <mesh>
          <sphereGeometry args={[0.55, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c0d4ff" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.05, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.35, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={C.sky} emissive={C.sky} emissiveIntensity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
          <torusGeometry args={[0.75, 0.14, 12, 40]} />
          <meshStandardMaterial color={C.emerald} metalness={0.7} roughness={0.25} />
        </mesh>
        {/* lights */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 0.75,
              -0.08,
              Math.sin((i / 6) * Math.PI * 2) * 0.75,
            ]}
          >
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial
              color={i % 2 ? C.sky : C.amber}
              emissive={i % 2 ? C.sky : C.amber}
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>
      {/* abduction beam */}
      <mesh ref={beam} position={[0, 0.2, 0]}>
        <coneGeometry args={[1.1, 2.8, 24, 1, true]} />
        <meshBasicMaterial
          color={C.sky}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <group ref={qr} position={[0, 0, 0]}>
        <QrTile autoSpin={false} scale={0.45} />
      </group>
    </group>
  );
}

function RocketScene() {
  const rocket = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const accent = useQrStore((s) => s.style.fgColor);

  useFrame(({ clock }) => {
    if (!rocket.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    rocket.current.position.y = Math.sin(t * 2) * 0.15 + Math.min(t * 0.02, 0.4);
    rocket.current.rotation.z = Math.sin(t * 3) * 0.05;
  });

  return (
    <group ref={rocket} position={[0, -0.3, 0]}>
      {/* body */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 1.8, 20]} />
        <meshStandardMaterial color="#eef0ff" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* nose */}
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.45, 0.7, 20]} />
        <meshStandardMaterial color={accent} metalness={0.4} roughness={0.35} />
      </mesh>
      {/* fins */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 0.55,
            -0.35,
            Math.sin((i / 3) * Math.PI * 2) * 0.55,
          ]}
          rotation={[0, (i / 3) * Math.PI * 2, 0.4]}
        >
          <boxGeometry args={[0.08, 0.55, 0.35]} />
          <meshStandardMaterial color={C.sky} />
        </mesh>
      ))}
      {/* flame */}
      <mesh position={[0, -0.7, 0]}>
        <coneGeometry args={[0.28, 0.7, 12]} />
        <meshStandardMaterial
          color="#ff8a3d"
          emissive={C.amber}
          emissiveIntensity={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* QR on side */}
      <group position={[0.58, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <QrTile autoSpin={false} scale={0.28} doubleSided={false} />
      </group>
    </group>
  );
}

function DiscoScene() {
  const floor = useRef<THREE.Group>(null);
  const qr = useRef<THREE.Group>(null);
  const lights = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (qr.current && !reducedMotion) {
      qr.current.rotation.y = t * 2.5;
      qr.current.rotation.x = Math.sin(t * 3) * 0.3;
      qr.current.position.y = Math.sin(t * 5) * 0.2 + 0.3;
    }
    if (lights.current && !reducedMotion) {
      lights.current.rotation.y = t * 1.5;
    }
  });

  const tiles = [];
  for (let x = -2; x <= 2; x++) {
    for (let z = -2; z <= 2; z++) {
      const odd = (x + z) % 2 === 0;
      tiles.push(
        <mesh key={`${x}-${z}`} position={[x * 0.7, -1.2, z * 0.7]}>
          <boxGeometry args={[0.65, 0.08, 0.65]} />
          <meshStandardMaterial
            color={odd ? C.emerald : C.sky}
            emissive={odd ? C.emerald : C.sky}
            emissiveIntensity={0.35}
            roughness={0.4}
          />
        </mesh>,
      );
    }
  }

  return (
    <group>
      <group ref={floor}>{tiles}</group>
      <group ref={lights}>
        {[0, 1, 2, 3].map((i) => (
          <pointLight
            key={i}
            intensity={20}
            distance={8}
            color={[C.amber, C.sky, C.emerald, C.teal][i]}
            position={[
              Math.cos((i / 4) * Math.PI * 2) * 2.2,
              1.5,
              Math.sin((i / 4) * Math.PI * 2) * 2.2,
            ]}
          />
        ))}
      </group>
      {/* disco ball */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} />
      </mesh>
      <group ref={qr}>
        <QrTile autoSpin={false} scale={0.6} />
      </group>
    </group>
  );
}

function SandwichScene() {
  const stack = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    if (stack.current) {
      stack.current.rotation.y = Math.sin(t * 0.55) * 0.2;
      stack.current.position.y = Math.sin(t * 1.4) * 0.04 - 0.15;
    }
    if (lid.current) {
      // Soft “open sandwich” bob so the QR peeks out
      lid.current.position.y = 0.02 + Math.sin(t * 1.8) * 0.04;
      lid.current.rotation.x = -0.08 + Math.sin(t * 1.2) * 0.03;
    }
  });

  const sesame: [number, number, number][] = [
    [0.35, 0.08, 0.25],
    [-0.4, 0.1, 0.15],
    [0.1, 0.14, -0.35],
    [-0.2, 0.12, -0.2],
    [0.45, 0.06, -0.15],
    [-0.45, 0.07, 0.35],
    [0.0, 0.16, 0.05],
    [0.25, 0.09, 0.45],
    [-0.15, 0.11, 0.4],
  ];

  return (
    <group ref={stack} position={[0, -0.15, 0]}>
      {/* bottom bun — soft rounded loaf */}
      <mesh position={[0, -0.72, 0]} scale={[1, 0.55, 1]}>
        <sphereGeometry args={[1.15, 32, 24]} />
        <meshStandardMaterial color="#e8c48a" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[1.15, 1.18, 0.22, 32]} />
        <meshStandardMaterial color="#f0d4a0" roughness={0.8} />
      </mesh>
      {/* toasted face on bottom bun */}
      <mesh position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 32]} />
        <meshStandardMaterial color="#d4a66a" roughness={0.9} />
      </mesh>

      {/* lettuce — ruffled layers */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={`lettuce-${i}`}
            position={[
              Math.cos(a) * 0.12,
              -0.32,
              Math.sin(a) * 0.12,
            ]}
            rotation={[-0.15 + i * 0.05, a * 0.3, i * 0.2]}
            scale={[1.05 + (i % 2) * 0.08, 0.12, 1.05]}
          >
            <sphereGeometry args={[1.05, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial
              color={i % 2 ? "#5ecf5a" : "#3daf48"}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}

      {/* burger patty */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[1.05, 1.08, 0.22, 28]} />
        <meshStandardMaterial color="#5c3317" roughness={0.75} />
      </mesh>
      {/* grill marks */}
      {[-0.35, 0, 0.35].map((x, i) => (
        <mesh key={`grill-${i}`} position={[x, -0.06, 0]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.1, 0.02, 1.7]} />
          <meshStandardMaterial color="#3d2010" roughness={0.9} />
        </mesh>
      ))}

      {/* cheese — slightly melted overhang */}
      <mesh position={[0.05, 0.0, 0.02]} rotation={[0.02, 0.12, 0.04]}>
        <RoundedBox args={[2.0, 0.06, 2.0]} radius={0.04}>
          <meshStandardMaterial color="#f5c542" roughness={0.45} metalness={0.05} />
        </RoundedBox>
      </mesh>
      <mesh position={[0.85, -0.05, 0.55]} rotation={[0.4, 0.2, 0.3]} scale={[1, 0.35, 0.7]}>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshStandardMaterial color="#f5c542" roughness={0.45} />
      </mesh>

      {/* tomato slices */}
      <mesh position={[-0.35, 0.12, 0.15]} rotation={[0.05, 0.2, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 24]} />
        <meshStandardMaterial color="#e53935" roughness={0.4} />
      </mesh>
      <mesh position={[0.4, 0.14, -0.1]} rotation={[-0.04, -0.15, 0.05]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 24]} />
        <meshStandardMaterial color="#d32f2f" roughness={0.4} />
      </mesh>
      {/* tomato seeds hint */}
      <mesh position={[-0.35, 0.17, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.28, 16]} />
        <meshStandardMaterial color="#ffcdd2" roughness={0.6} />
      </mesh>

      {/* top bun group */}
      <group ref={lid} position={[0, 0.72, 0]}>
        <mesh scale={[1.05, 0.75, 1.05]}>
          <sphereGeometry args={[1.15, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d4a017" roughness={0.7} />
        </mesh>
        {/* lighter crust rim */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 1.15, 32]} />
          <meshStandardMaterial color="#c4922e" roughness={0.75} />
        </mesh>
        {/* sesame seeds */}
        {sesame.map(([x, y, z], i) => (
          <mesh
            key={`seed-${i}`}
            position={[x, 0.55 + y, z]}
            rotation={[0.2 + i * 0.15, i * 0.7, 0.25]}
            scale={[1.4, 0.55, 0.8]}
          >
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#f7edd4" roughness={0.65} />
          </mesh>
        ))}
      </group>

      {/* Burger pick + QR mounted together so the code sits on the stick tip */}
      <group position={[0, 0.95, 0.55]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.028, 0.032, 1.1, 10]} />
          <meshStandardMaterial color="#c9a56a" roughness={0.8} />
        </mesh>
        {/* tiny knob under the card */}
        <mesh position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color="#b89560" roughness={0.7} />
        </mesh>
        <group position={[0, 1.22, 0.02]} rotation={[-0.05, 0.04, 0]}>
          <QrTile autoSpin={false} scale={0.28} doubleSided={false} />
        </group>
      </group>
    </group>
  );
}

function BalloonScene() {
  const balloon = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const accent = useQrStore((s) => s.style.fgColor);

  useFrame(({ clock }) => {
    if (!balloon.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    balloon.current.position.y = Math.sin(t * 0.9) * 0.2;
    balloon.current.rotation.z = Math.sin(t * 0.7) * 0.08;
    balloon.current.position.x = Math.sin(t * 0.4) * 0.25;
  });

  return (
    <group ref={balloon}>
      {/* balloon */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[1.1, 28, 28]} />
        <meshStandardMaterial color={accent} roughness={0.35} metalness={0.15} />
      </mesh>
      {/* basket */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.55, 8]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.85} />
      </mesh>
      {/* ropes */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2 + 0.4) * 0.55,
            0.45,
            Math.sin((i / 4) * Math.PI * 2 + 0.4) * 0.55,
          ]}
        >
          <cylinderGeometry args={[0.015, 0.015, 1.8, 6]} />
          <meshStandardMaterial color="#ddd" />
        </mesh>
      ))}
      {/* QR hanging under basket */}
      <group position={[0, -1.15, 0]} rotation={[-0.2, 0, 0]}>
        <QrTile autoSpin={false} scale={0.38} />
      </group>
    </group>
  );
}

function DuckScene() {
  const duck = useRef<THREE.Group>(null);
  const wing = useRef<THREE.Mesh>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    if (duck.current) {
      duck.current.position.y = Math.sin(t * 2.2) * 0.07 - 0.15;
      duck.current.rotation.y = Math.sin(t * 0.75) * 0.18;
    }
    if (wing.current) {
      wing.current.rotation.z = 0.35 + Math.sin(t * 4) * 0.18;
    }
  });

  return (
    <group ref={duck}>
      {/* plump body */}
      <mesh position={[0, 0, 0]} scale={[1.25, 0.95, 1.1]}>
        <sphereGeometry args={[0.85, 36, 36]} />
        <meshStandardMaterial color="#ffe566" roughness={0.4} />
      </mesh>
      {/* belly */}
      <mesh position={[0.15, -0.1, 0.35]} scale={[0.9, 0.85, 0.55]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#fff4b8" roughness={0.5} />
      </mesh>
      {/* head */}
      <mesh position={[0.75, 0.85, 0]} scale={[1, 1.05, 1]}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial color="#ffe566" roughness={0.4} />
      </mesh>
      {/* cheek fluff */}
      <mesh position={[0.95, 0.7, 0.28]} scale={[0.7, 0.55, 0.5]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color="#ffd24a" roughness={0.5} />
      </mesh>
      {/* beak upper */}
      <mesh position={[1.28, 0.78, 0]} rotation={[0, 0, -0.15]} scale={[1.2, 0.55, 0.85]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#ff8a3d" roughness={0.45} />
      </mesh>
      {/* beak lower */}
      <mesh position={[1.22, 0.68, 0]} rotation={[0.15, 0, -0.1]} scale={[1, 0.35, 0.7]}>
        <sphereGeometry args={[0.14, 14, 14]} />
        <meshStandardMaterial color="#f07830" roughness={0.5} />
      </mesh>
      {/* cartoon eye */}
      <group position={[0.95, 0.98, 0.32]}>
        <mesh scale={[1, 1.2, 0.65]}>
          <sphereGeometry args={[0.11, 18, 18]} />
          <meshStandardMaterial color="#ffffff" roughness={0.25} />
        </mesh>
        <mesh position={[0.02, 0, 0.06]}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshStandardMaterial color="#1a2a20" />
        </mesh>
        <mesh position={[0.035, 0.025, 0.095]}>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.45}
          />
        </mesh>
      </group>
      {/* wing */}
      <mesh
        ref={wing}
        position={[-0.15, 0.15, 0.78]}
        rotation={[0.25, 0.15, 0.35]}
        scale={[0.85, 0.55, 1.15]}
      >
        <sphereGeometry args={[0.4, 20, 20]} />
        <meshStandardMaterial color="#f5d76e" roughness={0.45} />
      </mesh>
      {/* feet */}
      <mesh position={[0.15, -0.75, 0.35]} scale={[1.4, 0.35, 0.9]} rotation={[0, 0.2, 0]}>
        <sphereGeometry args={[0.18, 14, 14]} />
        <meshStandardMaterial color="#ff8a3d" roughness={0.55} />
      </mesh>
      <mesh position={[-0.2, -0.75, 0.2]} scale={[1.3, 0.35, 0.85]} rotation={[0, -0.15, 0]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color="#ff8a3d" roughness={0.55} />
      </mesh>
      {/* QR hat */}
      <group position={[0.2, 1.45, 0]} rotation={[-0.3, 0.35, 0]}>
        <QrTile autoSpin={false} scale={0.3} doubleSided={false} />
      </group>
    </group>
  );
}

function RainDrop({
  texture,
  seed,
}: {
  texture: THREE.Texture | null;
  seed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const x = ((seed * 47) % 100) / 100 * 6 - 3;
  const z = ((seed * 73) % 100) / 100 * 4 - 2;
  const speed = 1.4 + (seed % 7) * 0.18;
  const startY = 2.5 + (seed % 5) * 0.45;
  const rot = (seed % 10) * 0.2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + seed;
    const y = startY - ((t * 1.6) % 5.5);
    ref.current.position.set(x + Math.sin(t * 0.4) * 0.15, y, z);
    ref.current.rotation.z = rot + Math.sin(t) * 0.15;
  });

  return (
    <group ref={ref} scale={0.12 + (seed % 4) * 0.02}>
      <mesh>
        <planeGeometry args={[2.2, 2.2]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.95} />
        ) : (
          <meshStandardMaterial color={C.emerald} />
        )}
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshStandardMaterial color="#0c241c" />
      </mesh>
    </group>
  );
}

function Cloud({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.x =
      position[0] + Math.sin(clock.getElapsedTime() * 0.15 + position[2]) * 0.25;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 18, 18]} />
        <meshStandardMaterial color="#e8f1f8" roughness={1} />
      </mesh>
      <mesh position={[0.45, -0.05, 0.1]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#dce8f2" roughness={1} />
      </mesh>
      <mesh position={[-0.4, -0.08, 0.05]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#f2f7fb" roughness={1} />
      </mesh>
      <mesh position={[0.1, 0.28, -0.05]}>
        <sphereGeometry args={[0.35, 14, 14]} />
        <meshStandardMaterial color="#eef5fa" roughness={1} />
      </mesh>
    </group>
  );
}

/** Tiny romantic partner for the rainy road scene. */
function RainPartner({
  side,
  accent,
}: {
  side: "left" | "right";
  accent: string;
}) {
  const dir = side === "left" ? -1 : 1;
  const lean = side === "left" ? 0.12 : -0.12;

  return (
    <group position={[dir * 0.38, -1.15, 0.2]} rotation={[0, -dir * 0.35, lean]}>
      {/* legs */}
      <mesh position={[-0.08, -0.35, 0]}>
        <capsuleGeometry args={[0.07, 0.22, 6, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      <mesh position={[0.08, -0.35, 0]}>
        <capsuleGeometry args={[0.07, 0.22, 6, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      {/* body */}
      <mesh position={[0, 0.05, 0]} scale={[0.9, 1.05, 0.75]}>
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshStandardMaterial color={accent} roughness={0.55} />
      </mesh>
      {/* head */}
      <mesh position={[0, 0.48, 0.02]}>
        <sphereGeometry args={[0.22, 22, 22]} />
        <ToonSkin />
      </mesh>
      {/* hair */}
      <mesh
        position={[0, 0.58, -0.02]}
        scale={side === "right" ? [1.05, 0.7, 1] : [1, 0.55, 0.95]}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={side === "left" ? "#1a2e28" : "#4a2c1a"}
          roughness={0.85}
        />
      </mesh>
      {side === "right" && (
        <mesh position={[0.12, 0.35, 0.05]} scale={[0.5, 1.1, 0.4]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#4a2c1a" roughness={0.85} />
        </mesh>
      )}
      {/* eyes */}
      <mesh position={[-0.06, 0.5, 0.18]}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshStandardMaterial color="#0c1824" />
      </mesh>
      <mesh position={[0.06, 0.5, 0.18]}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshStandardMaterial color="#0c1824" />
      </mesh>
      {/* blush */}
      <mesh position={[-0.12, 0.44, 0.16]} scale={[1.2, 0.7, 0.4]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ff8fab" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.12, 0.44, 0.16]} scale={[1.2, 0.7, 0.4]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ff8fab" transparent opacity={0.5} />
      </mesh>
      {/* outer arm toward partner */}
      <mesh
        position={[dir * -0.22, 0.05, 0.12]}
        rotation={[0.4, 0, dir * -0.9]}
      >
        <capsuleGeometry args={[0.055, 0.28, 6, 10]} />
        <ToonSkin />
      </mesh>
    </group>
  );
}

function RainRomanceScene() {
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const accent = useQrStore((s) => s.style.fgColor);
  const qrDataUrl = useQrStore((s) => s.qrDataUrl);
  const texture = useQrTexture(qrDataUrl);
  const couple = useRef<THREE.Group>(null);
  const heart = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    if (couple.current) {
      couple.current.position.y = Math.sin(t * 1.6) * 0.03;
    }
    if (heart.current) {
      heart.current.position.y = 0.35 + Math.sin(t * 2.2) * 0.08;
      heart.current.scale.setScalar(0.9 + Math.sin(t * 3) * 0.08);
    }
  });

  const drops = useMemo(() => Array.from({ length: 14 }, (_, i) => i + 1), []);

  return (
    <group>
      {/* dusky sky plate */}
      <mesh position={[0, 1.8, -4]}>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color="#1a2f3d" roughness={1} />
      </mesh>

      <Cloud position={[-2.2, 2.35, -1.2]} scale={1.15} />
      <Cloud position={[0.3, 2.55, -0.8]} scale={1.35} />
      <Cloud position={[2.4, 2.3, -1.5]} scale={1.05} />
      <Cloud position={[-0.8, 2.1, 0.2]} scale={0.85} />

      {/* raining QR codes */}
      {drops.map((seed) => (
        <RainDrop key={seed} texture={texture} seed={seed} />
      ))}

      {/* wet road */}
      <mesh position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#2a3340" metalness={0.35} roughness={0.35} />
      </mesh>
      {/* center dashes */}
      {[-1.5, -0.5, 0.5, 1.5].map((z, i) => (
        <mesh
          key={`dash-${i}`}
          position={[0, -1.84, z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.12, 0.55]} />
          <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.15} />
        </mesh>
      ))}
      {/* sidewalks */}
      <mesh position={[-2.6, -1.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 5]} />
        <meshStandardMaterial color="#3d4654" roughness={0.9} />
      </mesh>
      <mesh position={[2.6, -1.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 5]} />
        <meshStandardMaterial color="#3d4654" roughness={0.9} />
      </mesh>

      {/* romantic couple */}
      <group ref={couple}>
        <RainPartner side="left" accent={accent} />
        <RainPartner side="right" accent={C.sky} />
        {/* shared umbrella */}
        <mesh position={[0, 0.15, 0.15]}>
          <cylinderGeometry args={[0.025, 0.025, 1.5, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.95, 0.15]} rotation={[0.15, 0, 0]}>
          <sphereGeometry args={[0.85, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#ef4444"
            roughness={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* floating heart */}
        <group ref={heart} position={[0, 0.35, 0.55]}>
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, -0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.16, 0.16, 0.08]} />
            <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={0.25} />
          </mesh>
        </group>
        {/* big QR held between them like a shared photo */}
        <group position={[0, -0.35, 0.55]} rotation={[-0.15, 0, 0]}>
          <QrTile autoSpin={false} scale={0.22} doubleSided={false} />
        </group>
      </group>
    </group>
  );
}

function SceneContent({ mode }: { mode: SceneMode }) {
  switch (mode) {
    case "runaway":
      return <RunawayScene />;
    case "sticky":
      return <StickyScene />;
    case "buddy":
      return <BuddyScene />;
    case "bounce":
      return <BounceScene />;
    case "ufo":
      return <UfoScene />;
    case "rocket":
      return <RocketScene />;
    case "disco":
      return <DiscoScene />;
    case "sandwich":
      return <SandwichScene />;
    case "balloon":
      return <BalloonScene />;
    case "duck":
      return <DuckScene />;
    case "rain":
      return <RainRomanceScene />;
    case "gift":
      return <GiftBox />;
    case "package":
      return <GiftBox packageStyle />;
    case "showcase":
    default:
      return <QrTile />;
  }
}

export default function QRScene() {
  const sceneMode = useQrStore((s) => s.sceneMode);
  const enableOrbit = sceneMode !== "runaway" && sceneMode !== "sticky";

  return (
    <Canvas
      camera={{ position: [0, 0.4, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color={C.sky} />
      <pointLight position={[3, -3, 4]} intensity={30} color={C.amber} />
      <SceneContent mode={sceneMode} />
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
          color={C.emerald}
        />
        <Lightformer
          intensity={1.8}
          position={[4, -1, 2]}
          scale={[3, 5, 1]}
          color={C.sky}
        />
        <Lightformer
          intensity={1.4}
          position={[0, -3, 2]}
          scale={[5, 2, 1]}
          color={C.amber}
        />
      </Environment>
      {enableOrbit && (
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          enableDamping
        />
      )}
    </Canvas>
  );
}
