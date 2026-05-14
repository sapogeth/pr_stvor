import { Section } from "@/components/ui/section";

const steps = [
  {
    n: "01",
    actor: "Agent A",
    action: "Generate ML-KEM-768 keypair + publish via ML-DSA-65 to on-chain registry",
    note: "One-time setup. Keys live on-chain — no trusted third party.",
    color: "text-[#60a5fa] border-[#60a5fa]/30 bg-[#60a5fa]/5",
    dot: "bg-[#60a5fa]",
  },
  {
    n: "02",
    actor: "Agent B",
    action: "Resolve Agent A's public key from registry. Verify ML-DSA-65 signature.",
    note: "Cryptographic identity — not an API key that can be phished.",
    color: "text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/5",
    dot: "bg-[#a78bfa]",
  },
  {
    n: "03",
    actor: "Both",
    action: "Hybrid X3DH handshake: ECDH P-256 + ML-KEM-768 run in parallel → HKDF → root key",
    note: "If ECDH breaks (quantum), ML-KEM holds. If ML-KEM breaks, ECDH holds.",
    color: "text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/5",
    dot: "bg-[#f59e0b]",
  },
  {
    n: "04",
    actor: "Agent A",
    action: "Bind session ID to UserOperation calldata. Wallet signs. On-chain verification.",
    note: "Transplanting the session to another context causes on-chain revert.",
    color: "text-[#34d399] border-[#34d399]/30 bg-[#34d399]/5",
    dot: "bg-[#34d399]",
  },
  {
    n: "05",
    actor: "Both",
    action: "Messages encrypted with AES-256-GCM. Double Ratchet advances per message.",
    note: "Compromise of message N reveals nothing about messages N−1 or N+1.",
    color: "text-[#4ade80] border-[#4ade80]/30 bg-[#4ade80]/5",
    dot: "bg-[#4ade80]",
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
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[28px] top-4 bottom-4 w-px bg-gradient-to-b from-[#60a5fa]/40 via-[#a78bfa]/40 to-[#4ade80]/40" />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.n} className="flex gap-5">
                {/* dot */}
                <div className="relative shrink-0 flex flex-col items-center" style={{ width: 57 }}>
                  <div className={`size-4 rounded-full border-2 border-[var(--color-bg)] ${step.dot} z-10 mt-4 shrink-0`} />
                </div>

                {/* card */}
                <div className={`flex-1 rounded-xl border ${step.color} px-5 py-4 mb-1`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono font-bold opacity-50">{step.n}</span>
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${step.color.split(" ")[0]}`}>
                      {step.actor}
                    </span>
                  </div>
                  <p className="text-[13.5px] font-medium text-[var(--color-fg)] leading-snug mb-2">
                    {step.action}
                  </p>
                  <p className="text-[12px] text-[var(--color-fg-subtle)] leading-relaxed">
                    {step.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* result callout */}
        <div className="mt-8 rounded-xl border border-[#4ade80]/25 bg-[#4ade80]/5 px-6 py-5 flex items-start gap-4">
          <div className="text-2xl shrink-0">✓</div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-fg)] mb-1">Result</p>
            <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
              A cryptographically authenticated, post-quantum secure, wallet-bound E2EE session.
              Every message is attributable. Every action is auditable. Setup time: ~14 ms.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
