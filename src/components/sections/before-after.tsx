import { X, Check } from "lucide-react";
import { Section } from "@/components/ui/section";

function AgentNode({ label, sub, color = "border-white/20 bg-white/5" }: { label: string; sub?: string; color?: string }) {
  return (
    <div className={`rounded-xl border ${color} px-4 py-3 text-center min-w-[120px]`}>
      <p className="text-[13px] font-semibold text-[var(--color-fg)]">{label}</p>
      {sub && <p className="text-[10px] text-[var(--color-fg-subtle)] mt-0.5">{sub}</p>}
    </div>
  );
}

function Arrow({ label, bad }: { label: string; bad?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 mx-1">
      <div className={`h-px w-16 md:w-24 ${bad ? "bg-[#f87171]" : "bg-[#4ade80]"}`} />
      <p className={`text-[10px] font-medium ${bad ? "text-[#f87171]" : "text-[#4ade80]"}`}>{label}</p>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <Section
      eyebrow="The difference"
      title="Before and after Stvor"
      description="One integration changes everything about how agent actions can be proven."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* BEFORE */}
        <div className="rounded-2xl border border-[#f87171]/30 bg-[#f87171]/5 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex size-6 items-center justify-center rounded-full bg-[#f87171]/20">
              <X size={13} className="text-[#f87171]" />
            </div>
            <span className="text-sm font-semibold text-[#f87171]">Without Stvor</span>
          </div>

          {/* diagram */}
          <div className="flex items-center justify-center flex-wrap gap-1 mb-6">
            <AgentNode label="User" sub="authorizes?" />
            <Arrow label="API key?" bad />
            <AgentNode label="Agent A" sub="unknown identity" />
            <Arrow label="plaintext" bad />
            <AgentNode label="Tool / API" sub="no audit" />
          </div>

          {/* consequences */}
          <ul className="space-y-2.5">
            {[
              "No proof of who authorized the action",
              "API key leak = full compromise",
              "No tamper-proof audit trail",
              "Can't attribute $4,000 moved to any wallet",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]">
                <X size={14} className="shrink-0 mt-0.5 text-[#f87171]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER */}
        <div className="rounded-2xl border border-[#4ade80]/30 bg-[#4ade80]/5 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex size-6 items-center justify-center rounded-full bg-[#4ade80]/20">
              <Check size={13} className="text-[#4ade80]" />
            </div>
            <span className="text-sm font-semibold text-[#4ade80]">With Stvor</span>
          </div>

          {/* diagram */}
          <div className="flex items-center justify-center flex-wrap gap-1 mb-6">
            <AgentNode label="User Wallet" sub="signs session" color="border-[#4ade80]/40 bg-[#4ade80]/10" />
            <Arrow label="bound session" />
            <AgentNode label="Agent A" sub="ML-DSA identity" color="border-[#4ade80]/40 bg-[#4ade80]/10" />
            <Arrow label="E2EE + audit" />
            <AgentNode label="Tool / API" sub="on-chain proof" color="border-[#4ade80]/40 bg-[#4ade80]/10" />
          </div>

          {/* benefits */}
          <ul className="space-y-2.5">
            {[
              "Every action signed by the user's wallet key",
              "Session cryptographically bound to UserOp",
              "Tamper-proof on-chain audit trail",
              "$4,000 moved → proven by wallet 0x… at 14:32 UTC",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]">
                <Check size={14} className="shrink-0 mt-0.5 text-[#4ade80]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
