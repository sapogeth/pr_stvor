import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { useCases } from "@/data/use-cases";
import { siteConfig } from "@/lib/site-config";

export function UseCases() {
  return (
    <Section
      id="use-cases"
      eyebrow="Built for"
      title="Who uses Stvor"
      description="Four primary audiences. One vendor-neutral SDK that ships in under a day."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {useCases.map(({ icon: Icon, audience, pitch, bullets }) => (
          <Card key={audience} className="flex flex-col">
            <div className="flex items-start gap-4 mb-5">
              <div className="shrink-0 inline-flex size-11 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-fg)] tracking-tight">
                  {audience}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{pitch}</p>
              </div>
            </div>
            <ul className="space-y-2.5 mb-5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm text-[var(--color-fg-muted)]"
                >
                  <Check
                    size={16}
                    className="shrink-0 mt-0.5 text-[var(--color-accent)]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.cta.docs}
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors"
            >
              Learn more <ArrowRight size={14} />
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
}
