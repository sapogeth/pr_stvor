"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SDK_INSTALL, STVOR_PACKAGES } from "@/lib/contract";
import { VerifierDemo } from "./verifier-demo";

function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative rounded-xl border border-[var(--color-border)] bg-[#0e0e14] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <span className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-fg-subtle)] font-mono">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 text-[11px] text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] transition-colors font-mono"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-[11.5px] leading-[1.75] font-mono text-[var(--color-fg-muted)]">
        {code}
      </pre>
    </div>
  );
}

const TRY_CARDS = [
  {
    title: "Step through commit → verify",
    body: "Pick a scenario: commit intent, tamper payload or destination, watch ALLOW vs signed DENY. Runs in your browser.",
    cta: "Open interactive demo →",
    href: siteConfig.demo.local,
    external: false,
    badge: "Local demo",
  },
  {
    title: "Self-check with test vectors",
    body: "Published fixtures in the core repo — run them against your client before you write a line against the API.",
    cta: "Browse fixtures →",
    href: siteConfig.api.fixtures,
    external: true,
    badge: "fixtures/",
  },
];

export function TryNow() {
  return (
    <section className="section-y pt-4" id="try-now">
      <div className="container-page">
        <motion.div
          className="mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-mono">
            Try it now
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[var(--color-fg)] mb-3">
            Touch it before you email anyone.
          </h2>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">
            Hash the payload yourself, commit with a fresh nonce, verify ALLOW with the same{" "}
            <code className="font-mono text-[12px]">to</code>, then swap{" "}
            <code className="font-mono text-[12px]">to</code> for DENY. Sandbox key below — no
            email required.
          </p>
        </motion.div>

        <VerifierDemo />

        <motion.div
          className="my-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-fg-subtle)] font-mono mb-2">
            Public sandbox key
          </p>
          <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed mb-3">
            Test environment, rate-limited, revocable. Paste into{" "}
            <code className="font-mono text-[12px]">Authorization: Bearer</code> or{" "}
            <code className="font-mono text-[12px]">STVOR_KEY</code>. Production keys still
            require a message to {siteConfig.contact.handle}.
          </p>
          <code className="block text-[12px] font-mono text-[var(--color-fg)] break-all">
            {siteConfig.sandboxApiKey}
          </code>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 my-10">
          {TRY_CARDS.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 flex flex-col hover:border-[var(--color-border-strong)] transition-colors"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="text-[9px] px-2 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-fg-subtle)] font-mono uppercase tracking-wider w-fit mb-4">
                {card.badge}
              </span>
              <h3 className="text-[15px] font-semibold text-[var(--color-fg)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {card.title}
              </h3>
              <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed flex-1 mb-4">
                {card.body}
              </p>
              <span className="text-[13px] font-medium text-[var(--color-fg)]">{card.cta}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <CopyBlock label={`Install ${STVOR_PACKAGES.client}`} code={SDK_INSTALL} />
          <CopyBlock label="POST /commitments" code={siteConfig.commitCurl} />
          <CopyBlock label="POST /verify (same to → ALLOW)" code={siteConfig.verifyAllowCurl} />
          <CopyBlock
            label="POST /verify (swapped to → DENY)"
            code={siteConfig.verifyDenyCurl}
          />
        </motion.div>
      </div>
    </section>
  );
}
