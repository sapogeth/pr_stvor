import type { Metadata } from "next";
import { ShieldCheck, AlertTriangle, FileSearch, Bug, Lock, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Card, Badge } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security — Stvor",
  description:
    "Stvor security posture: cryptographic primitives, threat model, responsible disclosure, and roadmap. Honest about what's verified and what's planned.",
  alternates: { canonical: "/security" },
};

const primitives = [
  {
    icon: ShieldCheck,
    color: "var(--color-accent)",
    title: "ed25519 commitment signing",
    body: "Every intent commitment is signed with ed25519 before the transaction payload is built. Signing is <2ms on commodity hardware. The public key is published at /.well-known/jwks.json — receipts are verifiable offline, no API call required.",
  },
  {
    icon: Lock,
    color: "var(--color-accent)",
    title: "SHA-256 canonical hashing",
    body: "Commitment fields are canonicalized (sorted keys, trimmed whitespace, amounts normalized to 18 decimal places) before hashing. This prevents encoding-variant attacks where two different encodings produce the same payload but different hashes.",
  },
  {
    icon: FileSearch,
    color: "var(--color-brand)",
    title: "No payload data leaves your infra",
    body: "Stvor never sees transaction content. The commitment hash and ed25519 signature are sent to the Stvor API. The actual payload stays on your infrastructure. BYOK mode (bring-your-own-key) keeps your private key entirely local.",
  },
  {
    icon: Bug,
    color: "var(--color-fg-muted)",
    title: "Responsible disclosure",
    body: (
      <>
        Found a vulnerability? Email{" "}
        <a
          className="text-[var(--color-fg)] underline underline-offset-2"
          href={`mailto:${siteConfig.emails.founder}`}
        >
          {siteConfig.emails.founder}
        </a>{" "}
        with subject <code className="font-mono text-xs">[security]</code>. We respond within 24 hours.
        Bug bounty program launches with the first external audit.
      </>
    ),
  },
  {
    icon: AlertTriangle,
    color: "var(--color-warn)",
    title: "External audit — planned, pending funding",
    body: "We have not yet contracted an independent security audit. This is the gating constraint. Design partner engagements include the audit roadmap in the procurement conversation.",
  },
  {
    icon: Clock,
    color: "var(--color-warn)",
    title: "Post-quantum migration — roadmap 2027",
    body: "Current signing uses ed25519 (classical). NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) migration tooling is planned for 2027. The SDK will provide a migration path that does not require re-anchoring existing commitments.",
  },
];

const disclosures = [
  {
    title: "No external audit yet",
    body: "We have not contracted an independent code audit. We are explicit about this and roadmap it in every design partner conversation. The SDK is suitable for design partner integrations under our supervision — not production deployments handling regulated funds without coordination.",
  },
  {
    title: "Commitment anchoring does not prevent all prompt injection",
    body: "Policy gates reduce the blast radius of prompt injection attacks, but they cannot prevent a fully compromised agent from issuing a legitimate-looking commitment for a malicious operation that passes policy rules. Defense in depth is required — Stvor is one layer, not the entire security posture.",
  },
  {
    title: "Offline receipt verification relies on key continuity",
    body: "Receipts verified offline use the Stvor public key published at /.well-known/jwks.json. Key rotation is announced with 90-day notice. If you cache the public key, implement a rotation check.",
  },
  {
    title: "BYOK mode is self-custody — key loss means receipt loss",
    body: "In BYOK mode, your private key is not escrowed by Stvor. If you lose the private key, you cannot issue new receipts or verify existing ones. Use a KMS with backup — AWS KMS, GCP Cloud KMS, HashiCorp Vault.",
  },
];

const roadmap = [
  {
    phase: "Now",
    badge: "shipping" as const,
    items: [
      "Apache 2.0 open-source SDK on GitHub",
      "ed25519 commitment signing + SHA-256 canonical hashing",
      "Policy gates: maxAmount, allowedRecipients, allowedChains",
      "Offline receipt verification via published JWKS",
      "BYOK mode — private key never leaves your infrastructure",
      "Design partner pilots under supervision",
    ],
  },
  {
    phase: "Q3–Q4 2026",
    badge: "planned" as const,
    items: [
      "First external code audit (pending funding)",
      "Formal threat model publication",
      "Bug bounty program launch",
      "SOC 2 Type II audit engagement",
    ],
  },
  {
    phase: "2027+",
    badge: "vision" as const,
    items: [
      "NIST FIPS 203/204 migration tooling (ML-KEM + ML-DSA)",
      "Post-quantum commitment signing without re-anchoring",
      "FIPS 140-3 for hosted KMS option",
      "Continuous third-party security reviews",
    ],
  },
];

const BADGE_STYLES: Record<string, string> = {
  shipping: "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.07)] text-[rgba(16,185,129,0.9)]",
  planned: "border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)] text-[rgba(245,158,11,0.85)]",
  vision: "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.4)]",
};

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">

        {/* ── Cryptographic primitives ── */}
        <Section
          eyebrow="Security"
          title="How Stvor thinks about security"
          description="We are explicit about what's verified, what's pending, and where the limits are. If you're evaluating Stvor for a regulated workload, read this page and then talk to us."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {primitives.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title}>
                  <Icon
                    size={18}
                    className="mb-4 shrink-0"
                    style={{ color: p.color }}
                  />
                  <h3 className="text-[13px] font-semibold text-[var(--color-fg)] mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[12.5px] text-[var(--color-fg-muted)] leading-[1.7]">
                    {p.body}
                  </p>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* ── Known limitations ── */}
        <Section
          eyebrow="Disclosures"
          title="What you should know before deploying"
          description="We'd rather you know these upfront than discover them in a post-mortem. Reach out and we'll walk through your specific threat model."
        >
          <div className="mx-auto max-w-3xl space-y-4">
            {disclosures.map((d) => (
              <Card key={d.title} hoverable={false}>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--color-warn)", opacity: 0.7 }}
                  />
                  <div>
                    <h3 className="text-[13px] font-semibold text-[var(--color-fg)] mb-1.5 leading-snug">
                      {d.title}
                    </h3>
                    <p className="text-[12.5px] text-[var(--color-fg-muted)] leading-[1.7]">
                      {d.body}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── Roadmap ── */}
        <Section
          id="roadmap"
          eyebrow="Roadmap"
          title="Security roadmap"
          description="Dates marked as planned are aspirational. We don't hide that distinction."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {roadmap.map((phase) => (
              <Card key={phase.phase} hoverable={false}>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-[13px] font-semibold text-[var(--color-fg)]">
                    {phase.phase}
                  </h3>
                  <span
                    className={`text-[9px] font-mono font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded border ${BADGE_STYLES[phase.badge]}`}
                  >
                    {phase.badge === "shipping"
                      ? "Shipping now"
                      : phase.badge === "planned"
                      ? "Planned"
                      : "Long-term"}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-[var(--color-fg-muted)] leading-[1.6]">
                      <span
                        className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                        style={{
                          background:
                            phase.badge === "shipping"
                              ? "var(--color-accent)"
                              : phase.badge === "planned"
                              ? "var(--color-warn)"
                              : "var(--color-fg-subtle)",
                          opacity: 0.7,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink href={siteConfig.cta.contact} variant="primary" size="lg">
              Message {siteConfig.contact.handle}
            </ButtonLink>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
