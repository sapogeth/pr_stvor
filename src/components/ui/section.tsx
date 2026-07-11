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
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 font-mono">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl md:text-4xl font-semibold tracking-[-0.025em] text-[var(--color-fg)] text-balance leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-[15px] text-[var(--color-fg-muted)] leading-[1.7] text-pretty max-w-2xl mx-auto">
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
