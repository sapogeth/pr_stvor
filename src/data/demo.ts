export type ChainId = "ton" | "erc4337" | "mcp" | "nodejs";

export type TerminalStep = {
  icon: "run" | "ok" | "key" | "msg" | "warn";
  text: string;
  sub?: string;
  delay: number; // ms after prev step
};

export type ComparisonRow = {
  metric: string;
  classic: string;
  classicBad: boolean;
  stvor: string;
};

export type DemoChain = {
  id: ChainId;
  label: string;
  file: string;
  language: string;
  code: string;
  terminalSteps: TerminalStep[];
  comparison: ComparisonRow[];
};

const comparisonBase: ComparisonRow[] = [
  {
    metric: "Shor-algorithm resistant",
    classic: "No — ECDH broken by quantum",
    classicBad: true,
    stvor: "Yes — ML-KEM-768 lattice-based",
  },
  {
    metric: "Forward secrecy",
    classic: "Session-level only",
    classicBad: true,
    stvor: "Per-message via Double Ratchet",
  },
  {
    metric: "Key compromise impact",
    classic: "All past sessions exposed",
    classicBad: true,
    stvor: "Current message only",
  },
  {
    metric: "Key setup latency",
    classic: "~230 ms (TLS 1.3 handshake)",
    classicBad: false,
    stvor: "~14 ms (ML-KEM-768, liboqs ref)",
  },
];

