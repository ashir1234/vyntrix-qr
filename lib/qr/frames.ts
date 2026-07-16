import type { FrameKind } from "./types";

export const FRAME_META: {
  id: FrameKind;
  label: string;
  hint: string;
}[] = [
  { id: "none", label: "None", hint: "Bare QR only" },
  { id: "thick", label: "Thick", hint: "Heavy border + banner" },
  { id: "thin", label: "Thin", hint: "Slim border + banner" },
  { id: "open", label: "Open", hint: "Open bottom frame" },
  { id: "caption", label: "Caption", hint: "Text under code" },
  { id: "pill", label: "Pill", hint: "Rounded banner" },
  { id: "bubble", label: "Bubble", hint: "Speech bubble" },
  { id: "ticket", label: "Ticket", hint: "Notched ticket" },
  { id: "boxed", label: "Boxed", hint: "Label in a box" },
  { id: "rounded", label: "Rounded", hint: "Soft corner frame" },
  { id: "arrow", label: "Arrow", hint: "Hand-drawn arrow" },
  { id: "hands", label: "Hands", hint: "Pointing hands" },
  { id: "bag", label: "Bag", hint: "Shopping bag" },
  { id: "gift", label: "Gift", hint: "Gift with bow" },
  { id: "ribbon", label: "Ribbon", hint: "Ribbon banner" },
  { id: "envelope", label: "Envelope", hint: "Card in envelope" },
  { id: "scooter", label: "Scooter", hint: "Delivery scooter" },
  { id: "tray", label: "Tray", hint: "Serving tray" },
  { id: "coffee", label: "Coffee", hint: "Cafe takeaway" },
  { id: "phone", label: "Phone", hint: "QR inside a phone screen" },
  { id: "chef", label: "Chef", hint: "Chef hat restaurant frame" },
  { id: "mug", label: "Mug", hint: "QR printed on a mug" },
  { id: "badge", label: "Badge", hint: "Round badge sticker" },
  { id: "poster", label: "Poster", hint: "Wall poster with tape" },
  { id: "polaroid", label: "Polaroid", hint: "Instant photo frame" },
  { id: "heartFrame", label: "Heart", hint: "Romantic heart frame" },
  { id: "cloud", label: "Cloud", hint: "Cloud bubble frame" },
];

const W = 400;
const H = 500;
const QR_X = 50;
const QR_Y = 40;
const QR_S = 300;

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function qrImage(href: string) {
  return `<image href="${href}" x="${QR_X}" y="${QR_Y}" width="${QR_S}" height="${QR_S}" preserveAspectRatio="xMidYMid meet" />`;
}

function banner(
  text: string,
  opts: {
    y?: number;
    x?: number;
    w?: number;
    h?: number;
    rx?: number;
    fill?: string;
    color?: string;
    size?: number;
  } = {},
) {
  const y = opts.y ?? 360;
  const x = opts.x ?? 50;
  const w = opts.w ?? 300;
  const h = opts.h ?? 44;
  const rx = opts.rx ?? 6;
  const fill = opts.fill ?? "#111";
  const color = opts.color ?? "#fff";
  const size = opts.size ?? 18;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" />
    <text x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${size}" font-weight="700" fill="${color}">${esc(text)}</text>`;
}

type FrameBuilder = (qrHref: string, label: string) => string;

