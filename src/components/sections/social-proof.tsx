import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";

export function SocialProof() {
  return (
    <Section
      eyebrow="Social proof"
      title="Built on standards. Verified in the open."
      description="Every claim is checkable. We don't ask you to take our word for it."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Sharpsana quote */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 flex flex-col justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--color-fg-subtle)] mb-5">
              Customer
            </p>
            <blockquote className="text-[15px] text-[var(--color-fg)] leading-relaxed mb-5 font-medium">
              "Stvor gave us cryptographic proof of every agent action in our DeFi pipeline.
              When our auditors asked who authorized the $50k settlement, we showed them
              an on-chain session signed by the user's wallet. The conversation ended in
              60 seconds."
            </blockquote>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-white/8">
            <div className="size-9 rounded-lg bg-[#238BB5]/15 border border-[#238BB5]/25 flex items-center justify-center">
              <span className="text-[11px] font-bold text-[#238BB5]">S</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--color-fg)]">Founder, Sharpsana</p>
              <a
                href="https://sharpsana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] transition-colors flex items-center gap-1"
              >
                sharpsana.com <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* credentials */}
        <div className="flex flex-col gap-3">
          {/* IACR */}
          <a
            href="https://eprint.iacr.org"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-5 flex items-start gap-4"
          >
            <div className="shrink-0 size-10 rounded-xl border border-[var(--color-brand)]/25 bg-[var(--color-brand)]/10 flex items-center justify-center">
              <span className="text-[11px] font-bold text-[var(--color-brand)]">ePrint</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[13px] font-semibold text-[var(--color-fg)]">IACR Cryptology ePrint Archive</p>
                <ExternalLink size={12} className="text-[var(--color-fg-subtle)] group-hover:text-[var(--color-fg-muted)] transition-colors shrink-0 ml-2" />
              </div>
              <p className="text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
                Hybrid X3DH protocol formalization — peer-reviewed cryptography. Every primitive
                is publicly documented and independently verifiable.
              </p>
            </div>
          </a>

          {/* NIST */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 flex items-start gap-4">
            <div className="shrink-0 size-10 rounded-xl border border-[#34d399]/25 bg-[#34d399]/8 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#34d399]">NIST</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--color-fg)] mb-1">NIST FIPS 203/204 algorithms</p>
              <p className="text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
                ML-KEM-768 (FIPS 203) and ML-DSA-65 (FIPS 204), vendored from audited upstream
                libraries (liboqs / pq-crystals). CMVP/CAVP validation on the security roadmap.
              </p>
            </div>
          </div>

          {/* Open source */}
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.04] transition-colors p-5 flex items-start gap-4"
          >
            <div className="shrink-0 size-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[var(--color-fg-muted)]">OSS</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[13px] font-semibold text-[var(--color-fg)]">MIT — fully open source</p>
                <ExternalLink size={12} className="text-[var(--color-fg-subtle)] group-hover:text-[var(--color-fg-muted)] transition-colors shrink-0 ml-2" />
              </div>
              <p className="text-[12px] text-[var(--color-fg-muted)] leading-relaxed">
                SDK, smart contracts, and reference relays are public on GitHub from day one.
                Read the code. Don't trust — verify.
              </p>
            </div>
          </a>
        </div>
      </div>
    </Section>
  );
}
