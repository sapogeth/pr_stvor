"use client";

import { motion } from "framer-motion";
import { TrustReceipt } from "./trust-receipt";
import { siteConfig } from "@/lib/site-config";

const SPRING = { type: "spring", stiffness: 60, damping: 20, mass: 1 } as const;
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

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 72% 50%, rgba(16,185,129,0.045) 0%, transparent 68%)",
        }}
      />

      <div className="container-page w-full py-14 lg:py-18">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            className="flex-1 min-w-0 text-center lg:text-left"
            variants={{ hidden: {}, show: {} }}
            initial="hidden"
            animate="show"
            transition={STAGGER}
          >
            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4 font-medium"
            >
              For agents that move real money
            </motion.p>

            <motion.h1
              variants={ITEM_VARIANTS}
              className="text-[2.1rem] md:text-[3rem] lg:text-[3.4rem] font-semibold tracking-[-0.035em] leading-[1.08] text-[var(--color-fg)] mb-5"
            >
              Wrong address?
              <br />
              <span className="text-[var(--color-fg-muted)] font-normal">
                Stvor blocks the payment before it goes out.
              </span>
            </motion.h1>

            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[16px] text-[var(--color-fg-muted)] leading-[1.65] mb-3 max-w-[540px] mx-auto lg:mx-0"
            >
              Your AI agent commits to pay vendor A. Something swaps the destination
              to address B. Stvor catches the mismatch{" "}
              <span className="text-[var(--color-fg)]">before any funds move</span> and
              leaves a signed receipt you can show an auditor.
            </motion.p>

            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[13px] text-[var(--color-fg-subtle)] leading-relaxed mb-8 max-w-[540px] mx-auto lg:mx-0"
            >
              Monitoring tells you after. After is irreversible.
            </motion.p>

            <motion.div
              variants={ITEM_VARIANTS}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-3"
            >
              <a
                href={siteConfig.demo.attack}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-semibold rounded-[6px] hover:opacity-90 transition-opacity"
              >
                Watch $1.5B attack get blocked →
              </a>
              <a
                href={siteConfig.demo.local}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-[var(--color-border-strong)] text-sm text-[var(--color-fg-muted)] rounded-[6px] hover:text-[var(--color-fg)] hover:border-[rgba(255,255,255,0.2)] transition-all"
              >
                Try interactive demo
              </a>
            </motion.div>

            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[11px] text-[var(--color-fg-subtle)] mb-8"
            >
              No signup · No email · ~30 seconds
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { delay: 0.35, duration: 0.5 } },
              }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[12px]"
            >
              <a
                href={siteConfig.cta.docs}
                className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] underline underline-offset-2"
              >
                Docs
              </a>
              <a
                href={siteConfig.cta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] underline underline-offset-2"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING, delay: 0.15 }}
          >
            <TrustReceipt variant="hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
