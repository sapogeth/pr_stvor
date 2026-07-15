"use client";

import { motion } from "framer-motion";

const ITEMS = [
  { label: "OrbWallet", note: "Design partner" },
  { label: "NIST FIPS 203/204", note: "Algorithms" },
  { label: "ES256 P-256", note: "Signed receipts" },
  { label: "<2ms", note: "Verification" },
  { label: "Apache 2.0", note: "Open source core" },
  { label: "No payload data", note: "Leaves your infra" },
];

export function TrustBar() {
  return (
    <motion.div
      className="border-y border-[var(--color-border)] bg-[var(--color-bg-subtle)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <div className="container-page">
        <div className="flex flex-wrap items-center divide-x divide-[var(--color-border)]">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-5 py-3.5 first:pl-0 last:pr-0"
            >
              <span className="text-[11px] font-mono font-medium text-[var(--color-fg-muted)] whitespace-nowrap">
                {item.label}
              </span>
              <span className="text-[10px] text-[var(--color-fg-subtle)] whitespace-nowrap hidden sm:inline">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
