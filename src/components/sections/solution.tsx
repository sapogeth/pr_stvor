import { Section } from "@/components/ui/section";
import { CodeBlock } from "@/components/ui/code-block";
import { solutionBlocks } from "@/data/solution";

export function Solution() {
  return (
    <Section
      id="solution"
      eyebrow="The solution"
      title="What Stvor provides"
      description="Four primitives. Real code. Drop-in for any agent framework or AA wallet stack."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {solutionBlocks.map((block) => (
          <article
            key={block.title}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden flex flex-col"
          >
            <div className="p-6 md:p-7 border-b border-[var(--color-border)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)] mb-2">
                {block.eyebrow}
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
                {block.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {block.body}
              </p>
            </div>
            <div className="p-4 md:p-5 bg-[var(--color-bg-subtle)] flex-1">
              <CodeBlock code={block.code} language={block.language} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
