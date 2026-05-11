import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DemoIDE } from "@/components/demo/demo-ide";
import { DemoHero } from "@/components/demo/demo-hero";
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
      <main className="flex-1 flex flex-col">
        {/* animated hero — compact so IDE is above fold */}
        <DemoHero />

        {/* IDE — takes remaining visible space */}
        <div className="flex-1 px-4 md:px-6 pb-8 max-w-7xl mx-auto w-full">
          <DemoIDE />
        </div>

        {/* bottom CTAs */}
        <div className="py-16 text-center px-4 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-fg-muted)] mb-5">
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
      </main>
      <Footer />
    </>
  );
}
