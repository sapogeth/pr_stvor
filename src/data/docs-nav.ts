import { siteConfig } from "@/lib/site-config";

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
  { slug: "how-it-works", title: "How it works", description: "commit → verify → settle, cryptography" },
  { slug: "integrate", title: "Integration guide", description: "SDK + api.stvor.xyz wiring" },
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
        { label: "Browser verifier", href: siteConfig.api.verifier, external: true },
        { label: "Test vectors", href: siteConfig.api.fixtures, external: true },
        { label: "Research", href: "/research" },
        { label: "Security", href: "/security" },
        { label: "GitHub", href: "https://github.com/stvor-hq", external: true },
        { label: "Hackathon ref (nous)", href: "https://nous.stvor.xyz", external: true },
      ],
    },
  ],
  "how-it-works": [
    {
      group: "How it works",
      items: [
        { label: "Overview", href: "#overview" },
        { label: "01 · commit → verify → settle", href: "#flow" },
        { label: "02 · What verify checks", href: "#three-checks" },
        { label: "03 · Payload attestation", href: "#payload-attestation" },
        { label: "04 · Intent binding", href: "#binding" },
        { label: "05 · Stripe reference flow", href: "#stripe-reference" },
        { label: "06 · Trust Receipt", href: "#trust-receipt" },
        { label: "07 · Threat model", href: "#threat-model" },
        { label: "08 · References", href: "#references" },
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
        { label: "01 · SDK install", href: "#sdk" },
        { label: "02 · Pilot onboarding", href: "#pilot" },
        { label: "03 · Checkpoint placement", href: "#checkpoint" },
        { label: "04 · API: commit + verify", href: "#commit-verify" },
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
