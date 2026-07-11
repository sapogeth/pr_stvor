"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Integration targets — only what's documented in the SDK
// No company logos. These are protocol/SDK labels, not endorsements.
const PLATFORMS = [
  { id: "orbwallet",    label: "OrbWallet",          angle: -90  },
  { id: "langchain",    label: "LangChain",           angle: -45  },
  { id: "openai-sdk",   label: "Agents SDK",          angle: 0    },
  { id: "mcp",          label: "MCP",                 angle: 45   },
  { id: "erc4337",      label: "ERC-4337",            angle: 90   },
  { id: "usdc",         label: "USDC",                angle: 135  },
  { id: "solana",       label: "Solana",              angle: 180  },
  { id: "ethereum",     label: "Ethereum",            angle: 225  },
  { id: "ap2",          label: "AP2 / x402",          angle: 270  },
  { id: "webhooks",     label: "Webhooks",            angle: 315  },
] as const;

const CX = 400;
const CY = 260;
const RADIUS = 190;

function toXY(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * RADIUS,
    y: CY + Math.sin(rad) * RADIUS,
  };
}

function Packet({ nodeId, packetIndex }: { nodeId: string; packetIndex: number }) {
  const pos = toXY(PLATFORMS.find((p) => p.id === nodeId)!.angle);
  const delay = packetIndex * 0.9 + PLATFORMS.findIndex((p) => p.id === nodeId) * 0.25;

  return (
    <motion.g
      initial={{ x: pos.x - CX, y: pos.y - CY, opacity: 0 }}
      animate={{
        x: [pos.x - CX, 0],
        y: [pos.y - CY, 0],
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "linear",
      }}
    >
      <circle cx={CX} cy={CY} r={2.5} fill="rgba(16,185,129,0.85)" />
    </motion.g>
  );
}

const STATS = [
  { label: "Integration time", value: "<30 min" },
  { label: "Verification latency", value: "<2ms" },
  { label: "Trust Receipts", value: "Immutable" },
];

export function Ecosystem() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, amount: 0 });

  return (
    <section className="section-y overflow-hidden" id="ecosystem">
      <div className="container-page">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 22, mass: 1 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
            Ecosystem
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] mb-4">
            Works where you work.
            <br />
            <span className="text-[var(--color-fg-muted)] font-normal">
              Drop-in, not a rewrite.
            </span>
          </h2>
          <p className="text-sm text-[var(--color-fg-subtle)] max-w-md mx-auto leading-relaxed">
            STVOR integrates with agent frameworks, wallet standards, and payment
            rails you already use. One SDK call. Provider-agnostic. Self-hostable.
          </p>
        </motion.div>

        {/* Network SVG */}
        <div className="flex justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 800 520"
            width="100%"
            style={{ maxWidth: 760 }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="STVOR ecosystem network"
          >
            {/* Edges */}
            {PLATFORMS.map((p) => {
              const pos = toXY(p.angle);
              return (
                <motion.line
                  key={p.id}
                  x1={CX} y1={CY}
                  x2={pos.x} y2={pos.y}
                  stroke="rgba(16,185,129,0.18)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: PLATFORMS.indexOf(p) * 0.06, duration: 0.8 }}
                />
              );
            })}

            {/* Trust Receipt packets */}
            {PLATFORMS.flatMap((p) => [
              <Packet key={`${p.id}-0`} nodeId={p.id} packetIndex={0} />,
              <Packet key={`${p.id}-1`} nodeId={p.id} packetIndex={3} />,
            ])}

            {/* Outer nodes */}
            {PLATFORMS.map((p, i) => {
              const pos = toXY(p.angle);
              const lines = p.label.includes(" ")
                ? [p.label.split(" ")[0], p.label.split(" ").slice(1).join(" ")]
                : [p.label];

              return (
                <motion.g
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.32, 1] }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                >
                  <circle
                    cx={pos.x} cy={pos.y} r={28}
                    fill="rgba(255,255,255,0.03)"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />
                  {lines.length > 1 ? (
                    <text textAnchor="middle" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.6)">
                      <tspan x={pos.x} y={pos.y - 3} fontSize="8">{lines[0]}</tspan>
                      <tspan x={pos.x} dy="12" fontSize="8">{lines[1]}</tspan>
                    </text>
                  ) : (
                    <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.6)">
                      {lines[0]}
                    </text>
                  )}
                </motion.g>
              );
            })}

            {/* Center: STVOR */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.32, 1] }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              <motion.circle
                cx={CX} cy={CY} r={50}
                fill="none"
                stroke="rgba(16,185,129,0.1)"
                strokeWidth="1"
                animate={{ r: [50, 56, 50] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <circle
                cx={CX} cy={CY} r={42}
                fill="rgba(16,185,129,0.07)"
                stroke="rgba(16,185,129,0.32)"
                strokeWidth="1.5"
              />
              <text x={CX} y={CY - 5} textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="var(--font-mono)" fill="rgba(16,185,129,0.95)">
                STVOR
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill="rgba(16,185,129,0.45)" letterSpacing="0.08em">
                TRUST LAYER
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 60, damping: 22, mass: 1 }}
            >
              <div className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-fg)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-fg-subtle)] uppercase tracking-[0.12em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
