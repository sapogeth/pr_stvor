"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Play, RotateCcw, ShieldCheck, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.32, 1];

// ── Scenarios ─────────────────────────────────────────────────────────────────

type Scenario = {
  id: string;
  label: string;
  description: string;
  intent: {
    from: string;
    to: string;
    amount: string;
    method: string;
  };
  attack?: {
    to: string;
    description: string;
  };
  steps: Step[];
};

type Step = {
  id: string;
  label: string;
  code: string;
  output: string;
  duration: number;
  status: "ok" | "error" | "warn";
};

const SCENARIOS: Scenario[] = [
  {
    id: "transfer",
    label: "USDC transfer",
    description: "An AI agent commits to transfer 50 USDC to a specific address. Stvor anchors the commitment before the tx is built.",
    intent: {
      from: "0xAgent...f47a",
      to: "0xAlice...a9f2",
      amount: "50.00 USDC",
      method: "transfer(address,uint256)",
    },
    attack: {
      to: "0xAttck...b13e",
      description: "Payload manipulation: destination swapped after commitment",
    },
    steps: [
      {
        id: "sign",
        label: "1. Anchor intent commitment",
        code: `const commitment = await stvor.sign({
  from: "0xAgent...f47a",
  to:   "0xAlice...a9f2",
  amount: "50000000",          // 50 USDC (6 decimals)
  method: "transfer(address,uint256)",
});
// → commitment.hash (SHA-256 canonical)
// → commitment.signature (ed25519)`,
        output: `✓  Commitment anchored
hash:      sha256:7e3a9f2b4d1c...
signature: ed25519:3f8a2c1b9e4d...
issued_at: 2026-07-11T12:00:00Z`,
        duration: 600,
        status: "ok",
      },
      {
        id: "verify",
        label: "2. Verify before execution",
        code: `// Just before submitting the tx:
const result = await stvor.verify({
  commitment,
  payload: {
    to:     "0xAlice...a9f2",  // must match
    amount: "50000000",
    method: "transfer(address,uint256)",
  },
});`,
        output: `✓  Verification passed
  to      ✓  matches commitment
  amount  ✓  matches commitment
  method  ✓  matches commitment
  age     ✓  within ttl (1800s)`,
        duration: 400,
        status: "ok",
      },
      {
        id: "receipt",
        label: "3. Trust Receipt issued",
        code: `// result.receipt — signed, verifiable offline
console.log(result.receipt);`,
        output: `{
  "id":        "trcpt_...",
  "status":    "verified",
  "hash":      "sha256:7e3a9f2b...",
  "signature": "ed25519:3f8a2c1b...",
  "fields":    { "to": "✓", "amount": "✓" },
  "issued_at": "2026-07-11T12:00:00.123Z"
}`,
        duration: 300,
        status: "ok",
      },
    ],
  },
  {
    id: "attack",
    label: "Attack blocked",
    description: "Same transfer — but an attacker swaps the destination address after commitment is signed. Stvor catches the mismatch and throws.",
    intent: {
      from: "0xAgent...f47a",
      to: "0xAlice...a9f2",
      amount: "50.00 USDC",
      method: "transfer(address,uint256)",
    },
    attack: {
      to: "0xAttck...b13e",
      description: "Destination replaced in payload between commitment and execution",
    },
    steps: [
      {
        id: "sign",
        label: "1. Anchor intent commitment",
        code: `const commitment = await stvor.sign({
  from: "0xAgent...f47a",
  to:   "0xAlice...a9f2",   // ← committed destination
  amount: "50000000",
  method: "transfer(address,uint256)",
});`,
        output: `✓  Commitment anchored
hash:      sha256:7e3a9f2b4d1c...
to:        0xAlice...a9f2 (committed)`,
        duration: 600,
        status: "ok",
      },
      {
        id: "tamper",
        label: "2. Attacker swaps destination",
        code: `// ⚠ Payload manipulation happens here
// (context injection, prompt hijack, MITM)
payload.to = "0xAttck...b13e";  // attacker address
//
// Agent calls stvor.verify() unaware of the swap...`,
        output: `⚠  Payload modified in-flight
  committed: 0xAlice...a9f2
  received:  0xAttck...b13e`,
        duration: 500,
        status: "warn",
      },
      {
        id: "blocked",
        label: "3. Execution blocked",
        code: `// stvor.verify() runs before tx is submitted:
const result = await stvor.verify({
  commitment,
  payload: { to: "0xAttck...b13e", ... },
});
// → throws VerificationError`,
        output: `✗  VerificationError: commitment mismatch
  field:     to
  committed: 0xAlice...a9f2
  received:  0xAttck...b13e

Transaction NOT submitted.
Receipt NOT issued.`,
        duration: 400,
        status: "error",
      },
    ],
  },
  {
    id: "agent",
    label: "AI agent payment",
    description: "An AI agent with a capped spending limit commits to pay an API invoice. Stvor enforces the policy gate and issues a receipt.",
    intent: {
      from: "0xAgent...f47a",
      to:   "0xAPI...c9d1",
      amount: "12.50 USDC",
      method: "payInvoice(bytes32)",
    },
    steps: [
      {
        id: "policy",
        label: "1. Policy gate check",
        code: `const commitment = await stvor.sign({
  from:   "0xAgent...f47a",
  to:     "0xAPI...c9d1",
  amount: "12500000",         // 12.50 USDC
  method: "payInvoice(bytes32)",
  policy: {
    maxAmount: "100000000",   // 100 USDC cap
    allowedMethods: ["payInvoice(bytes32)"],
  },
});`,
        output: `✓  Policy gate passed
  amount  ✓  12.50 ≤ 100.00 USDC cap
  method  ✓  in allowedMethods
Commitment anchored.`,
        duration: 500,
        status: "ok",
      },
      {
        id: "verify",
        label: "2. Verify + execute",
        code: `const result = await stvor.verify({
  commitment,
  payload: {
    to:     "0xAPI...c9d1",
    amount: "12500000",
    method: "payInvoice(bytes32)",
  },
});
await wallet.sendTransaction(txPayload);`,
        output: `✓  Verification passed (1.4ms)
✓  Transaction submitted
  txHash: 0x4f2a...`,
        duration: 700,
        status: "ok",
      },
      {
        id: "receipt",
        label: "3. Audit receipt",
        code: `// result.receipt is stored for compliance
// Verifiable offline — no API call needed
stvor.verifyReceiptOffline(receipt, pubkey);`,
        output: `✓  Receipt verified (offline)
  agent:   0xAgent...f47a
  payee:   0xAPI...c9d1
  amount:  12.50 USDC
  policy:  maxAmount=100 USDC
  status:  verified`,
        duration: 300,
        status: "ok",
      },
    ],
  },
];

