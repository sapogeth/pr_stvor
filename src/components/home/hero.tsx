"use client";

import { motion } from "framer-motion";
import { TrustReceipt } from "./trust-receipt";
import { siteConfig } from "@/lib/site-config";

const TRUST_SIGNALS = [
  "NIST FIPS 203/204",
  "No payload data leaves your infra",
  "Apache 2.0 open source",
  "<2ms verification",
];

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Directional glow toward receipt */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 72% 50%, rgba(16,185,129,0.045) 0%, transparent 68%)",
        }}
      />

      <div className="container-page w-full py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Left: Text ── */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            {/* Category label */}
            <motion.p
              className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-5 font-medium"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Execution Trust Layer
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="text-[2.6rem] md:text-[3.5rem] lg:text-[4rem] font-semibold tracking-[-0.035em] leading-[1.06] text-[var(--color-fg)] mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.32, 1] }}
            >
              Verify before
              <br />
              <span className="text-[var(--color-fg-muted)] font-normal">
                execute. Every time.
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p
              className="text-[15px] text-[var(--color-fg-muted)] leading-[1.7] mb-9 max-w-[480px] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.32, 1] }}
            >
              STVOR sits between your AI agents, wallets, and payment systems —
              and the operations they execute. Every payment, transfer, and
              contract call is verified against a cryptographic commitment before
              it runs.{" "}
              <span className="text-[var(--color-fg-subtle)]">
                Not after. Never after.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
            >
              <a
                href={siteConfig.cta.demo}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-semibold rounded-[6px] hover:opacity-88 transition-opacity"
              >
                Book a demo
              </a>
              <a
                href={siteConfig.cta.enterprise}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-[var(--color-border-strong)] text-sm text-[var(--color-fg-muted)] rounded-[6px] hover:text-[var(--color-fg)] hover:border-[rgba(255,255,255,0.2)] transition-all"
              >
                Talk to our team
              </a>
            </motion.div>

            {/* Trust micro-signals */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              {TRUST_SIGNALS.map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--color-accent)", opacity: 0.6 }}
                  />
                  <span className="text-[11px] text-[var(--color-fg-subtle)]">{item}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Trust Receipt ── */}
          <div className="flex-shrink-0">
            <TrustReceipt variant="hero" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-fg-subtle)]">
          See how it works
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-fg-subtle)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
