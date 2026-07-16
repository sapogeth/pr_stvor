import Link from "next/link";
import { GithubIcon, XLogoIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Who it's for", href: "#who-its-for" },
      { label: "Compare", href: "#compare" },
      { label: "Demo", href: "/demo" },
      { label: "Attack sim ↗", href: "https://nous.stvor.xyz/attack", external: true },
      { label: "ATS-1 spec", href: "/docs/ats-1" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "ATS-1 spec", href: "/docs/ats-1" },
      { label: "Integration guide", href: "/docs/integrate" },
      { label: "Research", href: "/research" },
      { label: "Security", href: "/security" },
      { label: "GitHub", href: siteConfig.social.github, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Telegram", href: siteConfig.contact.telegram, external: true },
      { label: "Twitter", href: siteConfig.social.twitter, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "License (MIT)", href: "/legal/license" },
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
            <p className="mt-3 text-sm text-[var(--color-fg-muted)] max-w-[220px] leading-relaxed">
              Catch wrong-agent payments before they execute.
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
                  const isMailto = link.href.startsWith("mailto:");
                  return (
                    <li key={link.label}>
                      {isExternal || isMailto ? (
                        <a
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
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
            © {new Date().getFullYear()} {siteConfig.name}. MIT licensed reference code.
          </p>
          <p className="text-xs text-[var(--color-fg-subtle)]">
            Telegram:{" "}
            <a
              className="hover:text-[var(--color-fg)]"
              href={siteConfig.contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.contact.handle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
