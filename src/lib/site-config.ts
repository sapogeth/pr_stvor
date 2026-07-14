export const siteConfig = {
  name: "Stvor",
  title: "Stvor — Stop wrong-agent payments before they execute",
  shortTitle: "Stvor — Catch it before the money moves",
  description:
    "Your AI agent was about to pay the wrong address. Stvor checks destination and payload before execution — blocks bad transfers and leaves signed proof. Try the attack demo in 30 seconds, no signup.",
  keywords: [
    "AI agent payments",
    "wrong address transfer",
    "agent security",
    "pre-execution verification",
    "destination swap",
    "trust receipt",
  ],
  url: "https://stvor.xyz",

  emails: {
    founder: "founder@stvor.xyz",
  },

  contact: {
    telegram: "https://t.me/kun_sapog",
    handle: "@kun_sapog",
  },

  social: {
    github: "https://github.com/stvor-hq",
    twitter: "https://x.com/hq_stvor",
    telegram: "https://t.me/kun_sapog",
  },

  demo: {
    attack: "https://nous.stvor.xyz/attack",
    live: "https://nous.stvor.xyz/demo",
    local: "/demo",
    registerApi: "https://nous.stvor.xyz/api/v1/agents/register",
  },

  cta: {
    contact: "https://t.me/kun_sapog",
    pilot:
      "https://t.me/kun_sapog?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20the%20Stvor%20pilot.%0A%0AWhat%20executes%20today%20(agent%2Fwallet%2Frail)%3A%0AVolume%20at%20risk%3A%0A",
    ats1: "/docs/ats-1",
    docs: "/docs",
    github: "https://github.com/stvor-hq",
  },

  pilot: {
    price: "$500",
    duration: "2 weeks",
    headline: "Paid 2-week pilot",
    summary:
      "I stand up a Stvor checkpoint in front of your execution flow — verify intent, destination, and payload before execution → ALLOW or DENY — plus a signed Trust Receipt after each action. I do the integration. At the end it works and you keep going, or you pay nothing further.",
  },

  registerAgentCurl: `curl -X POST https://nous.stvor.xyz/api/v1/agents/register \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "My Agent",
    "specialty": "Research",
    "endpoint_url": "https://my-agent.example.com/webhook"
  }'`,
} as const;

export const navItems = [
  { label: "Demo", href: "/demo" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs", href: "/docs" },
  { label: "Compare", href: "#compare" },
] as const;
