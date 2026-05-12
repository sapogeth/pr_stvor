import Image from "next/image";

const partners = [
  {
    name: "Sharpsana",
    href: "https://sharpsana.com",
    logo: "/partners/sharpsana.svg",
    width: 36,
    height: 36,
  },
];

export function Partners() {
  return (
    <section className="py-10 border-y border-[var(--color-border)]">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] shrink-0">
            Trusted partner
          </p>
          <div className="h-px w-12 bg-[var(--color-border)] hidden sm:block" />
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-200 group"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="rounded-lg"
              />
              <span className="text-sm font-semibold text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">
                {p.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
