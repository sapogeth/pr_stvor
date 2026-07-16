"use client";

import { motion } from "framer-motion";

const SEGMENTS = [
  {
    title: "Agent-commerce products in production",
    body: "You ship autonomous checkout, invoicing, or API-billed agents. Real user money moves on every successful tool call. One destination swap is a company-ending event.",
    signals: ["LangGraph / custom agent loops", "Stripe or on-chain settlement", "No human in the approval loop"],
  },
  {
    title: "DeFi / trading bots with treasury at risk",
    body: "Your bot holds hot wallet balances and executes strategies 24/7. A destination swap between your strategy's decision and the broadcast is the failure mode Stvor catches — not slow approval farming or counterparty trust scoring.",
    signals: ["MEV / arb / market-making bots", "Multi-chain execution", "Swap between decision and broadcast"],
  },
  {
    title: "Agent platforms where customers bring their own keys",
    body: "You provide the agent runtime; customers connect wallets or payment rails. You cannot see inside their custody stack — but you can require a Stvor checkpoint before their agents execute.",
    signals: ["B2B agent infrastructure", "Customer-owned keys", "Liability without visibility"],
  },
];

export function WhoItsFor() {
  return (
    <section className="section-y" id="who-its-for">
      <div className="container-page">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium font-mono">
            Who it&apos;s for
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[var(--color-fg)] mb-4">
            Builders whose agents already move real funds.
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Written for a technical founder or eng lead — not a CISO buying a dashboard.
            If you are still in prototype with no live money, the pilot is probably early.
            If funds move today and you worry about a destination swap or tampering{" "}
            <em>after</em> commit, read on. Stvor compares hash at execution — not poisoned
            commits from prompt injection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SEGMENTS.map((seg, i) => (
            <motion.div
              key={seg.title}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <h3 className="text-[15px] font-semibold text-[var(--color-fg)] mb-3 leading-snug">
                {seg.title}
              </h3>
              <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed mb-6 flex-1">
                {seg.body}
              </p>
              <ul className="space-y-2 border-t border-[var(--color-border)] pt-4">
                {seg.signals.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[11px] text-[var(--color-fg-subtle)]">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "var(--color-accent)", opacity: 0.7 }}
                    />
                    {s}
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
