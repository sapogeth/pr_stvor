"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { TrustReceipt } from "./trust-receipt";

const PATHS = [
  {
    type: "Enterprise",
    label: "For wallet providers, custodians, and enterprise treasury",
    headline: "Talk to our team.",
    body: "We work directly with enterprise teams to design the right integration. Bring your architecture, your compliance requirements, your existing custody infrastructure. We'll show you where STVOR fits.",
    cta: { label: "Book the pilot", href: siteConfig.cta.pilot },
    ctaSecondary: { label: "View security docs", href: "/security" },
    accent: "var(--color-fg)",
  },
  {
    type: "Developer",
    label: "For AI agent platforms and product engineers",
    headline: "Ship your first verified execution.",
    body: "Drop-in SDK. Works with LangChain, OpenAI Agents, and any MCP-compatible framework. Verification in under 2ms. Trust Receipts from your first execution. No infrastructure changes.",
    cta: { label: "Book the pilot", href: siteConfig.cta.pilot },
    ctaSecondary: { label: "Read the docs", href: siteConfig.cta.docs },
    accent: "var(--color-accent)",
  },
];

const TRUST_SIGNALS = [
  "Apache 2.0 open source",
  "No payload data leaves your infra",
  "NIST FIPS 203/204 algorithms",
  "ES256 signed receipts",
];

export function FinalCTA() {
  return (
    <section className="section-y" id="get-started">
      <div className="container-page">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 22, mass: 1 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.2] text-[var(--color-fg)] mb-4">
            Your operations are already executing.
            <br />
            <span className="text-[var(--color-fg-muted)] font-normal">
              Start verifying them before one executes something irreversible.
            </span>
          </h2>
        </motion.div>

        {/* Two paths */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.type}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-7 flex flex-col"
              initial={{ opacity: 0, y: 24, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", stiffness: 55, damping: 22, mass: 1, delay: i * 0.09 }}
            >
              <div className="mb-6">
                <span
                  className="text-[10px] tracking-[0.16em] uppercase font-medium"
                  style={{ color: path.accent }}
                >
                  {path.type}
                </span>
                <p className="mt-0.5 text-[11px] text-[var(--color-fg-subtle)]">
                  {path.label}
                </p>
              </div>

              <h3 className="text-xl font-semibold text-[var(--color-fg)] tracking-[-0.02em] mb-3">
                {path.headline}
              </h3>
              <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed mb-8 flex-1">
                {path.body}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={path.cta.href}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-[6px] transition-opacity hover:opacity-88"
                  style={{
                    background: i === 0 ? "var(--color-fg)" : "var(--color-accent)",
                    color: "var(--color-bg)",
                  }}
                >
                  {path.cta.label}
                </a>
                <a
                  href={path.ctaSecondary.href}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm rounded-[6px] border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:border-[rgba(255,255,255,0.2)] transition-all"
                >
                  {path.ctaSecondary.label}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Receipt + signals */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-16 border-t border-[var(--color-border)]"
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 55, damping: 22, mass: 1 }}
        >
          {/* Receipt */}
          <div className="flex-shrink-0">
            <TrustReceipt variant="inline" />
          </div>

          {/* Copy + trust signals */}
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-medium">
              Trust Receipt
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.025em] leading-snug text-[var(--color-fg)] mb-3">
              Every execution produces proof.
            </h3>
            <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed mb-8 max-w-sm">
              The Trust Receipt is a cryptographically signed, immutable record of what
              was verified, what was executed, and when. Show it to compliance teams.
              Show it to auditors. Show it to your board. It is self-verifying at{" "}
              <span className="font-mono text-[var(--color-fg-subtle)]">
                receipts.stvor.io
              </span>
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {TRUST_SIGNALS.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--color-accent)", opacity: 0.7 }}
                  />
                  <span className="text-[12px] text-[var(--color-fg-subtle)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
