import type { Metadata } from "next";
import { ExternalLink, FileText, ShieldCheck, Lock, GitBranch } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Research — Stvor",
  description:
    "The cryptographic foundations of Stvor's execution trust layer. Commitment anchoring with ES256 (P-256), SHA-256 canonical hashing, the Trust Receipt format, and the threat model it addresses.",
  alternates: { canonical: "/research" },
};

const references = [
  {
    title: "ECDSA P-256 / ES256 (IEEE P1363)",
    body: "NIST-approved elliptic curve signature scheme. Stvor uses ES256 (secp256r1) for commitment and Trust Receipt signing — WebCrypto-native, widely supported in browsers and HSMs.",
    href: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186.pdf",
  },
  {
    title: "SHA-2 (FIPS 180-4)",
    body: "NIST standard for the SHA-256 hash function used in Stvor's canonical commitment hash construction.",
    href: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf",
  },
  {
    title: "JSON Canonicalization Scheme (RFC 8785)",
    body: "The serialization standard Stvor follows for deterministic canonical hashing of commitment fields before signing.",
    href: "https://www.rfc-editor.org/rfc/rfc8785",
  },
  {
    title: "ERC-4337: Account Abstraction",
    body: "The smart account standard Stvor integrates with for on-chain execution. Stvor's commitment anchoring can gate UserOperation submission.",
    href: "https://eips.ethereum.org/EIPS/eip-4337",
  },
  {
    title: "NIST IR 8505: AI Agentic Systems",
    body: "NIST's emerging framework for trust and security in agentic AI systems — the policy context Stvor's compliance audit trail targets.",
    href: "https://csrc.nist.gov/pubs/ir/8505/ipd",
  },
  {
    title: "MiCA Regulation (EU) 2023/1114",
    body: "Markets in Crypto Assets regulation. Stvor's Trust Receipt format is designed with MiCA's traceability and audit trail requirements in mind.",
    href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114",
  },
  {
    title: "GENIUS Act (U.S., 2025)",
    body: "Proposed U.S. stablecoin framework requiring traceable execution and compliance audit trails. Stvor receipts are structured to support GENIUS Act compliance reporting.",
    href: "https://www.congress.gov/bill/119th-congress/senate-bill/394",
  },
  {
    title: "ML-KEM (NIST FIPS 203) — Post-quantum roadmap",
    body: "Lattice-based key encapsulation standard. Stvor's 2027 post-quantum migration roadmap targets ML-DSA (FIPS 204) for commitment signatures.",
    href: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf",
  },
];

