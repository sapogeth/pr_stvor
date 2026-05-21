export const siteConfig = {
  name: "Stvor",
  title: "Stvor — Cryptographic Infrastructure for AI Agents | Post-Quantum E2EE",
  shortTitle: "Stvor — Cryptographic Infrastructure for AI Agents",
  description:
    "Post-quantum secure identity, messaging, and wallet binding for ERC-4337 and TON. Vendor-neutral. Standards-based, engineered for production. Built on NIST FIPS 203/204 algorithms.",
  keywords: [
    "post-quantum cryptography",
    "AI agent security",
    "ERC-4337",
    "AA wallets",
    "MCP",
    "TON",
    "ML-KEM",
    "ML-DSA",
    "agent identity",
    "E2EE",
  ],
  url: "https://pqc.stvor.xyz",

  emails: {
    founder: "founder@stvor.xyz",
  },

  social: {
    github: "https://github.com/stvor",
    twitter: "https://x.com/kun_sapog",
  },

  cta: {
    demo: "mailto:founder@stvor.xyz?subject=Demo%20Request%20—%20Stvor&body=Hi%2C%20I%27d%20like%20to%20book%20a%20demo.%0A%0ACompany%3A%0ARole%3A%0AUse%20case%3A%20%5BAA%20Wallet%20%2F%20AI%20Agent%20Platform%20%2F%20Other%5D%0A",
    enterprise: "mailto:founder@stvor.xyz?subject=Enterprise%20Inquiry%20—%20Stvor",
    pilot: "https://tally.so/r/Me80kk",
    docs: "/docs",
    quickstart: "/docs#quickstart",
  },

  pricing: {
    proCheckout:
      "mailto:founder@stvor.xyz?subject=Stvor%20Pro%20%E2%80%94%20Early%20access%20request&body=Hi%2C%0A%0AI%27d%20like%20to%20get%20early%20access%20to%20the%20Stvor%20Pro%20tier.%0A%0ACompany%3A%0AAgents%20expected%3A%0AUse%20case%3A%0A",
    businessCheckout:
      "mailto:founder@stvor.xyz?subject=Stvor%20Business%20%E2%80%94%20Book%20a%20call&body=Hi%2C%0A%0AI%27d%20like%20to%20book%20a%20call%20about%20the%20Stvor%20Business%20tier.%0A%0ACompany%3A%0AAgents%20expected%3A%0ATimeline%3A%0AUse%20case%3A%0A",
  },
} as const;

export const navItems = [
  { label: "Demo", href: "/demo" },
  { label: "Compare", href: "/compare" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Security", href: "/security" },
] as const;
