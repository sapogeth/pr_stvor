"use client";

import { motion } from "framer-motion";
import {
  DEMO_ATTEMPTED_TO,
  DEMO_COMMITTED_TO,
  DEMO_DENY_RECEIPT,
} from "@/data/demo-receipt";

export type TrustReceiptVariant = "hero" | "inline";

interface Props {
  variant?: TrustReceiptVariant;
}

export function TrustReceipt({ variant = "hero" }: Props) {
  const r = DEMO_DENY_RECEIPT;
  const isHero = variant === "hero";

  const card = (
    <div className={`receipt-card ${isHero ? "receipt-card--hero" : "receipt-card--inline"}`}>
      <div className="receipt-header">
        <span className="receipt-brand">STVOR TRUST RECEIPT</span>
        <span className="receipt-ver">{r.receiptId}</span>
      </div>

      <div className="receipt-rule" />

      <div className="receipt-binding-banner">{r.binding}</div>

      <div className="receipt-fields">
        <Row k="DECISION" v={r.decision} cls="receipt-blocked" />
        <Row k="REASON" v={r.reason} cls="receipt-blocked" />
        <Row k="TO (attempted)" v={r.to} cls="receipt-val--break" />
        <Row
          k="COMMITTED TO"
          v={DEMO_COMMITTED_TO}
          cls="receipt-val--break receipt-val--muted"
        />
        <Row k="AMOUNT" v={`${r.amount} ${r.currency}`} />
        <Row k="AGENT" v={r.agentId} />
        <Row k="KID" v={r.kid} />
        <Row k="COMMITMENT" v={r.commitmentId} cls="receipt-val--break" />
      </div>

      <div className="receipt-rule" />

      <div className="receipt-fields">
        <Row k="ISSUER SIG (ES256)" v={r.signature} cls="receipt-sig receipt-sig--full" />
      </div>

      <p className="receipt-swapped-note">
        Swapped destination: committed vendor{" "}
        <span className="font-mono">{DEMO_COMMITTED_TO.slice(0, 10)}…</span>, attempted{" "}
        <span className="font-mono">{DEMO_ATTEMPTED_TO.slice(0, 10)}…</span>
      </p>

      <div className="receipt-rule" />

      <div className="receipt-verify">
        <a href="/verifier/#demo" className="hover:text-[var(--color-fg-subtle)] transition-colors">
          Verify offline · bundled demo keyset →
        </a>
      </div>
    </div>
  );

  if (isHero) {
    return (
      <motion.div
        className="receipt-perspective"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.32, 1] }}
      >
        {card}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {card}
    </motion.div>
  );
}

function Row({
  k,
  v,
  cls = "",
  title,
}: {
  k: string;
  v: string;
  cls?: string;
  title?: string;
}) {
  return (
    <div className="receipt-row">
      <span className="receipt-key">{k}</span>
      <span className={`receipt-val ${cls}`} title={title ?? v}>
        {v}
      </span>
    </div>
  );
}
