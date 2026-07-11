"use client";

import { motion } from "framer-motion";
import { TrustReceipt } from "./trust-receipt";
import { siteConfig } from "@/lib/site-config";

// Shared spring: high damping, low stiffness — feels physical, never bouncy
const SPRING = { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const;

// Staggered entrance for children — each shifts 60ms later
const STAGGER = { staggerChildren: 0.06, delayChildren: 0.08 };

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...SPRING, duration: 0.9 },
  },
} as const;

const TRUST_SIGNALS = [
  "Trust Receipt — open standard",
  "No payload data leaves your infra",
  "Apache 2.0 open source",
  "<2ms verification",
];

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Directional glow */}
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
          <motion.div
            className="flex-1 min-w-0 text-center lg:text-left"
            variants={{ hidden: {}, show: {} }}
            initial="hidden"
            animate="show"
            transition={STAGGER}
          >
            {/* Category label */}
            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-5 font-medium"
            >
              Execution Trust Layer
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={ITEM_VARIANTS}
              className="text-[2.6rem] md:text-[3.5rem] lg:text-[4rem] font-semibold tracking-[-0.035em] leading-[1.06] text-[var(--color-fg)] mb-6"
            >
              Every execution
              <br />
              <span className="text-[var(--color-fg-muted)] font-normal">
                produces signed proof.
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[15px] text-[var(--color-fg-muted)] leading-[1.7] mb-9 max-w-[480px] mx-auto lg:mx-0"
            >
              Stvor is pre-execution verification for AI agents and payment systems.
              Every operation is anchored to a cryptographic commitment before it runs —
              and produces a{" "}
              <span className="text-[var(--color-fg)]">
                Trust Receipt
              </span>
              {": "}
              a signed, offline-verifiable record of what was verified and why it was allowed.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ITEM_VARIANTS}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10"
            >
              <motion.a
                href={siteConfig.cta.demo}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-semibold rounded-[6px]"
                whileHover={{ scale: 1.025, opacity: 0.92 }}
                whileTap={{ scale: 0.975 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Book a demo
              </motion.a>
              <motion.a
                href={siteConfig.cta.enterprise}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-[var(--color-border-strong)] text-sm text-[var(--color-fg-muted)] rounded-[6px]"
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "var(--color-fg)",
                }}
                whileTap={{ scale: 0.975 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Talk to our team
              </motion.a>
            </motion.div>

            {/* Trust micro-signals */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.7, ease: "easeOut" },
                },
              }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5"
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
          </motion.div>

          {/* ── Right: Trust Receipt ── */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ ...SPRING, delay: 0.22, duration: 1.1 }}
          >
            <TrustReceipt variant="hero" />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-fg-subtle)]">
          See how it works
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: [0.45, 0, 0.55, 1] }}
          className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-fg-subtle)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
