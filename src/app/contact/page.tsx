import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the team behind Stvor. Demos, integration questions, enterprise pilots, and security disclosures.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Section
          eyebrow="Contact"
          title="Get in touch"
          description="Tell us what you're building and we'll route you to the right person — typically the founder for the first conversation."
        >
          <div className="mx-auto max-w-2xl">
            <ContactForm />
            <div className="mt-8 rounded-lg border border-[var(--color-border)] p-4 text-sm text-[var(--color-fg-muted)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-fg)] mb-1">
                Direct email
              </p>
              <a
                className="hover:text-[var(--color-fg)]"
                href={`mailto:${siteConfig.emails.founder}`}
              >
                {siteConfig.emails.founder}
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
