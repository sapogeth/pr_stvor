"use client";

import { motion } from "framer-motion";

type Check = "yes" | "no" | "partial";

interface Competitor {
  name: string;
  category: string;
  timing: string;
  agentNative: Check;
  custodyAgnostic: Check;
  cryptoProof: Check;
  highlight?: boolean;
  note?: string;
}

const ROWS: Competitor[] = [
  {
    name: "STVOR",
    category: "Execution Trust Layer",
    timing: "Pre-execution",
    agentNative: "yes",
    custodyAgnostic: "yes",
    cryptoProof: "yes",
    highlight: true,
  },
  {
    name: "Fireblocks",
    category: "Custody + Policy Engine",
    timing: "Pre-execution",
    agentNative: "partial",
    custodyAgnostic: "no",
    cryptoProof: "partial",
    note: "Policy engine only works within Fireblocks custody",
  },
  {
    name: "Blockaid",
    category: "Transaction Simulation",
    timing: "Pre-sign (web3 only)",
    agentNative: "no",
    custodyAgnostic: "yes",
    cryptoProof: "no",
    note: "Simulates web3 transactions, no agent-native support",
  },
  {
    name: "Hypernative",
    category: "Threat Monitoring",
    timing: "Post-event",
    agentNative: "no",
    custodyAgnostic: "yes",
    cryptoProof: "no",
    note: "Monitors on-chain events after execution",
  },
  {
    name: "Safe (Gnosis)",
    category: "Multi-sig Governance",
    timing: "Pre-execution",
    agentNative: "no",
    custodyAgnostic: "yes",
    cryptoProof: "yes",
    note: "Multi-sig governance, not AI agent verification",
  },
  {
    name: "Chainalysis / TRM",
    category: "Compliance Analytics",
    timing: "Post-transaction",
    agentNative: "no",
    custodyAgnostic: "yes",
    cryptoProof: "no",
    note: "Forensics and compliance reporting after the fact",
  },
];

function CheckCell({ value, label }: { value: Check; label?: boolean }) {
  if (value === "yes") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[12px] font-medium"
        style={{ color: "rgba(16,185,129,0.9)" }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2.5 6.5L5 9L10.5 3.5" stroke="rgba(16,185,129,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {label && "Yes"}
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[12px] font-medium"
        style={{ color: "rgba(245,158,11,0.85)" }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="1.5" fill="rgba(245,158,11,0.85)" />
          <path d="M3.5 6.5h6" stroke="rgba(245,158,11,0.85)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {label && "Partial"}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12px]"
      style={{ color: "rgba(255,255,255,0.2)" }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M4 4L9 9M9 4L4 9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {label && "No"}
    </span>
  );
}

const COL_HEADERS = [
  { key: "name", label: "Solution" },
  { key: "category", label: "Category" },
  { key: "timing", label: "When it acts" },
  { key: "agentNative", label: "AI agent native" },
  { key: "custodyAgnostic", label: "Custody-agnostic" },
  { key: "cryptoProof", label: "Cryptographic proof" },
];

export function Competitive() {
  return (
    <section className="section-y" id="compare">
      <div className="container-page">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.32, 1] }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
            Competitive Positioning
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] max-w-xl">
              Every existing solution
              <br />
              <span className="text-[var(--color-fg-muted)] font-normal">
                acts too late, or inside one provider.
              </span>
            </h2>
            <p className="text-sm text-[var(--color-fg-muted)] max-w-sm lg:text-right leading-relaxed">
              No existing solution is provider-agnostic, AI-native, and operates
              before execution with cryptographic proof. That is the gap STVOR closes.
            </p>
          </div>
        </motion.div>

        {/* Mobile scroll hint */}
        <p className="flex items-center gap-1.5 text-[11px] text-[var(--color-fg-subtle)] mb-3 sm:hidden">
          <span>Scroll right</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </p>

        {/* Table */}
        <motion.div
          className="overflow-x-auto rounded-xl border border-[var(--color-border)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.32, 1] }}
        >
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {COL_HEADERS.map((col) => (
                  <th
                    key={col.key}
                    className="px-5 py-3.5 text-left text-[10px] tracking-[0.14em] uppercase font-medium text-[var(--color-fg-subtle)]"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.name}
                  className="border-b last:border-b-0 transition-colors"
                  style={{
                    borderColor: "var(--color-border)",
                    background: row.highlight ? "rgba(16,185,129,0.04)" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  {/* Name + category */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      {row.highlight && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--color-accent)" }}
                        />
                      )}
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: row.highlight ? "var(--color-fg)" : "var(--color-fg-muted)",
                        }}
                      >
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="text-[11px] px-2.5 py-1 rounded border"
                      style={{
                        color: row.highlight ? "var(--color-accent)" : "var(--color-fg-subtle)",
                        borderColor: row.highlight ? "rgba(16,185,129,0.25)" : "var(--color-border)",
                        background: row.highlight ? "rgba(16,185,129,0.06)" : "transparent",
                      }}
                    >
                      {row.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="text-[12px]"
                      style={{
                        color: row.timing.startsWith("Pre-execution") ? "var(--color-fg)" : "var(--color-fg-subtle)",
                        fontWeight: row.timing.startsWith("Pre-execution") ? 500 : 400,
                      }}
                    >
                      {row.timing}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <CheckCell value={row.agentNative} />
                  </td>
                  <td className="px-5 py-4">
                    <CheckCell value={row.custodyAgnostic} />
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <CheckCell value={row.cryptoProof} />
                      {row.note && (
                        <p className="mt-1 text-[10px] text-[var(--color-fg-subtle)] max-w-[200px] leading-snug">
                          {row.note}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Key insight */}
        <motion.div
          className="mt-10 p-6 rounded-xl border border-[rgba(16,185,129,0.18)] bg-[rgba(16,185,129,0.04)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed max-w-3xl">
            <span className="text-[var(--color-fg)] font-medium">
              The independent trust layer wins for the same reason SSL won:
            </span>{" "}
            Trust infrastructure must be neutral to be trusted. A verification layer owned by
            a custody provider is not trusted by its custody competitors. STVOR is
            custody-agnostic by design — the only position from which it can become
            foundational infrastructure for the entire ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
