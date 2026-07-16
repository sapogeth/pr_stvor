/** Published contract — keep in sync with CONTRACT.md */

export const STVOR_API_BASE = "https://api.stvor.xyz";

export const STVOR_ENDPOINTS = {
  commitments: `${STVOR_API_BASE}/commitments`,
  verify: `${STVOR_API_BASE}/verify`,
  receipt: `${STVOR_API_BASE}/receipt`,
} as const;

export const STVOR_PACKAGES = {
  sdk: "@stvor/sdk",
  core: "@stvor/core",
} as const;

export const STVOR_GITHUB_CORE = "https://github.com/stvor-hq/core";

export const STVOR_VERIFIER_URL = "https://stvor.xyz/verifier/";

export const STVOR_FIXTURES_URL =
  "https://github.com/stvor-hq/core/tree/main/fixtures";

export const STVOR_CRYPTO = {
  hash: "SHA-256",
  signature: "ES256 (P-256, IEEE-P1363)",
} as const;

/** Public sandbox key — test env, rate-limited, revocable at any time. */
export const STVOR_SANDBOX_API_KEY = "stvor_test_tdesrpqe9auRopdcA2Ab-bFzF2xylw9v";

/** Demo payment payload (RFC 8785 canonical) and its SHA-256 hash for copy-paste curls. */
export const DEMO_PAYMENT = {
  to: "0x4c1b82f71a9e3d0c8b5e6f2a1d4c7b9e0f3a8c1d",
  amount: "50000.00",
  currency: "USDC",
} as const;

export const DEMO_PAYLOAD_HASH =
  "b36c8892571afafab33f0f389c62293948a7ff61f3064eca12700582756cda78";

export const COMMIT_CURL = `curl -X POST ${STVOR_API_BASE}/commitments \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${STVOR_SANDBOX_API_KEY}' \\
  -d '{
    "agentId": "agt_sandbox_demo",
    "payloadHash": "${DEMO_PAYLOAD_HASH}",
    "alg": "sha256",
    "nonce": "sandbox-demo-001",
    "expiresAt": "2026-12-31T23:59:59.000Z"
  }'`;

export const VERIFY_CURL = `curl -X POST ${STVOR_API_BASE}/verify \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${STVOR_SANDBOX_API_KEY}' \\
  -d '{
    "commitmentId": "cmt_FROM_COMMIT_RESPONSE",
    "intent": {
      "from": "agt_sandbox_demo",
      "to": "0x9d0000000000000000000000000000000000000001",
      "amount": "50000.00",
      "currency": "USDC"
    }
  }'`;

export const SDK_INSTALL = `npm install ${STVOR_PACKAGES.sdk}`;

export const SDK_QUICKSTART = `import { StvorClient } from "${STVOR_PACKAGES.sdk}";

const stvor = new StvorClient({
  baseUrl: "${STVOR_API_BASE}",
  apiKey: process.env.STVOR_KEY, // sandbox key on stvor.xyz/try-now
});

// payment payload — only { to, amount?, currency?, chain?, asset? }
const payload = {
  to: "${DEMO_PAYMENT.to}",
  amount: "${DEMO_PAYMENT.amount}",
  currency: "${DEMO_PAYMENT.currency}",
};

// 1. commit — freeze intent (posts payloadHash, not raw payload)
const commitment = await stvor.commit({
  agentId: "agt_sandbox_demo",
  payload,
});

// 2. verify — compare live intent to commitment
const decision = await stvor.verify({
  commitmentId: commitment.id,
  intent: payload,
});

if (!decision.allowed) {
  // signed DENY receipt — verify offline; do not settle
  return;
}

// 3. settle — your rail (Stripe, chain, etc.)
await settle(payload);

console.log(decision.receipt);`;