const builders: Record<FrameKind, FrameBuilder> = {
  none: (qr) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}">
      <rect width="100%" height="100%" fill="#fff"/>
      <image href="${qr}" x="20" y="20" width="360" height="360" />
    </svg>`,

  thick: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="28" y="18" width="344" height="420" fill="none" stroke="#111" stroke-width="18"/>
      ${qrImage(qr)}
      ${banner(label, { y: 365, x: 46, w: 308, h: 48 })}
    </svg>`,

  thin: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="36" y="26" width="328" height="400" fill="none" stroke="#111" stroke-width="4"/>
      ${qrImage(qr)}
      ${banner(label, { y: 365 })}
    </svg>`,

  open: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <path d="M40 380 V36 H360 V380" fill="none" stroke="#111" stroke-width="8"/>
      ${qrImage(qr)}
      <text x="200" y="420" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#111">${esc(label)}</text>
    </svg>`,

  caption: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      ${qrImage(qr)}
      <text x="200" y="400" text-anchor="middle" font-family="system-ui,sans-serif" font-size="24" font-weight="700" fill="#111">${esc(label)}</text>
    </svg>`,

  pill: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      ${qrImage(qr)}
      ${banner(label, { y: 370, x: 70, w: 260, h: 46, rx: 23 })}
    </svg>`,

  bubble: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="34" y="24" width="332" height="360" rx="18" fill="none" stroke="#111" stroke-width="6"/>
      ${qrImage(qr)}
      ${banner(label, { y: 355, x: 60, w: 280, h: 44, rx: 10 })}
      <path d="M180 404 L200 430 L220 404 Z" fill="#111"/>
    </svg>`,

  ticket: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <path d="M50 30 H350 A18 18 0 0 0 350 66 V150 A18 18 0 0 1 350 186 V340 A18 18 0 0 0 350 376 H50 A18 18 0 0 0 50 340 V186 A18 18 0 0 1 50 150 V66 A18 18 0 0 0 50 30 Z"
        fill="#111"/>
      <rect x="62" y="48" width="276" height="276" fill="#fff"/>
      <image href="${qr}" x="72" y="58" width="256" height="256" />
      <text x="200" y="360" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#fff">${esc(label)}</text>
    </svg>`,

  boxed: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="40" y="30" width="320" height="380" fill="none" stroke="#111" stroke-width="3"/>
      ${qrImage(qr)}
      <rect x="120" y="365" width="160" height="36" fill="none" stroke="#111" stroke-width="2"/>
      <text x="200" y="389" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#111">${esc(label)}</text>
    </svg>`,

  rounded: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="36" y="26" width="328" height="400" rx="28" fill="none" stroke="#111" stroke-width="5"/>
      ${qrImage(qr)}
      <text x="200" y="410" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#111">${esc(label)}</text>
    </svg>`,

  arrow: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      ${qrImage(qr)}
      <path d="M70 380 C120 350, 160 400, 200 370" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
      <path d="M188 362 L200 372 L186 380" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
      <text x="250" y="420" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-style="italic" fill="#111">${esc(label)}</text>
    </svg>`,

  hands: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      ${qrImage(qr)}
      <!-- left hand -->
      <ellipse cx="55" cy="200" rx="28" ry="40" fill="#f5c6a0" transform="rotate(-25 55 200)"/>
      <rect x="40" y="210" width="18" height="50" rx="8" fill="#f5c6a0" transform="rotate(15 49 235)"/>
      <!-- right hand -->
      <ellipse cx="345" cy="200" rx="28" ry="40" fill="#f5c6a0" transform="rotate(25 345 200)"/>
      <rect x="342" y="210" width="18" height="50" rx="8" fill="#f5c6a0" transform="rotate(-15 351 235)"/>
      <text x="200" y="410" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#111">${esc(label)}</text>
    </svg>`,

  bag: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <path d="M80 90 H320 L340 430 H60 Z" fill="#f3f4f6" stroke="#111" stroke-width="4"/>
      <path d="M140 90 C140 40, 260 40, 260 90" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <image href="${qr}" x="95" y="130" width="210" height="210" />
      ${banner(label, { y: 360, x: 90, w: 220, h: 40 })}
    </svg>`,

  gift: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="55" y="70" width="290" height="310" rx="8" fill="#fff" stroke="#111" stroke-width="5"/>
      ${qrImage(qr)}
      <!-- bow -->
      <ellipse cx="155" cy="55" rx="40" ry="22" fill="#e11d48"/>
      <ellipse cx="245" cy="55" rx="40" ry="22" fill="#e11d48"/>
      <circle cx="200" cy="58" r="14" fill="#be123c"/>
      <rect x="190" y="70" width="20" height="40" fill="#e11d48"/>
      ${banner(label, { y: 365 })}
    </svg>`,

  ribbon: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="40" y="30" width="320" height="340" fill="none" stroke="#111" stroke-width="4"/>
      ${qrImage(qr)}
      <path d="M30 370 L55 350 H345 L370 370 L345 390 H55 Z" fill="#111"/>
      <text x="200" y="380" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#fff">${esc(label)}</text>
    </svg>`,

  envelope: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="40" y="220" width="320" height="180" fill="#e5e7eb" stroke="#111" stroke-width="3"/>
      <path d="M40 220 L200 320 L360 220" fill="none" stroke="#111" stroke-width="3"/>
      <rect x="70" y="50" width="260" height="260" fill="#fff" stroke="#111" stroke-width="4"/>
      <image href="${qr}" x="90" y="70" width="220" height="220" />
      <text x="200" y="440" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#111">${esc(label)}</text>
    </svg>`,

  scooter: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <!-- scooter body -->
      <ellipse cx="120" cy="420" rx="36" ry="36" fill="#111"/>
      <ellipse cx="300" cy="420" rx="40" ry="40" fill="#111"/>
      <ellipse cx="120" cy="420" rx="18" ry="18" fill="#9ca3af"/>
      <ellipse cx="300" cy="420" rx="20" ry="20" fill="#9ca3af"/>
      <path d="M120 400 H250 L280 300 H160 Z" fill="#10b981"/>
      <rect x="250" y="280" width="18" height="120" fill="#374151"/>
      <circle cx="259" cy="270" r="16" fill="#111"/>
      <!-- sign with QR -->
      <rect x="160" y="60" width="180" height="200" rx="8" fill="#fff" stroke="#111" stroke-width="4"/>
      <image href="${qr}" x="175" y="75" width="150" height="150" />
      <text x="250" y="245" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#111">${esc(label)}</text>
      <!-- box -->
      <rect x="170" y="300" width="90" height="70" fill="#f59e0b" stroke="#111" stroke-width="2"/>
    </svg>`,

  tray: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <text x="200" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="700" fill="#111">${esc(label)}</text>
      <rect x="70" y="50" width="260" height="260" rx="8" fill="#fff" stroke="#111" stroke-width="4"/>
      <image href="${qr}" x="90" y="70" width="220" height="220" />
      <!-- tray -->
      <ellipse cx="200" cy="360" rx="160" ry="28" fill="#d1d5db" stroke="#111" stroke-width="3"/>
      <rect x="40" y="350" width="320" height="20" rx="6" fill="#9ca3af"/>
      <!-- arm -->
      <path d="M40 360 C10 380, 20 450, 80 460" fill="none" stroke="#f5c6a0" stroke-width="22" stroke-linecap="round"/>
      <circle cx="85" cy="460" r="22" fill="#f5c6a0"/>
    </svg>`,

  coffee: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <!-- bag -->
      <path d="M70 80 H250 L265 400 H55 Z" fill="#f3f4f6" stroke="#111" stroke-width="3"/>
      <path d="M110 80 C110 45, 210 45, 210 80" fill="none" stroke="#111" stroke-width="5"/>
      <image href="${qr}" x="85" y="120" width="150" height="150" />
      ${banner(label, { y: 300, x: 80, w: 160, h: 36, size: 14 })}
      <!-- cup -->
      <rect x="280" y="220" width="80" height="110" rx="8" fill="#fff" stroke="#111" stroke-width="3"/>
      <path d="M360 240 H385 V300 H360" fill="none" stroke="#111" stroke-width="3"/>
      <ellipse cx="320" cy="220" rx="42" ry="10" fill="#e5e7eb" stroke="#111" stroke-width="2"/>
      <path d="M300 190 C310 170, 330 170, 340 190" fill="none" stroke="#9ca3af" stroke-width="2"/>
      <path d="M310 185 C318 168, 332 168, 338 185" fill="none" stroke="#9ca3af" stroke-width="2"/>
    </svg>`,

  phone: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="90" y="28" width="220" height="420" rx="30" fill="#111"/>
      <rect x="106" y="62" width="188" height="318" rx="10" fill="#fff"/>
      <circle cx="200" cy="414" r="15" fill="#fff"/>
      <rect x="170" y="45" width="60" height="6" rx="3" fill="#fff"/>
      <image href="${qr}" x="124" y="82" width="152" height="152"/>
      ${banner(label, { y: 280, x: 128, w: 144, h: 34, size: 13 })}
    </svg>`,

  chef: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <circle cx="145" cy="72" r="34" fill="#fff" stroke="#111" stroke-width="3"/>
      <circle cx="200" cy="58" r="44" fill="#fff" stroke="#111" stroke-width="3"/>
      <circle cx="255" cy="72" r="34" fill="#fff" stroke="#111" stroke-width="3"/>
      <rect x="115" y="80" width="170" height="62" rx="12" fill="#fff" stroke="#111" stroke-width="3"/>
      <rect x="60" y="145" width="280" height="260" rx="12" fill="#fff" stroke="#111" stroke-width="5"/>
      <image href="${qr}" x="95" y="175" width="210" height="210"/>
      ${banner(label, { y: 410, x: 95, w: 210, h: 38, size: 15 })}
    </svg>`,

  mug: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <path d="M300 155 H350 C388 155 388 260 350 260 H300" fill="none" stroke="#111" stroke-width="14" stroke-linecap="round"/>
      <rect x="70" y="120" width="250" height="260" rx="34" fill="#fff" stroke="#111" stroke-width="6"/>
      <ellipse cx="195" cy="120" rx="125" ry="22" fill="#e5e7eb" stroke="#111" stroke-width="5"/>
      <path d="M135 76 C125 52 155 42 145 18" fill="none" stroke="#9ca3af" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 74 C190 48 225 40 210 14" fill="none" stroke="#9ca3af" stroke-width="4" stroke-linecap="round"/>
      <path d="M260 76 C250 54 280 44 270 20" fill="none" stroke="#9ca3af" stroke-width="4" stroke-linecap="round"/>
      <image href="${qr}" x="118" y="165" width="155" height="155"/>
      ${banner(label, { y: 330, x: 115, w: 160, h: 36, size: 14 })}
    </svg>`,

  badge: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <circle cx="200" cy="230" r="175" fill="#111"/>
      <circle cx="200" cy="230" r="155" fill="#fff"/>
      <circle cx="200" cy="230" r="136" fill="#111"/>
      <circle cx="200" cy="230" r="116" fill="#fff"/>
      <image href="${qr}" x="110" y="135" width="180" height="180"/>
      <path d="M105 405 L155 355 L200 430 L245 355 L295 405" fill="#111"/>
      <text x="200" y="350" text-anchor="middle" font-family="system-ui,sans-serif" font-size="19" font-weight="800" fill="#111">${esc(label)}</text>
    </svg>`,

  poster: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="55" y="42" width="290" height="395" rx="6" fill="#fff" stroke="#111" stroke-width="4"/>
      <rect x="35" y="24" width="72" height="26" rx="6" fill="#facc15" stroke="#111" stroke-width="2" transform="rotate(-10 71 37)"/>
      <rect x="292" y="24" width="72" height="26" rx="6" fill="#facc15" stroke="#111" stroke-width="2" transform="rotate(10 328 37)"/>
      <image href="${qr}" x="85" y="95" width="230" height="230"/>
      <text x="200" y="380" text-anchor="middle" font-family="system-ui,sans-serif" font-size="24" font-weight="800" fill="#111">${esc(label)}</text>
    </svg>`,

  polaroid: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <rect x="58" y="38" width="284" height="390" rx="8" fill="#f9fafb" stroke="#d1d5db" stroke-width="3"/>
      <rect x="82" y="62" width="236" height="236" fill="#fff" stroke="#111" stroke-width="3"/>
      <image href="${qr}" x="100" y="80" width="200" height="200"/>
      <text x="200" y="365" text-anchor="middle" font-family="Georgia,serif" font-size="25" font-style="italic" fill="#111">${esc(label)}</text>
    </svg>`,

  heartFrame: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <path d="M200 430 C90 340 35 270 45 180 C55 95 150 85 200 155 C250 85 345 95 355 180 C365 270 310 340 200 430Z" fill="#ffe4e6" stroke="#e11d48" stroke-width="7"/>
      <rect x="105" y="142" width="190" height="190" rx="12" fill="#fff" stroke="#111" stroke-width="3"/>
      <image href="${qr}" x="120" y="157" width="160" height="160"/>
      <text x="200" y="365" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="800" fill="#be123c">${esc(label)}</text>
    </svg>`,

  cloud: (qr, label) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="100%" height="100%" fill="#fff"/>
      <circle cx="125" cy="150" r="62" fill="#eef6ff" stroke="#111" stroke-width="3"/>
      <circle cx="200" cy="110" r="78" fill="#eef6ff" stroke="#111" stroke-width="3"/>
      <circle cx="282" cy="155" r="62" fill="#eef6ff" stroke="#111" stroke-width="3"/>
      <rect x="78" y="150" width="250" height="190" rx="58" fill="#eef6ff" stroke="#111" stroke-width="3"/>
      <rect x="110" y="160" width="180" height="180" rx="12" fill="#fff" stroke="#111" stroke-width="3"/>
      <image href="${qr}" x="125" y="175" width="150" height="150"/>
      ${banner(label, { y: 360, x: 110, w: 180, h: 38, rx: 19, fill: "#111", size: 15 })}
    </svg>`,
};

/** Build framed SVG markup with an embedded QR (data URL or absolute URL). */
export function buildFrameSvg(
  qrHref: string,
  frame: FrameKind,
  label = "Scan Me!",
): string {
  const build = builders[frame] ?? builders.none;
  return build(qrHref, label.trim() || "Scan Me!").trim();
}

/** Rasterize a framed QR to a PNG blob. */
export async function composeFramedPng(
  qrDataUrl: string,
  frame: FrameKind,
  label: string,
  scale = 3,
): Promise<Blob> {
  if (frame === "none") {
    const res = await fetch(qrDataUrl);
    return res.blob();
  }

  const svg = buildFrameSvg(qrDataUrl, frame, label);
  const svgUrl = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );

  try {
    const img = await loadImage(svgUrl);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))),
        "image/png",
      );
    });
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

/** Framed SVG download (embeds QR as PNG data URL for portability). */
export function composeFramedSvg(
  qrDataUrl: string,
  frame: FrameKind,
  label: string,
): string {
  return buildFrameSvg(qrDataUrl, frame, label);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load framed SVG"));
    img.src = src;
  });
}

/** Preview thumbnail SVG (no real QR — placeholder modules). */
export function frameThumbSvg(frame: FrameKind): string {
  const fakeQr =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <rect width="300" height="300" fill="#fff"/>
        <rect x="20" y="20" width="70" height="70" fill="#111"/>
        <rect x="210" y="20" width="70" height="70" fill="#111"/>
        <rect x="20" y="210" width="70" height="70" fill="#111"/>
        <g fill="#111">${Array.from({ length: 40 }, (_, i) => {
          const x = 100 + (i % 8) * 14;
          const y = 100 + Math.floor(i / 8) * 14;
          return `<rect x="${x}" y="${y}" width="10" height="10"/>`;
        }).join("")}</g>
      </svg>`,
    );
  return buildFrameSvg(fakeQr, frame, "Scan Me!");
}
