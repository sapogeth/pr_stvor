"use client";

import { motion } from "framer-motion";

const CHAINALYSIS_URL =
  "https://www.chainalysis.com/blog/x402-agentic-payments-adoption/";

const BANDS = [
  {
    label: "Transactions $1+",
    sublabel: "share of value transferred",
    before: "49%",
    after: "95%",
    period: "early 2025 → early 2026",
    highlight: true,
  },
  {
    label: "10¢ – $1 band",
    sublabel: "share of value transferred",
    before: "46%",
    after: "4%",
    period: "early 2025 → early 2026",
    highlight: false,
  },
] as const;

export function AgentEconomy() {
  return (
    <section className="section-y pt-4" id="agent-economy">
      <div className="container-page">
        <motion.div
          className="mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium font-mono">
            Already happening
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] mb-4">
            Agent payments stopped being pocket change.
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            On Base, x402 still processes huge numbers of sub-cent pings — but{" "}
            <span className="text-[var(--color-fg)]">where the dollars sit</span> moved.
            Transactions of $1 or more went from{" "}
            <span className="font-mono text-[13px]">49%</span> of value transferred to{" "}
            <span className="font-mono text-[13px]">95%</span> in one year. The 10¢–$1 band
            collapsed <span className="font-mono text-[13px]">46% → 4%</span>. That is real
            economic weight, not a roadmap slide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
          {BANDS.map((band, i) => (
            <motion.div
              key={band.label}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-fg-subtle)] font-mono mb-1">
                {band.sublabel}
              </p>
              <h3 className="text-[15px] font-semibold text-[var(--color-fg)] mb-4">
                {band.label}
              </h3>
              <div className="flex items-end gap-6 mb-3">
                <div>
                  <p className="text-[10px] text-[var(--color-fg-subtle)] mb-1">Early 2025</p>
                  <p className="text-2xl font-semibold font-mono tracking-tight text-[var(--color-fg-muted)]">
                    {band.before}
                  </p>
                </div>
                <span className="text-[var(--color-fg-subtle)] pb-1">→</span>
                <div>
                  <p className="text-[10px] text-[var(--color-fg-subtle)] mb-1">Early 2026</p>
                  <p
                    className="text-2xl font-semibold font-mono tracking-tight"
                    style={{
                      color: band.highlight
                        ? "rgba(16,185,129,0.95)"
                        : "var(--color-fg)",
                    }}
                  >
                    {band.after}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-fg-subtle)] font-mono">{band.period}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-[13px] text-[var(--color-fg-muted)] max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          When agents move five-figure USDC, a destination swap is not a lab exercise. Stvor is
          the hash compare at execution — before the rail fires.{" "}
          <a
            href={CHAINALYSIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-fg-subtle)] underline underline-offset-2 hover:text-[var(--color-fg-muted)]"
          >
            Chainalysis · x402 on Base ↗
          </a>
        </motion.p>
      </div>
    </section>
  );
}
