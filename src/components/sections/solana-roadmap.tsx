import { Zap, Shield, Database, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";

const items = [
  {
    icon: Zap,
    title: "Solana wallet binding",
    body: "Cryptographic session binding to Solana wallet signatures — same UserOp-level guarantees as ERC-4337, adapted for Solana's transaction model.",
  },
  {
    icon: Shield,
    title: "Solana Agent Kit integration",
    body: "Drop-in PQ-secured transport for Solana Agent Kit. Every agent action travels over a Hybrid X3DH channel — no plaintext tool calls.",
  },
  {
    icon: Database,
    title: "On-chain identity registry on Solana",
    body: "ML-DSA-65 public keys anchored on-chain via a native Solana program. Agents resolve and verify identity without any trusted third party.",
  },
];

export function SolanaRoadmap() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* top fade from bg */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 inset-x-0 h-32 z-10"
        style={{ background: "linear-gradient(to bottom, var(--color-bg), transparent)" }} />
      {/* bottom fade to bg */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }} />
      {/* Solana gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(153,69,255,0.1) 0%, rgba(20,241,149,0.07) 55%, transparent 100%)",
        }}
      />

      <div className="container-page">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9945FF]/30 bg-[#9945FF]/10 px-4 py-1.5 mb-5">
            {/* Solana logo mark */}
            <svg width="16" height="14" viewBox="0 0 397 311" fill="none" aria-hidden="true">
              <path d="M64.6 237.9a13 13 0 0 1 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7a13 13 0 0 1-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="url(#sol-a)"/>
              <path d="M64.6 3.8A13.3 13.3 0 0 1 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7a13 13 0 0 1-9.2 3.8H6.5C.7 77.6-2.2 70.6 1.9 66.5l62.7-62.7z" fill="url(#sol-b)"/>
              <path d="M333.1 120.1a13 13 0 0 0-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7a13 13 0 0 0 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(#sol-c)"/>
              <defs>
                <linearGradient id="sol-a" x1="360.9" y1="351.6" x2="141.2" y2="-69" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
                <linearGradient id="sol-b" x1="264.8" y1="401.6" x2="45" y2="-18.9" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
                <linearGradient id="sol-c" x1="312.5" y1="376.8" x2="92.8" y2="-43.7" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3"/><stop offset="1" stopColor="#DC1FFF"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xs font-semibold tracking-[0.12em] uppercase"
              style={{ background: "linear-gradient(90deg,#14F195,#9945FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Coming Q3 2026
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-fg)] mb-4">
            Stvor is coming to{" "}
            <span style={{ background: "linear-gradient(90deg,#14F195,#9945FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Solana
            </span>
          </h2>
          <p className="text-[var(--color-fg-muted)] text-lg leading-relaxed">
            Post-quantum secure sessions, wallet-bound agent identity, and on-chain
            key registry — built natively for Solana's speed and ecosystem.
          </p>
        </div>

        {/* feature cards */}
        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="relative rounded-xl p-px overflow-hidden"
              style={{ background: "linear-gradient(135deg,rgba(153,69,255,0.4),rgba(20,241,149,0.2))" }}
            >
              <div className="rounded-xl bg-[var(--color-bg-elevated)] p-6 h-full flex flex-col">
                <div
                  className="mb-4 inline-flex size-10 items-center justify-center rounded-lg shrink-0"
                  style={{ background: "linear-gradient(135deg,rgba(153,69,255,0.15),rgba(20,241,149,0.1))" }}
                >
                  <Icon size={18} style={{ color: "#9945FF" }} />
                </div>
                <h3 className="text-base font-semibold text-[var(--color-fg)] mb-2 tracking-tight">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* why Solana callout */}
        <div
          className="rounded-xl p-px mx-auto max-w-3xl"
          style={{ background: "linear-gradient(135deg,rgba(153,69,255,0.3),rgba(20,241,149,0.15))" }}
        >
          <div className="rounded-xl bg-[var(--color-bg-elevated)] px-8 py-7">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] mb-3"
              style={{ background: "linear-gradient(90deg,#14F195,#9945FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Why Solana
            </p>
            <p className="text-[var(--color-fg-muted)] text-sm leading-relaxed mb-0">
              400ms block times and sub-cent fees make Solana the right substrate for
              on-chain agent identity anchoring. A PQ key registration that costs $0.001
              and confirms in under a second is practical at agent scale —
              something not achievable on higher-fee chains. With Solana Agent Kit
              already adopted by leading agentic teams, Stvor's PQ transport layer
              fits directly into existing workflows.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={`mailto:${siteConfig.emails.founder}?subject=Stvor%20Solana%20%E2%80%94%20early%20access&body=Hi%2C%0A%0AI%27m%20interested%20in%20Stvor%27s%20Solana%20integration.%0A%0AProject%3A%0ATimeline%3A%0A`}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#9945FF,#14F195)" }}
          >
            Join the Solana early-access list <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
