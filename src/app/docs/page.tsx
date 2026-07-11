import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Documentation — Stvor",
  description:
    "Stvor SDK documentation. Integrate the execution trust layer into your AI agents, wallets, and payment systems in minutes.",
};

// ── Nav ───────────────────────────────────────────────────────────────────────

const SIDEBAR = [
  {
    group: "Getting started",
    items: [
      { label: "Overview", href: "#overview" },
      { label: "Quickstart", href: "#quickstart" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    group: "Core concepts",
    items: [
      { label: "Commitment anchoring", href: "#commitment" },
      { label: "Trust Receipts", href: "#trust-receipts" },
      { label: "Policy gates", href: "#policy-gates" },
      { label: "Signing keys", href: "#signing-keys" },
    ],
  },
  {
    group: "SDK reference",
    items: [
      { label: "stvor.verify()", href: "#verify" },
      { label: "stvor.sign()", href: "#sign" },
      { label: "stvor.policy()", href: "#policy" },
      { label: "stvor.receipt()", href: "#receipt" },
    ],
  },
  {
    group: "Integrations",
    items: [
      { label: "LangChain", href: "#langchain" },
      { label: "OpenAI Agents SDK", href: "#openai-agents" },
      { label: "MCP (Model Context Protocol)", href: "#mcp" },
      { label: "Webhook events", href: "#webhooks" },
    ],
  },
  {
    group: "Security",
    items: [
      { label: "Cryptography", href: "#cryptography" },
      { label: "Key management", href: "#key-management" },
      { label: "Threat model", href: "#threat-model" },
    ],
  },
  {
    group: "Resources",
    items: [
      { label: "Changelog", href: "#changelog" },
      { label: "GitHub", href: "https://github.com/stvor-hq", external: true },
    ],
  },
];

// ── Code blocks ───────────────────────────────────────────────────────────────

function Code({
  children,
  language = "typescript",
}: {
  children: string;
  language?: string;
}) {
  return (
    <div className="rounded-xl border border-[#1a1a24] bg-[#0e0e14] overflow-hidden my-6">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a24]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1a1a24]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#1a1a24]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#1a1a24]" />
        <span className="ml-auto text-[10px] text-[#5a6070] font-mono tracking-wide">
          {language}
        </span>
      </div>
      <pre className="p-5 overflow-x-auto">
        <code
          className="text-[13px] leading-[1.75] font-mono text-[#c4c7d4] whitespace-pre"
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </pre>
    </div>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="font-mono text-[12.5px] px-1.5 py-0.5 rounded bg-[#0e0e14] border border-[#1a1a24] text-[#c4c7d4]">
      {children}
    </code>
  );
}

function Badge({
  children,
  color = "green",
}: {
  children: string;
  color?: "green" | "indigo" | "amber";
}) {
  const styles: Record<string, string> = {
    green: "bg-[rgba(16,185,129,0.08)] text-[rgba(16,185,129,0.9)] border-[rgba(16,185,129,0.2)]",
    indigo: "bg-[rgba(99,102,241,0.08)] text-[rgba(99,102,241,0.9)] border-[rgba(99,102,241,0.2)]",
    amber: "bg-[rgba(245,158,11,0.08)] text-[rgba(245,158,11,0.85)] border-[rgba(245,158,11,0.2)]",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border tracking-wide ${styles[color]}`}>
      {children}
    </span>
  );
}

function Note({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warn" | "tip";
}) {
  const styles: Record<string, { border: string; bg: string; label: string; labelColor: string }> = {
    info: { border: "rgba(99,102,241,0.25)", bg: "rgba(99,102,241,0.05)", label: "Note", labelColor: "rgba(99,102,241,0.9)" },
    warn: { border: "rgba(245,158,11,0.25)", bg: "rgba(245,158,11,0.04)", label: "Warning", labelColor: "rgba(245,158,11,0.85)" },
    tip: { border: "rgba(16,185,129,0.25)", bg: "rgba(16,185,129,0.04)", label: "Tip", labelColor: "rgba(16,185,129,0.9)" },
  };
  const s = styles[type];
  return (
    <div
      className="my-6 px-5 py-4 rounded-xl border text-sm text-[#8e95a3] leading-relaxed"
      style={{ borderColor: s.border, background: s.bg }}
    >
      <span className="font-semibold text-[12px] tracking-wide font-mono" style={{ color: s.labelColor }}>
        {s.label}
      </span>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-semibold text-[#f0f1f5] mt-16 mb-4 scroll-mt-24 group"
    >
      <a href={`#${id}`} className="hover:text-[#6366f1] transition-colors">
        {children}
      </a>
    </h2>
  );
}

