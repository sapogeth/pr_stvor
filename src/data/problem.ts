import { Lock, Link2, FileWarning, type LucideIcon } from "lucide-react";

export type ProblemCard = {
  icon: LucideIcon;
  title: string;
  body: string;
  sub?: string;
};

export const problemCards: ProblemCard[] = [
  {
    icon: Lock,
    title: "Agent called a tool. Moved $4,000. Who authorized it?",
    body: "Nobody can prove it. Plain HTTP, plain API keys — one leaked key and it's full compromise with no attribution.",
    sub: "Stvor makes every agent action attributable and auditable.",
  },
  {
    icon: Link2,
    title: "AA wallets can't bind sessions",
    body: "Your ERC-4337 wallet signs UserOps. But how do you prove the messaging session belongs to that wallet? Currently you can't. Phishing succeeds because of this gap.",
  },
  {
    icon: FileWarning,
    title: "No audit trail for EU AI Act compliance",
    body: "EU AI Act, HIPAA, SOC 2 require you to log what your agents did and prove it wasn't tampered with. Manual logging doesn't hold up. Cryptographic audit trails do.",
  },
];
