import { create } from "zustand";
import { buildQrData } from "./qr/content";
import type {
  MaterialKind,
  QrContentType,
  QrFields,
  QrPreset,
  QrStyle,
} from "./qr/types";

export interface DynamicResult {
  slug: string;
  shortUrl: string;
  manageUrl: string;
  editToken: string;
  destination: string;
}

const defaultFields: QrFields = {
  url: "https://vyntrixqr.com",
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
};

const defaultStyle: QrStyle = {
  fgColor: "#ff2d95",
  bgColor: "#0a0518",
  useGradient: true,
  gradientColor: "#12e6ff",
  gradientType: "linear",
  dotType: "rounded",
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
      fgColor: "#ff2d95",
      gradientColor: "#12e6ff",
      bgColor: "#0a0518",
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
      fgColor: "#9d3bff",
      gradientColor: "#12e6ff",
      bgColor: "#08030f",
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
      gradientColor: "#ff2e97",
      bgColor: "#1a0f14",
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
      bgColor: "#0a0c18",
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
  settings: Settings;
  qrDataUrl: string | null;
  generations: number;
  dynamicEnabled: boolean;
  dynamic: DynamicResult | null;

  setType: (type: QrContentType) => void;
  setField: <K extends keyof QrFields>(key: K, value: QrFields[K]) => void;
  setStyle: <K extends keyof QrStyle>(key: K, value: QrStyle[K]) => void;
  setMaterial: (m: MaterialKind) => void;
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