function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-base font-semibold text-[#f0f1f5] mt-10 mb-3 scroll-mt-24">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] text-[#8e95a3] leading-[1.8] mb-4">{children}</p>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 container-page pt-24 pb-20">
          <div className="flex gap-12 lg:gap-16">

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
              <div className="sticky top-24">
                <nav className="space-y-6">
                  {SIDEBAR.map((group) => (
                    <div key={group.group}>
                      <p className="text-[10px] tracking-[0.16em] uppercase font-semibold text-[#5a6070] mb-2.5 font-mono">
                        {group.group}
                      </p>
                      <ul className="space-y-1">
                        {group.items.map((item) => {
                          const isExternal = "external" in item && item.external;
                          const Tag = isExternal ? "a" : Link;
                          const extra = isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {};
                          return (
                            <li key={item.href}>
                              <Tag
                                href={item.href}
                                {...extra}
                                className="block text-[13px] text-[#5a6070] hover:text-[#f0f1f5] py-1 transition-colors"
                              >
                                {item.label}
                              </Tag>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ── Content ── */}
            <main className="flex-1 min-w-0 max-w-3xl">

              {/* Header */}
              <div className="mb-12">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(16,185,129,0.9)] font-mono mb-3">
                  Documentation
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-[#f0f1f5] mb-4">
                  Stvor SDK
                </h1>
                <p className="text-[15px] text-[#8e95a3] leading-[1.7] max-w-2xl">
                  The execution trust layer for AI agents, wallets, and payment systems.
                  Verify every operation before it runs — not after.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge color="green">v0.1 — Alpha</Badge>
                  <Badge color="indigo">Apache 2.0</Badge>
                  <Badge color="amber">Design partner access</Badge>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#1a1a24] mb-12" />

              {/* ── Overview ── */}
              <H2 id="overview">Overview</H2>
              <P>
                Stvor is middleware for financial operations. It sits between the system that
                requests a transaction (an AI agent, a wallet, an API caller) and the system
                that executes it (an on-chain contract, a payment processor, a custody provider).
              </P>
              <P>
                The core idea: before any financial action runs, Stvor anchors a{" "}
                <strong className="text-[#c4c7d4] font-medium">cryptographic commitment</strong> to
                what the operation is supposed to do. When the operation is actually submitted,
                Stvor verifies the payload against that commitment. If they don't match — the call
                is blocked. Immediately. Before any funds move.
              </P>
              <Note type="tip">
                Stvor is not a firewall, monitoring system, or post-execution audit tool. It is a
                pre-execution commitment scheme. The difference matters: post-execution detection
                can tell you what went wrong. Pre-execution commitment prevents it from going wrong.
              </Note>

              {/* ── Quickstart ── */}
              <H2 id="quickstart">Quickstart</H2>
              <P>Install the SDK:</P>
              <Code language="bash">{`npm install @stvor/sdk
# or
yarn add @stvor/sdk
# or
pnpm add @stvor/sdk`}</Code>

              <P>Add your API key:</P>
              <Code language="bash">{`STVOR_API_KEY=sk_test_...`}</Code>

              <P>Verify your first operation:</P>
              <Code language="typescript">{`<span class="text-[#6366f1]">import</span> { Stvor } <span class="text-[#6366f1]">from</span> <span class="text-[rgba(16,185,129,0.9)]">"@stvor/sdk"</span>;

<span class="text-[#6366f1]">const</span> stvor = <span class="text-[#6366f1]">new</span> <span class="text-[rgba(245,158,11,0.85)]">Stvor</span>({
  apiKey: process.env.<span class="text-[rgba(245,158,11,0.85)]">STVOR_API_KEY</span>,
});

<span class="text-[#5a6070]">// 1. Anchor a commitment before the operation is built</span>
<span class="text-[#6366f1]">const</span> commitment = <span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">sign</span>({
  intent: <span class="text-[rgba(16,185,129,0.9)]">"transfer"</span>,
  recipient: <span class="text-[rgba(16,185,129,0.9)]">"0xABCD...1234"</span>,
  amount: <span class="text-[rgba(16,185,129,0.9)]">"500.00"</span>,
  currency: <span class="text-[rgba(16,185,129,0.9)]">"USDC"</span>,
});

<span class="text-[#5a6070]">// 2. Build the actual payload (this is where an attacker would change things)</span>
<span class="text-[#6366f1]">const</span> payload = buildTransferPayload(commitment);

<span class="text-[#5a6070]">// 3. Verify before submitting — throws if payload doesn't match commitment</span>
<span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">verify</span>(payload, commitment);

<span class="text-[#5a6070]">// 4. Safe to execute — receipt is cryptographic proof</span>
<span class="text-[#6366f1]">const</span> receipt = <span class="text-[#6366f1]">await</span> submitTransaction(payload);
console.<span class="text-[rgba(16,185,129,0.9)]">log</span>(receipt.stvor.id); <span class="text-[#5a6070]">// srv_01HXYZ...</span>`}</Code>

              <Note type="info">
                The SDK is currently in design partner alpha. API shapes are stable for
                partners but may shift before GA. Breaking changes will be announced with at
                least 2 weeks notice.
              </Note>

              {/* ── How it works ── */}
              <H2 id="how-it-works">How it works</H2>
              <P>
                Stvor operates in three phases on every operation:
              </P>

              <div className="my-8 space-y-4">
                {[
                  {
                    step: "01",
                    title: "Intent anchoring",
                    desc: "Before building the transaction payload, you declare what you intend to do. Stvor signs this intent with ed25519 and returns a commitment ID.",
                    color: "rgba(99,102,241,0.8)",
                  },
                  {
                    step: "02",
                    title: "Pre-execution verification",
                    desc: "When the payload is ready to submit, Stvor verifies every field against the signed commitment. Any mismatch — destination, amount, contract method, calldata — throws a VerificationError before the transaction is broadcast.",
                    color: "rgba(16,185,129,0.9)",
                  },
                  {
                    step: "03",
                    title: "Trust Receipt issuance",
                    desc: "After a verified execution, Stvor issues a signed Trust Receipt: a cryptographic record proving the executed payload matched the original intent. The receipt is stored on your infrastructure — Stvor never sees payload data.",
                    color: "rgba(245,158,11,0.85)",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-5 p-5 rounded-xl border border-[#1a1a24] bg-[#0e0e14]"
                  >
                    <span
                      className="text-[11px] font-mono font-bold shrink-0 mt-0.5"
                      style={{ color: item.color }}
                    >
                      {item.step}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-[#f0f1f5] mb-1">{item.title}</p>
                      <p className="text-[13px] text-[#8e95a3] leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Commitment anchoring ── */}
              <H2 id="commitment">Commitment anchoring</H2>
              <P>
                A commitment is a <InlineCode>sha256</InlineCode>-hashed representation of your intent,
                signed with ed25519. It binds: recipient address, amount, currency, chain, method selector,
                and an expiry timestamp. The commitment cannot be altered after issuance — any change to any
                field produces a different hash, which fails verification.
              </P>
              <Code language="typescript">{`<span class="text-[#6366f1]">const</span> commitment = <span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">sign</span>({
  intent: <span class="text-[rgba(16,185,129,0.9)]">"transfer"</span>,         <span class="text-[#5a6070]">// transfer | contract_call | approval | swap</span>
  recipient: <span class="text-[rgba(16,185,129,0.9)]">"0xABCD...1234"</span>,  <span class="text-[#5a6070]">// exact destination</span>
  amount: <span class="text-[rgba(16,185,129,0.9)]">"500.00"</span>,            <span class="text-[#5a6070]">// string to avoid float imprecision</span>
  currency: <span class="text-[rgba(16,185,129,0.9)]">"USDC"</span>,
  chain: <span class="text-[rgba(16,185,129,0.9)]">"base"</span>,
  expiresIn: <span class="text-[rgba(245,158,11,0.85)]">300</span>,            <span class="text-[#5a6070]">// seconds — commitment expires after 5 min</span>
  metadata: {                       <span class="text-[#5a6070]">// optional — stored in receipt</span>
    agentId: <span class="text-[rgba(16,185,129,0.9)]">"agent_7f3a2b"</span>,
    sessionId: <span class="text-[rgba(16,185,129,0.9)]">"sess_01HXYZ"</span>,
  },
});

<span class="text-[#5a6070]">// commitment.id     — "srv_01HXYZ..."  (reference this in your payload builder)</span>
<span class="text-[#5a6070]">// commitment.hash   — sha256 of the intent fields</span>
<span class="text-[#5a6070]">// commitment.sig    — ed25519 signature over the hash</span>
<span class="text-[#5a6070]">// commitment.expiry — ISO timestamp</span>`}</Code>

              {/* ── Trust Receipts ── */}
              <H2 id="trust-receipts">Trust Receipts</H2>
              <P>
                A Trust Receipt is a signed JSON document proving that an executed operation matched its
                pre-execution commitment. It is your audit trail, your compliance artifact, and your
                incident response evidence — all in one.
              </P>
              <Code language="typescript">{`<span class="text-[#5a6070]">// Receipt schema</span>
{
  id: <span class="text-[rgba(16,185,129,0.9)]">"rcp_01HXYZ..."</span>,
  commitment: <span class="text-[rgba(16,185,129,0.9)]">"srv_01HXYZ..."</span>,
  status: <span class="text-[rgba(16,185,129,0.9)]">"verified"</span>,             <span class="text-[#5a6070]">// verified | blocked | expired</span>
  verifiedAt: <span class="text-[rgba(16,185,129,0.9)]">"2025-01-15T14:23:01Z"</span>,
  signature: <span class="text-[rgba(16,185,129,0.9)]">"ed25519:..."</span>,          <span class="text-[#5a6070]">// verifiable without Stvor</span>
  fields: {
    intent: <span class="text-[rgba(16,185,129,0.9)]">"transfer"</span>,
    recipient: <span class="text-[rgba(16,185,129,0.9)]">"0xABCD...1234"</span>,
    amount: <span class="text-[rgba(16,185,129,0.9)]">"500.00"</span>,
    currency: <span class="text-[rgba(16,185,129,0.9)]">"USDC"</span>,
  },
  metadata: { agentId: <span class="text-[rgba(16,185,129,0.9)]">"agent_7f3a2b"</span> },
}`}</Code>

              <P>
                Receipts are verifiable offline using the Stvor public key — you don{"`"}t need to call
                the API to verify a receipt. The public key is published at{" "}
                <InlineCode>https://stvor.xyz/.well-known/jwks.json</InlineCode>.
              </P>

              {/* ── Policy gates ── */}
              <H2 id="policy-gates">Policy gates</H2>
              <P>
                Policy gates let you define rules that must pass before a commitment is issued.
                If a rule fails, <InlineCode>stvor.sign()</InlineCode> throws a{" "}
                <InlineCode>PolicyViolationError</InlineCode> — no commitment, no execution.
              </P>
              <Code language="typescript">{`<span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">policy</span>.<span class="text-[rgba(16,185,129,0.9)]">set</span>({
  maxAmount: { value: <span class="text-[rgba(16,185,129,0.9)]">"10000"</span>, currency: <span class="text-[rgba(16,185,129,0.9)]">"USDC"</span> },
  allowedRecipients: [<span class="text-[rgba(16,185,129,0.9)]">"0xABCD..."</span>, <span class="text-[rgba(16,185,129,0.9)]">"0xEF01..."</span>],
  allowedChains: [<span class="text-[rgba(16,185,129,0.9)]">"base"</span>, <span class="text-[rgba(16,185,129,0.9)]">"ethereum"</span>],
  allowedIntents: [<span class="text-[rgba(16,185,129,0.9)]">"transfer"</span>, <span class="text-[rgba(16,185,129,0.9)]">"approval"</span>],
  requireMfa: <span class="text-[rgba(16,185,129,0.9)]">true</span>,                        <span class="text-[#5a6070]">// for amounts over threshold</span>
  mfaThreshold: { value: <span class="text-[rgba(16,185,129,0.9)]">"5000"</span>, currency: <span class="text-[rgba(16,185,129,0.9)]">"USDC"</span> },
});`}</Code>

              {/* ── SDK Reference ── */}
              <H2 id="verify">stvor.verify()</H2>
              <P>
                Verifies that a transaction payload matches a previously issued commitment.
                Throws <InlineCode>VerificationError</InlineCode> if any field has changed.
              </P>
              <Code language="typescript">{`<span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">verify</span>(
  payload,      <span class="text-[#5a6070]">// the actual transaction object you're about to submit</span>
  commitment,   <span class="text-[#5a6070]">// the commitment returned by stvor.sign()</span>
  options?: {
    strict: <span class="text-[rgba(245,158,11,0.85)]">boolean</span>;       <span class="text-[#5a6070]">// default true — any extra field fails verification</span>
    checkExpiry: <span class="text-[rgba(245,158,11,0.85)]">boolean</span>;   <span class="text-[#5a6070]">// default true — expired commitments fail</span>
  }
);`}</Code>

              <H2 id="sign">stvor.sign()</H2>
              <P>
                Creates a signed commitment anchoring the intent. Must be called before
                building the transaction payload.
              </P>

              <H2 id="policy">stvor.policy()</H2>
              <P>
                Manages verification policy rules. Policies are evaluated on every{" "}
                <InlineCode>stvor.sign()</InlineCode> call.
              </P>

              <H2 id="receipt">stvor.receipt()</H2>
              <P>
                Retrieves or verifies a Trust Receipt by ID. Use this for audit,
                compliance reporting, or incident investigation.
              </P>
              <Code language="typescript">{`<span class="text-[#6366f1]">const</span> receipt = <span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">receipt</span>.<span class="text-[rgba(16,185,129,0.9)]">get</span>(<span class="text-[rgba(16,185,129,0.9)]">"rcp_01HXYZ"</span>);
<span class="text-[#6366f1]">const</span> isValid = <span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">receipt</span>.<span class="text-[rgba(16,185,129,0.9)]">verify</span>(receipt); <span class="text-[#5a6070]">// offline — no API call</span>
<span class="text-[#6366f1]">const</span> batch = <span class="text-[#6366f1]">await</span> stvor.<span class="text-[rgba(16,185,129,0.9)]">receipt</span>.<span class="text-[rgba(16,185,129,0.9)]">list</span>({ agentId: <span class="text-[rgba(16,185,129,0.9)]">"agent_7f3a2b"</span> });`}</Code>

              {/* ── Integrations ── */}
              <H2 id="langchain">LangChain</H2>
              <P>
                Wrap any LangChain tool with Stvor verification. The middleware intercepts
                tool calls, anchors the intent, and verifies before execution.
              </P>
              <Code language="typescript">{`<span class="text-[#6366f1]">import</span> { StvorTool } <span class="text-[#6366f1]">from</span> <span class="text-[rgba(16,185,129,0.9)]">"@stvor/langchain"</span>;
<span class="text-[#6366f1]">import</span> { PaymentTool } <span class="text-[#6366f1]">from</span> <span class="text-[rgba(16,185,129,0.9)]">"./tools"</span>;

<span class="text-[#6366f1]">const</span> safeTool = <span class="text-[#6366f1]">new</span> <span class="text-[rgba(245,158,11,0.85)]">StvorTool</span>(PaymentTool, {
  stvor,
  policy: { maxAmount: { value: <span class="text-[rgba(16,185,129,0.9)]">"1000"</span>, currency: <span class="text-[rgba(16,185,129,0.9)]">"USDC"</span> } },
});

<span class="text-[#5a6070]">// Use safeTool anywhere you'd use PaymentTool — it's a drop-in wrapper.</span>
<span class="text-[#5a6070]">// Any tool call that changes destination or amount is blocked before execution.</span>`}</Code>

              <H2 id="openai-agents">OpenAI Agents SDK</H2>
              <Code language="typescript">{`<span class="text-[#6366f1]">import</span> { stvorMiddleware } <span class="text-[#6366f1]">from</span> <span class="text-[rgba(16,185,129,0.9)]">"@stvor/openai-agents"</span>;

<span class="text-[#6366f1]">const</span> agent = <span class="text-[#6366f1]">new</span> <span class="text-[rgba(245,158,11,0.85)]">Agent</span>({
  name: <span class="text-[rgba(16,185,129,0.9)]">"treasury-agent"</span>,
  tools: [paymentTool, swapTool],
  middleware: [<span class="text-[rgba(245,158,11,0.85)]">stvorMiddleware</span>(stvor)],  <span class="text-[#5a6070]">// one line — all tools are protected</span>
});`}</Code>

              <H2 id="mcp">MCP (Model Context Protocol)</H2>
              <Code language="typescript">{`<span class="text-[#6366f1]">import</span> { stvorMCP } <span class="text-[#6366f1]">from</span> <span class="text-[rgba(16,185,129,0.9)]">"@stvor/mcp"</span>;

<span class="text-[#5a6070]">// In your MCP server, wrap your financial tools:</span>
<span class="text-[#6366f1]">const</span> server = <span class="text-[#6366f1]">new</span> <span class="text-[rgba(245,158,11,0.85)]">MCPServer</span>({
  tools: <span class="text-[rgba(245,158,11,0.85)]">stvorMCP</span>(stvor, [transferTool, swapTool]),
});`}</Code>

              {/* ── Cryptography ── */}
              <H2 id="cryptography">Cryptography</H2>
              <P>
                Stvor uses <strong className="text-[#c4c7d4] font-medium">ed25519</strong> for all
                commitment signing and receipt issuance. ed25519 was chosen for its performance
                (&lt;2ms signing on commodity hardware), small key size (32 bytes), and immunity to
                several classes of fault attacks that affect ECDSA.
              </P>
              <P>
                The hash function used in commitment construction is{" "}
                <strong className="text-[#c4c7d4] font-medium">SHA-256</strong>. The hashed fields are
                canonicalized (sorted keys, trimmed whitespace, amount normalized to 18 decimal places)
                before hashing to prevent encoding-variant attacks.
              </P>
              <Note type="warn">
                Post-quantum migration: NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) migration
                tooling is on the roadmap for 2027. The SDK will provide a migration path that does
                not require re-anchoring existing commitments.
              </Note>

              <H2 id="key-management">Key management</H2>
              <P>
                By default, Stvor manages signing keys in its hosted KMS. For enterprise customers,
                bring-your-own-key (BYOK) is supported — Stvor never sees your private key. The
                signing operation happens locally; only the commitment hash and signature are sent
                to Stvor for verification.
              </P>
              <Code language="typescript">{`<span class="text-[#5a6070]">// BYOK mode — Stvor never sees your private key</span>
<span class="text-[#6366f1]">const</span> stvor = <span class="text-[#6366f1]">new</span> <span class="text-[rgba(245,158,11,0.85)]">Stvor</span>({
  apiKey: process.env.<span class="text-[rgba(245,158,11,0.85)]">STVOR_API_KEY</span>,
  keyMode: <span class="text-[rgba(16,185,129,0.9)]">"byok"</span>,
  privateKey: process.env.<span class="text-[rgba(245,158,11,0.85)]">MY_ED25519_PRIVATE_KEY</span>,
});`}</Code>

              <H2 id="threat-model">Threat model</H2>
              <P>
                Stvor protects against three classes of attack on AI-driven financial operations:
              </P>
              <div className="my-6 space-y-3">
                {[
                  {
                    threat: "Payload manipulation",
                    desc: "An attacker modifies the transaction payload between intent and submission — changing the recipient, inflating the amount, or rerouting to a different contract. Stvor catches this because the modified payload produces a different hash from the commitment.",
                    color: "rgba(239,68,68,0.7)",
                  },
                  {
                    threat: "Authorization gap",
                    desc: "An AI agent is authorized to execute operation A, then submits operation B. Stvor closes this gap because the commitment is bound to the specific fields of the authorized operation. A different operation produces a different commitment.",
                    color: "rgba(239,68,68,0.7)",
                  },
                  {
                    threat: "Context injection / prompt injection",
                    desc: "An attacker injects instructions into the agent's context, causing it to issue a legitimate-looking commitment for a malicious operation. This is partially mitigated by policy gates — the injected operation must still pass policy rules before a commitment is issued.",
                    color: "rgba(245,158,11,0.7)",
                  },
                ].map((item) => (
                  <div key={item.threat} className="p-5 rounded-xl border border-[#1a1a24] bg-[#0e0e14]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                      <p className="text-[13px] font-semibold text-[#f0f1f5]">{item.threat}</p>
                    </div>
                    <p className="text-[13px] text-[#8e95a3] leading-[1.7]">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* ── Changelog ── */}
              <H2 id="changelog">Changelog</H2>
              <div className="space-y-6">
                {[
                  {
                    version: "0.1.0",
                    date: "2025-01-15",
                    badge: "alpha",
                    items: [
                      "Initial design partner release",
                      "stvor.sign(), stvor.verify(), stvor.receipt() — core commitment API",
                      "LangChain adapter (StvorTool wrapper)",
                      "OpenAI Agents SDK middleware",
                      "ed25519 signing, SHA-256 commitment hashing",
                      "Policy gates: maxAmount, allowedRecipients, allowedChains",
                      "Offline receipt verification via published JWKS",
                    ],
                  },
                ].map((release) => (
                  <div key={release.version} className="border border-[#1a1a24] rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1a1a24] bg-[#0e0e14]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-[#f0f1f5]">
                          v{release.version}
                        </span>
                        <Badge color="amber">{release.badge}</Badge>
                      </div>
                      <span className="text-[11px] font-mono text-[#5a6070]">{release.date}</span>
                    </div>
                    <ul className="p-5 space-y-2">
                      {release.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[13px] text-[#8e95a3]">
                          <span className="text-[rgba(16,185,129,0.7)] mt-0.5 shrink-0">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* CTA footer */}
              <div className="mt-16 p-8 rounded-2xl border border-[#1a1a24] bg-[#0e0e14] text-center">
                <p className="text-sm text-[#5a6070] mb-2">Missing something?</p>
                <p className="text-[15px] font-semibold text-[#f0f1f5] mb-5">
                  We&apos;re in design partner alpha — your feedback shapes the API.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://github.com/stvor-hq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 text-sm font-medium border border-[#252530] text-[#8e95a3] hover:text-[#f0f1f5] hover:border-[rgba(255,255,255,0.15)] rounded-[6px] transition-all"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:founder@stvor.xyz?subject=Docs%20feedback"
                    className="px-5 py-2 text-sm font-semibold bg-[#f0f1f5] text-[#06060a] hover:opacity-90 rounded-[6px] transition-opacity"
                  >
                    Send feedback
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
