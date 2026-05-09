import type { Metadata } from "next";
import { ExternalLink, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Hybrid X3DH protocol details, references, and academic context. The cryptographic foundations behind Stvor.",
  alternates: { canonical: "/research" },
};

const references = [
  {
    title: "ML-KEM (FIPS 203)",
    body: "Module-lattice-based Key-Encapsulation Mechanism. NIST PQC standard.",
    href: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf",
  },
  {
    title: "ML-DSA (FIPS 204)",
    body: "Module-lattice-based Digital Signature Standard. NIST PQC standard.",
    href: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf",
  },
  {
    title: "Signal Double Ratchet",
    body: "The original specification of the messaging ratchet that powers our forward-secret channel.",
    href: "https://signal.org/docs/specifications/doubleratchet/",
  },
  {
    title: "X3DH Key Agreement",
    body: "Extended Triple Diffie-Hellman, the asynchronous key agreement Stvor extends with PQC.",
    href: "https://signal.org/docs/specifications/x3dh/",
  },
  {
    title: "ERC-4337",
    body: "Account abstraction via entry-point contract. The wallet standard our binding helpers target.",
    href: "https://eips.ethereum.org/EIPS/eip-4337",
  },
];

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section
          eyebrow="Research"
          title="The cryptographic foundations"
          description="Stvor is built on standards. This page lays out what they are and how we combine them. If you're a security researcher, this is the page for you."
        >
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-[var(--color-fg)] mb-3 tracking-tight">
                Hybrid X3DH handshake
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed mb-5">
                A classical ECDH (P-256) and a post-quantum ML-KEM-768 encapsulation are run in
                parallel. The two shared secrets are concatenated and fed through HKDF with a domain
                separator. The output is the seed for the Double Ratchet.
              </p>
              <CodeBlock
                language="ts"
                code={`// Conceptual sketch — actual implementation is constant-time.
const ecdh_ss   = ECDH(P256, ourPriv, peerPub);
const mlkem_ss  = MLKEM_768.encap(peerKemPub);

const root = HKDF_SHA256(
  ikm: ecdh_ss || mlkem_ss,
  salt: "STVOR-HYBRID-v1",
  info: sessionContext,
  length: 32,
);`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[var(--color-fg)] mb-3 tracking-tight">
                Why hybrid?
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                ML-KEM is new. Confidence in any single PQC primitive should grow over time. Until
                that confidence is mature, hybrid constructions give you the security of the
                stronger of the two — if either ECDH or ML-KEM remains secure against an attacker,
                the session key is safe.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[var(--color-fg)] mb-3 tracking-tight">
                AA UserOperation binding
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                A messaging session is bound to a specific UserOp by including the UserOp hash and
                the wallet's signing public key in the X3DH transcript. An attacker who phishes the
                user into signing a UserOp cannot transplant the resulting session into a different
                channel — the binding hash will not match.
              </p>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="References"
          title="Standards we build on"
          description="Direct links — we'd rather you read the source than our marketing page."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {references.map((ref) => (
              <a
                key={ref.title}
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen
                      size={18}
                      className="text-[var(--color-brand)]"
                    />
                    <ExternalLink
                      size={14}
                      className="text-[var(--color-fg-subtle)] group-hover:text-[var(--color-fg)] transition-colors"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-fg)] mb-1 tracking-tight">
                    {ref.title}
                  </h3>
                  <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                    {ref.body}
                  </p>
                </Card>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink href={`mailto:${siteConfig.emails.founder}?subject=Research%20discussion`} variant="primary" size="lg">
              Talk to the protocol designer
            </ButtonLink>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
