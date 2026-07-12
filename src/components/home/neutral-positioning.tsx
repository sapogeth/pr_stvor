"use client";

import { motion } from "framer-motion";

export function NeutralPositioning() {
  return (
    <section className="section-y border-t border-[var(--color-border)]" id="why-neutral">
      <div className="container-page">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium font-mono">
            Why custody-agnostic
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[var(--color-fg)] mb-5">
            A trust layer has to be neutral to be trusted.
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Stripe did not become HTTPS. Cloudflare did not replace TLS. They sit on top
            of a neutral primitive and add value without owning the pipe. Stvor is the same
            shape: verification middleware that works whether you custody with Fireblocks,
            run your own hot wallet, or settle through Stripe manual-capture.
          </p>
          <p className="mt-4 text-[14px] text-[var(--color-fg-subtle)] leading-relaxed">
            If the verifier only works inside one vendor&apos;s stack, every other stack
            treats it as that vendor&apos;s feature — not infrastructure. Neutrality is the
            moat. The Trust Receipt (ATS-1) is the portable proof that outlives any single
            integration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
