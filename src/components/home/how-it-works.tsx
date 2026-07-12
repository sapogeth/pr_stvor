"use client";

import { motion } from "framer-motion";
import { TrustReceipt } from "./trust-receipt";

const CHECKS = [
  {
    n: "01",
    title: "Destination match",
    body: "Destination is hash-committed at intent time. Before execution, Stvor compares the live destination against the commitment. Swap → DENY.",
  },
  {
    n: "02",
    title: "Payload integrity",
    body: "SHA-256(canonical params) must equal the committed hash. Comparison uses crypto.timingSafeEqual() — no early exit on byte differences.",
  },
  {
    n: "03",
    title: "Counterparty trust",
    body: "Minimum trust score on the receiving address or entity. Unknown or low-trust counterparties cannot receive outbound transfers from the agent.",
  },
  {
    n: "04",
    title: "Policy check",
    body: "Amount caps, allowed methods, recipient allowlists — evaluated against the signed policy attached to the commitment. Violation → DENY.",
  },
];

const VERIFY_CODE = `// Before your execution rail fires (Stripe, chain, internal ledger)
const checks = await stvor.verify({
  commitment,          // signed at intent time
  payload: liveParams, // what the agent is about to send
});

if (!checks.allowed) {
  throw new DeniedError(checks.reason); // no payment attempted
}

// checks.receipt — ECDSA P-256 signed Trust Receipt (ATS-1)`;

const HASH_CODE = `const canonical = sortKeys(trim(params));
const hash = crypto.createHash("sha256")
  .update(JSON.stringify(canonical))
  .digest("hex");

const match = crypto.timingSafeEqual(
  Buffer.from(hash, "hex"),
  Buffer.from(commitment.payloadHash, "hex"),
);

if (!match) return { allowed: false, reason: "PAYLOAD_MISMATCH" };`;

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
            Four checks. One decision. Signed receipt.
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Stvor runs in front of your execution flow — not inside custody, not after
            broadcast. I wire this checkpoint with you during the pilot; there is no
            self-serve npm install path today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Checks */}
          <div className="space-y-4">
            {CHECKS.map((check, i) => (
              <motion.div
                key={check.n}
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
                    {check.n}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[var(--color-fg)] mb-1.5">
                      {check.title}
                    </h3>
                    <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed">
                      {check.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code + receipt */}
          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
                <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-fg-subtle)] font-mono">
                  Verification gate
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
                  Payload hash compare
                </span>
              </div>
              <pre className="p-5 text-[11.5px] leading-[1.75] font-mono text-[var(--color-fg-muted)] overflow-x-auto">
                {HASH_CODE}
              </pre>
            </div>

            <div>
              <p className="text-[12px] text-[var(--color-fg-subtle)] mb-4 leading-relaxed">
                After ALLOW → portable Trust Receipt. Verifiable offline with only the
                issuer&apos;s public key. Format: ATS-1 (draft).
              </p>
              <TrustReceipt variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
