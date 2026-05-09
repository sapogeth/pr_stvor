import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand)] text-[var(--color-brand-fg)] hover:bg-[var(--color-brand-hover)] hover:-translate-y-px shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_8px_24px_-8px_rgba(99,102,241,0.5)]",
        secondary:
          "bg-[var(--color-bg-elevated)] text-[var(--color-fg)] border border-[var(--color-border-strong)] hover:border-[var(--color-fg-muted)] hover:-translate-y-px",
        ghost:
          "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
        outline:
          "border border-[var(--color-border-strong)] text-[var(--color-fg)] hover:bg-[var(--color-bg-elevated)]",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  children: ReactNode;
};

type ButtonLinkProps = AnchorProps & VariantProps<typeof buttonVariants>;

export function ButtonLink({
  href,
  className,
  variant,
  size,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...(rest as Omit<AnchorProps, "href">)}
    >
      {children}
    </Link>
  );
}

export { buttonVariants };