// ── Small components ──────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: Step["status"] }) {
  if (status === "ok")    return <CheckCircle size={14} className="text-[var(--color-accent)]" />;
  if (status === "error") return <XCircle size={14} className="text-red-400" />;
  return <AlertTriangle size={14} className="text-amber-400" />;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="p-1 rounded text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check size={12} className="text-[var(--color-accent)]" /> : <Copy size={12} />}
    </button>
  );
}

// ── Main demo ─────────────────────────────────────────────────────────────────

export function VerificationDemo() {
  const [scenarioId, setScenarioId] = useState<string>("transfer");
  const [running, setRunning]       = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  function clearTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function reset() {
    clearTimer();
    setRunning(false);
    setCurrentStep(-1);
  }

  function runDemo() {
    reset();
    setRunning(true);
    let i = 0;
    function next() {
      if (i >= scenario.steps.length) { setRunning(false); return; }
      setCurrentStep(i);
      timerRef.current = setTimeout(() => { i++; next(); }, scenario.steps[i].duration + 800);
    }
    timerRef.current = setTimeout(next, 300);
  }

  // reset on scenario change
  useEffect(() => { reset(); }, [scenarioId]); // eslint-disable-line react-hooks/exhaustive-deps

  const done = !running && currentStep === scenario.steps.length - 1;
  const lastStep = currentStep >= 0 ? scenario.steps[currentStep] : null;
  const isAttack = scenarioId === "attack";

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">

      {/* ── Tab bar ── */}
      <div className="flex items-center gap-1 px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] overflow-x-auto">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenarioId(s.id)}
            className={cn(
              "flex-shrink-0 px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-all",
              scenarioId === s.id
                ? "bg-[var(--color-bg-elevated)] text-[var(--color-fg)] shadow-sm"
                : "text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)]"
            )}
          >
            {s.id === "attack" && <span className="mr-1.5 text-amber-400">⚠</span>}
            {s.label}
          </button>
        ))}
        <div className="ml-auto flex-shrink-0 flex items-center gap-2">
          {currentStep >= 0 && (
            <button
              onClick={reset}
              className="p-1.5 rounded-md text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] transition-colors"
              aria-label="Reset"
            >
              <RotateCcw size={13} />
            </button>
          )}
          <button
            onClick={runDemo}
            disabled={running}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[12px] font-semibold transition-all",
              running
                ? "opacity-50 cursor-not-allowed bg-[var(--color-bg)] text-[var(--color-fg-subtle)]"
                : isAttack
                  ? "bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 border border-amber-400/30"
                  : "bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/30"
            )}
          >
            <Play size={11} />
            {running ? "Running…" : "Run"}
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="grid md:grid-cols-[1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">

        {/* Left — intent + steps */}
        <div className="flex flex-col">
          {/* Intent card */}
          <div className="px-5 py-4 border-b border-[var(--color-border)]">
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-fg-subtle)] mb-2.5 font-mono">
              Intent
            </p>
            <div className="space-y-1 font-mono text-[12px]">
              {Object.entries(scenario.intent).map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-[var(--color-fg-subtle)] w-16 shrink-0">{k}</span>
                  <span className="text-[var(--color-fg-muted)]">{v}</span>
                </div>
              ))}
            </div>
            {scenario.attack && (
              <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <AlertTriangle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-amber-300/80 leading-snug">{scenario.attack.description}</p>
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="p-5 space-y-2">
            {scenario.steps.map((step, i) => {
              const active  = currentStep === i;
              const past    = currentStep > i;
              const pending = currentStep < i || currentStep === -1;
              return (
                <motion.div
                  key={step.id}
                  initial={false}
                  animate={{
                    opacity: pending && currentStep >= 0 ? 0.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "rounded-xl border p-3.5 transition-colors",
                    active
                      ? step.status === "warn" || step.status === "error"
                        ? "border-amber-400/30 bg-amber-400/5"
                        : "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5"
                      : past
                        ? "border-[var(--color-border-strong)] bg-transparent"
                        : "border-[var(--color-border)] bg-transparent",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {past || active ? (
                      <StatusIcon status={step.status} />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-[var(--color-border-strong)]" />
                    )}
                    <span className="text-[11px] font-medium text-[var(--color-fg-muted)]">
                      {step.label}
                    </span>
                  </div>
                  <AnimatePresence>
                    {(active || past) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="relative group">
                          <pre className="font-mono text-[11px] text-[var(--color-fg-subtle)] leading-relaxed whitespace-pre-wrap overflow-x-auto">
                            {step.code}
                          </pre>
                          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CopyButton text={step.code} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right — live output */}
        <div className="flex flex-col">
          <div className="px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-fg-subtle)] font-mono">
              Output
            </p>
          </div>
          <div className="flex-1 p-5 font-mono text-[12px] min-h-[300px]">
            <AnimatePresence mode="wait">
              {currentStep === -1 ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  <p className="text-[var(--color-fg-subtle)] text-center text-[13px]">
                    Press <span className="text-[var(--color-fg-muted)]">Run</span> to start
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                >
                  {/* running indicator */}
                  {running && (
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                      />
                      <span className="text-[var(--color-accent)] text-[11px]">Processing…</span>
                    </div>
                  )}

                  {/* step outputs accumulated */}
                  {scenario.steps.slice(0, currentStep + 1).map((step) => (
                    <div key={step.id} className="mb-5">
                      <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--color-fg-subtle)] mb-1.5">
                        {step.label}
                      </p>
                      <pre
                        className={cn(
                          "whitespace-pre-wrap leading-relaxed",
                          step.status === "error"  ? "text-red-400"
                          : step.status === "warn"  ? "text-amber-400"
                          : "text-[var(--color-fg-muted)]"
                        )}
                      >
                        {step.output}
                      </pre>
                    </div>
                  ))}

                  {/* final badge */}
                  {done && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className={cn(
                        "mt-2 flex items-center gap-2.5 px-4 py-3 rounded-xl border",
                        lastStep?.status === "error"
                          ? "border-red-500/30 bg-red-500/5 text-red-400"
                          : lastStep?.status === "warn"
                            ? "border-amber-400/30 bg-amber-400/5 text-amber-400"
                            : "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-[var(--color-accent)]"
                      )}
                    >
                      {lastStep?.status === "error" ? (
                        <XCircle size={15} />
                      ) : lastStep?.status === "warn" ? (
                        <AlertTriangle size={15} />
                      ) : (
                        <ShieldCheck size={15} />
                      )}
                      <span className="text-[12px] font-medium">
                        {lastStep?.status === "error"
                          ? "Execution blocked. Transaction not submitted."
                          : "Trust Receipt issued. Transaction verified."}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Footer note ── */}
      <div className="px-5 py-3.5 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
        <p className="text-[11px] text-[var(--color-fg-subtle)]">
          This demo simulates SDK behavior.
          All code is representative of the alpha API — signatures and hashes are illustrative.
          The SDK is in design-partner alpha;{" "}
          <a href={siteConfig.cta.contact} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-fg-muted)]">
            message {siteConfig.contact.handle}
          </a>{" "}
          to run against real payloads.
        </p>
      </div>
    </div>
  );
}
