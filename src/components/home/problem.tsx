"use client";

import { motion } from "framer-motion";

function IconSwap() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 5h9M9 3l2 2-2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 11H5M7 9l-2 2 2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const SCENARIO = {
  label: "Destination swap",
  title: "The destination changed. Nobody noticed.",
  description:
    "Between commitment and execution, the recipient address was silently rewritten. The agent believed it was paying the right vendor. The audit log showed a successful transfer. The money went somewhere else. Stvor catches this with one gate: canonical payload hash compare.",
  before: [
    "// Agent committed to:",
    '  to: "0x7a3f91cd...4e"',
    '  amount: "50000.00"',
    '  currency: "USDC"',
  ],
  after: [
    "// What arrived at execution:",
    '  to: "0x4c1b82f7...3a7" ←',
    '  amount: "50000.00"',
    '  currency: "USDC"',
  ],
  status: "UNDETECTED BY MONITORING",
  severity: "CRITICAL",
};

export function Problem() {
  return (
    <section className="section-y" id="problem">
      <div className="container-page">

        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 22, mass: 1 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
            The Problem
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] mb-5">
            Intent and execution diverge.
            <br />
            <span className="text-[var(--color-fg-muted)] font-normal">
              Monitoring only sees it after.
            </span>
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Stvor solves one class of failure with certainty: the live payment payload no
            longer matches what was committed. Not scope revocation. Not slow approval
            farming. A hash compare at execution time.
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 24, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 55, damping: 22, mass: 1 }}
        >
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
            <div className="px-5 pt-5 pb-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="flex-shrink-0"
                  style={{ color: "rgba(239,68,68,0.6)" }}
                >
                  <IconSwap />
                </span>
                <span className="text-[9px] tracking-[0.16em] uppercase text-[var(--color-fg-subtle)] font-medium">
                  {SCENARIO.label}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--color-fg)] leading-snug">
                {SCENARIO.title}
              </h3>
              <p className="mt-2.5 text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
                {SCENARIO.description}
              </p>
            </div>

            <div className="p-4 space-y-3">
              <div className="story-code-block">
                <div className="story-code-dots">
                  <span /><span /><span />
                </div>
                <pre className="story-code-pre" style={{ fontSize: "10.5px" }}>
                  {SCENARIO.before.map((line, i) => (
                    <span
                      key={i}
                      className="block"
                      style={{
                        color: line.startsWith("//")
                          ? "rgba(255,255,255,0.28)"
                          : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {line || " "}
                    </span>
                  ))}
                </pre>
              </div>

              <div
                className="story-code-block"
                style={{ borderColor: "rgba(239,68,68,0.2)" }}
              >
                <div className="story-code-dots">
                  <span style={{ background: "rgba(239,68,68,0.4)" }} />
                  <span /><span />
                </div>
                <pre className="story-code-pre" style={{ fontSize: "10.5px" }}>
                  {SCENARIO.after.map((line, i) => (
                    <span
                      key={i}
                      className="block"
                      style={{
                        color: line.includes("←")
                          ? "rgba(239,68,68,0.85)"
                          : line.startsWith("//")
                          ? "rgba(255,255,255,0.28)"
                          : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {line || " "}
                    </span>
                  ))}
                </pre>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] tracking-[0.12em] uppercase font-medium"
                  style={{ color: "rgba(239,68,68,0.75)" }}
                >
                  {SCENARIO.status}
                </span>
                <span
                  className="text-[9px] px-2 py-0.5 rounded border tracking-wider font-mono"
                  style={{
                    color: "rgba(239,68,68,0.65)",
                    borderColor: "rgba(239,68,68,0.2)",
                    background: "rgba(239,68,68,0.05)",
                  }}
                >
                  {SCENARIO.severity}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="mt-14 text-center text-sm text-[var(--color-fg-subtle)] max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Monitoring reports after execution.{" "}
          <span className="text-[var(--color-fg-muted)]">
            Stvor compares the hash before a dollar moves.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
