import Link from "next/link";
import { GithubIcon, XLogoIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#solution" },
      { label: "Pricing", href: "#pricing" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Documentation", href: "/docs" },
      { label: "Roadmap", href: "/security#roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Quickstart", href: "/docs#quickstart" },
      { label: "Compare", href: "#compare" },
      { label: "Research", href: "/research" },
      { label: "Changelog", href: "/docs#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: siteConfig.social.github, external: true },
      { label: "Twitter", href: siteConfig.social.twitter, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "License (Apache 2.0)", href: "/legal/license" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[var(--color-fg)]"
            >
              <span className="text-lg">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-fg-muted)] max-w-[200px]">
              Cryptographic infrastructure for autonomous AI agents.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                aria-label="Twitter"
              >
                <XLogoIcon size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fg)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => {
                  const isExternal = "external" in link && link.external;
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <p className="text-xs text-[var(--color-fg-subtle)]">
            © {new Date().getFullYear()} {siteConfig.name}. Apache 2.0 licensed core.
          </p>
          <p className="text-xs text-[var(--color-fg-subtle)]">
            Contact:{" "}
            <a
              className="hover:text-[var(--color-fg)]"
              href={`mailto:${siteConfig.emails.founder}`}
            >
              {siteConfig.emails.founder}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
