"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const PERSONAS = [
  {
    id: "wallets",
    label: "Wallet Providers & Custodians",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
        <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    examples: ["Fireblocks-powered platforms", "Bank custody divisions", "Enterprise crypto treasuries"],
    problem: "Your clients are deploying AI agents to execute on their behalf. You have policy controls inside your custody layer — but nothing that verifies what an agent committed to vs. what it is about to execute. One bad execution creates liability you cannot explain to an auditor.",
    solution: "STVOR integrates as a verification layer before execution reaches your custody system. Every agent action produces a cryptographically signed receipt: what was committed, what was received, what decision was made, and why. Provider-agnostic — works alongside your existing custody infrastructure.",
    capabilities: [
      "Pre-execution payload verification against signed commitments",
      "Cryptographic execution receipts for every agent action",
      "Agent identity and authorization chain validation",
      "Audit-ready trails with es256 signatures",
    ],
    codeLines: [
      '// Verify before custody execution',
      'const receipt = await stvor.verify({',
      '  commitment: agent.commitment,',
      '  payload:    transaction.payload,',
      '  agent_id:   agent.id,',
      '})',
      '',
      '// receipt.decision: "DENY"',
      '// receipt.signature: (full ES256 base64url — see demo fixture)',
    ],
  },
  {
    id: "agents",
    label: "AI Agent Platforms",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 9h6M9 12h6M9 15h4" />
        <circle cx="16.5" cy="15" r="1" fill="currentColor" />
      </svg>
    ),
    examples: ["LangChain / LangGraph apps", "OpenAI Agent deployments", "Custom agentic finance products"],
    problem: "Your agents can be compromised mid-execution. Prompt injection replaces destinations. Tool calls return manipulated payloads. Context windows hold stale authorization state. You ship confidence; you're delivering risk. One successful attack and the trust in your platform is gone.",
    solution: "Wrap every financial tool call with a STVOR commitment before execution. The commitment anchors the intent cryptographically. Any modification to destination, amount, or context breaks the commitment hash. STVOR blocks it. Your agent never runs an operation it didn't sign.",
    capabilities: [
      "Drop-in SDK — wrap existing tool calls in <2 lines",
      "Commitment anchoring before every financial action",
      "MCP-native integration for agent frameworks",
      "Context integrity verification against signed state",
    ],
    codeLines: [
      '// Drop in before any financial tool call',
      'import { stvor } from "@stvor/client"',
      '',
      'const result = await stvor.execute({',
      '  action: "payment.send",',
      '  to:     resolvedAddress,',
      '  amount: 50_000,',
      '  commitment: await agent.commit(payload)',
      '})',
    ],
  },
  {
    id: "treasury",
    label: "Enterprise Treasury & Stablecoin Infrastructure",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    examples: ["Stablecoin issuers", "Corporate treasury automation", "Cross-chain settlement infrastructure"],
    problem: "Autonomous treasury operations have no execution-time audit trail that regulators can verify. You know what happened from your transaction logs. You cannot prove the authorization chain was intact at the moment of execution. MiCA and GENIUS Act compliance requires exactly this proof.",
    solution: "Every treasury operation produces a STVOR Trust Receipt — a cryptographically signed, immutable record of authorization state, payload integrity, and execution decision at the exact moment of execution. Show it to regulators. Show it to auditors. Show it to counterparties. It is self-verifying.",
    capabilities: [
      "Immutable execution receipts for regulatory audit",
      "Policy-based execution gates (amount limits, recipient allowlists)",
      "Multi-party authorization chain verification",
      "Settlement integrity across cross-chain operations",
    ],
    codeLines: [
      '// Every treasury action: receipt-on-chain',
      '{',
      '  receipt_id:  "trcpt_sample_001",',
      '  action:      "settlement.execute",',
      '  authorized:  ["cfo@corp.com", "treasury_agent"],',
      '  amount:      "5,000,000.00 USDC",',
      '  status:      "✓ EXECUTED",',
      '  sig:         "es256:9xR2..."',
      '}',
    ],
  },
];

export function UseCases() {
  const [active, setActive] = useState(0);
  const persona = PERSONAS[active];

  return (
    <section className="section-y" id="use-cases">
      <div className="container-page">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 22, mass: 1 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
            Use Cases
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] max-w-2xl">
            Who builds on STVOR.
          </h2>
        </motion.div>

        {/* Persona tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 22, mass: 1, delay: 0.1 }}
        >
          {PERSONAS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-[6px] text-sm transition-all"
              style={{
                background: active === i ? "rgba(255,255,255,0.07)" : "transparent",
                border: `1px solid ${active === i ? "rgba(255,255,255,0.18)" : "var(--color-border)"}`,
                color: active === i ? "var(--color-fg)" : "var(--color-fg-muted)",
              }}
            >
              <span style={{ color: active === i ? "var(--color-accent)" : "var(--color-fg-subtle)" }}>
                {p.icon}
              </span>
              {p.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Left: Problem + solution */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-7">
              {/* Examples */}
              <div className="flex flex-wrap gap-2 mb-6">
                {persona.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-[10px] px-2.5 py-1 rounded border tracking-wide"
                    style={{
                      color: "var(--color-fg-subtle)",
                      borderColor: "var(--color-border)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <p className="text-[10px] tracking-[0.15em] uppercase text-[rgba(239,68,68,0.6)] mb-2 font-medium">
                  The problem
                </p>
                <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {persona.problem}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-accent)] mb-2 font-medium">
                  How STVOR helps
                </p>
                <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {persona.solution}
                </p>
              </div>

              <ul className="space-y-2.5">
                {persona.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5">
                    <span
                      className="mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--color-accent)" }}
                    />
                    <span className="text-[12px] text-[var(--color-fg-muted)] leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Code sample */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-70" />
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-fg-subtle)] font-medium">
                    Integration
                  </span>
                </div>
                <span className="text-[9px] text-[var(--color-fg-subtle)] font-mono">TypeScript</span>
              </div>
              <pre
                className="flex-1 p-6 text-[12px] leading-[1.75] font-mono overflow-auto"
              >
                {persona.codeLines.map((line, i) => (
                  <span
                    key={i}
                    className="block"
                    style={{
                      color: line.startsWith("//")
                        ? "rgba(255,255,255,0.28)"
                        : line.includes("✓") || line.includes("es256") || line.includes("sig")
                        ? "rgba(16,185,129,0.85)"
                        : line === ""
                        ? "transparent"
                        : "rgba(255,255,255,0.65)",
                    }}
                  >
                    {line || " "}
                  </span>
                ))}
              </pre>

              <div className="px-5 py-4 border-t border-[var(--color-border)]">
                <a
                  href={siteConfig.cta.docs}
                  className="text-[12px] text-[var(--color-accent)] hover:opacity-80 transition-opacity"
                >
                  View integration docs →
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
