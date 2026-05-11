"use client";

import { motion } from "framer-motion";

export function DemoHero() {
  return (
    <div className="pt-24 pb-6 text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3"
      >
        Interactive demo
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--color-fg)] mb-3"
      >
        Watch the handshake happen
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14, ease: "easeOut" }}
        className="text-sm md:text-base text-[var(--color-fg-muted)] max-w-2xl mx-auto"
      >
        Pick your platform · click{" "}
        <strong className="text-[var(--color-fg)]">Run</strong> · see ML-KEM-768 + X3DH
        session establish step by step
      </motion.p>
    </div>
  );
}
