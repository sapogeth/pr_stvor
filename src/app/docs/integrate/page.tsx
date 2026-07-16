import type { Metadata } from "next";
import { DocsPageShell } from "@/components/docs/docs-shell";
import {
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
import {
  COMMIT_CURL,
  SDK_INSTALL,
  SDK_QUICKSTART,
  STVOR_API_BASE,
  STVOR_PACKAGES,
  STVOR_SANDBOX_API_KEY,
  VERIFY_ALLOW_CURL,
  VERIFY_DENY_CURL,
} from "@/lib/contract";

export const metadata: Metadata = {
  title: "Integration guide",
  description:
    "Integrate Stvor via @stvor/sdk: commit → verify → settle on api.stvor.xyz. Checkpoint placement, API reference, and payment rails.",
};

export default function IntegrateDocsPage() {
  return (
    <DocsPageShell section="integrate">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-fg-subtle)] font-mono mb-3">
          Integration guide
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] mb-4">
          Wire Stvor in front of execution
        </h1>
        <DocsP>
          Stvor integrates as a verification checkpoint before your payment rail, chain broadcast,
          or internal ledger write. Flow:{" "}
          <DocsInlineCode>commit → verify → settle</DocsInlineCode> — with a signed Trust Receipt
          for ALLOW and DENY.
        </DocsP>
        <div className="flex flex-wrap gap-2">
          <DocsBadge color="green">{STVOR_PACKAGES.sdk} on npm</DocsBadge>
          <DocsBadge color="green">API live — {STVOR_API_BASE}</DocsBadge>
        </div>
      </div>

      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        Three HTTP endpoints on a single origin — flat paths, no <DocsInlineCode>/api/v1</DocsInlineCode>:
      </DocsP>
      <ul className="list-disc list-inside space-y-1 text-[13px] text-[var(--color-fg-muted)] mb-6">
        <li>
          <DocsInlineCode>POST /commitments</DocsInlineCode> — anchor intent at approval time
        </li>
        <li>
          <DocsInlineCode>POST /verify</DocsInlineCode> — compare live payload to commitment → ALLOW or
          DENY
        </li>
        <li>
          <DocsInlineCode>POST /receipt</DocsInlineCode> — issue ES256 (P-256) Trust Receipt
        </li>
      </ul>
      <DocsNote type="info">
        There is no <DocsInlineCode>/agents/register</DocsInlineCode> endpoint. Self-check with{" "}
        <a href={siteConfig.api.fixtures} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          published test vectors
        </a>{" "}
        before writing client code. Verify receipts in the{" "}
        <a href={siteConfig.api.verifier} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          browser verifier
        </a>
        .
      </DocsNote>

      <DocsH2 id="sdk">01 · SDK install</DocsH2>
      <DocsCode language="bash" filename="install.sh">{SDK_INSTALL}</DocsCode>
      <DocsP>
        Verification-only integrations can use <DocsInlineCode>{STVOR_PACKAGES.core}</DocsInlineCode>{" "}
        for canonical hashing and offline receipt verification without the HTTP client.
      </DocsP>
      <DocsCode language="typescript" filename="quickstart.ts">{SDK_QUICKSTART}</DocsCode>

      <DocsH2 id="pilot">02 · Pilot onboarding (optional)</DocsH2>
      <DocsP>{siteConfig.pilot.summary}</DocsP>
      <DocsStep n="Week 1" title="Map your execution path">
        Identify where money actually moves: Stripe capture, on-chain send, internal transfer API.
        Stvor sits immediately before that call.
      </DocsStep>
      <DocsStep n="Week 1–2" title="Wire checkpoint + receipts">
        Commit at intent, verify at execution, settle only on ALLOW. Test with tampered payloads in
        staging. Every DENY gets a signed receipt too.
      </DocsStep>
      <DocsStep n="End" title="Handoff">
        Working checkpoint in your repo. You keep running it, or you pay nothing further beyond the
        pilot fee.
      </DocsStep>
      <a
        href={siteConfig.cta.pilot}
        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] rounded-[6px] hover:opacity-90 transition-opacity mt-4"
      >
        Message {siteConfig.contact.handle}
      </a>

      <DocsH2 id="checkpoint">03 · Checkpoint placement</DocsH2>
      <DocsCode language="typescript" filename="execution-flow.ts">{`// WRONG — verify after payment
await stripe.paymentIntents.capture(id);
await stvor.verify(...); // too late

// RIGHT — commit → verify → settle
const commitment = await stvor.commit({ agentId, payload: intent });
// ... build live params ...
const decision = await stvor.verify({ commitmentId: commitment.id, payload: live });
if (!decision.allowed) {
  await stripe.paymentIntents.cancel(escrowId);
  // signed DENY receipt in decision.receipt — do not settle
  throw new DeniedError(decision.reason);
}
await stripe.paymentIntents.capture(id);
await settle(live);`}</DocsCode>

      <DocsH2 id="commit-verify">04 · API: commit + verify</DocsH2>
      <DocsP>
        Commit at intent time — when the user confirms, when the agent proposes a tool call, or when
        a contract is created. POST <DocsInlineCode>/commitments</DocsInlineCode> takes{" "}
        <DocsInlineCode>payloadHash</DocsInlineCode> (SHA-256 of RFC 8785 payment payload), not raw
        payload. Store the commitment id; do not mutate the committed hash.
      </DocsP>
      <DocsNote type="info">
        Public sandbox key (test env, rate-limited):{" "}
        <DocsInlineCode>{STVOR_SANDBOX_API_KEY}</DocsInlineCode>. Required header:{" "}
        <DocsInlineCode>Authorization: Bearer &lt;key&gt;</DocsInlineCode>. Use a fresh{" "}
        <DocsInlineCode>nonce</DocsInlineCode> per commitment — duplicates return{" "}
        <DocsInlineCode>409</DocsInlineCode>.
      </DocsNote>
      <DocsCode language="bash" filename="commit.sh">{COMMIT_CURL}</DocsCode>
      <DocsCode language="bash" filename="verify-allow.sh">{VERIFY_ALLOW_CURL}</DocsCode>
      <DocsCode language="bash" filename="verify-deny.sh">{VERIFY_DENY_CURL}</DocsCode>
      <DocsCode language="typescript" filename="verify-gate.ts">{`async function gate(
  commitment: { payloadHash: string },
  liveParams: Record<string, unknown>,
) {
  const hashOk = timingSafeHashMatch(liveParams, commitment.payloadHash);
  if (!hashOk) return deny("PAYLOAD_MISMATCH");
  return allow();
}`}</DocsCode>

      <DocsH2 id="receipt">05 · Receipt issuance</DocsH2>
      <DocsP>
        On ALLOW and DENY, sign the canonical receipt payload with ES256 (P-256, IEEE-P1363).
        Publish your public key at{" "}
        <DocsInlineCode>/.well-known/ats1-public-key</DocsInlineCode> so third parties verify
        offline. See{" "}
        <a href="/docs/ats-1" className="underline underline-offset-2 text-[var(--color-fg)]">
          ATS-1 spec
        </a>
        .
      </DocsP>

      <DocsH2 id="rails">06 · Payment rails</DocsH2>
      <DocsH3 id="stripe">Stripe (reference — live)</DocsH3>
      <DocsP>
        Manual capture escrow: authorize at funding, capture only after verify returns ALLOW,
        cancel on DENY. This is the demonstrated reference implementation on nous.stvor.xyz.
      </DocsP>
      <DocsH3 id="planned">Planned</DocsH3>
      <DocsP>
        <DocsInlineCode>x402</DocsInlineCode> and <DocsInlineCode>OrbWallet</DocsInlineCode> are on
        the roadmap. Any HTTP payment API with hold/capture semantics can host the same checkpoint
        pattern — Stvor is rail-agnostic by design.
      </DocsP>
    </DocsPageShell>
  );
}
