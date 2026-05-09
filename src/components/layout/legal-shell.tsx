import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { ReactNode } from "react";

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <div className="container-page">
          <article className="mx-auto max-w-3xl">
            <header className="mb-10 pb-6 border-b border-[var(--color-border)]">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-fg)] mb-2">
                {title}
              </h1>
              <p className="text-sm text-[var(--color-fg-subtle)]">
                Effective: {updated}
              </p>
            </header>
            <div className="prose prose-invert space-y-5 text-[var(--color-fg-muted)] leading-relaxed text-[15px] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[var(--color-fg)] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:tracking-tight [&_a]:text-[var(--color-brand)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[var(--color-brand-hover)]">
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
