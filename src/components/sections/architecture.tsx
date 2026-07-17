import { Section } from "@/components/ui/section";

export function Architecture() {
  return (
    <Section
      eyebrow="Architecture"
      title="How Stvor fits in your stack"
      description="Three layers. Zero trust assumptions. No new infrastructure to manage."
    >
      <div className="mx-auto max-w-4xl space-y-3">

        {/* Layer 1 — Agents */}
        <StackLayer
          tag="Layer 1"
          label="Your agents"
          sublabel="Any framework, runtime, or language"
          accentColor="#60a5fa"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Chip label="Orchestrator" />
            <EdgeLine label="Hybrid X3DH" color="#60a5fa" />
            <Chip label="Worker Agent" />
            <EdgeLine label="E2EE channel" color="#60a5fa" />
            <Chip label="MCP Tool" />
          </div>
        </StackLayer>

        <StackConnector label="npm install @stvor/client  ·  3 API calls  ·  &lt;1 day to production" />

        {/* Layer 2 — Stvor SDK */}
        <StackLayer
          tag="Layer 2"
          label="Stvor SDK"
          sublabel="Cryptographic session layer — transparent to your business logic"
          accentColor="#6366f1"
          highlight
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {[
              { label: "ML-KEM-768", sub: "Post-quantum KEM · FIPS 203" },
              { label: "ML-DSA-65", sub: "Agent identity · FIPS 204" },
              { label: "Double Ratchet", sub: "Per-message forward secrecy" },
              { label: "Audit log", sub: "On-chain tamper-proof trail" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-[#6366f1]/20 bg-[#6366f1]/6 px-3.5 py-3"
              >
                <p className="text-[12px] font-semibold text-[var(--color-fg)] leading-snug">{f.label}</p>
                <p className="text-[10px] text-[var(--color-fg-subtle)] mt-1 leading-snug">{f.sub}</p>
              </div>
            ))}
          </div>
        </StackLayer>

        <StackConnector label="key registry anchoring  ·  session binding  ·  audit anchoring" />

        {/* Layer 3 — Chains */}
        <StackLayer
          tag="Layer 3"
          label="On-chain registries"
          sublabel="Identity and audit records — immutable, decentralised"
          accentColor="#4ade80"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <ChainBadge label="TON" sub="FunC smart contract" color="#0098EA" />
            <ChainBadge label="EVM" sub="Solidity registry" color="#6366f1" />
            <ChainBadge label="Solana" sub="coming Q3 2026" color="#9945FF" dim />
          </div>
        </StackLayer>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
          {[
            { value: "~14 ms", label: "Handshake setup" },
            { value: "0", label: "Custom crypto" },
            { value: "E2EE", label: "End-to-end encrypted" },
            { value: "On-chain", label: "Tamper-proof audit" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/6 bg-white/[0.025] px-4 py-4 text-center"
            >
              <p className="text-xl font-bold tracking-tight text-[var(--color-fg)]">{s.value}</p>
              <p className="text-[10px] text-[var(--color-fg-subtle)] mt-1 uppercase tracking-[0.1em] leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── primitives ── */

function StackLayer({
  tag, label, sublabel, accentColor, highlight, children,
}: {
  tag: string; label: string; sublabel: string;
  accentColor: string; highlight?: boolean; children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor: `${accentColor}22`,
        background: `${accentColor}05`,
        boxShadow: highlight ? `0 0 48px -12px ${accentColor}30` : undefined,
      }}
    >
      {/* header */}
      <div
        className="flex items-center gap-3 px-5 py-3 border-b"
        style={{ borderColor: `${accentColor}14` }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
          style={{ background: `${accentColor}18`, color: accentColor }}
        >
          {tag}
        </span>
        <span className="text-[12px] font-semibold text-[var(--color-fg)]">{label}</span>
        <span className="text-[11px] text-[var(--color-fg-subtle)] hidden sm:block">— {sublabel}</span>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function StackConnector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-0.5">
      <div className="w-px h-3 bg-white/15" />
      <p
        className="text-[10px] text-[var(--color-fg-subtle)] px-3 py-1 rounded-full border border-white/8 bg-white/[0.02]"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <div className="w-px h-3 bg-white/15" />
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5">
      <p className="text-[12px] font-semibold text-[var(--color-fg)]">{label}</p>
    </div>
  );
}

function EdgeLine({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1 min-w-[60px] max-w-[100px]">
      <p className="text-[9px] font-medium uppercase tracking-[0.1em]" style={{ color }}>
        {label}
      </p>
      <div className="w-full h-px" style={{ background: `${color}40` }} />
    </div>
  );
}

function ChainBadge({
  label, sub, color, dim,
}: {
  label: string; sub: string; color: string; dim?: boolean;
}) {
  return (
    <div
      className="rounded-xl border px-5 py-3 text-center min-w-[110px]"
      style={{
        borderColor: `${color}${dim ? "25" : "35"}`,
        background: `${color}${dim ? "07" : "10"}`,
        opacity: dim ? 0.55 : 1,
      }}
    >
      <p className="text-[13px] font-bold" style={{ color }}>{label}</p>
      <p className="text-[10px] text-[var(--color-fg-subtle)] mt-0.5">{sub}</p>
    </div>
  );
}
