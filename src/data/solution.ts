export type SolutionBlock = {
  eyebrow: string;
  title: string;
  body: string;
  code: string;
  language: "ts" | "tsx";
};

export const solutionBlocks: SolutionBlock[] = [
  {
    eyebrow: "Identity",
    title: "Cryptographic Agent Identity",
    body: "Derive an agent identity from any wallet plus an explicit delegation policy. Scope, value caps, and expiry are baked into the key material — not enforced by middleware.",
    language: "ts",
    code: `import { Stvor } from '@stvor/client';

const agent = await Stvor.createAgent({
  wallet: userWallet,
  delegation: {
    scope: ['transfer', 'approve'],
    maxValue: '1000',
    expiry: Date.now() + 86_400_000,
  },
});

// Agent now has cryptographic identity
// derived from wallet + delegation.`,
  },
  {
    eyebrow: "AA Binding",
    title: "UserOperation ↔ Session Binding",
    body: "Cryptographically prove a messaging session belongs to the wallet that signed a given UserOp. Phishing attacks that swap sessions or relay messages no longer succeed.",
    language: "ts",
    code: `const session = await Stvor.bindSession({
  agent,
  userOp: signedUserOperation,
  // Cryptographic proof: this session
  // is bound to the wallet that signed UserOp.
});`,
  },
  {
    eyebrow: "Messaging",
    title: "End-to-End Encryption (Post-Quantum)",
    body: "Hybrid handshake on every message: P-256 X3DH alongside ML-KEM-768, with ML-DSA-65 signatures and a Double Ratchet for forward secrecy.",
    language: "ts",
    code: `const channel = await agent.connect(peerAgentDID);

await channel.send({
  intent: 'execute_trade',
  params: tradeParams,
});

// ML-KEM-768 + ML-DSA-65
// + X3DH + Double Ratchet`,
  },
  {
    eyebrow: "MCP",
    title: "Drop-in MCP Server",
    body: "Wrap any MCP-compatible agent (Claude, Cursor, custom) behind cryptographic identity. Verify which agent called which tool, when, with what authority.",
    language: "ts",
    code: `import { StvorMCPServer } from '@stvor/mcp';

const server = new StvorMCPServer({
  agentIdentityRequired: true,
  // Drop-in for any
  // Claude / Cursor / MCP-compatible agent.
});`,
  },
];
