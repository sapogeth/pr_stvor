import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VerificationDemo } from "@/components/demo/verification-demo";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Demo — Stvor",
  description:
    "Tamper a payment payload after intent. Watch Stvor block the transfer before funds move. No signup required.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="pt-24 pb-8 text-center px-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 font-mono">
            No signup · runs in browser
          </p>
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mb-4">
            Swap the destination. See it get blocked.
          </h1>
          <p className="text-[15px] text-[var(--color-fg-muted)] max-w-2xl mx-auto leading-relaxed">
            Commit to paying Alice. Change the address to an attacker. Stvor denies
            execution before any payment rail fires.
          </p>
          <p className="mt-4 text-[13px] text-[var(--color-fg-subtle)]">
            Want the full Bybit-class sim?{" "}
            <a
              href={siteConfig.demo.attack}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[var(--color-fg-muted)]"
            >
              Run live attack demo on nous.stvor.xyz →
            </a>
          </p>
        </div>

        <div className="px-4 md:px-6 pb-16 max-w-5xl mx-auto w-full">
          <VerificationDemo />
        </div>

        <div className="py-16 text-center px-4 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-fg-muted)] mb-5 max-w-md mx-auto">
            Wiring this in front of your production flow? That&apos;s the paid pilot — or
            copy the register call and start on the reference API.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href={siteConfig.cta.docs} variant="primary" size="lg">
              Integration guide <ArrowRight size={15} />
            </ButtonLink>
            <ButtonLink
              href={siteConfig.demo.attack}
              variant="secondary"
              size="lg"
            >
              Live attack sim ↗
            </ButtonLink>
          </div>
          <p className="mt-6 text-[12px] text-[var(--color-fg-subtle)]">
            Production integration:{" "}
            <a href={siteConfig.cta.pilot} className="underline underline-offset-2 hover:text-[var(--color-fg-muted)]">
              Book the pilot ({siteConfig.pilot.price})
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
