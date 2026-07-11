export const siteConfig = {
  name: "Stvor",
  title: "Stvor — The Execution Trust Layer for AI-Driven Finance",
  shortTitle: "Stvor — Verify Before Execute",
  description:
    "STVOR is the execution trust layer for AI agents, wallets, and payment systems. Every payment, transfer, and contract call is verified against a cryptographic commitment before it runs. Not after. Never after.",
  keywords: [
    "execution trust layer",
    "AI agent security",
    "pre-execution verification",
    "payment security",
    "wallet security",
    "stablecoin infrastructure",
    "crypto compliance",
    "trust receipt",
    "agent authorization",
    "programmable finance",
    "NIST FIPS 203",
    "post-quantum",
  ],
  url: "https://stvor.xyz",

  emails: {
    founder: "founder@stvor.xyz",
  },

  social: {
    github: "https://github.com/stvor-hq",
    twitter: "https://x.com/hq_stvor",
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
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Compare", href: "#compare" },
  { label: "Docs", href: "/docs" },
  { label: "Security", href: "/security" },
] as const;
