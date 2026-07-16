import qrcode from "qrcode-generator";
import type { DotType, ErrorCorrection, QrStyle } from "./types";

/** Dot styles drawn by our custom canvas/SVG renderer (not qr-code-styling). */
export const CUSTOM_DOT_TYPES = [
  "heart",
  "diamond",
  "star",
  "cross",
  "triangle",
  "hexagon",
  "leaf",
  "soft",
] as const;

export type CustomDotType = (typeof CUSTOM_DOT_TYPES)[number];

export function isCustomDotType(type: DotType): type is CustomDotType {
  return (CUSTOM_DOT_TYPES as readonly string[]).includes(type);
}

function makeQr(data: string, ecl: ErrorCorrection) {
  const qr = qrcode(0, ecl);
  qr.addData(data || " ");
  qr.make();
  return qr;
}

function isFinderZone(row: number, col: number, count: number): boolean {
  const inTL = row < 7 && col < 7;
  const inTR = row < 7 && col >= count - 7;
  const inBL = row >= count - 7 && col < 7;
  return inTL || inTR || inBL;
}

function inLogoHole(
  row: number,
  col: number,
  count: number,
  logoSize: number,
): boolean {
  const hole = Math.floor(count * logoSize * 0.55);
  const mid = (count - 1) / 2;
  return Math.abs(row - mid) <= hole / 2 && Math.abs(col - mid) <= hole / 2;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const s = size * 0.48;
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.35);
  ctx.bezierCurveTo(
    cx - s * 1.05,
    cy - s * 0.15,
    cx - s,
    cy - s * 0.95,
    cx,
    cy - s * 0.45,
  );
  ctx.bezierCurveTo(
    cx + s,
    cy - s * 0.95,
    cx + s * 1.05,
    cy - s * 0.15,
    cx,
    cy + s * 0.35,
  );
  ctx.closePath();
  ctx.fill();
}

function drawDiamond(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const s = size * 0.42;
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx + s, cy);
  ctx.lineTo(cx, cy + s);
  ctx.lineTo(cx - s, cy);
  ctx.closePath();
  ctx.fill();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const outer = size * 0.46;
  const inner = outer * 0.42;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawCross(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const arm = size * 0.42;
  const thick = size * 0.16;
  roundRect(ctx, cx - thick, cy - arm, thick * 2, arm * 2, thick * 0.45);
  ctx.fill();
  roundRect(ctx, cx - arm, cy - thick, arm * 2, thick * 2, thick * 0.45);
  ctx.fill();
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const s = size * 0.44;
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx + s * 0.95, cy + s * 0.75);
  ctx.lineTo(cx - s * 0.95, cy + s * 0.75);
  ctx.closePath();
  ctx.fill();
}

function drawHexagon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const r = size * 0.44;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const s = size * 0.46;
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.quadraticCurveTo(cx + s * 1.05, cy, cx, cy + s);
  ctx.quadraticCurveTo(cx - s * 1.05, cy, cx, cy - s);
  ctx.closePath();
  ctx.fill();
}

function drawSoft(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
) {
  const s = size * 0.78;
  roundRect(ctx, cx - s / 2, cy - s / 2, s, s, s * 0.35);
  ctx.fill();
}

function drawModule(
  ctx: CanvasRenderingContext2D,
  pattern: CustomDotType,
  cx: number,
  cy: number,
  cell: number,
) {
  switch (pattern) {
    case "diamond":
      drawDiamond(ctx, cx, cy, cell);
      break;
    case "star":
      drawStar(ctx, cx, cy, cell);
      break;
    case "cross":
      drawCross(ctx, cx, cy, cell);
      break;
    case "triangle":
      drawTriangle(ctx, cx, cy, cell);
      break;
    case "hexagon":
      drawHexagon(ctx, cx, cy, cell);
      break;
    case "leaf":
      drawLeaf(ctx, cx, cy, cell);
      break;
    case "soft":
      drawSoft(ctx, cx, cy, cell);
      break;
    case "heart":
    default:
      drawHeart(ctx, cx, cy, cell);
      break;
  }
}

