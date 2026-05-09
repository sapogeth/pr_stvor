import { Wallet, Bot, Wrench, ShieldCheck, type LucideIcon } from "lucide-react";

export type UseCase = {
  icon: LucideIcon;
  audience: string;
  pitch: string;
  bullets: string[];
};

export const useCases: UseCase[] = [
  {
    icon: Wallet,
    audience: "AA Wallet Teams",
    pitch:
      "Add cryptographic session-to-wallet binding. Block phishing through cryptography, not heuristics.",
    bullets: [
      "Drop-in for ERC-4337 and TON Wallet v5",
      "UserOp ↔ session binding helpers",
      "Deterministic key derivation from existing wallets",
    ],
  },
  {
    icon: Bot,
    audience: "AI Agent Platforms",
    pitch:
      "Give your agents cryptographic identity. Verify agent-to-agent communication.",
    bullets: [
      "Per-agent delegation scopes & value caps",
      "Forward-secret messaging via Double Ratchet",
      "Long-term confidentiality for EU AI Act",
    ],
  },
  {
    icon: Wrench,
    audience: "AI Dev Tools",
    pitch:
      "Enable secure agent-to-tool communication via MCP. Cryptographically prove which agent called which tool.",
    bullets: [
      "Native MCP server bindings",
      "Audit trail of agent → tool invocations",
      "Vendor-neutral, no platform lock-in",
    ],
  },
  {
    icon: ShieldCheck,
    audience: "Regulated AI",
    pitch:
      "Healthcare, finance, legal — agent communications that meet long-term confidentiality requirements.",
    bullets: [
      "ML-KEM-768 + ML-DSA-65 (NIST FIPS 203/204)",
      "Audit logs ready for HIPAA, SOC 2, EU AI Act",
      "Self-hosted option, on-prem available",
    ],
  },
];
