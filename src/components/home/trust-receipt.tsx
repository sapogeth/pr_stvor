"use client";

import { motion } from "framer-motion";

export type TrustReceiptVariant = "hero" | "blocked" | "inline";

interface Props {
  variant?: TrustReceiptVariant;
}

const EXECUTED = {
  receiptId: "trcpt_sample_demo",
  agent: "agt_finance_agent_v1",
  action: "payment.execute",
  destination: "0x7a3f91cd...4e",
  amount: "50,000.00 USDC",
  committed: "2026-07-11 09:41:02Z",
  executed: "2026-07-11 09:41:03Z",
  status: "✓ VERIFIED",
  payloadHash: "sha256:a3f7c291...",
  signature: "ed25519:3mK9pqR2...",
  statusClass: "receipt-executed",
};

const BLOCKED = {
  ...EXECUTED,
  executed: "—",
  status: "✗ BLOCKED",
  reason: "DESTINATION_MISMATCH",
  statusClass: "receipt-blocked",
};

export function TrustReceipt({ variant = "hero" }: Props) {
  const data = variant === "blocked" ? BLOCKED : EXECUTED;
  const isHero = variant === "hero";

  const card = (
    <div className={`receipt-card ${isHero ? "receipt-card--hero" : "receipt-card--inline"}`}>
      {/* Header */}
      <div className="receipt-header">
        <span className="receipt-brand">STVOR TRUST RECEIPT</span>
        <span className="receipt-ver">v1.0</span>
      </div>

      <div className="receipt-rule" />

      <div className="receipt-fields">
        <Row k="RECEIPT ID"    v={data.receiptId} />
        <Row k="AGENT"         v={data.agent} />
        <Row k="ACTION"        v={data.action} />
        <Row k="DESTINATION"   v={data.destination} />
        <Row k="AMOUNT"        v={data.amount} />
        <Row k="COMMITTED"     v={data.committed} />
        <Row k="EXECUTED"      v={data.executed} />
        <Row k="STATUS"        v={data.status}   cls={data.statusClass} />
        {variant === "blocked" && (
          <Row k="REASON"      v={BLOCKED.reason} cls="receipt-blocked" />
        )}
      </div>

      <div className="receipt-rule" />

      <div className="receipt-fields">
        <Row k="PAYLOAD HASH"  v={data.payloadHash} cls="receipt-hash" />
        <Row k="SIGNATURE"     v={data.signature}   cls="receipt-sig" />
      </div>

      <div className="receipt-rule" />

      <div className="receipt-verify">Verify → receipts.stvor.io</div>
    </div>
  );

  if (isHero) {
    return (
      <motion.div
        className="receipt-perspective"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.32, 1] }}
      >
        {card}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.32, 1] }}
    >
      {card}
    </motion.div>
  );
}

function Row({ k, v, cls = "" }: { k: string; v: string; cls?: string }) {
  return (
    <div className="receipt-row">
      <span className="receipt-key">{k}</span>
      <span className={`receipt-val ${cls}`}>{v}</span>
    </div>
  );
}
