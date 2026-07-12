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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 72% 50%, rgba(16,185,129,0.045) 0%, transparent 68%)",
        }}
      />

      <div className="container-page w-full py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          <motion.div
            className="flex-1 min-w-0 text-center lg:text-left"
            variants={{ hidden: {}, show: {} }}
            initial="hidden"
            animate="show"
            transition={STAGGER}
          >
            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-5 font-medium font-mono"
            >
              Pre-execution verification
            </motion.p>

            <motion.h1
              variants={ITEM_VARIANTS}
              className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.6rem] font-semibold tracking-[-0.035em] leading-[1.08] text-[var(--color-fg)] mb-5"
            >
              Your agent executes
              <br />
              <span className="text-[var(--color-fg-muted)] font-normal">
                before it verifies.
              </span>
            </motion.h1>

            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[15px] text-[var(--color-fg-muted)] leading-[1.7] mb-4 max-w-[520px] mx-auto lg:mx-0"
            >
              Stvor sits between intent and execution. Before a payment, transfer, or
              tool call runs, it checks destination, payload hash, counterparty trust,
              and policy. Any mismatch →{" "}
              <span className="text-[var(--color-fg)]">DENIED</span>, no funds move.
              On success → ECDSA P-256 signed Trust Receipt (ATS-1 draft).
            </motion.p>

            <motion.p
              variants={ITEM_VARIANTS}
              className="text-[13px] text-[var(--color-fg-subtle)] leading-relaxed mb-8 max-w-[520px] mx-auto lg:mx-0"
            >
              Monitoring acts after. After is irreversible.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              variants={ITEM_VARIANTS}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-4"
            >
              <a
                href={siteConfig.cta.pilot}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-semibold rounded-[6px] hover:opacity-90 transition-opacity"
              >
                Book the pilot — {siteConfig.pilot.price} / {siteConfig.pilot.duration}
              </a>
              <a
                href={siteConfig.cta.ats1}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-[var(--color-border-strong)] text-sm text-[var(--color-fg-muted)] rounded-[6px] hover:text-[var(--color-fg)] hover:border-[rgba(255,255,255,0.2)] transition-all"
              >
                Read the ATS-1 spec
              </a>
            </motion.div>

            <motion.div
              variants={ITEM_VARIANTS}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href={siteConfig.cta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] transition-colors font-mono"
              >
                GitHub →
              </a>
              <span className="text-[var(--color-border-strong)]">·</span>
              <span className="text-[11px] text-[var(--color-fg-subtle)]">
                Reference impl live (Stripe escrow). Pilot-based onboarding.
              </span>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { delay: 0.4, duration: 0.6 } },
              }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2"
            >
              {[
                "ECDSA P-256 receipts",
                "MIT licensed",
                "Custody-agnostic",
                "Stripe reference (live)",
              ].map((item) => (
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
