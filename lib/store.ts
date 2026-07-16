import { create } from "zustand";
import { buildQrData } from "./qr/content";
import type {
  MaterialKind,
  QrContentType,
  QrFields,
  QrPreset,
  QrStyle,
  SceneMode,
  View2dMode,
  FrameKind,
} from "./qr/types";

export interface DynamicResult {
  slug: string;
  shortUrl: string;
  manageUrl: string;
  editToken: string;
  destination: string;
}

const defaultFields: QrFields = {
  url: "",
  text: "Hello from Vyntrix QR ✨",
  wifiSsid: "MyNetwork",
  wifiPassword: "supersecret",
  wifiEncryption: "WPA",
  wifiHidden: false,
  vcFirstName: "Ada",
  vcLastName: "Lovelace",
  vcOrg: "Analytical Engines",
  vcTitle: "Founder", 
  vcPhone: "+1 555 0100",
  vcEmail: "ada@example.com",
  vcUrl: "https://example.com",
  emailTo: "hello@example.com",
  emailSubject: "Hey there",
  emailBody: "Scanned your QR!",
  smsTo: "+15550100",
  smsBody: "Hi!",
  phoneNumber: "+15550100",
  imageUrl: "https://picsum.photos/800",
  locLat: "40.7128",
  locLng: "-74.0060",
  locLabel: "New York City",
};

const defaultStyle: QrStyle = {
  fgColor: "#f59e0b",
  bgColor: "#fffbeb",
  useGradient: true,
  gradientColor: "#fbbf24",
  gradientType: "linear",
  dotType: "star",
  cornerSquareType: "extra-rounded",
  cornerDotType: "dot",
  errorCorrection: "Q",
  margin: 8,
  logoDataUrl: null,
  logoSize: 0.4,
};

export const PRESETS: QrPreset[] = [
  {
    id: "neon",
    name: "Neon",
    material: "holographic",
    style: {
      fgColor: "#10b981",
      gradientColor: "#38bdf8",
      bgColor: "#ffffff",
      useGradient: true,
      dotType: "rounded",
      cornerSquareType: "extra-rounded",
    },
  },
  {
    id: "electric",
    name: "Electric",
    material: "holographic",
    style: {
      fgColor: "#38bdf8",
      gradientColor: "#10b981",
      bgColor: "#0c1613",
      useGradient: true,
      dotType: "extra-rounded",
      cornerSquareType: "extra-rounded",
    },
  },
  {
    id: "glass",
    name: "Glass",
    material: "glass",
    style: {
      fgColor: "#e6ecff",
      gradientColor: "#9db4ff",
      bgColor: "#111634",
      useGradient: true,
      dotType: "dots",
      cornerSquareType: "dot",
    },
  },
  {
    id: "wood",
    name: "Sunset",
    material: "matte",
    style: {
      fgColor: "#ff7a45",
      gradientColor: "#f59e0b",
      bgColor: "#120a06",
      useGradient: true,
      dotType: "classy-rounded",
      cornerSquareType: "extra-rounded",
    },
  },
  {
    id: "chrome",
    name: "Chrome",
    material: "metallic",
    style: {
      fgColor: "#dfe7ff",
      gradientColor: "#8ea3c8",
      bgColor: "#f8fafc",
      useGradient: true,
      dotType: "square",
      cornerSquareType: "square",
      cornerDotType: "square",
    },
  },
  {
    id: "mono",
    name: "Ink",
    material: "matte",
    style: {
      fgColor: "#0b0c14",
      bgColor: "#ffffff",
      useGradient: false,
      dotType: "square",
      cornerSquareType: "square",
      cornerDotType: "square",
    },
  },
  {
    id: "mint",
    name: "Aurora",
    material: "holographic",
    style: {
      fgColor: "#00ffa3",
      gradientColor: "#00b3ff",
      bgColor: "#03130f",
      useGradient: true,
      dotType: "extra-rounded",
      cornerSquareType: "extra-rounded",
    },
  },
  {
    id: "heart",
    name: "Heart",
    material: "matte",
    style: {
      fgColor: "#e11d48",
      gradientColor: "#fb7185",
      bgColor: "#fff1f2",
      useGradient: true,
      dotType: "heart",
      cornerSquareType: "extra-rounded",
      cornerDotType: "dot",
    },
  },
  {
    id: "diamond",
    name: "Diamond",
    material: "metallic",
    style: {
      fgColor: "#0ea5e9",
      gradientColor: "#38bdf8",
      bgColor: "#f0f9ff",
      useGradient: true,
      dotType: "diamond",
      cornerSquareType: "extra-rounded",
    },
  },
  {
    id: "starlight",
    name: "Starlight",
    material: "holographic",
    style: {
      fgColor: "#f59e0b",
      gradientColor: "#fbbf24",
      bgColor: "#fffbeb",
      useGradient: true,
      dotType: "star",
      cornerSquareType: "extra-rounded",
    },
  },
];

