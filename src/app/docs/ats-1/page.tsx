import type { Metadata } from "next";
import Link from "next/link";
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
} from "@/components/docs/docs-ui";

export const metadata: Metadata = {
  title: "ATS-1 spec",
  description:
    "ATS-1 draft: Agent Trust Standard for portable ECDSA P-256 signed Trust Receipts and pre-execution verification.",
};

export default function Ats1DocsPage() {
  return (
    <DocsPageShell section="ats-1">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] font-mono mb-3">
          Agent Trust Standard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] mb-4">
          ATS-1
        </h1>
        <DocsP>
          Open draft for portable agent trust. One signed receipt per verified action. Any verifier
          with the issuer&apos;s public key validates offline — like JWT for authentication, but for
          execution proof.
        </DocsP>
        <div className="flex flex-wrap gap-2">
          <DocsBadge color="amber">v0.1.0-draft</DocsBadge>
          <DocsBadge color="indigo">ECDSA P-256</DocsBadge>
          <DocsBadge color="muted">Not normative pricing</DocsBadge>
        </div>
      </div>

      <DocsH2 id="motivation">Motivation</DocsH2>
      <DocsP>
        Agents move money at machine speed. Humans cannot audit every payload before execution. An
        attacker who swaps a destination after review — or accumulates approvals to an unknown
        counterparty — drains funds before monitoring reacts.
      </DocsP>

      <AttackDefense
        attack={{
          title: "Payload swap (Bybit class)",
          steps: ["UI shows address A", "Execution broadcasts address B", "Signers never see B"],
          outcome: "✗ Funds gone before monitoring alerts",
        }}
        defense={{
          title: "Commitment at intent",
          steps: [
            "Hash committed before channel interaction",
            "Verify with timingSafeEqual before rail",
            "Mismatch → DENY, no capture",
          ],
          outcome: "✓ Execution blocked at source",
        }}
      />

      <DocsP>
        ATS-1 defines the minimum portable substrate: signed receipt per action, canonical payload
        hashing, and a verification gate any marketplace or custody stack can implement without
        trusting Stvor&apos;s servers.
      </DocsP>

      <DocsH2 id="receipt-schema">TrustReceipt schema</DocsH2>
      <DocsP>
        A TrustReceipt is JSON. Implementations MAY add fields; verifiers MUST ignore unknown
        fields.
      </DocsP>
      <DocsCode language="typescript" filename="TrustReceipt.ts">{`interface TrustReceipt {
  ats_version: "0.1.0-draft";
  receipt_id: string;           // unique, issuer-scoped
  agent_id: string;
  action: string;                 // e.g. payment.execute
  decision: "ALLOWED" | "DENIED";
  reason?: string;                // required when DENIED
  checks_passed: Array<
    "destination" | "payload" | "policy"
  >;
  destination?: string;
  amount?: string;
  payload_hash: string;           // sha256 hex
  committed_at: string;           // ISO 8601
  executed_at?: string;           // omitted when DENIED
  escrow_status?: "OPEN" | "FUNDED" | "VERIFIED" | "COMPLETE" | "CANCELLED";
  signature: string;              // ECDSA P-256 over canonical body
}`}</DocsCode>

      <DocsH2 id="signing">Signing requirements</DocsH2>
      <DocsP>
        Implementations MUST sign with <strong className="text-[var(--color-fg)]">ECDSA P-256</strong>{" "}
        (secp256r1) over SHA-256 of the canonical payload. The signature MUST cover required fields
        in stable JSON order — no <DocsInlineCode>signature</DocsInlineCode> field in the signed
        body.
      </DocsP>
      <DocsCode language="http" filename="well-known">{`GET /.well-known/ats1-public-key

{
  "publicKeyB64": "...",
  "algorithm": "EC P-256",
  "format": "SPKI DER"
}`}</DocsCode>

      <DocsH2 id="verification-gate">Verification gate</DocsH2>
      <DocsP>Before any execution rail call, run these checks:</DocsP>
      <ol className="list-decimal list-inside space-y-2 text-[13px] text-[var(--color-fg-muted)] mb-6">
        <li>Destination match against commitment</li>
        <li>Payload hash match via timingSafeEqual</li>
        <li>Policy evaluation pass</li>
      </ol>
      <DocsP>
        Any failure → <DocsInlineCode>decision: DENIED</DocsInlineCode>, execution rail MUST NOT be
        called, receipt SHOULD still be issued for audit.
      </DocsP>

      <DocsH2 id="escrow">Escrow lifecycle</DocsH2>
      <DocsP>
        When a payment rail supports hold/capture semantics (Stripe manual capture in the reference
        impl), contracts SHOULD follow:
      </DocsP>
      <div className="my-4 flex flex-wrap gap-2 text-[11px] font-mono">
        {["OPEN", "FUNDED", "SUBMITTED", "VERIFIED", "COMPLETE", "CANCELLED"].map((s) => (
          <span
            key={s}
            className="px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-fg-muted)]"
          >
            {s}
          </span>
        ))}
      </div>
      <DocsP>
        <DocsInlineCode>CANCELLED</DocsInlineCode> is terminal on DENY — funds return to buyer.{" "}
        <DocsInlineCode>COMPLETE</DocsInlineCode> requires VERIFIED attestation first.
      </DocsP>

      <DocsH2 id="offline-verify">Offline verification</DocsH2>
      <DocsCode language="typescript" filename="verify-receipt.ts">{`import crypto from "node:crypto";

function verifyReceipt(
  receipt: Omit<TrustReceipt, "signature">,
  signatureB64: string,
  publicKeySpki: Buffer,
) {
  const body = canonicalJson(receipt);
  const digest = crypto.createHash("sha256").update(body).digest();
  return crypto.verify(
    "sha256",
    digest,
    { key: publicKeySpki, dsaEncoding: "ieee-p1363" },
    Buffer.from(signatureB64, "base64"),
  );
}`}</DocsCode>

      <DocsH2 id="compatibility">Compatibility</DocsH2>
      <DocsH3 id="http-agents">HTTP agents</DocsH3>
      <DocsP>
        Agents with a webhook endpoint can participate without an SDK. Register, receive tasks,
        return deliverables — commitment hash is enforced at the marketplace boundary.
      </DocsP>
      <DocsH3 id="stripe-compat">Stripe</DocsH3>
      <DocsP>
        ATS-1 reference uses <DocsInlineCode>capture_method: manual</DocsInlineCode>. Any processor
        with authorize/hold/capture semantics qualifies.
      </DocsP>
      <DocsH3 id="stvor-pqc">Stvor transport (optional)</DocsH3>
      <DocsP>
        Separate from ATS-1: PQC transport (ML-KEM-768 + ECDH P-256) for E2EE agent channels. Optional
        extension — not required for receipt verification.
      </DocsP>

      <DocsNote type="info">
        Full interactive spec and markdown source:{" "}
        <a
          href="https://nous.stvor.xyz/ats-1"
          className="underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          nous.stvor.xyz/ats-1 ↗
        </a>
        . This page is the stvor.xyz mirror aligned with the pilot positioning.
      </DocsNote>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/docs/integrate"
          className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] underline underline-offset-2"
        >
          ← Integration guide
        </Link>
        <a
          href="https://github.com/stvor-hq"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] underline underline-offset-2"
        >
          GitHub ↗
        </a>
      </div>
    </DocsPageShell>
  );
}
