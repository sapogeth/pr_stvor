import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DemoIDE } from "@/components/demo/demo-ide";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Demo",
  description:
    "See Stvor's post-quantum handshake live. Pick your chain — TON, ERC-4337, MCP, or Node.js — and watch the Hybrid X3DH session establish in real time.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <div className="container-page">
          {/* header */}
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">
              Interactive demo
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-fg)] mb-5">
              Watch the handshake happen
            </h1>
            <p className="text-lg text-[var(--color-fg-muted)] text-pretty">
              Pick your platform. Click <strong className="text-[var(--color-fg)]">Run</strong>.
              See the Hybrid X3DH session (ECDH P-256 + ML-KEM-768) establish step by step —
              then compare how it stacks up against classical approaches and Shor's algorithm.
            </p>
          </div>

          {/* IDE */}
          <div className="mx-auto max-w-6xl">
            <DemoIDE />
          </div>

          {/* bottom CTAs */}
          <div className="mt-16 mx-auto max-w-xl text-center space-y-4">
            <p className="text-sm text-[var(--color-fg-muted)]">
              Ready to integrate?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonLink href={siteConfig.cta.docs} variant="primary" size="lg">
                Read the docs <ArrowRight size={15} />
              </ButtonLink>
              <ButtonLink
                href={`mailto:${siteConfig.emails.founder}?subject=Demo%20call%20request`}
                variant="secondary"
                size="lg"
              >
                <BookOpen size={15} /> Book a walkthrough
              </ButtonLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
