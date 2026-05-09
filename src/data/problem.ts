import { Lock, Link2, Hourglass, type LucideIcon } from "lucide-react";

export type ProblemCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const problemCards: ProblemCard[] = [
  {
    icon: Lock,
    title: "Agents have no cryptographic identity",
    body: "When AI agent A talks to agent B, there's no way to prove \"I'm authorized to act for this user.\" Plain HTTP. Plain API keys. One leaked key — full compromise.",
  },
  {
    icon: Link2,
    title: "AA wallets can't bind sessions",
    body: "Your ERC-4337 wallet signs UserOps. But how do you prove the messaging session belongs to that wallet? Currently you can't. Phishing succeeds because of this gap.",
  },
  {
    icon: Hourglass,
    title: "Quantum migration is mandated",
    body: "NIST CNSA 2.0, EU DORA, EU AI Act. Compliance officers need PQC migration paths today. Engineers need a drop-in solution, not a 12-month rewrite.",
  },
];
