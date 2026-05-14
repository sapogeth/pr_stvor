import Image from "next/image";

export function Partners() {
  return (
    <section className="py-10 border-y border-[var(--color-border)]">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] shrink-0">
            Trusted by
          </p>
          <div className="h-px w-12 bg-[var(--color-border)] hidden sm:block" />
          <div className="flex flex-col items-center sm:items-start gap-1">
            <a
              href="https://sharpsana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-200 group"
            >
              <Image
                src="/partners/sharpsana.svg"
                alt="Sharpsana"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="text-sm font-semibold text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">
                Sharpsana
              </span>
            </a>
            <p className="text-[11px] text-[var(--color-fg-subtle)] max-w-xs text-center sm:text-left">
              Uses Stvor to secure agent-to-agent communication in their DeFi pipeline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
