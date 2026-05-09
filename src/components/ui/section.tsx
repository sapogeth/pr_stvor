import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = "center",
}: SectionProps) {
  return (
    <section id={id} className={cn("section-y relative", className)}>
      <div className="container-page">
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mx-auto max-w-3xl mb-12 md:mb-16",
              align === "left" ? "ml-0 mr-auto text-left" : "text-center"
            )}
          >
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)] mb-4">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance gradient-text">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-lg text-[var(--color-fg-muted)] text-pretty">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
