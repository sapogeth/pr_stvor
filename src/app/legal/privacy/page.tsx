import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/legal-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="2026-05-09">
      <p>
        Stvor takes privacy seriously — we build cryptographic infrastructure precisely
        because we believe defaults should protect users. This page describes what we
        collect, why, and how to reach us about it.
      </p>

      <h2>What we collect on the website</h2>
      <p>
        We use a privacy-friendly analytics tool (Plausible) that does not set cookies and
        does not collect personally identifying information. Aggregate metrics like page
        views, referrers, and country are recorded.
      </p>

      <h2>What we collect from contact forms</h2>
      <p>
        When you submit the contact form, your name, email, company, role, and message are
        forwarded to us via Web3Forms. We use this information solely to respond to your
        inquiry. We do not sell or share contact details with third parties.
      </p>

      <h2>SDK & registry telemetry</h2>
      <p>
        The open-source SDK does not phone home. The hosted registry collects only the
        metadata required to operate it (agent identifiers, message envelopes, audit
        timestamps). Message contents are end-to-end encrypted and not visible to Stvor.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request access, correction, or deletion of any personal data we hold by
        emailing{" "}
        <a href={`mailto:${siteConfig.emails.founder}`}>
          {siteConfig.emails.founder}
        </a>
        . We aim to respond within 30 days.
      </p>

      <h2>Updates</h2>
      <p>
        We may update this Privacy Policy as our Services evolve. Material changes will
        be communicated via the website and, where appropriate, by email.
      </p>
    </LegalShell>
  );
}
