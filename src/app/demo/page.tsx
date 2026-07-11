import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VerificationDemo } from "@/components/demo/verification-demo";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Demo — Stvor",
  description:
    "See Stvor's pre-execution verification in action. Sign an intent commitment, verify against the live payload, receive a signed Trust Receipt. Blocks payload manipulation before it happens.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="pt-24 pb-8 text-center px-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 font-mono">
            Interactive demo
          </p>
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mb-4">
            Pre-execution verification, live.
          </h1>
          <p className="text-[15px] text-[var(--color-fg-muted)] max-w-2xl mx-auto leading-relaxed">
            Pick a scenario. Commit to an intent. Watch Stvor verify it before the transaction
            is built — and see what happens when an attacker tries to swap the destination.
          </p>
        </div>

        <div className="px-4 md:px-6 pb-16 max-w-5xl mx-auto w-full">
          <VerificationDemo />
        </div>

        <div className="py-16 text-center px-4 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-fg-muted)] mb-5">Ready to integrate? The SDK is in alpha — design partner access open.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href={siteConfig.cta.docs} variant="primary" size="lg">
              Read the docs <ArrowRight size={15} />
            </ButtonLink>
            <ButtonLink
              href={`mailto:${siteConfig.emails.founder}?subject=Design%20partner%20access`}
              variant="secondary"
              size="lg"
            >
              <BookOpen size={15} /> Request design partner access
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
