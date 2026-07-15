"use client";

import { motion } from "framer-motion";

const STAGE = [
  {
    label: "Live today",
    status: "reference",
    items: [
      "Reference implementation: Stripe manual-capture escrow flow",
      "Three-check verification gate (destination, payload, policy)",
      "ES256 (P-256) signed Trust Receipt — ALLOW and DENY",
      "Built and demoed (NVIDIA judging, hackathon)",
    ],
  },
  {
    label: "In progress",
    status: "active",
    items: [
      "ATS-1 receipt format spec (draft, open)",
      "Pilot integrations with design partners — white-glove, not self-serve",
      "MIT-licensed reference code on GitHub",
    ],
  },
  {
    label: "Planned rails",
    status: "planned",
    items: [
      "x402 payment rail integration",
      "OrbWallet integration",
      "On-chain receipt registry (evaluating necessity)",
    ],
  },
];

const STATUS_STYLE: Record<string, { color: string; badge: string }> = {
  reference: { color: "var(--color-accent)", badge: "Reference impl" },
  active: { color: "rgba(99,102,241,0.9)", badge: "Now" },
  planned: { color: "rgba(255,255,255,0.35)", badge: "Planned" },
};

export function CurrentStage() {
  return (
    <section className="section-y" id="current-stage">
      <div className="container-page">
        <motion.div
          className="mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium font-mono">
            Current stage
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[var(--color-fg)] mb-4">
            Honest about where this is.
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Reference implementation is live and demonstrable. Production integrations happen
            through paid pilots — I stand up the checkpoint in your flow with you. No
            customer logos, no ARR, no user counts on this page until you see them elsewhere
            with a source.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {STAGE.map((block, i) => {
            const style = STATUS_STYLE[block.status];
            return (
              <motion.div
                key={block.label}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-semibold text-[var(--color-fg)]">
                    {block.label}
                  </h3>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded border tracking-wider font-mono uppercase"
                    style={{
                      color: style.color,
                      borderColor: `${style.color}33`,
                    }}
                  >
                    {style.badge}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="text-[12.5px] text-[var(--color-fg-muted)] leading-relaxed flex gap-2"
                    >
                      <span className="text-[var(--color-fg-subtle)] flex-shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="mt-8 text-[12px] text-[var(--color-fg-subtle)] font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Latency: &lt;2ms per check in reference implementation on commodity hardware — not
          a production SLA until measured in your environment.
        </motion.p>
      </div>
    </section>
  );
}
