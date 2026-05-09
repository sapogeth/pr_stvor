"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig, navItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight text-[var(--color-fg)]"
          aria-label={`${siteConfig.name} home`}
        >
          <Logo />
          <span className="text-base">{siteConfig.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ButtonLink href={siteConfig.cta.demo} variant="ghost" size="sm">
            Book a demo
          </ButtonLink>
          <ButtonLink href="#pricing" variant="primary" size="sm">
            Get started
          </ButtonLink>
        </div>

        <button
          className="md:hidden text-[var(--color-fg)] p-2 -mr-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl">
          <div className="container-page py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-[var(--color-border)]">
              <ButtonLink href={siteConfig.cta.demo} variant="secondary" size="md">
                Book a demo
              </ButtonLink>
              <ButtonLink href="#pricing" variant="primary" size="md">
                Get started
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="14" fill="currentColor" opacity="0.08" />
      <text
        x="32"
        y="46"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="44"
        fontWeight="900"
        letterSpacing="-0.04em"
        fill="currentColor"
        textAnchor="middle"
      >
        S
      </text>
    </svg>
  );
}
