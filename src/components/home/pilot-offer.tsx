"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function PilotOffer() {
  return (
    <section className="section-y" id="pilot">
      <div className="container-page">
        <motion.div
          className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium font-mono">
            {siteConfig.pilot.headline}
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[var(--color-fg)] mb-3 max-w-2xl">
            Already tried the demo? Wire it in production.
          </h2>

          <p className="text-[15px] text-[var(--color-fg-subtle)] mb-5 max-w-2xl">
            {siteConfig.pilot.price} flat · {siteConfig.pilot.duration}
          </p>

          <p className="text-[15px] text-[var(--color-fg-muted)] leading-[1.75] max-w-2xl mb-8">
            {siteConfig.pilot.summary}
          </p>

          <ul className="space-y-3 mb-10 max-w-xl">
            {[
              "Checkpoint wired in front of your live execution flow",
              "Destination + payload + trust + policy checks on every action",
              "Signed Trust Receipt (ATS-1) after each ALLOW",
              "I do the integration — you bring the agent and the rail",
              "Works at end of pilot, or you pay nothing further",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[13px] text-[var(--color-fg-muted)]">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--color-accent)" }}
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={siteConfig.cta.pilot}
              className="inline-flex items-center justify-center px-7 py-3 bg-[var(--color-fg)] text-[var(--color-bg)] text-sm font-semibold rounded-[6px] hover:opacity-90 transition-opacity"
            >
              Book the pilot
            </a>
            <a
              href={siteConfig.cta.pilotTally}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 border border-[var(--color-border-strong)] text-sm text-[var(--color-fg-muted)] rounded-[6px] hover:text-[var(--color-fg)] transition-colors"
            >
              Or use the form →
            </a>
          </div>

          <p className="mt-6 text-[12px] text-[var(--color-fg-subtle)]">
            Technical crowd:{" "}
            <a href={siteConfig.cta.ats1} className="underline underline-offset-2 hover:text-[var(--color-fg-muted)]">
              ATS-1 spec
            </a>
            {" · "}
            <a
              href={siteConfig.cta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[var(--color-fg-muted)]"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
