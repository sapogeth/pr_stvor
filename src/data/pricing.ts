import { siteConfig } from "@/lib/site-config";

export type PricingTier = {
  id: string;
  name: string;
  monthly: number | null;
  annual: number | null;
  pricePrefix?: string;
  customLabel?: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free (Open Source)",
    monthly: 0,
    annual: 0,
    pricePrefix: "$",
    tagline: "Self-hosted, full features",
    features: [
      "MIT licensed core",
      "Unlimited agents (self-hosted)",
      "Community support (Discord / GitHub)",
      "All cryptographic primitives",
      "X3DH + Double Ratchet",
    ],
    cta: { label: "Star on GitHub", href: siteConfig.social.github },
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 499,
    annual: 4990,
    pricePrefix: "$",
    tagline: "Managed registry for production",
    features: [
      "Hosted identity registry",
      "Up to 1,000 active agents",
      "Audit logs (30-day retention)",
      "Email support (48h response)",
      "99.5% uptime SLA",
    ],
    cta: { label: "Book the pilot", href: siteConfig.cta.pilot },
  },
  {
    id: "business",
    name: "Business",
    monthly: 2499,
    annual: 24990,
    pricePrefix: "$",
    tagline: "For scaling teams",
    features: [
      "Up to 50,000 active agents",
      "Full audit logs (1-year retention)",
      "SOC 2 / HIPAA / EU AI Act ready",
      "Slack support (4h response)",
      "99.9% uptime SLA",
      "AA UserOp binding helpers",
    ],
    cta: { label: "Book the pilot", href: siteConfig.cta.pilot },
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    annual: null,
    customLabel: "Contact us",
    tagline: "Dedicated infrastructure",
    features: [
      "Unlimited agents",
      "On-prem deployment option",
      "Custom SLA",
      "Dedicated integration support",
      "Stvor Certified badge",
      "Annual security review",
    ],
    cta: { label: "Book the pilot", href: siteConfig.cta.pilot },
  },
];

export const pricingFAQ = [
  {
    q: "Why no self-serve checkout right now?",
    a: "We're onboarding paying customers manually so each integration gets proper support. Self-serve checkout is on the roadmap once the SDK exits early access.",
  },
  {
    q: "Can I switch tiers later?",
    a: "Yes. We'll prorate the difference and adjust your registry quotas accordingly.",
  },
  {
    q: "Do you support purchase orders?",
    a: "Enterprise tier only. Reach out to founder@stvor.xyz with your procurement contact.",
  },
  {
    q: "What if I need more than 50,000 agents?",
    a: "Contact us for custom pricing on the Enterprise tier.",
  },
];
