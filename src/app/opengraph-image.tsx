import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Stvor — Cryptographic infrastructure for autonomous agents and AA wallets";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #07090c 0%, #0d1219 60%, #0a0f17 100%)",
          padding: "72px",
          fontFamily: "Inter, sans-serif",
          color: "#f4f6f8",
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
              "radial-gradient(closest-side, rgba(64, 169, 255, 0.18), transparent 70%)",
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
              background: "linear-gradient(135deg, #2b8aff, #1763d1)",
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
              color: "#7d8896",
              marginBottom: "20px",
            }}
          >
            Post-quantum • E2EE • Account abstraction
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
              marginBottom: "24px",
            }}
          >
            Cryptographic infrastructure for autonomous agents and AA wallets.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#a4adb8",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Hybrid X3DH (ECDH P-256 + ML-KEM-768) • UserOp-bound sessions •
            ERC-4337 & TON
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
            color: "#7d8896",
          }}
        >
          <span style={{ display: "flex" }}>stvor.dev</span>
          <span style={{ display: "flex" }}>NIST FIPS 203/204 • Apache 2.0</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
