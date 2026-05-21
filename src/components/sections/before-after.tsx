import { X, Check } from "lucide-react";
import { Section } from "@/components/ui/section";

export function BeforeAfter() {
  return (
    <Section
      eyebrow="The difference"
      title="Before and after Stvor"
      description="One integration. Full cryptographic attribution for every agent action."
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Panel variant="bad" title="Without Stvor">
          <FlowDiagram variant="bad" />
          <Divider />
          <ul className="space-y-3">
            {[
              "Agent moved $4,000 — no proof who authorized it",
              "API key leak = silent, full compromise",
              "No tamper-proof audit trail",
              "Post-incident forensics: impossible",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <X size={13} strokeWidth={2.5} className="shrink-0 mt-[3px] text-[#f87171]" />
                <span className="text-[13px] text-[var(--color-fg-muted)] leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel variant="good" title="With Stvor">
          <FlowDiagram variant="good" />
          <Divider />
          <ul className="space-y-3">
            {[
              "$4,000 moved — proven by wallet 0x… at 14:32 UTC",
              "Session cryptographically bound to UserOperation",
              "Tamper-proof on-chain audit trail",
              "Post-incident: full cryptographic reconstruction",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <Check size={13} strokeWidth={2.5} className="shrink-0 mt-[3px] text-[#4ade80]" />
                <span className="text-[13px] text-[var(--color-fg-muted)] leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}

/* ── sub-components ── */

function Panel({
  variant,
  title,
  children,
}: {
  variant: "bad" | "good";
  title: string;
  children: React.ReactNode;
}) {
  const accent = variant === "bad" ? "#f87171" : "#4ade80";
  return (
    <div
      className="rounded-2xl border overflow-hidden flex flex-col"
      style={{ borderColor: `${accent}22`, background: `${accent}06` }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3.5 border-b"
        style={{ borderColor: `${accent}18` }}
      >
        <div
          className="size-2 rounded-full shrink-0"
          style={{ background: accent }}
        />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
          {title}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-5 flex-1">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/6 -mx-1" />;
}

function FlowDiagram({ variant }: { variant: "bad" | "good" }) {
  const bad = variant === "bad";
  const edgeColor = bad ? "#f87171" : "#4ade80";
  const nodeStyle = bad
    ? "border-[#f87171]/20 bg-[#f87171]/6"
    : "border-[#4ade80]/20 bg-[#4ade80]/6";
  const nodeText = bad ? "text-[#f87171]" : "text-[#4ade80]";

  const nodes = bad
    ? [
        { label: "User", sub: "no signature" },
        { label: "Agent A", sub: "API key only" },
        { label: "Tool", sub: "no audit" },
      ]
    : [
        { label: "User Wallet", sub: "signs session" },
        { label: "Agent A", sub: "ML-DSA id" },
        { label: "Tool", sub: "on-chain log" },
      ];

  const edges = bad
    ? ["API key?", "plaintext HTTP"]
    : ["bound session", "E2EE + audit"];

  return (
    <div className="rounded-xl border border-white/6 bg-black/20 px-4 py-4">
      <div className="flex items-center gap-1 flex-wrap">
        {nodes.map((n, i) => (
          <>
            <div
              key={n.label}
              className={`rounded-lg border ${nodeStyle} px-3 py-2 text-center min-w-[72px]`}
            >
              <p className={`text-[11px] font-semibold ${nodeText}`}>{n.label}</p>
              <p className="text-[9px] text-[var(--color-fg-subtle)] mt-0.5 leading-tight">{n.sub}</p>
            </div>
            {i < nodes.length - 1 && (
              <div key={`edge-${i}`} className="flex-1 flex flex-col items-center gap-0.5 min-w-[36px]">
                <span className="text-[9px] font-medium" style={{ color: edgeColor }}>
                  {edges[i]}
                </span>
                <svg width="100%" height="8" className="overflow-visible">
                  <line
                    x1="4" y1="4" x2="calc(100% - 4)" y2="4"
                    stroke={edgeColor}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray={bad ? "3 3" : "none"}
                  />
                  <polygon
                    points="calc(100% - 4),0 100%,4 calc(100% - 4),8"
                    fill={edgeColor}
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
            )}
          </>
        ))}
      </div>

      {/* log line */}
      <div className="mt-3 rounded-md bg-black/30 px-3 py-1.5">
        <code className="text-[10px] font-mono" style={{ color: `${edgeColor}90` }}>
          {bad
            ? "POST /api/tool — 200 OK  // no attribution"
            : "session:0x7f2a ← wallet:0x9f3e @ 14:32 UTC  ✓"}
        </code>
      </div>
    </div>
  );
}
