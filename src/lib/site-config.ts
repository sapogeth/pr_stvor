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

  social: {
    github: "https://github.com/stvor-hq",
    twitter: "https://x.com/hq_stvor",
  },

  demo: {
    attack: "https://nous.stvor.xyz/attack",
    live: "https://nous.stvor.xyz/demo",
    local: "/demo",
    registerApi: "https://nous.stvor.xyz/api/v1/agents/register",
  },

  cta: {
    pilot:
      "mailto:founder@stvor.xyz?subject=Paid%202-week%20pilot%20—%20Stvor&body=Hi%2C%0A%0AI%27d%20like%20to%20book%20the%20paid%202-week%20pilot.%0A%0AProduct%3A%0AWhat%20executes%20today%20(agent%2Fwallet%2Frail)%3A%0AVolume%20or%20treasury%20at%20risk%3A%0A",
    pilotTally: "https://tally.so/r/Me80kk",
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
