import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/legal-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "License",
  alternates: { canonical: "/legal/license" },
};

export default function LicensePage() {
  return (
    <LegalShell title="License" updated="2026-07-17">
      <p>
        The Stvor reference packages <code className="font-mono text-sm">@stvor/core</code> and{" "}
        <code className="font-mono text-sm">@stvor/client</code> are released under the{" "}
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT License
        </a>
        . You can use, modify, and redistribute the code, including in commercial products,
        subject to the conditions of the license.
      </p>

      <h2>Commercial Services</h2>
      <p>
        Hosted API keys, pilot integrations, support agreements, and SLAs are commercial offerings
        and are not included in the MIT grant. They are governed by your agreement with Stvor.
      </p>

      <h2>Trademark</h2>
      <p>
        &quot;Stvor&quot; and the Stvor logo are trademarks of the Stvor project. The MIT license
        does not grant trademark rights — please contact us before using the name or logo for
        derivative or distribution-related purposes.
      </p>

      <h2>Contributing</h2>
      <p>
        Contributions are welcome. By submitting a pull request you agree to license your
        contribution under MIT. For non-trivial changes, please open an issue first.
      </p>

      <h2>Contact</h2>
      <p>
        Licensing questions:{" "}
        <a href={`mailto:${siteConfig.emails.founder}`}>
          {siteConfig.emails.founder}
        </a>
      </p>
    </LegalShell>
  );
}
