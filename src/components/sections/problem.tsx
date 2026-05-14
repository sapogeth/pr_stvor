import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { problemCards } from "@/data/problem";

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title="The agent identity problem"
      description="Today's AI agents act with users' authority but there's no cryptographic proof of it. Every action is a black box — and when something goes wrong, nobody can prove what happened."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {problemCards.map(({ icon: Icon, title, body, sub }) => (
          <Card key={title} className="flex flex-col">
            <div className="mb-5 inline-flex size-10 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
              <Icon size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {body}
            </p>
            {sub && (
              <p className="mt-3 text-sm font-medium text-[var(--color-accent)]">
                → {sub}
              </p>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
