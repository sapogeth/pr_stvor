import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { problemCards } from "@/data/problem";

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title="The agent identity problem"
      description="Today's AI agents act with users' authority but have no cryptographic basis for it. AA wallets sign UserOps but can't bind sessions. Quantum migration deadlines are landing now."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {problemCards.map(({ icon: Icon, title, body }) => (
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
          </Card>
        ))}
      </div>
    </Section>
  );
}
