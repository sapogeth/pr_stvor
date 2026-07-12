export type DocsNavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type DocsNavGroup = {
  group: string;
  items: DocsNavItem[];
};

export const DOCS_PAGES = [
  { slug: "", title: "Overview", description: "Start here" },
  { slug: "how-it-works", title: "How it works", description: "Four checks, attacks, cryptography" },
  { slug: "integrate", title: "Integration guide", description: "Pilot onboarding and wiring" },
  { slug: "ats-1", title: "ATS-1 spec", description: "Trust Receipt format (draft)" },
] as const;

export const DOCS_SIDEBAR: Record<string, DocsNavGroup[]> = {
  "": [
    {
      group: "Documentation",
      items: [
        { label: "Overview", href: "/docs" },
        { label: "How it works", href: "/docs/how-it-works" },
        { label: "Integration guide", href: "/docs/integrate" },
        { label: "ATS-1 spec", href: "/docs/ats-1" },
      ],
    },
    {
      group: "Resources",
      items: [
        { label: "Research", href: "/research" },
        { label: "Security", href: "/security" },
        { label: "GitHub", href: "https://github.com/stvor-hq", external: true },
        { label: "Live reference (nous)", href: "https://nous.stvor.xyz", external: true },
      ],
    },
  ],
  "how-it-works": [
    {
      group: "How it works",
      items: [
        { label: "Overview", href: "#overview" },
        { label: "01 · Four checks", href: "#four-checks" },
        { label: "02 · Payload attestation", href: "#payload-attestation" },
        { label: "03 · Counterparty trust", href: "#counterparty-trust" },
        { label: "04 · Stripe reference flow", href: "#stripe-reference" },
        { label: "05 · Trust Receipt", href: "#trust-receipt" },
        { label: "06 · Threat model", href: "#threat-model" },
        { label: "07 · References", href: "#references" },
      ],
    },
    {
      group: "See also",
      items: [
        { label: "Integration guide →", href: "/docs/integrate" },
        { label: "ATS-1 spec →", href: "/docs/ats-1" },
      ],
    },
  ],
  integrate: [
    {
      group: "Integration guide",
      items: [
        { label: "Overview", href: "#overview" },
        { label: "01 · Pilot onboarding", href: "#pilot" },
        { label: "02 · Checkpoint placement", href: "#checkpoint" },
        { label: "03 · Commitment + verify", href: "#commit-verify" },
        { label: "04 · Webhook pattern", href: "#webhook" },
        { label: "05 · Receipt issuance", href: "#receipt" },
        { label: "06 · Payment rails", href: "#rails" },
      ],
    },
    {
      group: "See also",
      items: [
        { label: "ATS-1 spec →", href: "/docs/ats-1" },
        { label: "How it works →", href: "/docs/how-it-works" },
      ],
    },
  ],
  "ats-1": [
    {
      group: "ATS-1 draft",
      items: [
        { label: "Motivation", href: "#motivation" },
        { label: "TrustReceipt schema", href: "#receipt-schema" },
        { label: "Signing requirements", href: "#signing" },
        { label: "Verification gate", href: "#verification-gate" },
        { label: "Escrow lifecycle", href: "#escrow" },
        { label: "Offline verification", href: "#offline-verify" },
        { label: "Compatibility", href: "#compatibility" },
      ],
    },
    {
      group: "See also",
      items: [
        { label: "← Integration guide", href: "/docs/integrate" },
        { label: "How it works →", href: "/docs/how-it-works" },
      ],
    },
  ],
};
