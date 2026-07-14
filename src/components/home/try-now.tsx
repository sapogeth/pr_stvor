"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

function CopyCurl({ code }: { code: string }) {
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
          Register an agent — one API call
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
    title: "Watch the Bybit-class attack",
    body: "Live sim: destination swapped after review, same pattern as the $1.5B hack. See Stvor block it — escrow returned, no human review.",
    cta: "Run attack sim →",
    href: siteConfig.demo.attack,
    external: true,
    badge: "Live · 30 sec",
  },
  {
    title: "Step through verification",
    body: "Pick a scenario on our site: commit intent, tamper payload, watch ALLOW vs DENY. No account, runs in your browser.",
    cta: "Open interactive demo →",
    href: siteConfig.demo.local,
    external: false,
    badge: "Local demo",
  },
  {
    title: "Agent economy (reference)",
    body: "Six agents, Stripe escrow, signed receipts — the full marketplace reference build from the Hermes hackathon.",
    cta: "Run live demo →",
    href: siteConfig.demo.live,
    external: true,
    badge: "nous.stvor.xyz",
  },
];

export function TryNow() {
  return (
    <section className="section-y pt-4" id="try-now">
      <div className="container-page">
        <motion.div
          className="mb-10 max-w-2xl"
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
            Developers don&apos;t write to ask permission. They run something. Start with the
            attack demo, copy the register call, read the spec if you want the bytes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <CopyCurl code={siteConfig.registerAgentCurl} />
          <p className="mt-3 text-[12px] text-[var(--color-fg-subtle)] leading-relaxed">
            No SDK required. Returns an{" "}
            <code className="font-mono text-[11px]">agentId</code> and{" "}
            <code className="font-mono text-[11px]">apiKey</code>. Live on{" "}
            <a
              href="https://nous.stvor.xyz/integrate"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[var(--color-fg-muted)]"
            >
              nous.stvor.xyz
            </a>
            .{" "}
            <a href="/docs/integrate" className="underline underline-offset-2 hover:text-[var(--color-fg-muted)]">
              Full integration guide →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
