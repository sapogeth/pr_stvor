import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/legal-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="2026-05-09">
      <p>
        These Terms of Service ("Terms") govern your access to and use of Stvor's website,
        SDK, hosted registry, and related services (the "Services"). By using the
        Services, you agree to these Terms.
      </p>

      <h2>1. The Services</h2>
      <p>
        Stvor provides cryptographic infrastructure for autonomous AI agents and
        account-abstraction wallets. The open-source SDK is licensed under Apache 2.0; the
        hosted registry is offered under separate commercial terms reflected in your
        subscription tier.
      </p>

      <h2>2. Early access</h2>
      <p>
        Stvor is in early access. The Services may change materially as we incorporate
        feedback from design partners. We will give reasonable notice of breaking changes
        through the changelog and direct customer communication.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        You agree not to use the Services to facilitate unlawful activity, to bypass
        security mechanisms, or to interfere with other customers' use of the Services.
      </p>

      <h2>4. Liability</h2>
      <p>
        The Services are provided on an "as is" basis. To the maximum extent permitted by
        law, Stvor disclaims all warranties and limits liability to fees paid in the prior
        twelve months. Specific terms for Enterprise customers are negotiated separately.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${siteConfig.emails.founder}`}>
          {siteConfig.emails.founder}
        </a>
        .
      </p>

      <h2>6. Updates</h2>
      <p>
        We may update these Terms as the Services evolve. Material changes will be
        communicated to active customers via email at least 14 days before they take
        effect.
      </p>
    </LegalShell>
  );
}
