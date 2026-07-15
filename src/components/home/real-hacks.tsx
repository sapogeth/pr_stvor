"use client";

import { motion } from "framer-motion";

const HACKS = [
  {
    id: "bybit",
    date: "Feb 2025",
    name: "Bybit",
    loss: "$1.5B",
    mechanism:
      "Destination changed after review. Signers approved what they saw on screen and signed something else. Multisig did not catch the swap between review and broadcast.",
    lesson: "Same class of failure as agent destination-swap: commitment at review time ≠ payload at execution time.",
  },
  {
    id: "jared",
    date: "2023–2024",
    name: "JaredFromSubway MEV bot",
    loss: "$7.5M",
    mechanism:
      "Unknown counterparty accumulated token approvals over weeks, then drained the bot's wallet. No trust gate on who could receive outbound transfers.",
    lesson: "Binding intent to execution matters as much as signing the right hash once — policy gates enforce who can receive funds.",
  },
];

export function RealHacks() {
  return (
    <section className="section-y" id="real-incidents">
      <div className="container-page">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium font-mono">
            Not theoretical
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] mb-4">
            This gap already cost billions.
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            If your product moves user or treasury funds through an agent today, you have
            the same structural hole: execution happens before anyone verifies the live
            payload still matches intent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {HACKS.map((hack, i) => (
            <motion.article
              key={hack.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--color-fg)]">
                    {hack.name}
                  </h3>
                  <p className="text-[11px] text-[var(--color-fg-subtle)] font-mono mt-0.5">
                    {hack.date}
                  </p>
                </div>
                <span
                  className="text-lg font-semibold font-mono tracking-tight"
                  style={{ color: "rgba(239,68,68,0.85)" }}
                >
                  {hack.loss}
                </span>
              </div>
              <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed mb-4">
                {hack.mechanism}
              </p>
              <p className="text-[12px] text-[var(--color-fg-subtle)] leading-relaxed border-t border-[var(--color-border)] pt-4">
                <span className="text-[var(--color-accent)] font-medium">→ </span>
                {hack.lesson}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-10 text-[14px] text-[var(--color-fg-muted)] max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stvor is the check between intent and execution. It acts{" "}
          <span className="text-[var(--color-fg)]">before</span>. Monitoring acts after —
          after is irreversible.
        </motion.p>
      </div>
    </section>
  );
}
