import type {
  FrameKind,
  MaterialKind,
  QrStyle,
  SceneMode,
  View2dMode,
} from "./types";

/** Max logo data-URL chars stored with a design (~75KB). Oversized logos are dropped. */
export const MAX_LOGO_DATA_URL_CHARS = 100_000;

/** Snapshot of Studio look tied to one dynamic QR code. */
export interface SavedQrDesign {
  style: QrStyle;
  material: MaterialKind;
  sceneMode: SceneMode;
  view2dMode: View2dMode;
  frame: FrameKind;
  frameLabel: string;
}

const DEFAULT_STYLE: QrStyle = {
  fgColor: "#0b0c14",
  bgColor: "#ffffff",
  useGradient: false,
  gradientColor: "#64748b",
  gradientType: "linear",
  dotType: "square",
  cornerSquareType: "square",
  cornerDotType: "square",
  errorCorrection: "Q",
  margin: 8,
  logoDataUrl: null,
  logoSize: 0.4,
};

/** Fallback used for codes created before design persistence existed. */
export function defaultSavedDesign(): SavedQrDesign {
  return {
    style: { ...DEFAULT_STYLE },
    material: "matte",
    sceneMode: "showcase",
    view2dMode: "clean",
    frame: "none",
    frameLabel: "Scan Me!",
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function asString(v: unknown, fallback: string): string {
  return typeof v === "string" ? v : fallback;
}

function asBool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

function asNumber(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

/** Normalize + size-limit a design payload from the client. Returns null if unusable. */
export function sanitizeDesign(raw: unknown): SavedQrDesign | null {
  if (!isRecord(raw)) return null;
  const base = defaultSavedDesign();
  const styleIn = isRecord(raw.style) ? raw.style : {};

  let logoDataUrl: string | null = null;
  if (typeof styleIn.logoDataUrl === "string" && styleIn.logoDataUrl) {
    if (
      styleIn.logoDataUrl.startsWith("data:image/") &&
      styleIn.logoDataUrl.length <= MAX_LOGO_DATA_URL_CHARS
    ) {
      logoDataUrl = styleIn.logoDataUrl;
    }
  }

  const style: QrStyle = {
    fgColor: asString(styleIn.fgColor, base.style.fgColor),
    bgColor: asString(styleIn.bgColor, base.style.bgColor),
    useGradient: asBool(styleIn.useGradient, base.style.useGradient),
    gradientColor: asString(styleIn.gradientColor, base.style.gradientColor),
    gradientType:
      styleIn.gradientType === "radial" || styleIn.gradientType === "linear"
        ? styleIn.gradientType
        : base.style.gradientType,
    dotType: asString(styleIn.dotType, base.style.dotType) as QrStyle["dotType"],
    cornerSquareType: asString(
      styleIn.cornerSquareType,
      base.style.cornerSquareType,
    ) as QrStyle["cornerSquareType"],
    cornerDotType: asString(
      styleIn.cornerDotType,
      base.style.cornerDotType,
    ) as QrStyle["cornerDotType"],
    errorCorrection: asString(
      styleIn.errorCorrection,
      base.style.errorCorrection,
    ) as QrStyle["errorCorrection"],
    margin: asNumber(styleIn.margin, base.style.margin),
    logoDataUrl,
    logoSize: Math.min(1, Math.max(0, asNumber(styleIn.logoSize, base.style.logoSize))),
  };

  return {
    style,
    material: asString(raw.material, base.material) as MaterialKind,
    sceneMode: asString(raw.sceneMode, base.sceneMode) as SceneMode,
    view2dMode: asString(raw.view2dMode, base.view2dMode) as View2dMode,
    frame: asString(raw.frame, base.frame) as FrameKind,
    frameLabel: asString(raw.frameLabel, base.frameLabel).slice(0, 40),
  };
}

export function designToJson(design: SavedQrDesign | null | undefined): string | null {
  if (!design) return null;
  return JSON.stringify(design);
}

export function parseDesignJson(raw: string | null | undefined): SavedQrDesign | null {
  if (!raw) return null;
  try {
    return sanitizeDesign(JSON.parse(raw));
  } catch {
    return null;
  }
}

/** Build a DB-ready design snapshot from the live Studio store slice. */
export function snapshotDesign(input: {
  style: QrStyle;
  material: MaterialKind;
  sceneMode: SceneMode;
  view2dMode: View2dMode;
  frame: FrameKind;
  frameLabel: string;
}): SavedQrDesign {
  return (
    sanitizeDesign(input) ?? {
      ...defaultSavedDesign(),
      style: { ...input.style, logoDataUrl: null },
      material: input.material,
      sceneMode: input.sceneMode,
      view2dMode: input.view2dMode,
      frame: input.frame,
      frameLabel: input.frameLabel,
    }
  );
}
