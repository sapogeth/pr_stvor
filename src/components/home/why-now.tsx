"use client";

import { motion } from "framer-motion";

const FORCES = [
  {
    number: "01",
    label: "Agentic finance is executing real capital today",
    stat: "$180B+",
    statLabel: "stablecoin supply in circulation, increasingly moved by autonomous systems",
    body: "OpenAI, Anthropic, and every major AI lab now ships agent frameworks with native payment capabilities. AI agents are executing treasury operations, payroll, vendor payments, and DeFi strategies in production — without a human approving each transaction. The infrastructure they run on was not designed for this.",
    color: "var(--color-accent)",
  },
  {
    number: "02",
    label: "Regulation is creating mandatory execution-time audit requirements",
    stat: "MiCA + GENIUS",
    statLabel: "stablecoin legislation mandating transaction traceability and authorization proof",
    body: "The EU's MiCA regulation (in force 2024) and the US GENIUS Act create compliance requirements that post-transaction analytics cannot satisfy. Regulators want proof that the right entity authorized the right action at execution time — not a log of what happened after. Cryptographic execution receipts are no longer optional.",
    color: "#818cf8",
  },
  {
    number: "03",
    label: "The attack surface compounds with every new deployment",
    stat: "3× faster",
    statLabel: "rate of AI agent deployment vs. security tooling adoption in financial infrastructure",
    body: "Every new agent framework, every new agentic workflow, every new autonomous treasury operation creates another unverified execution surface. The attack surface is growing faster than the defenses. Each new integration is a new gap. Without a universal verification layer, the problem scales with the ecosystem.",
    color: "#f59e0b",
  },
];

export function WhyNow() {
  return (
    <section className="section-y" id="why-now">
      <div className="container-page">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.32, 1] }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
            Why Now
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] max-w-xl">
              Three forces converging.
              <br />
              <span className="text-[var(--color-fg-muted)] font-normal">
                The window to define this category is now.
              </span>
            </h2>
            <p className="text-sm text-[var(--color-fg-muted)] max-w-sm lg:text-right leading-relaxed">
              The inflection point in autonomous finance is not coming.
              It arrived. The question is who builds the trust infrastructure.
            </p>
          </div>
        </motion.div>

        {/* Forces */}
        <div className="space-y-px">
          {FORCES.map((force, i) => (
            <motion.div
              key={force.number}
              className="group flex flex-col md:flex-row gap-0 border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-border-strong)] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.32, 1] }}
            >
              {/* Number + stat panel */}
              <div
                className="md:w-56 flex-shrink-0 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] flex flex-col justify-between gap-4"
              >
                <span
                  className="text-4xl font-semibold tracking-[-0.04em] font-mono"
                  style={{ color: force.color, opacity: 0.7 }}
                >
                  {force.number}
                </span>
                <div>
                  <div
                    className="text-2xl font-semibold tracking-[-0.02em] mb-1"
                    style={{ color: force.color }}
                  >
                    {force.stat}
                  </div>
                  <div className="text-[11px] text-[var(--color-fg-subtle)] leading-snug">
                    {force.statLabel}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8 bg-[var(--color-bg-elevated)]">
                <h3 className="text-[15px] font-semibold text-[var(--color-fg)] mb-3 leading-snug">
                  {force.label}
                </h3>
                <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {force.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
