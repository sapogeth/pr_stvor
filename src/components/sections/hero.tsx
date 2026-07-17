import { ArrowRight, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28">
      <div aria-hidden="true" className="subtle-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-[700px] w-[1000px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.14) 0%, rgba(16,185,129,0.05) 60%, transparent 100%)",
        }}
      />

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-1.5 mb-8">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
              MIT · ES256 signed receipts
            </span>
          </div>

          {/* headline */}
          <h1 className="text-4xl md:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-balance mb-6">
            <span className="gradient-text">
              When your AI agent makes a $4,000 mistake, can you show the auditor
              cryptographic proof of who authorized it?
            </span>
          </h1>

          {/* sub */}
          <p className="text-lg md:text-xl text-[var(--color-fg-muted)] leading-relaxed max-w-2xl mx-auto mb-3">
            If not, you're not compliant.{" "}
            <span className="text-[var(--color-fg)] font-medium">We fix that in under a day.</span>
          </p>
          <p className="text-sm text-[var(--color-fg-subtle)] mb-10">
            For teams building AI agents that touch money, data, or regulated decisions.
          </p>

          {/* primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href={siteConfig.cta.pilot} variant="primary" size="lg" className="px-8">
              Get an Agent Security Audit in 15 Minutes <ArrowRight size={16} />
            </ButtonLink>
          </div>

          {/* secondary links */}
          <p className="mt-5 text-sm text-[var(--color-fg-subtle)]">
            Prefer to explore?{" "}
            <a href={siteConfig.cta.docs} className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] underline underline-offset-2 transition-colors">
              Read the docs
            </a>
            {" "}or{" "}
            <a href="/demo" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] underline underline-offset-2 transition-colors inline-flex items-center gap-1">
              <Play size={11} /> try the live demo
            </a>
            {" "}or{" "}
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] underline underline-offset-2 transition-colors">
              star us on GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
