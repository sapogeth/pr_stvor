export const siteConfig = {
  name: "Stvor",
  title: "Stvor — Pre-execution verification for agents that move money",
  shortTitle: "Stvor — Verify before execute",
  description:
    "Stvor checks that what your agent is about to execute still matches what was committed at intent time — destination, payload, policy, counterparty trust. Any check fails → execution denied. Signed Trust Receipt after each action.",
  keywords: [
    "pre-execution verification",
    "AI agent security",
    "agent payments",
    "trust receipt",
    "ATS-1",
    "payload integrity",
    "destination swap",
    "prompt injection",
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
    pilot:
      "mailto:founder@stvor.xyz?subject=Paid%202-week%20pilot%20—%20Stvor&body=Hi%2C%0A%0AI%27d%20like%20to%20book%20the%20paid%202-week%20pilot.%0A%0AProduct%3A%0AWhat%20executes%20today%20(agent%2Fwallet%2Frail)%3A%0AVolume%20or%20treasury%20at%20risk%3A%0A",
    pilotTally: "https://tally.so/r/Me80kk",
    ats1: "/research#ats-1",
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
} as const;

export const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Who it's for", href: "#who-its-for" },
  { label: "Compare", href: "#compare" },
  { label: "ATS-1 spec", href: "/research#ats-1" },
  { label: "GitHub", href: "https://github.com/stvor-hq" },
] as const;
