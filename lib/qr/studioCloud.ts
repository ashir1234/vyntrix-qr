import type { QrContentType, QrFields } from "./types";
import {
  sanitizeDesign,
  type SavedQrDesign,
} from "./design";

/** Full Studio snapshot synced to the cloud for Pro users. */
export interface StudioCloudState {
  updatedAt: number;
  type: QrContentType;
  fields: Partial<QrFields>;
  design: SavedQrDesign;
  dynamicEnabled?: boolean;
  frameLabel?: string;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function sanitizeStudioCloudState(
  raw: unknown,
): StudioCloudState | null {
  if (!isRecord(raw)) return null;
  const design = sanitizeDesign(raw.design ?? raw);
  if (!design) return null;
  const updatedAt =
    typeof raw.updatedAt === "number" && Number.isFinite(raw.updatedAt)
      ? raw.updatedAt
      : Date.now();
  const type =
    typeof raw.type === "string" ? (raw.type as QrContentType) : "url";
  const fields = isRecord(raw.fields) ? (raw.fields as Partial<QrFields>) : {};

  return {
    updatedAt,
    type,
    fields,
    design,
    dynamicEnabled: Boolean(raw.dynamicEnabled),
    frameLabel:
      typeof raw.frameLabel === "string"
        ? raw.frameLabel.slice(0, 40)
        : design.frameLabel,
  };
}

export function studioCloudToJson(state: StudioCloudState): string {
  return JSON.stringify(state);
}

export function parseStudioCloudJson(
  raw: string | null | undefined,
): StudioCloudState | null {
  if (!raw) return null;
  try {
    return sanitizeStudioCloudState(JSON.parse(raw));
  } catch {
    return null;
  }
}
