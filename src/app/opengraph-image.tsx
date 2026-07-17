import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.shortTitle;

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #06060a 0%, #0e0e14 60%, #06060a 100%)",
          padding: "72px",
          fontFamily: "Inter, sans-serif",
          color: "#f0f1f5",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "640px",
            height: "640px",
            background:
              "radial-gradient(closest-side, rgba(16, 185, 129, 0.12), transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#10b981",
              marginBottom: "20px",
            }}
          >
            commit → verify → settle
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 980,
              marginBottom: "24px",
            }}
          >
            Stop wrong-agent payments before they execute.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#8e95a3",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            One gate: RFC 8785 payload hash compare. Swapped destination → signed DENY.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "48px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 18,
            color: "#5a6070",
          }}
        >
          <span style={{ display: "flex" }}>stvor.xyz</span>
          <span style={{ display: "flex" }}>@stvor/client • MIT</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
