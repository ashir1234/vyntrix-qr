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

/** Simple cute character holding the QR. */
function BuddyScene() {
  const body = useRef<THREE.Group>(null);
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);
  const accent = useQrStore((s) => s.style.fgColor);

  useFrame(({ clock }) => {
    if (!body.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    body.current.position.y = Math.sin(t * 2.2) * 0.08;
    body.current.rotation.y = Math.sin(t * 0.8) * 0.12;
  });

  return (
    <group ref={body} position={[0, -0.6, 0]}>
      {/* legs */}
      <mesh position={[-0.28, -0.55, 0]}>
        <capsuleGeometry args={[0.14, 0.35, 6, 12]} />
        <meshStandardMaterial color="#2a1a4a" roughness={0.6} />
      </mesh>
      <mesh position={[0.28, -0.55, 0]}>
        <capsuleGeometry args={[0.14, 0.35, 6, 12]} />
        <meshStandardMaterial color="#2a1a4a" roughness={0.6} />
      </mesh>
      {/* torso */}
      <mesh position={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.42, 0.55, 8, 16]} />
        <meshStandardMaterial color={accent} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* head */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color="#f2e9ff" roughness={0.45} />
      </mesh>
      {/* eyes */}
      <mesh position={[-0.12, 1.1, 0.32]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#0c1824" />
      </mesh>
      <mesh position={[0.12, 1.1, 0.32]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#0c1824" />
      </mesh>
      {/* smile */}
      <mesh position={[0, 0.96, 0.34]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#0c1824" />
      </mesh>
      {/* arms holding QR */}
      <mesh position={[-0.75, 0.35, 0.35]} rotation={[0.4, 0, 0.5]}>
        <capsuleGeometry args={[0.1, 0.45, 6, 10]} />
        <meshStandardMaterial color="#f2e9ff" roughness={0.5} />
      </mesh>
      <mesh position={[0.75, 0.35, 0.35]} rotation={[0.4, 0, -0.5]}>
        <capsuleGeometry args={[0.1, 0.45, 6, 10]} />
        <meshStandardMaterial color="#f2e9ff" roughness={0.5} />
      </mesh>
      {/* QR in hands */}
      <group position={[0, 0.55, 0.95]} rotation={[-0.15, 0, 0]}>
        <QrTile scale={0.42} autoSpin={false} doubleSided={false} />
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
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    if (!qr.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    // Bounce curve: abs(sin) with squash
    const b = Math.abs(Math.sin(t * 3.2));
    qr.current.position.y = b * 1.8 - 0.4;
    const squash = 1 + (1 - b) * 0.25;
    qr.current.scale.set(squash, 1 / squash, squash);
    qr.current.rotation.y = t * 0.6;
  });

  return (
    <group>
      {/* trampoline */}
      <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 32]} />
        <meshStandardMaterial color={C.amber} metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0, -1.45, 0]}>
        <torusGeometry args={[1.6, 0.12, 12, 32]} />
        <meshStandardMaterial color={C.sky} metalness={0.4} roughness={0.3} />
      </mesh>
      {/* legs */}
      {[
        [-1.1, -1.1],
        [1.1, -1.1],
        [-1.1, 1.1],
        [1.1, 1.1],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, -1.7, z]}>
          <cylinderGeometry args={[0.08, 0.08, 0.55, 8]} />
          <meshStandardMaterial color="#2a1a4a" />
        </mesh>
      ))}
      <group ref={qr}>
        <QrTile autoSpin={false} scale={0.55} />
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
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    if (!stack.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    stack.current.rotation.y = Math.sin(t * 0.6) * 0.25;
    stack.current.position.y = Math.sin(t * 1.5) * 0.05;
  });

  return (
    <group ref={stack} position={[0, -0.2, 0]}>
      {/* bottom bun */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[1.3, 1.35, 0.35, 24]} />
        <meshStandardMaterial color="#e8b86d" roughness={0.8} />
      </mesh>
      {/* lettuce */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.08, 24]} />
        <meshStandardMaterial color="#4caf50" roughness={0.7} />
      </mesh>
      {/* QR filling */}
      <group position={[0, 0.05, 0]} rotation={[-0.4, 0.2, 0]}>
        <QrTile autoSpin={false} scale={0.5} doubleSided={false} />
      </group>
      {/* tomato */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.12, 24]} />
        <meshStandardMaterial color="#e53935" roughness={0.5} />
      </mesh>
      {/* top bun */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[1.3, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4a017" roughness={0.75} />
      </mesh>
      {/* sesame seeds */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 0.55,
            1.15,
            Math.sin((i / 6) * Math.PI * 2) * 0.55,
          ]}
        >
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial color="#f5e6c8" />
        </mesh>
      ))}
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
  const reducedMotion = useQrStore((s) => s.settings.reducedMotion);

  useFrame(({ clock }) => {
    if (!duck.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    duck.current.position.y = Math.sin(t * 2) * 0.08 - 0.2;
    duck.current.rotation.y = Math.sin(t * 0.8) * 0.2;
  });

  return (
    <group ref={duck}>
      {/* body */}
      <mesh position={[0, 0, 0]} scale={[1.2, 0.85, 1]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial color="#ffe566" roughness={0.45} />
      </mesh>
      {/* head */}
      <mesh position={[0.7, 0.75, 0]}>
        <sphereGeometry args={[0.45, 20, 20]} />
        <meshStandardMaterial color="#ffe566" roughness={0.45} />
      </mesh>
      {/* beak */}
      <mesh position={[1.2, 0.7, 0]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.16, 0.4, 12]} />
        <meshStandardMaterial color="#ff8a3d" roughness={0.5} />
      </mesh>
      {/* eye */}
      <mesh position={[0.9, 0.9, 0.28]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#0c1824" />
      </mesh>
      {/* wing */}
      <mesh position={[-0.1, 0.15, 0.75]} rotation={[0.3, 0.2, 0.4]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial color="#f5d76e" roughness={0.5} />
      </mesh>
      {/* QR hat */}
      <group position={[0.15, 1.35, 0]} rotation={[-0.35, 0.4, 0]}>
        <QrTile autoSpin={false} scale={0.32} doubleSided={false} />
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
