import type { Metadata } from "next";
import { ShieldCheck, AlertTriangle, FileSearch, Bug } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Card, Badge } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Stvor security posture: cryptographic primitives, formal verification status, audit roadmap, and known limitations.",
  alternates: { canonical: "/security" },
};

const considerations = [
  {
    title: "External audit — planned, pending funding",
    body: "We have not yet contracted an independent security audit. Funding is the gating constraint. Customer-facing engagements include this in the procurement conversation.",
  },
  {
    title: "Protocol formalization in progress",
    body: "ProVerif and Tamarin specifications for Hybrid X3DH are being prepared. Reference proofs will be published alongside the SDK.",
  },
  {
    title: "Cryptographic primitives are standard",
    body: "We do not roll custom crypto. ML-KEM-768 (FIPS 203), ML-DSA-65 (FIPS 204), AES-256-GCM, HKDF-SHA256, ECDH P-256. Implementations are vendored from audited upstream libraries.",
  },
  {
    title: "Production hardening is ongoing",
    body: "The SDK is suitable for design partner integrations under our supervision. We are explicit about non-production status until the first external audit completes.",
  },
];

const roadmap = [
  { phase: "Now", items: ["Open-source SDK on GitHub", "Hybrid X3DH reference implementation", "Design partner pilots"] },
  {
    phase: "Q3 2026 (planned)",
    items: ["ProVerif protocol verification", "First external code audit (pending funding)", "Bug bounty program launch"],
  },
  { phase: "Beyond", items: ["SOC 2 Type II", "FIPS 140-3 for hosted registry", "Continuous third-party security reviews"] },
];

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section
          eyebrow="Security"
          title="How we think about security"
          description="Stvor is in early access. We are explicit about what's verified, what's pending, and where the boundaries are. If you're evaluating us for a regulated workload, talk to us first."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <ShieldCheck size={20} className="text-[var(--color-accent)] mb-4" />
              <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
                Standards-based primitives
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                NIST FIPS 203 (ML-KEM-768) and FIPS 204 (ML-DSA-65). AES-256-GCM, HKDF-SHA256,
                ECDH P-256 from audited upstream libraries. No custom crypto.
              </p>
            </Card>
            <Card>
              <FileSearch size={20} className="text-[var(--color-brand)] mb-4" />
              <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
                Open-source verification
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                Apache 2.0 licensed. SDK, smart contracts, and reference relays are public. ProVerif
                & Tamarin specs are in progress for the Hybrid X3DH handshake.
              </p>
            </Card>
            <Card>
              <AlertTriangle size={20} className="text-[var(--color-warn)] mb-4" />
              <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
                Audit — planned, pending funding
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                We have not yet contracted an external audit. We disclose this clearly and roadmap
                it in design-partner conversations.
              </p>
            </Card>
            <Card>
              <Bug size={20} className="text-[var(--color-fg)] mb-4" />
              <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
                Responsible disclosure
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                Found a vulnerability? Email{" "}
                <a
                  className="text-[var(--color-fg)] underline underline-offset-2"
                  href={`mailto:${siteConfig.emails.founder}`}
                >
                  {siteConfig.emails.founder}
                </a>{" "}
                with subject "[security]". Bug bounty launches with the first audit.
              </p>
            </Card>
          </div>
        </Section>

        <Section
          eyebrow="Considerations"
          title="What you should know before deploying"
          description="We'd rather you know these upfront than discover them later. Reach out and we'll walk through your specific threat model."
        >
          <div className="mx-auto max-w-3xl space-y-4">
            {considerations.map((c) => (
              <Card key={c.title}>
                <h3 className="text-base font-semibold text-[var(--color-fg)] mb-1.5 tracking-tight">
                  {c.title}
                </h3>
                <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {c.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="roadmap"
          eyebrow="Roadmap"
          title="Security roadmap"
          description="Dates are commitments where stated and aspirational where labelled — we don't hide the difference."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {roadmap.map((phase) => (
              <Card key={phase.phase}>
                <Badge variant="brand" className="mb-4">
                  {phase.phase}
                </Badge>
                <ul className="space-y-2.5">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--color-fg-muted)] leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink href={`mailto:${siteConfig.emails.founder}`} variant="primary" size="lg">
              Discuss your security requirements
            </ButtonLink>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
