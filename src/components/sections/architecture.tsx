import { Section } from "@/components/ui/section";

/* ── node component ── */
function Node({
  label,
  sub,
  accent = false,
  chain = false,
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  chain?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border px-4 py-3 text-center flex flex-col items-center justify-center min-w-[110px] min-h-[64px]",
        accent
          ? "border-[var(--color-brand)]/50 bg-[var(--color-brand)]/10 shadow-[0_0_20px_-4px_rgba(99,102,241,0.4)]"
          : chain
          ? "border-white/15 bg-white/5"
          : "border-white/15 bg-white/5",
      ].join(" ")}
    >
      <p className={`text-[13px] font-semibold leading-tight ${accent ? "text-[var(--color-brand)]" : "text-[var(--color-fg)]"}`}>
        {label}
      </p>
      {sub && <p className="text-[10px] text-[var(--color-fg-subtle)] mt-0.5 leading-tight">{sub}</p>}
    </div>
  );
}

/* ── arrow ── */
function Connector({ label, vertical = false }: { label: string; vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-1 my-1">
        <div className="w-px h-6 bg-white/20" />
        <p className="text-[10px] text-[var(--color-fg-subtle)] text-center max-w-[90px] leading-tight">{label}</p>
        <div className="w-px h-6 bg-white/20" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-0.5 mx-2">
      <p className="text-[10px] text-[var(--color-fg-subtle)] leading-tight text-center max-w-[80px]">{label}</p>
      <div className="h-px w-12 bg-white/25" />
    </div>
  );
}

export function Architecture() {
  return (
    <Section
      eyebrow="Architecture"
      title="How Stvor fits in your stack"
      description="Stvor sits between your agents and their communication layer — transparent to your business logic, invisible to attackers."
    >
      <div className="mx-auto max-w-4xl">
        {/* main diagram */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-8">
          {/* top row: agents */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
            <Node label="Agent A" sub="ML-DSA identity" />
            <Connector label="Hybrid X3DH handshake" />
            <Node label="Agent B" sub="ML-DSA identity" />
          </div>

          {/* arrows down */}
          <div className="flex justify-center gap-[200px] md:gap-[280px]">
            <Connector label="" vertical />
            <Connector label="" vertical />
          </div>

          {/* middle row: Stvor */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
            <div className="w-full flex justify-center">
              <Node label="Stvor SDK" sub="E2EE · Ratchet · Audit" accent />
            </div>
          </div>

          {/* arrow down from Stvor */}
          <div className="flex justify-center">
            <Connector label="key registry + audit anchoring" vertical />
          </div>

          {/* bottom row: chains */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Node label="TON" sub="FunC registry" chain />
            <Node label="EVM" sub="Solidity registry" chain />
            <Node label="Solana" sub="coming Q3 2026" chain />
          </div>
        </div>

        {/* legend */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              color: "bg-[#60a5fa]",
              label: "Identity layer",
              desc: "ML-DSA-65 public keys published on-chain. Agents are cryptographic identities, not API keys.",
            },
            {
              color: "bg-[var(--color-brand)]",
              label: "Session layer",
              desc: "Hybrid X3DH + Double Ratchet. Every message has forward secrecy. Wallet-bound sessions.",
            },
            {
              color: "bg-[#4ade80]",
              label: "Audit layer",
              desc: "Session IDs anchored on-chain. Tamper-proof. Every agent action attributable and provable.",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <div className={`size-3 rounded-full ${item.color} shrink-0 mt-1`} />
              <div>
                <p className="text-sm font-semibold text-[var(--color-fg)] mb-0.5">{item.label}</p>
                <p className="text-xs text-[var(--color-fg-muted)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* key properties */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { stat: "~14 ms", label: "handshake" },
            { stat: "0", label: "custom crypto" },
            { stat: "E2EE", label: "end-to-end" },
            { stat: "On-chain", label: "audit trail" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/8 bg-white/3 px-4 py-4 text-center"
            >
              <p className="text-xl font-bold text-[var(--color-fg)] tracking-tight">{item.stat}</p>
              <p className="text-[11px] text-[var(--color-fg-subtle)] mt-0.5 uppercase tracking-[0.1em]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
