import { FileText, Award } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

const signals = [
  {
    icon: FileText,
    title: "IACR ePrint published",
    body: "Hybrid X3DH protocol formalization on the Cryptology ePrint Archive.",
  },
  {
    icon: GithubIcon,
    title: "Apache 2.0 — open source",
    body: "Core SDK, contracts, and reference relays are public from day one.",
    href: siteConfig.social.github,
  },
  {
    icon: Award,
    title: "NIST FIPS 203/204 algorithms",
    body: "ML-KEM-768 (FIPS 203) and ML-DSA-65 (FIPS 204) primitives, vendored from audited upstream libraries. CMVP/CAVP validation is on the security roadmap.",
  },
];

export function TrustSignals() {
  return (
    <Section
      eyebrow="Trusted foundations"
      title="Built on standards, in the open"
      description="Stvor is in early access. We build with researchers, not against them — every primitive is publicly verifiable."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {signals.map(({ icon: Icon, title, body, href }) => {
          const content = (
            <Card className="h-full flex flex-col">
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-[var(--color-fg)]/5 text-[var(--color-fg)]">
                <Icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                {body}
              </p>
            </Card>
          );
          return href ? (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="contents"
            >
              {content}
            </a>
          ) : (
            <div key={title}>{content}</div>
          );
        })}
      </div>
    </Section>
  );
}
