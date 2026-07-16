"use client";

import { motion } from "framer-motion";
import {
  DEMO_COMMITTED_TO,
  DEMO_DENY_RECEIPT,
  shortenHex,
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
        <span className="receipt-ver">offline-verifiable</span>
      </div>

      <div className="receipt-rule" />

      <div className="receipt-fields">
        <Row k="DECISION" v="✗ DENIED" cls="receipt-blocked" />
        <Row k="REASON" v={r.reason} cls="receipt-blocked" />
        <Row k="BINDING" v={r.binding} />
        <Row
          k="TO"
          v={`${shortenHex(r.to)} ← swapped`}
          title={`Attempted at execution (committed: ${shortenHex(DEMO_COMMITTED_TO)})`}
        />
        <Row k="AMOUNT" v={`${r.amount} ${r.currency}`} />
        <Row k="AGENT" v={r.agentId} />
        <Row k="KID" v={r.kid} />
      </div>

      <div className="receipt-rule" />

      <div className="receipt-fields">
        <Row k="SIGNATURE" v={r.signature} cls="receipt-sig receipt-sig--full" title={r.signature} />
      </div>

      <div className="receipt-rule" />

      <div className="receipt-verify">
        <a href="/verifier/" className="hover:text-[var(--color-fg-subtle)] transition-colors">
          Verify offline · issuer public key only →
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
      <span className={`receipt-val ${cls}`} title={title}>
        {v}
      </span>
    </div>
  );
}
