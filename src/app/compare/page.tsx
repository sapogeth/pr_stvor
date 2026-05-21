import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Comparison } from "@/components/sections/comparison";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare — Stvor vs XMTP vs Microsoft Agent Mesh",
  description:
    "How Stvor compares to XMTP, Microsoft Agent Mesh, and building in-house. Post-quantum security, AA wallet binding, self-hosted option.",
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-fg)] mb-4">
            Stvor vs the alternatives
          </h1>
          <p className="text-[var(--color-fg-muted)] max-w-2xl mx-auto text-base">
            For teams who are already evaluating options. If you're not sure you need
            a dedicated cryptographic identity layer yet —{" "}
            <a href="/" className="text-[var(--color-brand)] underline underline-offset-2">start here</a>.
          </p>
        </div>
        <Comparison />
        <div className="mt-10 text-center">
          <ButtonLink href={siteConfig.cta.demo} variant="primary" size="lg">
            Book a 15-min audit call <ArrowRight size={15} />
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
