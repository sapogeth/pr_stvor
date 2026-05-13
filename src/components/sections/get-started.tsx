import { Terminal, Calendar, BookOpen, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { CodeBlock } from "@/components/ui/code-block";
import { siteConfig } from "@/lib/site-config";

export function GetStarted() {
  return (
    <Section
      id="get-started"
      eyebrow="Get started"
      title="Start in under 5 minutes"
      description="Three paths in. Pick whichever fits your team's workflow."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 flex flex-col">
          <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <Terminal size={20} />
          </div>
          <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
            Try the SDK
          </h3>
          <p className="text-sm text-[var(--color-fg-muted)] mb-4">
            Install the open-source SDK and run the quickstart sample.
          </p>
          <CodeBlock
            code={`npm install @stvor/web3`}
            language="bash"
            className="mb-5"
          />
          <a
            href={siteConfig.cta.quickstart}
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            Quickstart guide <ArrowRight size={14} />
          </a>
        </article>

        <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 flex flex-col">
          <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <Calendar size={20} />
          </div>
          <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
            Book a demo
          </h3>
          <p className="text-sm text-[var(--color-fg-muted)] mb-5">
            20-minute walkthrough with the founder. We'll cover your architecture and
            integration points.
          </p>
          <a
            href={siteConfig.cta.demo}
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            Email founder <ArrowRight size={14} />
          </a>
        </article>

        <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 flex flex-col">
          <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <BookOpen size={20} />
          </div>
          <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
            Read the docs
          </h3>
          <p className="text-sm text-[var(--color-fg-muted)] mb-5">
            Full API reference, architecture overview, and integration guides for
            ERC-4337 and TON.
          </p>
          <a
            href={siteConfig.cta.docs}
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            View docs <ArrowRight size={14} />
          </a>
        </article>
      </div>
    </Section>
  );
}
