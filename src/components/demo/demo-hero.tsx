"use client";

export function DemoHero() {
  return (
    <div className="pt-24 pb-6 text-center px-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">
        Interactive demo
      </p>
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--color-fg)] mb-3">
        Watch the handshake happen
      </h1>
      <p className="text-sm md:text-base text-[var(--color-fg-muted)] max-w-2xl mx-auto">
        Pick your platform · click{" "}
        <strong className="text-[var(--color-fg)]">Run</strong> · see ML-KEM-768 + X3DH
        session establish step by step
      </p>
    </div>
  );
}
