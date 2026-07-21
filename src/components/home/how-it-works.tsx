"use client";

import { motion } from "framer-motion";
import { DEMO_DENY_RECEIPT } from "@/data/demo-receipt";
import { TrustReceipt } from "./trust-receipt";

const FLOW = [
  {
    n: "01",
    title: "commit",
    body: "POST /commitments — payment payload canonicalized (RFC 8785) and hashed. Intent frozen before any transaction is built.",
  },
  {
    n: "02",
    title: "verify",
    body: "POST /verify — live payload re-canonicalized and compared with timingSafeEqual on the hash. Destination swap or any field change → signed DENY.",
  },
  {
    n: "03",
    title: "settle",
    body: "Your execution rail fires only after ALLOW. Signed Trust Receipt comes inline from POST /verify. POST /receipt is optional — attach txHash after settlement.",
  },
];

const VERIFY_CODE = `// commit → verify → settle
const commitment = await stvor.commit(payment, {
  agentId,
  nonce: crypto.randomUUID(),
});

const result = await stvor.verify(
  { from: agentId, ...payment },
  { commitmentId: commitment.commitmentId },
);

if (result.decision !== "ALLOW") {
  // signed DENY in result.receipt — verify offline, do not settle
  throw new Error(result.reason);
}

await settleOnYourRail(payment);`;

const CANONICAL_CODE = `// stvor-core/src/canonical.ts — RFC 8785 via canonicalize
import jcs from "canonicalize";

export function canonicalize(value: unknown): string {
  const out = jcs(value);
  if (typeof out !== "string") {
    throw new Error("canonicalize: value is not JSON-serializable");
  }
  return out;
}

// verify compares SHA-256(canonical live) vs committed hash
// one check: { to, amount, currency, chain?, asset? } → single digest`;

export function HowItWorks() {
  return (
    <section className="section-y" id="how-it-works">
      <div className="container-page">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium font-mono">
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[var(--color-fg)] mb-4">
            commit → verify → settle
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            One gate: canonical payload hash compare. Destination, amount, and currency are
            all in the digest — a swapped address changes the hash and produces a signed DENY.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-4">
              {FLOW.map((step, i) => (
                <motion.div
                  key={step.n}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="flex gap-4">
                    <span
                      className="text-[11px] font-mono font-semibold flex-shrink-0 pt-0.5"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[var(--color-fg)] mb-1.5 font-mono">
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
                <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-fg-subtle)] font-mono">
                  SDK flow
                </span>
                <span className="text-[9px] text-[var(--color-fg-subtle)] font-mono">TypeScript</span>
              </div>
              <pre className="p-5 text-[11.5px] leading-[1.75] font-mono text-[var(--color-fg-muted)] overflow-x-auto">
                {VERIFY_CODE}
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)]">
                <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-fg-subtle)] font-mono">
                  Canonical hash (RFC 8785)
                </span>
              </div>
              <pre className="p-5 text-[11.5px] leading-[1.75] font-mono text-[var(--color-fg-muted)] overflow-x-auto">
                {CANONICAL_CODE}
              </pre>
            </div>

            <div>
              <p className="text-[12px] text-[var(--color-fg-subtle)] mb-4 leading-relaxed">
                This DENY receipt is real ({DEMO_DENY_RECEIPT.receiptId}) — click
                &quot;Load the real blocked-attack receipt&quot; in Try now to verify ES256 in your browser.
              </p>
              <TrustReceipt variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
