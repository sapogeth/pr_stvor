"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DEMO_DENY_FIXTURE } from "@/data/demo-receipt";

type Verdict =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "ok"; receipt: Record<string, unknown> }
  | { state: "fail"; title: string; detail?: string };

const RECEIPT_FIELDS = [
  "decision",
  "binding",
  "to",
  "amount",
  "currency",
  "agentId",
  "reason",
  "kid",
  "commitmentId",
] as const;

export function VerifierDemo() {
  const [verdict, setVerdict] = useState<Verdict>({ state: "idle" });

  async function loadAndVerify() {
    setVerdict({ state: "loading" });
    try {
      const href = `${window.location.origin}/verifier/stvor-core.js`;
      // Runtime import from public/ — not bundled by Next
      const mod = await import(/* webpackIgnore: true */ href);
      const { verifyReceiptOffline } = mod as {
        verifyReceiptOffline: (
          receipt: unknown,
          keys: unknown,
        ) => Promise<{ ok: boolean; reason?: string; detail?: string; receipt?: unknown }>;
      };
      const res = await verifyReceiptOffline(
        DEMO_DENY_FIXTURE.receipt,
        DEMO_DENY_FIXTURE.keyset,
      );
      if (res.ok) {
        setVerdict({ state: "ok", receipt: res.receipt as Record<string, unknown> });
      } else {
        setVerdict({
          state: "fail",
          title: `INVALID — ${res.reason}`,
          detail: res.detail,
        });
      }
    } catch (err) {
      setVerdict({
        state: "fail",
        title: "Verification error",
        detail: String(err),
      });
    }
  }

  return (
    <motion.div
      id="verify"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-8"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45 }}
    >
      <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono mb-2">
        Offline verifier
      </p>
      <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-2">
        Don&apos;t take our word for it — verify the signature.
      </h3>
      <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed mb-6 max-w-2xl">
        One click loads a real DENY receipt from a blocked destination swap, checks ES256
        (P-256) in your browser with only the published key. No network calls.
      </p>

      <button
        type="button"
        onClick={loadAndVerify}
        disabled={verdict.state === "loading"}
        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] rounded-[6px] hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {verdict.state === "loading"
          ? "Verifying…"
          : "Load the real blocked-attack receipt"}
      </button>

      {verdict.state === "ok" && (
        <div className="mt-6 rounded-lg border border-[rgba(16,185,129,0.35)] bg-[rgba(16,185,129,0.08)] p-5">
          <p className="text-[14px] font-semibold text-[rgba(16,185,129,0.95)] mb-3">
            ✅ AUTHENTIC — signature matches receipt contents
          </p>
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-[12px] font-mono">
            {RECEIPT_FIELDS.map((key) =>
              verdict.receipt[key] != null ? (
                <div key={key} className="contents">
                  <dt className="text-[var(--color-fg-subtle)] uppercase tracking-wide">{key}</dt>
                  <dd className="text-[var(--color-fg-muted)] break-all">{String(verdict.receipt[key])}</dd>
                </div>
              ) : null,
            )}
          </dl>
        </div>
      )}

      {verdict.state === "fail" && (
        <div className="mt-6 rounded-lg border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] p-5">
          <p className="text-[14px] font-semibold text-[rgba(239,68,68,0.9)]">
            ❌ {verdict.title}
          </p>
          {verdict.detail && (
            <p className="mt-2 text-[12px] text-[var(--color-fg-muted)] font-mono">{verdict.detail}</p>
          )}
        </div>
      )}

      <p className="mt-4 text-[11px] text-[var(--color-fg-subtle)]">
        Same code as{" "}
        <a
          href="https://github.com/stvor-hq/core/blob/main/src/canonical.ts"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          @stvor/core
        </a>
        . Full page:{" "}
        <a href="/verifier/" className="underline underline-offset-2">
          /verifier
        </a>
      </p>
    </motion.div>
  );
}
