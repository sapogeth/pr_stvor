import type { Metadata } from "next";
import { DocsPageShell } from "@/components/docs/docs-shell";
import {
  AttackDefense,
  DocsBadge,
  DocsCode,
  DocsH2,
  DocsH3,
  DocsInlineCode,
  DocsNote,
  DocsP,
  DocsStep,
} from "@/components/docs/docs-ui";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Technical deep dive: commit → verify → settle, payload attestation, ES256 receipts, Stripe reference flow, and threat model.",
};

export default function HowItWorksDocsPage() {
  return (
    <DocsPageShell section="how-it-works">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-fg-subtle)] font-mono mb-3">
          Technical deep dive
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] mb-4">
          How Stvor works
        </h1>
        <DocsP>
          The $1.5B Bybit hack was a tampered payload. Same root cause: execution happened before
          anyone verified the live operation still matched intent. Stvor binds intent to execution at
          the checkpoint — before the payment rail fires. A swapped destination is a signed DENY, not
          a silent pass.
        </DocsP>
      </div>

      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        Stvor is middleware between intent and execution. It does not replace custody, monitoring,
        or signing infrastructure. It answers:{" "}
        <em>does what is about to run still match what was committed?</em> Any check fails →{" "}
        <DocsInlineCode>DENIED</DocsInlineCode> with a signed receipt, no payment attempted.
      </DocsP>

      <DocsH2 id="flow">01 · commit → verify → settle</DocsH2>
      <DocsStep n="commit" title="POST /commitments">
        Canonical params hashed and stored at intent time. Intent is frozen before any transaction is
        built.
      </DocsStep>
      <DocsStep n="verify" title="POST /verify">
        Live payload compared to commitment with <DocsInlineCode>timingSafeEqual</DocsInlineCode>.
        Destination swap or hash mismatch → DENY.
      </DocsStep>
      <DocsStep n="settle" title="Your execution rail">
        Stripe capture, chain broadcast, or ledger write fires only after ALLOW. Then{" "}
        <DocsInlineCode>POST /receipt</DocsInlineCode> — ES256 Trust Receipt for ALLOW or DENY.
      </DocsStep>

      <DocsH2 id="three-checks">02 · What verify checks</DocsH2>
      <DocsStep n="A" title="Destination match">
        Destination is hash-committed at intent time. Before execution, compare live destination
        against commitment. UI swaps, injected addresses, and delegatecall redirects all fail here.
      </DocsStep>
      <DocsStep n="B" title="Payload integrity">
        <DocsInlineCode>SHA-256(canonical params)</DocsInlineCode> must equal committed hash.
        Comparison uses <DocsInlineCode>crypto.timingSafeEqual()</DocsInlineCode>.
      </DocsStep>
      <DocsStep n="C" title="Policy check">
        Amount caps, method allowlists, recipient lists — evaluated against signed policy attached
        to the commitment.
      </DocsStep>

      <DocsH2 id="payload-attestation">03 · Payload attestation</DocsH2>
      <DocsP>
        Commit–reveal pattern: hash the canonical task payload at intent time. Before execution,
        re-hash the live payload and compare. A single byte change produces a different digest.
      </DocsP>

      <AttackDefense
        attack={{
          title: "Bybit — $1.5B — Feb 2025",
          steps: [
            "Safe{Wallet} developer workstation compromised",
            "Malicious JS injected: UI shows correct destination, tx silently swapped",
            "Signers approve what they see — sign something else",
          ],
          outcome: "✗ $1.5B transferred in one routine-looking operation",
        }}
        defense={{
          title: "Blocked at verify",
          steps: [
            "SHA-256(task_payload) committed at intent — immutable before UI renders",
            "timingSafeEqual(received_hash, committed_hash) before execution",
            "Mismatch → signed DENY. Stripe PaymentIntent.cancel() if escrowed.",
          ],
          outcome: "✓ Attacker gets nothing. Receipt proves the block.",
        }}
      />

      <DocsCode language="typescript" filename="payload-compare.ts">{`import crypto from "node:crypto";

function canonicalize(params: Record<string, unknown>) {
  return JSON.stringify(params, Object.keys(params).sort());
}

function verifyPayload(
  liveParams: Record<string, unknown>,
  commitment: { payloadHash: string },
) {
  const hash = crypto.createHash("sha256")
    .update(canonicalize(liveParams))
    .digest("hex");

  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(commitment.payloadHash, "hex");
  if (a.length !== b.length) return { allowed: false, reason: "PAYLOAD_MISMATCH" };
  if (!crypto.timingSafeEqual(a, b)) return { allowed: false, reason: "PAYLOAD_MISMATCH" };
  return { allowed: true };
}`}</DocsCode>

      <DocsH2 id="binding">04 · Intent-to-execution binding</DocsH2>
      <DocsP>
        Slow-accumulation attacks (fake tokens, approval farming) are a different class of problem
        than payload swaps. Stvor&apos;s live gate answers: did this specific execution still match
        the committed intent? Policy rules (recipient allowlists, amount caps) are the enforcement
        mechanism for counterparties — there is no live trust-scoring engine today.
      </DocsP>

      <AttackDefense
        attack={{
          title: "JaredFromSubway — $7.5M — 2024",
          steps: [
            "66 fake token contracts mimicking WETH/USDC/USDT",
            "MEV bot approved helper contracts over weeks",
            "Single sweep tx drained all real balances",
          ],
          outcome: "✗ $7.5M drained in one block",
        }}
        defense={{
          title: "Policy + binding at execution",
          steps: [
            "Recipient not on signed allowlist → DENY at verify",
            "Outbound transfer hash mismatch → signed DENY before approval path",
            "Every decision logged with agent identity in Trust Receipt",
          ],
          outcome: "✓ Unlisted counterparty never receives funds at execution time",
        }}
      />

      <DocsH2 id="stripe-reference">05 · Stripe reference flow</DocsH2>
      <DocsP>
        The live reference implementation uses Stripe{" "}
        <DocsInlineCode>capture_method: manual</DocsInlineCode>. Funds authorize at funding but
        do not capture until verify returns ALLOW. This is one rail — not the product.
      </DocsP>
      <div className="my-6 flex flex-wrap gap-2 text-[11px] font-mono">
        {["OPEN", "FUNDED", "SUBMITTED", "VERIFIED", "COMPLETE"].map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span className="px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-fg-muted)]">
              {s}
            </span>
            {i < 4 && <span className="text-[var(--color-fg-subtle)]">→</span>}
          </span>
        ))}
      </div>
      <DocsNote type="info">
        See the interactive reference at{" "}
        <a href={siteConfig.demo.live} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          nous.stvor.xyz/demo
        </a>
        . Production API:{" "}
        <a href={siteConfig.api.base} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          {siteConfig.api.base}
        </a>
        .
      </DocsNote>

      <DocsH2 id="trust-receipt">06 · Trust Receipt</DocsH2>
      <DocsP>
        After ALLOW or DENY, Stvor issues an ES256 (P-256, IEEE-P1363) signed Trust Receipt
        (ATS-1 draft). Verifiable offline with only the issuer&apos;s public key —{" "}
        <a href={siteConfig.api.verifier} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          browser verifier
        </a>
        , CLI, or ~20 lines of WebCrypto.
      </DocsP>
      <DocsCode language="json" filename="receipt-sample.json">{`{
  "ats_version": "0.1.0-draft",
  "receipt_id": "ats1_01HXYZ...",
  "agent_id": "agt_finance_agent_v1",
  "decision": "ALLOWED",
  "checks_passed": ["destination", "payload", "policy"],
  "payload_hash": "sha256:a3f7c291...",
  "committed_at": "2026-07-12T09:41:02Z",
  "executed_at": "2026-07-12T09:41:03Z",
  "signature": "es256:3mK9pqR2..."
}`}</DocsCode>

      <DocsH2 id="threat-model">07 · Threat model</DocsH2>
      <DocsH3 id="payload-manipulation">Payload manipulation</DocsH3>
      <DocsP>
        Attacker modifies destination, amount, or calldata between intent and submission. Stvor
        catches this because the modified payload produces a different SHA-256 digest.
      </DocsP>
      <DocsH3 id="authorization-gap">Authorization gap</DocsH3>
      <DocsP>
        Agent was authorized for operation A, submits operation B, or runs on stale authorization.
        Commitment binds specific fields — different operation → different hash → DENY.
      </DocsP>
      <DocsH3 id="context-injection">Context injection</DocsH3>
      <DocsP>
        Prompt injection causes agent to commit to a malicious operation. Policy gates reduce blast
        radius; they do not replace human review for high-value flows.
      </DocsP>
      <DocsNote type="warn">
        Stvor does not solve key compromise, compromised signing infrastructure, or social
        engineering of human approvers who bypass the checkpoint entirely.
      </DocsNote>

      <DocsH2 id="references">08 · References</DocsH2>
      <ul className="space-y-3 text-[13px] text-[var(--color-fg-muted)]">
        <li>
          <a href="https://www.nccgroup.com/" className="underline underline-offset-2 hover:text-[var(--color-fg)]" target="_blank" rel="noopener noreferrer">
            NCC Group — Bybit hack technical analysis (Feb 2025) ↗
          </a>
        </li>
        <li>
          <a href="https://cointelegraph.com/" className="underline underline-offset-2 hover:text-[var(--color-fg)]" target="_blank" rel="noopener noreferrer">
            CoinTelegraph — JaredFromSubway MEV bot $7.5M drain ↗
          </a>
        </li>
        <li>
          <a href="/docs/ats-1" className="underline underline-offset-2 hover:text-[var(--color-fg)]">
            ATS-1 — Agent Trust Standard (draft) →
          </a>
        </li>
        <li>
          <a href={siteConfig.api.fixtures} className="underline underline-offset-2 hover:text-[var(--color-fg)]" target="_blank" rel="noopener noreferrer">
            Published test vectors (fixtures/) ↗
          </a>
        </li>
      </ul>
    </DocsPageShell>
  );
}
