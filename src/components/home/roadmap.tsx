"use client";

import { motion } from "framer-motion";

const ROADMAP = [
  {
    phase: "2026",
    label: "Now",
    title: "Agent-money verification",
    items: [
      "OrbWallet integration (in progress)",
      "x402 payment rail",
      "ATS-1 Trust Receipt spec publication",
      "Design partner integrations",
    ],
  },
  {
    phase: "2027",
    label: "Planned",
    title: "Broader rails + registry",
    items: [
      "Additional execution rails beyond payment verify",
      "Evaluate on-chain receipt registry for composability",
    ],
  },
  {
    phase: "2028+",
    label: "Future",
    title: "Treasury & compliance scale",
    items: [
      "Enterprise treasury automation receipts",
      "Regulatory audit trail exports (MiCA / stablecoin context)",
      "Post-quantum signature migration path (if warranted)",
    ],
  },
];

export function Roadmap() {
  return (
    <section className="section-y border-t border-[var(--color-border)]" id="roadmap">
      <div className="container-page">
        <motion.div
          className="mb-10 max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-fg-subtle)] mb-3 font-mono">
            Roadmap
          </p>
          <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-[var(--color-fg-muted)]">
            Where this goes. Not where it starts.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {ROADMAP.map((phase, i) => (
            <motion.div
              key={phase.phase}
              className="rounded-xl border border-[var(--color-border)] p-5 opacity-90"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono text-[var(--color-fg-subtle)]">
                  {phase.phase}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-fg-subtle)] uppercase tracking-wider">
                  {phase.label}
                </span>
              </div>
              <h3 className="text-[13px] font-medium text-[var(--color-fg-muted)] mb-3">
                {phase.title}
              </h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="text-[12px] text-[var(--color-fg-subtle)] leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
