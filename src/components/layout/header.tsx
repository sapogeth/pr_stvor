"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig, navItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// ── Icons ─────────────────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// ── Mobile menu animation variants ────────────────────────────────────────────

const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.32, 1];

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.18, ease: EASE_IN },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.28,
      ease: EASE_OUT,
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: "blur(3px)",
    transition: { duration: 0.18, ease: EASE_IN },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: EASE_OUT } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track active section for nav indicator
  useEffect(() => {
    const anchors = navItems
      .map((i) => i.href.replace("#", ""))
      .filter(Boolean);

    const elements = anchors
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const isActive = (href: string) => {
    if (!href.startsWith("#")) return false;
    return activeSection === href.replace("#", "");
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50",
        "transition-[border-color,background-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/88 backdrop-blur-[20px]"
          : "border-b border-transparent"
      )}
    >
      <div className="container-page flex h-[60px] items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-[var(--color-fg)] shrink-0"
          aria-label={`${siteConfig.name} home`}
        >
          <Logo />
          <span className="text-[15px] font-semibold">{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const isExternal = item.href.startsWith("http");
            const className = cn(
              "relative px-3.5 py-2 text-[13px] rounded-md font-medium",
              "transition-colors duration-200",
              active
                ? "text-[var(--color-fg)]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            );
            const inner = (
              <>
                {active && !isExternal && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-[var(--color-bg-elevated)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </>
            );
            return isExternal ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Social icons */}
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1.5 text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] rounded-md transition-colors"
          >
            <GithubIcon />
          </a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="p-1.5 text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] rounded-md transition-colors"
          >
            <TwitterIcon />
          </a>

          {/* Separator */}
          <div className="w-px h-4 bg-[var(--color-border-strong)] mx-0.5" />

          {/* CTA */}
          <motion.a
            href="#try-now"
            className="px-4 py-1.5 text-[13px] font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] rounded-[6px]"
            whileHover={{ scale: 1.03, opacity: 0.92 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            Try API
          </motion.a>
        </div>

        {/* Mobile burger */}
        <motion.button
          className="md:hidden text-[var(--color-fg)] p-2 -mr-2 rounded-md"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/96 backdrop-blur-[20px]"
          >
            <div className="container-page py-5 flex flex-col gap-1">
              {navItems.map((item) => {
                const isExternal = item.href.startsWith("http");
                return (
                  <motion.div key={item.href} variants={mobileItemVariants}>
                    {isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="block px-2 py-2.5 text-sm rounded-md text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block px-2 py-2.5 text-sm rounded-md transition-colors",
                          isActive(item.href)
                            ? "text-[var(--color-fg)] bg-[var(--color-bg-elevated)]"
                            : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Social row */}
              <motion.div
                variants={mobileItemVariants}
                className="flex items-center gap-4 px-2 pt-2 pb-1 mt-1 border-t border-[var(--color-border)]"
              >
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <GithubIcon />
                </a>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] transition-colors"
                >
                  <TwitterIcon />
                </a>
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={mobileItemVariants} className="mt-1 flex flex-col gap-2">
                <a
                  href="#try-now"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-2.5 text-sm font-semibold bg-[var(--color-fg)] text-[var(--color-bg)] rounded-[6px]"
                >
                  Run API curl →
                </a>
                <a
                  href={siteConfig.demo.local}
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-2.5 text-sm border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] rounded-[6px]"
                >
                  Interactive demo
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <rect width="64" height="64" rx="14" fill="currentColor" opacity="0.09" />
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
