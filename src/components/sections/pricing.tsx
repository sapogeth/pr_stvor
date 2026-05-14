"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { pricingTiers, pricingFAQ } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Simple, transparent pricing"
      description="Start free with the open-source core. Pay only when you need a managed registry, audit logs, or SLAs."
    >
      <div className="flex justify-center mb-10">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-1"
        >
          <button
            role="tab"
            aria-selected={!annual}
            onClick={() => setAnnual(false)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              !annual
                ? "bg-[var(--color-brand)] text-[var(--color-brand-fg)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            )}
          >
            Monthly
          </button>
          <button
            role="tab"
            aria-selected={annual}
            onClick={() => setAnnual(true)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1.5",
              annual
                ? "bg-[var(--color-brand)] text-[var(--color-brand-fg)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            )}
          >
            Annual{" "}
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider rounded px-1.5 py-0.5",
                annual
                  ? "bg-[var(--color-brand-fg)]/20"
                  : "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
              )}
            >
              −16%
            </span>
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier) => {
          const price = annual ? tier.annual : tier.monthly;
          const periodLabel = annual ? "/year" : "/month";
          return (
            <article
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-xl border p-7",
                tier.highlight
                  ? "border-[var(--color-brand)]/60 bg-[var(--color-bg-elevated)] shadow-[0_8px_40px_-12px_rgba(99,102,241,0.45)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
              )}
            >
              {tier.highlight && (
                <Badge
                  variant="brand"
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <Sparkles size={12} /> Most popular
                </Badge>
              )}

              <header className="mb-6">
                <h3 className="text-base font-semibold text-[var(--color-fg)] tracking-tight">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  {tier.tagline}
                </p>
              </header>

              <div className="mb-6">
                {price === null ? (
                  <p className="text-3xl font-bold text-[var(--color-fg)] tracking-tight">
                    {tier.customLabel}
                  </p>
                ) : (
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-3xl md:text-4xl font-bold text-[var(--color-fg)] tracking-tight">
                      {tier.pricePrefix}
                      {price.toLocaleString("en-US")}
                    </span>
                    {price > 0 && (
                      <span className="text-sm text-[var(--color-fg-muted)]">
                        {periodLabel}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <ul className="mb-7 space-y-2.5 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-[var(--color-fg-muted)]"
                  >
                    <Check
                      size={16}
                      className="shrink-0 mt-0.5 text-[var(--color-accent)]"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={tier.cta.href}
                variant={tier.highlight ? "primary" : "secondary"}
                size="md"
                className="w-full"
              >
                {tier.cta.label}
              </ButtonLink>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-[var(--color-fg-subtle)] text-center max-w-2xl mx-auto">
        Early access — book a 20-min call and we'll set you up same day.
        Self-serve checkout is planned for later in 2026.
      </p>

      <div className="mt-16 mx-auto max-w-2xl">
        <h3 className="text-xl font-semibold text-[var(--color-fg)] mb-6 text-center tracking-tight">
          Frequently asked
        </h3>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] divide-y divide-[var(--color-border)]">
          {pricingFAQ.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-medium text-[var(--color-fg)]">
                {item.q}
                <span className="ml-4 text-[var(--color-fg-muted)] transition-transform group-open:rotate-45 text-lg leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-fg-muted)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
