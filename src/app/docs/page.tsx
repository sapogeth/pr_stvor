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
          Pre-execution verification for agents, wallets, and payment rails. Stvor checks
          destination, payload hash, counterparty trust, and policy before any funds move.
          On success → ECDSA P-256 signed Trust Receipt (ATS-1 draft).
        </DocsP>
        <div className="flex flex-wrap gap-2">
          <DocsBadge color="amber">Reference impl</DocsBadge>
          <DocsBadge color="indigo">MIT licensed</DocsBadge>
          <DocsBadge color="muted">Pilot onboarding</DocsBadge>
        </div>
      </div>

      <div className="h-px bg-[var(--color-border)] mb-10" />

      <DocsNote type="warn">
        There is no self-serve npm SDK today. Production integrations run through a paid{" "}
        {siteConfig.pilot.duration} pilot — I wire the verification checkpoint in front of your
        execution flow with you. The docs describe the protocol and reference implementation, not
        a GA product surface.
      </DocsNote>

      <div className="grid sm:grid-cols-2 gap-4 my-8">
        <DocsCardLink
          href="/docs/how-it-works"
          title="How it works"
          description="Four checks, attack/defense pairs (Bybit, JaredFromSubway), Stripe reference flow, cryptography, threat model."
        />
        <DocsCardLink
          href="/docs/integrate"
          title="Integration guide"
          description="Pilot onboarding, checkpoint placement, commitment + verify code, webhook pattern, payment rails."
        />
        <DocsCardLink
          href="/docs/ats-1"
          title="ATS-1 spec"
          description="Trust Receipt schema, ECDSA P-256 signing, verification gate, escrow lifecycle, offline verification."
        />
        <DocsCardLink
          href="https://nous.stvor.xyz"
          title="Live reference deployment"
          description="Hermes hackathon build with attack sim, agent arena, and Stripe escrow demo. External site."
          external
        />
      </div>

      <DocsP>
        Start with{" "}
        <Link href="/docs/how-it-works" className="text-[var(--color-fg)] underline underline-offset-2">
          How it works
        </Link>{" "}
        if you need the threat model. Read{" "}
        <Link href="/docs/integrate" className="text-[var(--color-fg)] underline underline-offset-2">
          Integration guide
        </Link>{" "}
        before a pilot. Implementers should read{" "}
        <Link href="/docs/ats-1" className="text-[var(--color-fg)] underline underline-offset-2">
          ATS-1
        </Link>{" "}
        for the portable receipt format.
      </DocsP>

      <div className="mt-12 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <p className="text-[14px] font-semibold text-[var(--color-fg)] mb-2">
          Ready to wire this in production?
        </p>
        <DocsP>
          {siteConfig.pilot.summary}
        </DocsP>
        <a
          href={siteConfig.cta.pilot}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] rounded-[6px] hover:opacity-90 transition-opacity"
        >
          Book the pilot — {siteConfig.pilot.price}
        </a>
      </div>
    </DocsPageShell>
  );
}
