import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 600px at 12% -10%, rgba(16,185,129,0.35), transparent 60%), radial-gradient(900px 500px at 112% 8%, rgba(56,189,248,0.28), transparent 55%), radial-gradient(700px 500px at 60% 120%, rgba(245,158,11,0.2), transparent 55%), #0c1613",
          color: "#e8f6f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 26,
              background: "#15241f",
              border: "3px solid rgba(16,185,129,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 800,
              color: "#10b981",
            }}
          >
            V
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Free 3D QR Code Generator
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#8fb5a8",
            maxWidth: 820,
          }}
        >
          Add logos, colors & gradients. Preview live in 3D. Free & Pro.
        </div>

        <div
          style={{
            marginTop: 44,
            display: "flex",
            gap: 16,
          }}
        >
          {["Logos", "Gradients", "WiFi · vCard", "3D Preview", "PNG · SVG"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  fontSize: 26,
                  padding: "10px 22px",
                  borderRadius: 999,
                  background: "rgba(232,246,240,0.08)",
                  border: "1px solid rgba(232,246,240,0.14)",
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