function moduleSvgPath(
  pattern: CustomDotType,
  cx: number,
  cy: number,
  cell: number,
): string {
  switch (pattern) {
    case "diamond": {
      const s = cell * 0.42;
      return `<polygon points="${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}" />`;
    }
    case "star": {
      const outer = cell * 0.46;
      const inner = outer * 0.42;
      const pts: string[] = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
      }
      return `<polygon points="${pts.join(" ")}" />`;
    }
    case "cross": {
      const arm = cell * 0.42;
      const thick = cell * 0.16;
      const r = thick * 0.45;
      return `<rect x="${cx - thick}" y="${cy - arm}" width="${thick * 2}" height="${arm * 2}" rx="${r}" />
        <rect x="${cx - arm}" y="${cy - thick}" width="${arm * 2}" height="${thick * 2}" rx="${r}" />`;
    }
    case "triangle": {
      const s = cell * 0.44;
      return `<polygon points="${cx},${cy - s} ${cx + s * 0.95},${cy + s * 0.75} ${cx - s * 0.95},${cy + s * 0.75}" />`;
    }
    case "hexagon": {
      const r = cell * 0.44;
      const pts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
      }
      return `<polygon points="${pts.join(" ")}" />`;
    }
    case "leaf": {
      const s = cell * 0.46;
      return `<path d="M ${cx} ${cy - s}
        Q ${cx + s * 1.05} ${cy} ${cx} ${cy + s}
        Q ${cx - s * 1.05} ${cy} ${cx} ${cy - s} Z" />`;
    }
    case "soft": {
      const s = cell * 0.78;
      return `<rect x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}" rx="${s * 0.35}" />`;
    }
    case "heart":
    default: {
      const s = cell * 0.48;
      return `<path d="M ${cx} ${cy + s * 0.35}
        C ${cx - s * 1.05} ${cy - s * 0.15}, ${cx - s} ${cy - s * 0.95}, ${cx} ${cy - s * 0.45}
        C ${cx + s} ${cy - s * 0.95}, ${cx + s * 1.05} ${cy - s * 0.15}, ${cx} ${cy + s * 0.35}
        Z" />`;
    }
  }
}

function paintModules(
  ctx: CanvasRenderingContext2D,
  qr: ReturnType<typeof makeQr>,
  style: QrStyle,
  size: number,
  pattern: CustomDotType,
) {
  const count = qr.getModuleCount();
  ctx.fillStyle = style.bgColor;
  ctx.fillRect(0, 0, size, size);

  const margin = style.margin;
  const usable = size - margin * 2;
  const cell = usable / count;

  let fill: string | CanvasGradient = style.fgColor;
  if (style.useGradient) {
    const g =
      style.gradientType === "radial"
        ? ctx.createRadialGradient(
            size / 2,
            size / 2,
            0,
            size / 2,
            size / 2,
            size * 0.65,
          )
        : ctx.createLinearGradient(margin, margin, size - margin, size - margin);
    g.addColorStop(0, style.fgColor);
    g.addColorStop(1, style.gradientColor);
    fill = g;
  }
  ctx.fillStyle = fill;

  const hideLogoHole = Boolean(style.logoDataUrl);

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!qr.isDark(row, col)) continue;
      if (hideLogoHole && inLogoHole(row, col, count, style.logoSize)) continue;

      const x = margin + col * cell;
      const y = margin + row * cell;
      const cx = x + cell / 2;
      const cy = y + cell / 2;

      if (isFinderZone(row, col, count)) {
        const pad = cell * 0.08;
        const r = cell * 0.22;
        roundRect(ctx, x + pad, y + pad, cell - pad * 2, cell - pad * 2, r);
        ctx.fill();
      } else {
        drawModule(ctx, pattern, cx, cy, cell);
      }
    }
  }
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  style: QrStyle,
  size: number,
): Promise<void> {
  if (!style.logoDataUrl) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const logoPx = size * style.logoSize * 0.85;
      const x = (size - logoPx) / 2;
      const y = (size - logoPx) / 2;
      const pad = logoPx * 0.08;
      ctx.fillStyle = style.bgColor;
      roundRect(ctx, x - pad, y - pad, logoPx + pad * 2, logoPx + pad * 2, pad);
      ctx.fill();
      ctx.drawImage(img, x, y, logoPx, logoPx);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = style.logoDataUrl!;
  });
}

