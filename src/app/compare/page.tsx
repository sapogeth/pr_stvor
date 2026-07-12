import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Comparison } from "@/components/sections/comparison";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare — Stvor vs Fireblocks, Blockaid, Safe, Hypernative",
  description:
    "How Stvor compares to custody providers, simulation layers, multisig wallets, and monitoring tools. Pre-execution verification is a different category — not a better version of what exists.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <div className="container-page mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">
            Comparison
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mb-4">
            Stvor vs the alternatives
          </h1>
          <p className="text-[var(--color-fg-muted)] max-w-2xl mx-auto text-base leading-relaxed">
            Custody tools, simulation layers, multisig wallets, and monitoring platforms all
            solve important problems. None of them verify execution intent before a
            transaction is broadcast. That's what Stvor does.{" "}
            <a href="/" className="text-[var(--color-accent)] underline underline-offset-2">Start from the home page</a>{" "}
            if you haven't seen how it works.
          </p>
        </div>
        <Comparison />
        <div className="mt-10 text-center">
          <ButtonLink href={siteConfig.cta.pilot} variant="primary" size="lg">
            Book the pilot <ArrowRight size={15} />
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
