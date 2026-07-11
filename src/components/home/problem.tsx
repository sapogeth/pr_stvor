"use client";

import { motion } from "framer-motion";

// ── Icons ────────────────────────────────────────────────────────────────────

function IconSwap() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 5h9M9 3l2 2-2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 11H5M7 9l-2 2 2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.5 2.5l1 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

function IconInject() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 5v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: "payload",
    Icon: IconSwap,
    label: "Payload manipulation",
    title: "The destination changed. Nobody noticed.",
    description:
      "Between commitment and execution, the recipient address was silently rewritten. The AI agent believed it was paying the right vendor. The audit log showed a successful transfer. The money went somewhere else.",
    before: [
      '// Agent committed to:',
      '  destination: "0x7a3f91cd...4e"',
      '  amount:      50_000 USDC',
      '  vendor:      "Acme Corp"',
    ],
    after: [
      '// What arrived at execution:',
      '  destination: "0x4c1b82f7...3a7" ←',
      '  amount:      50_000 USDC',
      '  vendor:      "Acme Corp"',
    ],
    status: "UNDETECTED BY MONITORING",
    severity: "CRITICAL",
  },
  {
    id: "auth",
    Icon: IconClock,
    label: "Authorization gap",
    title: "The authorization was revoked. The execution ran anyway.",
    description:
      "A treasury automation agent held a signed authorization for routine operations. The authorization was revoked when the vendor contract ended. The agent's context cache was stale. The $200K transfer executed anyway.",
    before: [
      '// Authorization at signing time:',
      '  agent_id:   "agt_treasury_01"',
      '  scope:      "transfer.approve"',
      '  valid_until: "2026-03-01T00:00:00Z"',
    ],
    after: [
      '// Execution time (2026-04-15):',
      '  agent_id:   "agt_treasury_01"',
      '  scope:      "transfer.approve"',
      '  status:     "EXPIRED" ← ignored',
    ],
    status: "UNDETECTED BY MONITORING",
    severity: "CRITICAL",
  },
  {
    id: "injection",
    Icon: IconInject,
    label: "Context injection",
    title: "The agent was told to pay a different address. It believed it.",
    description:
      "A prompt injection in an external data source replaced the recipient address mid-conversation. The agent completed the task exactly as instructed — by the attacker. The user saw a confirmation. The funds were gone.",
    before: [
      '// User instruction:',
      '  "Pay $15,000 to our payroll',
      '   provider as scheduled."',
    ],
    after: [
      '// Agent context after injection:',
      '  "Pay $15,000 to payroll provider"',
      '  [injected] destination: "0x9d..."',
      '  // User never saw this change',
    ],
    status: "UNDETECTED BY MONITORING",
    severity: "CRITICAL",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 55, damping: 22, mass: 1 },
  },
};

export function Problem() {
  return (
    <section className="section-y" id="problem">
      <div className="container-page">

        {/* Header */}
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
            The gap between intent and execution
            <br />
            <span className="text-[var(--color-fg-muted)] font-normal">
              has never been closed.
            </span>
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Financial operations fail between the moment they are committed and
            the moment they execute. Monitoring doesn&apos;t catch this. It
            reports after. After is irreversible.
          </p>
        </motion.div>

        {/* Scenarios */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SCENARIOS.map((s) => (
            <motion.div
              key={s.id}
              variants={cardVariants}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden"
            >
              {/* Card header */}
              <div className="px-5 pt-5 pb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="flex-shrink-0"
                    style={{ color: "rgba(239,68,68,0.6)" }}
                  >
                    <s.Icon />
                  </span>
                  <span className="text-[9px] tracking-[0.16em] uppercase text-[var(--color-fg-subtle)] font-medium">
                    {s.label}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--color-fg)] leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
                  {s.description}
                </p>
              </div>

              {/* Evidence panels */}
              <div className="p-4 space-y-3">
                {/* Before */}
                <div className="story-code-block">
                  <div className="story-code-dots">
                    <span /><span /><span />
                  </div>
                  <pre className="story-code-pre" style={{ fontSize: "10.5px" }}>
                    {s.before.map((line, i) => (
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

                {/* After */}
                <div
                  className="story-code-block"
                  style={{ borderColor: "rgba(239,68,68,0.2)" }}
                >
                  <div className="story-code-dots">
                    <span style={{ background: "rgba(239,68,68,0.4)" }} />
                    <span /><span />
                  </div>
                  <pre className="story-code-pre" style={{ fontSize: "10.5px" }}>
                    {s.after.map((line, i) => (
                      <span
                        key={i}
                        className="block"
                        style={{
                          color: line.includes("←") || line.includes("ignored") || line.includes("never")
                            ? "rgba(239,68,68,0.85)"
                            : line.startsWith("//") || line.startsWith("  //")
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

              {/* Status badge */}
              <div className="px-5 pb-5">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] tracking-[0.12em] uppercase font-medium"
                    style={{ color: "rgba(239,68,68,0.75)" }}
                  >
                    {s.status}
                  </span>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded border tracking-wider font-mono"
                    style={{
                      color: "rgba(239,68,68,0.65)",
                      borderColor: "rgba(239,68,68,0.2)",
                      background: "rgba(239,68,68,0.05)",
                    }}
                  >
                    {s.severity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing statement */}
        <motion.p
          className="mt-14 text-center text-sm text-[var(--color-fg-subtle)] max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Every existing solution — monitoring platforms, SIEM tools, compliance dashboards —
          acts after execution. They see what happened.{" "}
          <span className="text-[var(--color-fg-muted)]">
            STVOR acts before. It sees what is about to happen.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