const concepts = [
  {
    Icon: Lock,
    title: "Commitment anchoring",
    body: `The core primitive. Before any transaction is built, the caller commits a structured intent object — destination, amount, method selector, agent identity, and TTL — via POST /commitments. The payload hash is frozen; ES256 signs the receipt at verify time.

When the transaction is ready to submit, stvor.verify() checks: does the live payload match the committed hash and destination? If yes, settle and issue an ALLOW receipt. If no — field mismatch, destination swap — a signed DENY receipt is issued and the transaction is NOT submitted.

This is pre-execution verification: commit → verify → settle.`,
  },
  {
    Icon: ShieldCheck,
    title: "Canonical hash construction",
    body: `To make the commitment hash deterministic across languages and platforms, Stvor canonicalizes the intent object before hashing:

1. Sort all keys alphabetically (RFC 8785)
2. Normalize amounts to 18 decimal places (no floating point)
3. Lowercase all address fields
4. Strip trailing whitespace
5. Serialize to UTF-8 JSON without whitespace
6. SHA-256 hash the result

This prevents encoding-variant attacks: two different serializations of the same intent produce the same hash. The canonical spec is open and language-agnostic — any SDK implementation can be verified against a reference vector.`,
  },
  {
    Icon: FileText,
    title: "Trust Receipt format",
    body: `A Trust Receipt is a signed JSON document issued by Stvor after a successful verification. It contains:

• id — globally unique receipt identifier
• hash — SHA-256 canonical hash of the committed intent
• signature — ES256 (P-256) signature over the canonical body
• fields — map of verified field names to their committed values
• agent — identifier of the signing agent
• issued_at — ISO 8601 timestamp
• ttl — commitment time-to-live in seconds

The receipt is verifiable offline using Stvor's published public key at /.well-known/ats1-public-key. No Stvor API call is required to verify a receipt — this is by design. An auditor, regulator, or counterparty can verify any historical receipt without a vendor relationship.`,
  },
  {
    Icon: GitBranch,
    title: "Threat model",
    body: `Stvor addresses three attack classes in the AI agent finance context:

Payload manipulation — the transaction payload is modified between intent and execution. Stvor's commitment comparison catches destination swaps, amount changes, and method selector changes before submission.

Context injection — a malicious prompt or tool response causes an agent to authorize a different operation than intended. Stvor's commitment was signed before the injection can affect the payload.

Authorization gap — an agent operates beyond its delegated scope. Stvor's policy gate compares the intent against a declared policy (maxAmount, allowedMethods, allowedRecipients) before anchoring the commitment.

What Stvor does NOT address: private key compromise, malicious agent code, or attacks at the smart contract level. These require additional controls. See the security page for the full honest scope.`,
  },
];

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20">
        {/* ── Page header ── */}
        <div className="container-page max-w-3xl mb-16 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 font-mono">
            Technical notes
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mb-5">
            How Stvor works, cryptographically.
          </h1>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-[1.7] max-w-2xl mx-auto">
            The cryptographic primitives are not novel — ES256 (P-256) and SHA-256 are industry
            standard. What Stvor provides is the composition: commit → verify → settle binding
            designed for the AI agent execution context, with a portable, offline-verifiable
            receipt format.
          </p>
        </div>

        {/* ── Concepts ── */}
        <Section eyebrow="Architecture" title="Core concepts" align="left">
          <div className="space-y-10 max-w-3xl">
            {concepts.map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-5">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
                    <Icon size={15} style={{ color: "var(--color-accent)" }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--color-fg)] mb-3">
                    {title}
                  </h3>
                  <div className="text-[13.5px] text-[var(--color-fg-muted)] leading-[1.8] whitespace-pre-line">
                    {body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── ATS-1 spec ── */}
        <Section eyebrow="ATS-1" title="Trust Receipt format (draft)" align="left" id="ats-1">
          <div className="max-w-3xl space-y-4">
            <p className="text-[14px] text-[var(--color-fg-muted)] leading-[1.7]">
              ATS-1 is the open Trust Receipt format Stvor is drafting: a portable JSON
              document signed with ECDSA P-256 over a canonical payload hash. Any verifier
              with the issuer&apos;s public key can validate a receipt offline — no Stvor
              API call required.
            </p>
            <p className="text-[14px] text-[var(--color-fg-muted)] leading-[1.7]">
              Fields include commitment hash, verified checks, decision (ALLOW / DENY),
              agent identity, and timestamp. The draft spec and reference verifier ship
              with pilot engagements and on GitHub as they stabilize.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <ButtonLink href="/docs/ats-1" variant="secondary">
                Read ATS-1 docs
              </ButtonLink>
              <ButtonLink
                href={siteConfig.cta.contact}
                variant="secondary"
              >
                Request draft on Telegram
              </ButtonLink>
            </div>
          </div>
        </Section>

        {/* ── References ── */}
        <Section eyebrow="References" title="Standards and prior work">
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {references.map((ref) => (
              <a
                key={ref.title}
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[13px] font-medium text-[var(--color-fg)] leading-snug">
                    {ref.title}
                  </h3>
                  <ExternalLink
                    size={12}
                    className="shrink-0 text-[var(--color-fg-subtle)] group-hover:text-[var(--color-fg-muted)] transition-colors mt-0.5"
                  />
                </div>
                <p className="text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
                  {ref.body}
                </p>
              </a>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
