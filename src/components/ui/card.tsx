import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
};

export function Card({ children, className, hoverable = true }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 md:p-7",
        hoverable &&
          "transition-all duration-200 hover:border-[var(--color-border-strong)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "brand" | "accent" | "warn";
  className?: string;
}) {
  const variantClass = {
    default: "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]",
    brand: "border-[var(--color-brand)]/40 bg-[var(--color-brand)]/10 text-[var(--color-brand)]",
    accent:
      "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
    warn: "border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 text-[var(--color-warn)]",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        variantClass,
        className
      )}
    >
      {children}
    </span>
  );
}
