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
            "radial-gradient(1000px 600px at 12% -10%, rgba(157,59,255,0.65), transparent 60%), radial-gradient(900px 500px at 112% 8%, rgba(18,230,255,0.5), transparent 55%), radial-gradient(700px 500px at 60% 120%, rgba(255,45,149,0.45), transparent 55%), #08030f",
          color: "#f6f2ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 26,
              background: "#0b0c18",
              border: "3px solid rgba(157,59,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 800,
              color: "#ff2d95",
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
            color: "#9aa0c7",
            maxWidth: 820,
          }}
        >
          Add logos, colors & gradients. Preview live in 3D. No sign-up.
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
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
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
