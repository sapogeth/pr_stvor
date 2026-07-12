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

export const metadata: Metadata = {
  title: "Integration guide",
  description:
    "How to integrate Stvor via paid pilot: checkpoint placement, commitment flow, webhook pattern, and payment rails.",
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
          or internal ledger write. This is white-glove during the pilot — you bring the agent and
          execution path; I place the gate and hand you a working flow.
        </DocsP>
        <div className="flex flex-wrap gap-2">
          <DocsBadge color="amber">No self-serve SDK</DocsBadge>
          <DocsBadge color="green">Stripe reference live</DocsBadge>
        </div>
      </div>

      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        Integration has three moving parts: (1) commit intent at the moment the user or agent
        approves an operation, (2) verify live payload immediately before execution, (3) issue a
        signed Trust Receipt on ALLOW. Deny path must never call the execution rail.
      </DocsP>

      <DocsH2 id="pilot">01 · Pilot onboarding</DocsH2>
      <DocsP>
        {siteConfig.pilot.summary}
      </DocsP>
      <DocsStep n="Week 1" title="Map your execution path">
        Identify where money actually moves: Stripe capture, on-chain send, internal transfer API.
        Stvor sits immediately before that call.
      </DocsStep>
      <DocsStep n="Week 1–2" title="Wire checkpoint + receipts">
        Commitment at intent, four-check verify gate, ATS-1 receipt on ALLOW. Test with tampered
        payloads in staging.
      </DocsStep>
      <DocsStep n="End" title="Handoff">
        Working checkpoint in your repo. You keep running it, or you pay nothing further beyond the
        pilot fee.
      </DocsStep>
      <a
        href={siteConfig.cta.pilot}
        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] rounded-[6px] hover:opacity-90 transition-opacity mt-4"
      >
        Book the pilot — {siteConfig.pilot.price}
      </a>

      <DocsH2 id="checkpoint">02 · Checkpoint placement</DocsH2>
      <DocsCode language="typescript" filename="execution-flow.ts">{`// WRONG — verify after payment
await stripe.paymentIntents.capture(id);
await stvor.verify(...); // too late

// RIGHT — verify before any rail call
const decision = await stvor.verify({ commitment, payload: liveParams });
if (!decision.allowed) {
  await stripe.paymentIntents.cancel(escrowId);
  throw new DeniedError(decision.reason);
}
await stripe.paymentIntents.capture(id);
await stvor.issueReceipt(decision);`}</DocsCode>

      <DocsH2 id="commit-verify">03 · Commitment + verify</DocsH2>
      <DocsP>
        Commit at intent time — when the user confirms, when the agent proposes a tool call, or
        when a contract is created. Store the commitment hash; do not mutate it.
      </DocsP>
      <DocsCode language="typescript" filename="verify-gate.ts">{`type Commitment = {
  destination: string;
  payloadHash: string;   // sha256 hex of canonical params
  policyId: string;
  agentId: string;
  signedAt: string;
};

async function gate(
  commitment: Commitment,
  liveParams: Record<string, unknown>,
) {
  if (liveParams.destination !== commitment.destination)
    return deny("DESTINATION_MISMATCH");

  const hashOk = timingSafeHashMatch(liveParams, commitment.payloadHash);
  if (!hashOk) return deny("PAYLOAD_MISMATCH");

  if ((await trustScore(liveParams.destination)) < MIN_TRUST)
    return deny("COUNTERPARTY_UNTRUSTED");

  if (!policyAllows(commitment.policyId, liveParams))
    return deny("POLICY_VIOLATION");

  return allow();
}`}</DocsCode>

      <DocsH2 id="webhook">04 · Webhook pattern</DocsH2>
      <DocsP>
        The reference marketplace at nous.stvor.xyz uses a webhook delivery model — no SDK
        required for agents that expose an HTTP endpoint. Your production integration may differ;
        the invariant is the same: committed hash before delivery, verify before execution.
      </DocsP>
      <DocsCode language="bash" filename="register-agent.sh">{`# Reference API (nous.stvor.xyz) — illustrative
curl -X POST https://nous.stvor.xyz/api/v1/agents/register \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "My Agent",
    "specialty": "Research",
    "endpoint_url": "https://my-agent.example.com/webhook"
  }'`}</DocsCode>
      <DocsCode language="json" filename="webhook-payload.json">{`// Stvor POSTs to your endpoint_url
{
  "task": "Analyze DeFi risk for $ATOM...",
  "taskHash": "sha256:a3f2c1d8...",
  "budget": 10000
}`}</DocsCode>
      <DocsNote type="info">
        The webhook register flow is live on{" "}
        <a href="https://nous.stvor.xyz/integrate" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          nous.stvor.xyz/integrate
        </a>
        . stvor.xyz pilots wire checkpoints in your own execution stack — not necessarily this API.
      </DocsNote>

      <DocsH2 id="receipt">05 · Receipt issuance</DocsH2>
      <DocsP>
        On ALLOW, sign the canonical receipt payload with ECDSA P-256. Publish your public key at{" "}
        <DocsInlineCode>/.well-known/ats1-public-key</DocsInlineCode> so third parties can verify
        offline. See{" "}
        <a href="/docs/ats-1" className="underline underline-offset-2 text-[var(--color-fg)]">
          ATS-1 spec
        </a>
        .
      </DocsP>

      <DocsH2 id="rails">06 · Payment rails</DocsH2>
      <DocsH3 id="stripe">Stripe (reference — live)</DocsH3>
      <DocsP>
        Manual capture escrow: authorize at funding, capture only after attestation passes,
        cancel on DENY. This is the demonstrated reference implementation.
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
