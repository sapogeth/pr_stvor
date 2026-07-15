"use client";

import { motion } from "framer-motion";
import { TrustReceipt } from "./trust-receipt";

const FLOW = [
  {
    n: "01",
    title: "commit",
    body: "POST /commitments — canonical params hashed and stored. Intent is frozen before any transaction is built.",
  },
  {
    n: "02",
    title: "verify",
    body: "POST /verify — live payload compared to commitment with timingSafeEqual. Destination swap or hash mismatch → signed DENY, not a silent pass.",
  },
  {
    n: "03",
    title: "settle",
    body: "Your execution rail (Stripe, chain, internal ledger) fires only after ALLOW. Then POST /receipt — ES256 Trust Receipt for ALLOW or DENY.",
  },
];

const CHECKS = [
  {
    n: "A",
    title: "Destination match",
    body: "Destination is hash-committed at intent time. Before execution, Stvor compares the live destination against the commitment. Swap → DENY.",
  },
  {
    n: "B",
    title: "Payload integrity",
    body: "SHA-256(canonical params) must equal the committed hash. Comparison uses crypto.timingSafeEqual() — no early exit on byte differences.",
  },
  {
    n: "C",
    title: "Policy check",
    body: "Amount caps, allowed methods, recipient allowlists — evaluated against the signed policy attached to the commitment. Violation → DENY.",
  },
];

const VERIFY_CODE = `// commit → verify → settle
const commitment = await stvor.commit({ agentId, payload: intent });

// ... agent builds live params ...

const decision = await stvor.verify({
  commitmentId: commitment.id,
  payload: liveParams,
});

if (!decision.allowed) {
  // signed DENY receipt — verify offline, do not settle
  throw new DeniedError(decision.reason);
}

await settle(liveParams);
// decision.receipt — ES256 P-256 (ATS-1), verifiable offline`;

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
            commit → verify → settle
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Stvor binds intent to execution before funds move. Every decision — ALLOW or
            DENY — gets an offline-verifiable Trust Receipt signed with ES256 (P-256).
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

            <div>
              <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-fg-subtle)] font-mono mb-3">
                What verify checks
              </p>
              <div className="space-y-3">
                {CHECKS.map((check, i) => (
                  <motion.div
                    key={check.n}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <h4 className="text-[13px] font-semibold text-[var(--color-fg)] mb-1">
                      {check.title}
                    </h4>
                    <p className="text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
                      {check.body}
                    </p>
                  </motion.div>
                ))}
              </div>
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
                  Payload hash compare
                </span>
              </div>
              <pre className="p-5 text-[11.5px] leading-[1.75] font-mono text-[var(--color-fg-muted)] overflow-x-auto">
                {HASH_CODE}
              </pre>
            </div>

            <div>
              <p className="text-[12px] text-[var(--color-fg-subtle)] mb-4 leading-relaxed">
                ALLOW and DENY both produce a portable Trust Receipt. Verify offline with
                only the issuer&apos;s public key — browser verifier, CLI, or WebCrypto.
                Format: ATS-1 (draft).
              </p>
              <TrustReceipt variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
