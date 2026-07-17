import type { Metadata } from "next";
import Link from "next/link";
import { DocsPageShell } from "@/components/docs/docs-shell";
import {
  DocsBadge,
  DocsCardLink,
  DocsNote,
  DocsP,
} from "@/components/docs/docs-ui";
import { siteConfig } from "@/lib/site-config";
import { STVOR_PACKAGES } from "@/lib/contract";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Stvor documentation: pre-execution verification for agents that move money. ATS-1 spec, integration guide, and technical reference.",
};

export default function DocsOverviewPage() {
  return (
    <DocsPageShell section="">
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] font-mono mb-3">
          Documentation
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] mb-4">
          Stvor technical docs
        </h1>
        <DocsP>
          Pre-execution verification that binds intent to execution. One gate: canonical payload
          hash compare at verify time — swapped destination → signed DENY, not a silent pass. Every
          decision gets an ES256 (P-256) Trust Receipt verifiable offline (ATS-1 draft).
        </DocsP>
        <div className="flex flex-wrap gap-2">
          <DocsBadge color="green">{STVOR_PACKAGES.client} on npm</DocsBadge>
          <DocsBadge color="indigo">MIT licensed</DocsBadge>
          <DocsBadge color="muted">Pilot onboarding</DocsBadge>
        </div>
      </div>

      <div className="h-px bg-[var(--color-border)] mb-10" />

      <div className="grid sm:grid-cols-2 gap-4 my-8">
        <DocsCardLink
          href="/docs/how-it-works"
          title="How it works"
          description="commit → verify → settle, attack/defense pairs, ES256 receipts, Stripe reference flow, threat model."
        />
        <DocsCardLink
          href="/docs/integrate"
          title="Integration guide"
          description={`${STVOR_PACKAGES.client} quickstart, api.stvor.xyz endpoints, checkpoint placement, payment rails.`}
        />
        <DocsCardLink
          href="/docs/ats-1"
          title="ATS-1 spec"
          description="Trust Receipt schema, ES256 signing, verification gate, escrow lifecycle, offline verification."
        />
        <DocsCardLink
          href={siteConfig.api.verifier}
          title="Browser verifier"
          description="Paste a Trust Receipt — ALLOW or DENY — verify ES256 signature with only the published key."
          external
        />
        <DocsCardLink
          href={siteConfig.api.fixtures}
          title="Test vectors"
          description="Published fixtures/ — self-check your client before writing a line against the API."
          external
        />
        <DocsCardLink
          href="https://nous.stvor.xyz"
          title="Hackathon reference (nous)"
          description="Hermes build with attack sim, agent arena, Stripe escrow — separate from production API."
          external
        />
      </div>

      <DocsNote type="info">
        Production API:{" "}
        <a href={siteConfig.api.base} className="underline underline-offset-2">
          {siteConfig.api.base}
        </a>{" "}
        — flat paths <code className="font-mono text-[11px]">/commitments</code>,{" "}
        <code className="font-mono text-[11px]">/verify</code>,{" "}
        <code className="font-mono text-[11px]">/receipt</code>. White-glove pilot integrations
        available if you want help wiring the checkpoint in your stack.
      </DocsNote>

      <DocsP>
        Start with{" "}
        <Link href="/docs/how-it-works" className="text-[var(--color-fg)] underline underline-offset-2">
          How it works
        </Link>{" "}
        if you need the threat model. Read{" "}
        <Link href="/docs/integrate" className="text-[var(--color-fg)] underline underline-offset-2">
          Integration guide
        </Link>{" "}
        to wire against the API. Implementers should read{" "}
        <Link href="/docs/ats-1" className="text-[var(--color-fg)] underline underline-offset-2">
          ATS-1
        </Link>{" "}
        for the portable receipt format.
      </DocsP>

      <div className="mt-12 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <p className="text-[14px] font-semibold text-[var(--color-fg)] mb-2">
          Ready to wire this in production?
        </p>
        <DocsP>{siteConfig.pilot.summary}</DocsP>
        <a
          href={siteConfig.cta.pilot}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] rounded-[6px] hover:opacity-90 transition-opacity"
        >
          Message {siteConfig.contact.handle}
        </a>
      </div>
    </DocsPageShell>
  );
}