export const demoChains: DemoChain[] = [
  /* ─── TON ─── */
  {
    id: "ton",
    label: "TON",
    file: "ton-session.ts",
    language: "typescript",
    code: `import { Stvor } from "@stvor/client";
import { TonWallet } from "@stvor/ton";

// 1. Connect TON Wallet v5
const wallet = await TonWallet.connect({
  network: "mainnet",
  version: "v5r1",
});

// 2. Init Stvor with TON provider
const stvor = new Stvor({
  chain: "ton",
  registry: "EQCregistryAddressOnTON",
  wallet,
});

// 3. Create a PQ-secured session
//    Hybrid X3DH: ECDH P-256 + ML-KEM-768
const session = await stvor.createSession({
  counterparty: "EQCagentBAddress",
  bindToUserOp: true,   // sign with wallet key
});

// 4. Send encrypted message
const { ciphertext, tag } = await session.send({
  payload: { action: "transfer", amount: "1.5" },
});

console.log("Session ID:", session.id);
console.log("ML-KEM ciphertext:", ciphertext.slice(0, 32), "...");`,
    terminalSteps: [
      { icon: "run", text: "Connecting TON Wallet v5r1…", delay: 0 },
      { icon: "ok", text: "Wallet connected", sub: "EQCf9…d3a2", delay: 900 },
      { icon: "run", text: "Generating ML-KEM-768 keypair…", delay: 600 },
      { icon: "key", text: "Public key ready", sub: "pk: 3af9c2e1…b84d (1184 bytes)", delay: 700 },
      { icon: "run", text: "ECDH P-256 exchange with counterparty…", delay: 500 },
      { icon: "ok", text: "Classic shared secret derived", sub: "ss_ecdh: 0x7f3b…9c01 (32 bytes)", delay: 700 },
      { icon: "run", text: "ML-KEM encapsulation…", delay: 500 },
      { icon: "ok", text: "PQ shared secret derived", sub: "ss_kem: 0xa3f8…12cc (32 bytes)", delay: 700 },
      { icon: "run", text: "HKDF-SHA256 combining secrets…", delay: 400 },
      { icon: "key", text: "Root key established", sub: "rk: 0x9c12…ee47 (32 bytes)", delay: 600 },
      { icon: "run", text: "Binding session to TON UserOp…", delay: 500 },
      { icon: "ok", text: "Session bound & signed by wallet", sub: "session: stvor_ton_7f2a…b3c1", delay: 700 },
      { icon: "msg", text: "Encrypting payload with AES-256-GCM…", delay: 500 },
      { icon: "ok", text: "Message sent ✓", sub: "ciphertext: Xk9+aB2…(256 bytes) | tag: 16 bytes", delay: 600 },
    ],
    comparison: [
      ...comparisonBase,
      {
        metric: "Wallet / UserOp binding",
        classic: "None — session floats free",
        classicBad: true,
        stvor: "Signed by TON Wallet v5r1 key",
      },
      {
        metric: "On-chain identity",
        classic: "Off-chain DNS / ENS",
        classicBad: false,
        stvor: "On-chain TON registry (FunC)",
      },
    ],
  },

  /* ─── ERC-4337 ─── */
  {
    id: "erc4337",
    label: "ERC-4337",
    file: "erc4337-session.ts",
    language: "typescript",
    code: `import { Stvor } from "@stvor/client";
import { ERC4337Provider } from "@stvor/evm";

// 1. Wrap existing AA wallet (e.g. Safe, Biconomy)
const provider = await ERC4337Provider.fromSigner({
  signer: wallet.getSigner(),
  entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  bundler: "https://bundler.example.com",
});

// 2. Init Stvor with EVM provider
const stvor = new Stvor({
  chain: "evm",
  registry: "0xStvorRegistryAddress",
  provider,
});

// 3. Hybrid X3DH session, bound to UserOperation
const session = await stvor.createSession({
  counterparty: "0xAgentBAddress",
  bindToUserOp: true,
  // Session ID is embedded in UserOp calldata
  // Invalid session = UserOp reverts on-chain
});

// 4. Agent-to-agent encrypted call
await session.send({
  payload: { method: "executeAction", params: [42] },
});

console.log("Bound UserOp hash:", session.userOpHash);`,
    terminalSteps: [
      { icon: "run", text: "Connecting ERC-4337 EntryPoint…", delay: 0 },
      { icon: "ok", text: "EntryPoint v0.6 connected", sub: "0x5FF1…2789", delay: 900 },
      { icon: "run", text: "Generating ML-KEM-768 keypair…", delay: 600 },
      { icon: "key", text: "PQ keypair ready", sub: "pk: b3c1d9…7a0f (1184 bytes)", delay: 700 },
      { icon: "run", text: "ECDH P-256 exchange…", delay: 500 },
      { icon: "ok", text: "Classic shared secret derived", sub: "ss_ecdh: 0x44aa…3f91 (32 bytes)", delay: 700 },
      { icon: "run", text: "ML-KEM encapsulation…", delay: 500 },
      { icon: "ok", text: "PQ shared secret derived", sub: "ss_kem: 0x77bc…e501 (32 bytes)", delay: 700 },
      { icon: "run", text: "HKDF-SHA256 combining secrets…", delay: 400 },
      { icon: "key", text: "Root key established", sub: "rk: 0x2d8f…a319 (32 bytes)", delay: 600 },
      { icon: "run", text: "Embedding session ID into UserOp calldata…", delay: 500 },
      { icon: "ok", text: "UserOp created & signed", sub: "userOpHash: 0x9f3e…c712", delay: 800 },
      { icon: "run", text: "Submitting to bundler…", delay: 400 },
      { icon: "ok", text: "UserOp included in block 21,847,203", sub: "gas: 142,000 | session bound on-chain ✓", delay: 700 },
      { icon: "msg", text: "Encrypted agent message sent", sub: "ciphertext: qW3+kL…(256 bytes)", delay: 500 },
    ],
    comparison: [
      ...comparisonBase,
      {
        metric: "Wallet / UserOp binding",
        classic: "None — messages unlinked from tx",
        classicBad: true,
        stvor: "Session ID in UserOp calldata — reverts if forged",
      },
      {
        metric: "On-chain identity",
        classic: "ENS / off-chain",
        classicBad: false,
        stvor: "On-chain Solidity registry + ML-DSA-65 sig",
      },
    ],
  },

  /* ─── MCP ─── */
  {
    id: "mcp",
    label: "MCP",
    file: "mcp-agent.ts",
    language: "typescript",
    code: `import { StvorMCPTransport } from "@stvor/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server";

// 1. Create MCP server with Stvor PQ transport
const server = new McpServer({
  name: "secure-agent",
  version: "1.0.0",
});

const transport = await StvorMCPTransport.create({
  agentId: "agent:secure-agent:v1",
  // Stvor handles key negotiation before
  // any MCP message is exchanged
});

// 2. Register tools as usual — Stvor is transparent
server.tool("run_query", async ({ sql }) => {
  // This response travels over a PQ-secured
  // Double Ratchet channel, not plaintext HTTP
  const result = await db.query(sql);
  return { content: [{ type: "text", text: result }] };
});

// 3. Connect — handshake happens automatically
await server.connect(transport);

console.log("MCP server ready — PQ-secured transport active");
console.log("Session:", transport.sessionId);`,
    terminalSteps: [
      { icon: "run", text: "Initialising Stvor MCP transport…", delay: 0 },
      { icon: "run", text: "Generating ML-KEM-768 keypair…", delay: 700 },
      { icon: "key", text: "Agent identity key ready", sub: "pk: c9e2…4f8a (1184 bytes)", delay: 700 },
      { icon: "run", text: "Resolving counterparty from Stvor registry…", delay: 500 },
      { icon: "ok", text: "Counterparty found", sub: "agent:orchestrator:v2 — ML-DSA-65 verified", delay: 700 },
      { icon: "run", text: "Hybrid X3DH handshake…", delay: 500 },
      { icon: "ok", text: "Shared root key derived", sub: "rk: 0x5c71…b290 (32 bytes)", delay: 700 },
      { icon: "ok", text: "Double Ratchet initialised", sub: "chain keys ready, send counter = 0", delay: 500 },
      { icon: "ok", text: "MCP transport secured ✓", sub: "session: stvor_mcp_aa3f…91bc", delay: 600 },
      { icon: "msg", text: "MCP tool call received (run_query)", sub: "decrypted in 0.3 ms — ratchet step 1", delay: 700 },
      { icon: "ok", text: "Tool response encrypted & sent", sub: "ratchet step 2 | forward secrecy maintained", delay: 600 },
    ],
    comparison: [
      {
        metric: "Shor-algorithm resistant",
        classic: "No — standard MCP uses plaintext or TLS",
        classicBad: true,
        stvor: "Yes — full ML-KEM-768 + Double Ratchet",
      },
      {
        metric: "Transport encryption",
        classic: "TLS 1.3 (classical only)",
        classicBad: true,
        stvor: "Hybrid PQ + per-message ratchet",
      },
      {
        metric: "Agent identity verification",
        classic: "API key or OAuth token",
        classicBad: true,
        stvor: "ML-DSA-65 signature on-chain",
      },
      {
        metric: "Forward secrecy",
        classic: "Session-level only",
        classicBad: true,
        stvor: "Per MCP message via ratchet",
      },
      {
        metric: "Key compromise impact",
        classic: "All MCP history exposed",
        classicBad: true,
        stvor: "Current message only",
      },
      {
        metric: "Setup overhead",
        classic: "Zero (no crypto layer)",
        classicBad: false,
        stvor: "~14 ms one-time handshake",
      },
    ],
  },

  /* ─── Node.js ─── */
  {
    id: "nodejs",
    label: "Node.js",
    file: "agent-messaging.ts",
    language: "typescript",
    code: `import { Stvor, Session } from "@stvor/client";

// 1. Initialise — no blockchain required
const stvor = new Stvor({
  agentId: "agent:data-processor:v1",
  // Keys are generated locally, registered
  // on the Stvor off-chain relay
});

await stvor.connect();

// 2. Create a PQ-secured E2EE session
const session: Session = await stvor.createSession({
  counterparty: "agent:orchestrator:v1",
});

// 3. Send encrypted — fire and forget
await session.send({ task: "process", data: [1, 2, 3] });

// 4. Receive & auto-decrypt
stvor.on("message", async (msg) => {
  const { payload, meta } = await session.receive(msg);
  console.log("Task result:", payload);
  console.log("Ratchet step:", meta.step); // forward secrecy
});

console.log("Agent online:", stvor.agentId);
console.log("Session key fingerprint:", session.fingerprint);`,
    terminalSteps: [
      { icon: "run", text: "Connecting to Stvor relay…", delay: 0 },
      { icon: "ok", text: "Relay connected", sub: "relay.stvor.xyz:443 | latency 8 ms", delay: 700 },
      { icon: "run", text: "Generating ML-KEM-768 keypair…", delay: 600 },
      { icon: "key", text: "Local keypair generated", sub: "pk: 1f4c…8e0b (1184 bytes)", delay: 700 },
      { icon: "run", text: "Resolving counterparty identity…", delay: 500 },
      { icon: "ok", text: "agent:orchestrator:v1 found", sub: "ML-DSA-65 signature verified ✓", delay: 700 },
      { icon: "run", text: "Hybrid X3DH handshake…", delay: 500 },
      { icon: "ok", text: "Root key established", sub: "rk: 0x8b34…f701 (32 bytes)", delay: 700 },
      { icon: "ok", text: "Double Ratchet ready", sub: "session: stvor_9a2c…44d1", delay: 500 },
      { icon: "msg", text: "Sending encrypted task…", sub: "AES-256-GCM | ratchet step 1", delay: 600 },
      { icon: "ok", text: "Task delivered ✓", delay: 500 },
      { icon: "msg", text: "Receiving encrypted result…", sub: "ratchet step 2 | forward secrecy ✓", delay: 700 },
      { icon: "ok", text: "Result decrypted", sub: `payload: { status: "done", items: 3 }`, delay: 500 },
    ],
    comparison: [
      ...comparisonBase,
      {
        metric: "Integration effort",
        classic: "Custom crypto implementation",
        classicBad: true,
        stvor: "npm install @stvor/client + 3 API calls",
      },
      {
        metric: "Agent identity",
        classic: "API key / shared secret",
        classicBad: true,
        stvor: "ML-DSA-65 public key pair",
      },
    ],
  },
];
