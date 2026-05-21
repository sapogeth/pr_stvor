import { Section } from "@/components/ui/section";

const steps = [
  {
    n: "01",
    label: "Identity registration",
    actor: "Agent A",
    body: "Generate ML-KEM-768 keypair. Publish public key on-chain, signed with ML-DSA-65.",
    aside: "One-time. Keys live on-chain — no trusted intermediary.",
    color: "#60a5fa",
  },
  {
    n: "02",
    label: "Identity resolution",
    actor: "Agent B",
    body: "Resolve Agent A's public key from on-chain registry. Verify ML-DSA-65 signature.",
    aside: "Cryptographic identity — cannot be phished or rotated silently.",
    color: "#818cf8",
  },
  {
    n: "03",
    label: "Hybrid handshake",
    actor: "Both agents",
    body: "ECDH P-256 + ML-KEM-768 run in parallel. Outputs combined via HKDF-SHA256 → root key.",
    aside: "If either primitive is broken, the other holds. Defense in depth.",
    color: "#a78bfa",
  },
  {
    n: "04",
    label: "Wallet binding",
    actor: "Agent A",
    body: "Session ID embedded in UserOperation calldata. Wallet signs. Verified on-chain at execution.",
    aside: "Forged sessions cause on-chain revert — cryptographically impossible to bypass.",
    color: "#34d399",
  },
  {
    n: "05",
    label: "Encrypted messaging",
    actor: "Both agents",
    body: "AES-256-GCM encryption per message. Double Ratchet advances the chain key on every send.",
    aside: "Compromise of message N reveals nothing about N−1 or N+1.",
    color: "#4ade80",
  },
];

export function SequenceFlow() {
  return (
    <Section
      eyebrow="How it works"
      title="The handshake, step by step"
      description="What happens under the hood when two agents establish a Stvor session."
    >
      <div className="mx-auto max-w-3xl">
        {/* steps */}
        <div className="relative">
          {/* vertical rule */}
          <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-[#60a5fa]/30 via-[#818cf8]/20 to-[#4ade80]/30" />

          <div className="space-y-2">
            {steps.map((step) => (
              <div key={step.n} className="flex gap-5">
                {/* number dot */}
                <div className="shrink-0 flex flex-col items-center pt-[18px]">
                  <div
                    className="size-[10px] rounded-full ring-4 ring-[var(--color-bg)] z-10"
                    style={{ background: step.color }}
                  />
                </div>

                {/* card */}
                <div
                  className="flex-1 rounded-xl border px-5 py-4 mb-1"
                  style={{
                    borderColor: `${step.color}20`,
                    background: `linear-gradient(135deg, ${step.color}07 0%, transparent 70%)`,
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-[var(--color-fg-subtle)]">{step.n}</span>
                    <span className="text-[13px] font-semibold text-[var(--color-fg)]">{step.label}</span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                      style={{ background: `${step.color}18`, color: step.color }}
                    >
                      {step.actor}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed mb-1.5">
                    {step.body}
                  </p>
                  <p className="text-[11px] text-[var(--color-fg-subtle)] leading-relaxed border-l-2 pl-2.5"
                    style={{ borderColor: `${step.color}40` }}>
                    {step.aside}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* result callout */}
        <div
          className="mt-5 rounded-xl border px-5 py-4 flex items-start gap-4"
          style={{
            borderColor: "#4ade8030",
            background: "linear-gradient(135deg, rgba(74,222,128,0.05) 0%, transparent 70%)",
          }}
        >
          <div
            className="shrink-0 size-8 rounded-lg border flex items-center justify-center mt-0.5"
            style={{ borderColor: "#4ade8030", background: "#4ade8012" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l3.5 3.5L12 3" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--color-fg)] mb-0.5">Result — ~14 ms total</p>
            <p className="text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
              Post-quantum secure, wallet-bound E2EE session. Every message attributable,
              every action auditable. No new infrastructure required.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
