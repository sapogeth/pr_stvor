import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/legal-shell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "License",
  alternates: { canonical: "/legal/license" },
};

export default function LicensePage() {
  return (
    <LegalShell title="License" updated="2026-05-09">
      <p>
        The Stvor SDK, smart contracts, and reference relays are released under the{" "}
        <a
          href="https://www.apache.org/licenses/LICENSE-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apache License 2.0
        </a>
        . This means you can use, modify, and redistribute the code, including in
        commercial products, subject to the conditions of the license.
      </p>

      <h2>Commercial Services</h2>
      <p>
        The hosted registry, audit log retention, support agreements, and SLAs are
        commercial offerings and are not included in the Apache 2.0 grant. They are
        governed by your subscription agreement.
      </p>

      <h2>Trademark</h2>
      <p>
        "Stvor" and the Stvor logo are trademarks of the Stvor project. The Apache 2.0
        license does not grant trademark rights — please contact us before using the name
        or logo for derivative or distribution-related purposes.
      </p>

      <h2>Contributing</h2>
      <p>
        Contributions are welcome. By submitting a pull request you agree to license your
        contribution under Apache 2.0. For non-trivial changes, please open an issue
        first.
      </p>

      <h2>Contact</h2>
      <p>
        Licensing questions:{" "}
        <a href={`mailto:${siteConfig.emails.founder}`}>
          {siteConfig.emails.founder}
        </a>
        .
      </p>
    </LegalShell>
  );
}
