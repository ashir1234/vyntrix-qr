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
            "radial-gradient(1000px 600px at 15% -10%, rgba(124,92,255,0.55), transparent 60%), radial-gradient(900px 500px at 110% 10%, rgba(33,212,253,0.45), transparent 55%), #060713",
          color: "#eef0ff",
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
              border: "3px solid rgba(124,92,255,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 800,
              color: "#7c5cff",
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
