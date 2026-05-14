import { ArrowRight, Calendar, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-44 pb-20 md:pb-28">
      <div
        aria-hidden="true"
        className="subtle-grid absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent_70%)]"
      />

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="brand" className="mb-6">
            <span className="size-1.5 rounded-full bg-[var(--color-brand)]" />
            Apache 2.0 · NIST FIPS 203/204 algorithms
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text text-balance">
            Your AI agents act with users' authority. Can you prove it?
          </h1>

          <p className="mt-6 text-lg md:text-xl text-[var(--color-fg-muted)] text-pretty max-w-2xl mx-auto">
            Stvor gives every agent a cryptographic identity and a tamper-proof audit trail.{" "}
            <span className="text-[var(--color-fg)]">Drops in under a day.</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <ButtonLink href={siteConfig.cta.quickstart} variant="primary" size="lg">
              Get Started Free <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/demo" variant="secondary" size="lg">
              <Play size={16} /> Try it live
            </ButtonLink>
            <ButtonLink href={siteConfig.cta.demo} variant="ghost" size="lg">
              <Calendar size={16} /> Book a demo
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[var(--color-fg-subtle)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[var(--color-accent)]" /> No vendor lock-in
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[var(--color-accent)]" /> Drops in under a day
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[var(--color-accent)]" /> Audit-ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
