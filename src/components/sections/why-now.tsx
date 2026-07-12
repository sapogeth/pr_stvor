import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

const threats = [
  {
    tag: "EU AI Act — in force",
    color: "#f87171",
    headline: "Regulators now require cryptographic proof of agent authorization",
    body: "The EU AI Act mandates traceable, auditable AI decision chains for high-risk systems. No cryptographic audit trail = non-compliance. Enforcement begins 2026. Fines up to €35M or 7% of global turnover.",
    urgency: "Deadline: now",
  },
  {
    tag: "Harvest Now, Decrypt Later",
    color: "#f59e0b",
    headline: "Today's agent traffic is already being harvested",
    body: "Nation-state actors collect encrypted traffic now and decrypt later, once quantum computers are available. The 3–8 year window closes faster than most teams expect. Data classified today becomes public tomorrow.",
    urgency: "Window: 3–8 years",
  },
  {
    tag: "Market timing",
    color: "#60a5fa",
    headline: "Competitors are shipping agent SDKs without security",
    body: "BNB Chain, Solana, and a dozen Layer-2s just launched agent infrastructure with no identity layer or audit trail. The team that ships secure-by-default agent infrastructure first owns the enterprise market.",
    urgency: "First-mover window: open",
  },
];

export function WhyNow() {
  return (
    <Section
      eyebrow="Why now"
      title="The fire has already started"
      description="Three forces converging simultaneously. Your competitors are not ready. Neither are you — yet."
    >
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {threats.map((t) => (
          <div
            key={t.tag}
            className="rounded-2xl border overflow-hidden flex flex-col"
            style={{ borderColor: `${t.color}25`, background: `${t.color}06` }}
          >
            {/* header */}
            <div
              className="px-5 py-3 border-b flex items-center justify-between"
              style={{ borderColor: `${t.color}18` }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: t.color }}
              >
                {t.tag}
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${t.color}18`, color: t.color }}
              >
                {t.urgency}
              </span>
            </div>
            {/* body */}
            <div className="px-5 py-5 flex flex-col flex-1">
              <p className="text-[13.5px] font-semibold text-[var(--color-fg)] leading-snug mb-2.5">
                {t.headline}
              </p>
              <p className="text-[12.5px] text-[var(--color-fg-muted)] leading-relaxed flex-1">
                {t.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* bottom callout */}
      <div className="rounded-2xl border border-[var(--color-brand)]/25 bg-[var(--color-brand)]/5 px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
        <div>
          <p className="text-base font-semibold text-[var(--color-fg)] mb-1">
            This is not a future problem. It's a present liability.
          </p>
          <p className="text-sm text-[var(--color-fg-muted)]">
            Book a 15-minute call. We'll show you exactly where your agent stack is exposed — for free.
          </p>
        </div>
        <a
          href={siteConfig.cta.pilot}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Book audit call <ArrowRight size={14} />
        </a>
      </div>
    </Section>
  );
}