function resolvePattern(style: QrStyle): CustomDotType {
  return isCustomDotType(style.dotType) ? style.dotType : "heart";
}

/** Custom-pattern QR on canvas (heart, diamond, star, …). */
export async function renderPatternQrToCanvas(
  data: string,
  style: QrStyle,
  size: number,
): Promise<HTMLCanvasElement> {
  const pattern = resolvePattern(style);
  const qr = makeQr(data, style.errorCorrection);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  paintModules(ctx, qr, style, size, pattern);
  await drawLogo(ctx, style, size);
  return canvas;
}

export async function patternQrToBlob(
  data: string,
  style: QrStyle,
  size: number,
  type: "png" | "jpeg" | "webp" = "png",
): Promise<Blob> {
  const canvas = await renderPatternQrToCanvas(data, style, size);
  const mime =
    type === "jpeg" ? "image/jpeg" : type === "webp" ? "image/webp" : "image/png";
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to export QR"))),
      mime,
      0.95,
    );
  });
}

export async function patternQrToDataUrl(
  data: string,
  style: QrStyle,
  size: number,
): Promise<string> {
  const canvas = await renderPatternQrToCanvas(data, style, size);
  return canvas.toDataURL("image/png");
}

export function renderPatternQrSvg(
  data: string,
  style: QrStyle,
  size: number,
): string {
  const pattern = resolvePattern(style);
  const qr = makeQr(data, style.errorCorrection);
  const count = qr.getModuleCount();
  const margin = style.margin;
  const usable = size - margin * 2;
  const cell = usable / count;
  const hideLogoHole = Boolean(style.logoDataUrl);

  const modules: string[] = [];
  const finders: string[] = [];

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!qr.isDark(row, col)) continue;
      if (hideLogoHole && inLogoHole(row, col, count, style.logoSize)) continue;

      const x = margin + col * cell;
      const y = margin + row * cell;
      const cx = x + cell / 2;
      const cy = y + cell / 2;

      if (isFinderZone(row, col, count)) {
        const pad = cell * 0.08;
        const r = cell * 0.22;
        finders.push(
          `<rect x="${x + pad}" y="${y + pad}" width="${cell - pad * 2}" height="${cell - pad * 2}" rx="${r}" />`,
        );
      } else {
        modules.push(moduleSvgPath(pattern, cx, cy, cell));
      }
    }
  }

  const fill = style.useGradient ? "url(#patternGrad)" : style.fgColor;
  const gradDef = style.useGradient
    ? `<defs>
        <linearGradient id="patternGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${style.fgColor}" />
          <stop offset="100%" stop-color="${style.gradientColor}" />
        </linearGradient>
      </defs>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${gradDef}
  <rect width="100%" height="100%" fill="${style.bgColor}" />
  <g fill="${fill}">
    ${finders.join("\n    ")}
    ${modules.join("\n    ")}
  </g>
</svg>`;
}

/* —— Back-compat aliases used by older imports —— */
export const renderHeartQrToCanvas = renderPatternQrToCanvas;
export const heartQrToBlob = patternQrToBlob;
export const heartQrToDataUrl = patternQrToDataUrl;
export const renderHeartQrSvg = renderPatternQrSvg;
