import {
  COMMIT_CURL,
  STVOR_API_BASE,
  STVOR_ENDPOINTS,
  STVOR_FIXTURES_URL,
  STVOR_SANDBOX_API_KEY,
  STVOR_VERIFIER_URL,
  VERIFY_ALLOW_CURL,
  VERIFY_CURL,
  VERIFY_DENY_CURL,
} from "./contract";

export const siteConfig = {
  name: "Stvor",
  title: "Stvor — Stop wrong-agent payments before they execute",
  shortTitle: "Stvor — Catch it before the money moves",
  description:
    "Your AI agent was about to pay the wrong address. Stvor binds intent to execution before funds move — swapped destination is a signed DENY, not a silent pass. Verify receipts offline. Try the demo in 30 seconds.",
  keywords: [
    "AI agent payments",
    "wrong address transfer",
    "agent security",
    "pre-execution verification",
    "destination swap",
    "trust receipt",
  ],
  url: "https://stvor.xyz",

  api: {
    base: STVOR_API_BASE,
    endpoints: STVOR_ENDPOINTS,
    verifier: STVOR_VERIFIER_URL,
    fixtures: STVOR_FIXTURES_URL,
  },

  emails: {
    founder: "founder@stvor.xyz",
  },

  contact: {
    telegram: "https://t.me/kun_sapog",
    handle: "@kun_sapog",
  },

  social: {
    github: "https://github.com/stvor-hq/core",
    twitter: "https://x.com/hq_stvor",
    telegram: "https://t.me/kun_sapog",
  },

  demo: {
    attack: "https://nous.stvor.xyz/attack",
    live: "https://nous.stvor.xyz/demo",
    local: "/demo",
    verifier: STVOR_VERIFIER_URL,
  },

  cta: {
    contact: "https://t.me/kun_sapog",
    pilot:
      "https://t.me/kun_sapog?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20the%20Stvor%20pilot.%0A%0AWhat%20executes%20today%20(agent%2Fwallet%2Frail)%3A%0AVolume%20at%20risk%3A%0A",
    ats1: "/docs/ats-1",
    docs: "/docs",
    github: "https://github.com/stvor-hq/core",
  },

  pilot: {
    duration: "2 weeks",
    headline: "Design partner",
    summary:
      "I stand up a Stvor checkpoint in front of your execution flow — commit intent, verify at execution, settle only on ALLOW — plus a signed Trust Receipt for every decision. I do the integration. At the end it works and you keep going, or you pay nothing further.",
  },

  commitCurl: COMMIT_CURL,
  verifyAllowCurl: VERIFY_ALLOW_CURL,
  verifyDenyCurl: VERIFY_DENY_CURL,
  verifyCurl: VERIFY_CURL,
  sandboxApiKey: STVOR_SANDBOX_API_KEY,
} as const;

/** Live design partner integrations — named only with permission. */
export const designPartners = [
  {
    name: "OrbServ",
    url: "https://orbserv.co",
    note: "Agent financial ecosystem",
  },
  {
    name: "OrbWallet",
    url: "https://orbserv.co",
    note: "Wallet rail integration",
  },
] as const;

export const navItems = [
  { label: "Demo", href: "/demo" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs", href: "/docs" },
  { label: "Compare", href: "#compare" },
] as const;