interface Settings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  autoRotate: boolean;
}

interface QrStore {
  type: QrContentType;
  fields: QrFields;
  style: QrStyle;
  material: MaterialKind;
  sceneMode: SceneMode;
  view2dMode: View2dMode;
  frame: FrameKind;
  frameLabel: string;
  settings: Settings;
  qrDataUrl: string | null;
  generations: number;
  dynamicEnabled: boolean;
  dynamic: DynamicResult | null;

  setType: (type: QrContentType) => void;
  setField: <K extends keyof QrFields>(key: K, value: QrFields[K]) => void;
  setStyle: <K extends keyof QrStyle>(key: K, value: QrStyle[K]) => void;
  setMaterial: (m: MaterialKind) => void;
  setSceneMode: (m: SceneMode) => void;
  setView2dMode: (m: View2dMode) => void;
  setFrame: (f: FrameKind) => void;
  setFrameLabel: (label: string) => void;
  applyPreset: (preset: QrPreset) => void;
  setLogo: (dataUrl: string | null) => void;
  setQrDataUrl: (url: string | null) => void;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  bumpGeneration: () => void;
  setDynamicEnabled: (v: boolean) => void;
  setDynamic: (result: DynamicResult | null) => void;
}

/** The string actually encoded into the QR (dynamic short link when active). */
export function selectEncodedData(
  s: Pick<QrStore, "type" | "fields" | "dynamicEnabled" | "dynamic">,
): string {
  if (s.type === "url" && s.dynamicEnabled && s.dynamic) {
    return s.dynamic.shortUrl;
  }
  return buildQrData(s.type, s.fields);
}

export const useQrStore = create<QrStore>((set) => ({
  type: "url",
  fields: defaultFields,
  style: defaultStyle,
  material: "holographic",
  sceneMode: "showcase",
  view2dMode: "clean",
  frame: "none",
  frameLabel: "Scan Me!",
  settings: { soundEnabled: false, reducedMotion: false, autoRotate: true },
  qrDataUrl: null,
  generations: 0,
  dynamicEnabled: false,
  dynamic: null,

  setType: (type) => set({ type }),
  setField: (key, value) =>
    set((s) => ({ fields: { ...s.fields, [key]: value } })),
  setStyle: (key, value) =>
    set((s) => ({ style: { ...s.style, [key]: value } })),
  setMaterial: (material) => set({ material }),
  setSceneMode: (sceneMode) => set({ sceneMode }),
  setView2dMode: (view2dMode) => set({ view2dMode }),
  setFrame: (frame) => set({ frame }),
  setFrameLabel: (frameLabel) => set({ frameLabel }),
  applyPreset: (preset) =>
    set((s) => ({
      style: { ...s.style, ...preset.style },
      material: preset.material ?? s.material,
    })),
  setLogo: (dataUrl) =>
    set((s) => ({ style: { ...s.style, logoDataUrl: dataUrl } })),
  setQrDataUrl: (qrDataUrl) => set({ qrDataUrl }),
  setSetting: (key, value) =>
    set((s) => ({ settings: { ...s.settings, [key]: value } })),
  bumpGeneration: () => set((s) => ({ generations: s.generations + 1 })),
  setDynamicEnabled: (dynamicEnabled) =>
    set((s) => ({
      dynamicEnabled,
      dynamic: dynamicEnabled ? s.dynamic : null,
    })),
  setDynamic: (dynamic) => set({ dynamic }),
}));
