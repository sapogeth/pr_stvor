"use client";

import { motion } from "framer-motion";

const ROADMAP = [
  {
    phase: "Now — 2026",
    status: "shipping",
    title: "Execution Trust Layer for AI Agent Finance",
    items: [
      "Pre-execution verification for AI agent payments",
      "Signed commitment anchoring before any financial action",
      "Cryptographic Trust Receipts with ed25519 signatures",
      "Drop-in SDK for LangChain, OpenAI Agents, MCP",
    ],
  },
  {
    phase: "2027",
    status: "building",
    title: "Trust Layer for Stablecoin Infrastructure",
    items: [
      "Compliance-grade execution receipts for USDC / USDT / institutional stablecoins",
      "MiCA and GENIUS Act audit trail generation",
      "Cross-chain settlement integrity verification",
      "Issuer-level policy enforcement before mint / burn",
    ],
  },
  {
    phase: "2028",
    status: "planned",
    title: "Trust Layer for Treasury Automation",
    items: [
      "Enterprise treasury agent verification at scale",
      "Multi-party authorization chain validation",
      "Real-time policy gates for treasury operations",
      "Institutional-grade audit modules for Big Four firms",
    ],
  },
  {
    phase: "2030+",
    status: "vision",
    title: "Post-Quantum Migration Platform & Custom Cryptography",
    items: [
      "Quantum readiness assessment for financial infrastructure",
      "Migration tooling from classical to post-quantum primitives",
      "Custom cryptographic implementations for enterprise clients",
      "The ARM of cryptography — licensing primitives to infrastructure providers",
    ],
  },
];

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  shipping: { color: "rgba(16,185,129,0.9)", label: "Shipping now" },
  building:  { color: "rgba(99,102,241,0.8)", label: "In development" },
  planned:   { color: "rgba(245,158,11,0.75)", label: "Planned" },
  vision:    { color: "rgba(255,255,255,0.3)", label: "Long-term vision" },
};

export function Vision() {
  return (
    <section className="section-y" id="vision">
      <div className="container-page">

        {/* Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.32, 1] }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
            Vision
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] mb-5">
            Trust infrastructure for
            <br />
            <span className="text-[var(--color-fg-muted)] font-normal">
              programmable finance.
            </span>
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed max-w-2xl">
            STVOR is building the verification layer that every financial operation
            will eventually require. The same way SSL became mandatory for HTTPS,
            execution verification becomes mandatory for autonomous finance.
            The endgame: every financial operation on the planet, verified before it runs.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[19px] top-3 bottom-3 w-[1px] hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(16,185,129,0.4), rgba(255,255,255,0.06))" }}
          />

          <div className="space-y-6">
            {ROADMAP.map((phase, i) => {
              const style = STATUS_STYLES[phase.status];
              return (
                <motion.div
                  key={phase.phase}
                  className="flex flex-col md:flex-row gap-6"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.32, 1] }}
                >
                  {/* Timeline left column: dot + phase label */}
                  <div className="hidden md:flex flex-col items-end flex-shrink-0 pt-5 gap-2" style={{ width: 160 }}>
                    <div className="flex flex-col items-end gap-1.5 pr-4">
                      <span
                        className="text-[11px] font-mono font-semibold text-right"
                        style={{ color: style.color }}
                      >
                        {phase.phase}
                      </span>
                      <span
                        className="text-[9px] tracking-[0.12em] uppercase font-mono font-medium text-right"
                        style={{ color: style.color, opacity: 0.7 }}
                      >
                        {style.label}
                      </span>
                    </div>
                    <div className="flex justify-end pr-4 w-full">
                      <div
                        className="w-2.5 h-2.5 rounded-full border-2 flex-shrink-0"
                        style={{
                          borderColor: style.color,
                          background: phase.status === "shipping" ? style.color : "var(--color-bg)",
                          boxShadow: phase.status === "shipping" ? `0 0 12px ${style.color}` : "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-xl border bg-[var(--color-bg-elevated)] overflow-hidden"
                    style={{
                      borderColor: phase.status === "shipping" ? "rgba(16,185,129,0.25)" : "var(--color-border)",
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div>
                        {/* Phase label shown on mobile only (desktop: left column) */}
                        <span
                          className="md:hidden text-[10px] tracking-[0.14em] uppercase font-medium font-mono"
                          style={{ color: style.color }}
                        >
                          {phase.phase}
                        </span>
                        <h3 className="md:mt-0 mt-1 text-[15px] font-semibold text-[var(--color-fg)]">
                          {phase.title}
                        </h3>
                      </div>
                      {/* Status badge shown on mobile only (desktop: left column) */}
                      <span
                        className="md:hidden text-[9px] px-2.5 py-1 rounded border tracking-wider font-mono self-start sm:self-auto flex-shrink-0"
                        style={{
                          color: style.color,
                          borderColor: `${style.color.replace("0.9", "0.25").replace("0.8", "0.25").replace("0.75", "0.25").replace("0.3", "0.15")}`,
                          background: `${style.color.replace("0.9", "0.06").replace("0.8", "0.06").replace("0.75", "0.05").replace("0.3", "0.04")}`,
                        }}
                      >
                        {style.label}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="px-6 py-5 grid sm:grid-cols-2 gap-y-2.5 gap-x-6">
                      {phase.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <span
                            className="mt-[3px] w-1 h-1 rounded-full flex-shrink-0"
                            style={{
                              background: phase.status === "vision" ? "rgba(255,255,255,0.2)" : style.color,
                            }}
                          />
                          <span
                            className="text-[12px] leading-relaxed"
                            style={{
                              color: phase.status === "vision"
                                ? "var(--color-fg-subtle)"
                                : "var(--color-fg-muted)",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          className="mt-16 p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.32, 1] }}
        >
          <p className="text-lg md:text-xl font-semibold tracking-[-0.02em] text-[var(--color-fg)] mb-3 max-w-2xl mx-auto leading-snug">
            &ldquo;The question is not whether autonomous finance needs a trust layer.
            <br />
            <span className="text-[var(--color-fg-muted)] font-normal">
              The question is who builds it, and who it belongs to.&rdquo;
            </span>
          </p>
          <p className="text-sm text-[var(--color-fg-subtle)]">STVOR — Execution Trust Layer</p>
        </motion.div>
      </div>
    </section>
  );
}
