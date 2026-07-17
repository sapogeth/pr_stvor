/** Published contract — keep in sync with platofrm/CONTRACT.md v0.2 */

export const STVOR_API_BASE = "https://api.stvor.xyz";

export const STVOR_WELL_KNOWN = {
  publicKey: `${STVOR_API_BASE}/.well-known/public-key`,
  keyset: `${STVOR_API_BASE}/.well-known/stvor-keys.json`,
} as const;

export const STVOR_ENDPOINTS = {
  commitments: `${STVOR_API_BASE}/commitments`,
  verify: `${STVOR_API_BASE}/verify`,
  receipt: `${STVOR_API_BASE}/receipt`,
} as const;

/** npm packages — do NOT use @stvor/sdk (unrelated legacy E2EE library). */
export const STVOR_PACKAGES = {
  client: "@stvor/client",
  core: "@stvor/core",
  verify: "@stvor/verify",
} as const;

export const STVOR_GITHUB_CORE = "https://github.com/stvor-hq/core";

export const STVOR_VERIFIER_URL = "https://stvor.xyz/verifier/";

export const STVOR_FIXTURES_URL =
  "https://github.com/stvor-hq/core/tree/main/fixtures";

export const STVOR_CRYPTO = {
  hash: "SHA-256",
  signature: "ES256 (P-256, IEEE-P1363)",
  license: "MIT",
} as const;

/** Public sandbox key — test env, rate-limited, revocable at any time. */
export const STVOR_SANDBOX_API_KEY = "stvor_test_tdesrpqe9auRopdcA2Ab-bFzF2xylw9v";

/** Demo payment payload (RFC 8785 canonical) and its SHA-256 hash for copy-paste curls. */
export const DEMO_PAYMENT = {
  to: "0x4c1b82f71a9e3d0c8b5e6f2a1d4c7b9e0f3a8c1d",
  amount: "50000.00",
  currency: "USDC",
} as const;

export const DEMO_PAYLOAD_CANONICAL = `{"amount":"${DEMO_PAYMENT.amount}","currency":"${DEMO_PAYMENT.currency}","to":"${DEMO_PAYMENT.to}"}`;

export const DEMO_PAYLOAD_HASH =
  "b36c8892571afafab33f0f389c62293948a7ff61f3064eca12700582756cda78";

const DEMO_PAYLOAD_COMMENT = `# Payment payload (RFC 8785 — hash the canonical bytes, not this comment block):
# ${DEMO_PAYLOAD_CANONICAL}
# payloadHash = SHA-256(canonical) = ${DEMO_PAYLOAD_HASH}
# (agentId, nonce) must be unique per commitment — use a fresh nonce every time.`;

export const COMMIT_CURL = `${DEMO_PAYLOAD_COMMENT}

curl -X POST ${STVOR_API_BASE}/commitments \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${STVOR_SANDBOX_API_KEY}' \\
  -d '{
    "agentId": "agt_sandbox_demo",
    "payloadHash": "${DEMO_PAYLOAD_HASH}",
    "alg": "sha256",
    "nonce": "<any-unique-string>",
    "expiresAt": "2026-12-31T23:59:59.000Z"
  }'`;

export const VERIFY_ALLOW_CURL = `# Same to / amount / currency as the committed payload → ALLOW (+ signed receipt inline)

curl -X POST ${STVOR_API_BASE}/verify \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${STVOR_SANDBOX_API_KEY}' \\
  -d '{
    "commitmentId": "cmt_FROM_COMMIT_RESPONSE",
    "intent": {
      "from": "agt_sandbox_demo",
      "to": "${DEMO_PAYMENT.to}",
      "amount": "${DEMO_PAYMENT.amount}",
      "currency": "${DEMO_PAYMENT.currency}"
    }
  }'`;

export const VERIFY_DENY_CURL = `# Swap to after commit → PAYLOAD_MISMATCH → signed DENY

curl -X POST ${STVOR_API_BASE}/verify \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${STVOR_SANDBOX_API_KEY}' \\
  -d '{
    "commitmentId": "cmt_FROM_COMMIT_RESPONSE",
    "intent": {
      "from": "agt_sandbox_demo",
      "to": "0x9d0000000000000000000000000000000000000001",
      "amount": "${DEMO_PAYMENT.amount}",
      "currency": "${DEMO_PAYMENT.currency}"
    }
  }'`;

/** @deprecated use VERIFY_DENY_CURL */
export const VERIFY_CURL = VERIFY_DENY_CURL;

export const SDK_INSTALL = `npm install ${STVOR_PACKAGES.client}`;

export const SDK_QUICKSTART = `import { Stvor } from "${STVOR_PACKAGES.client}";

const stvor = new Stvor({
  baseUrl: "${STVOR_API_BASE}",
  apiKey: process.env.STVOR_KEY!, // sandbox key on stvor.xyz/#try-now
});

const payment = {
  to: "${DEMO_PAYMENT.to}",
  amount: "${DEMO_PAYMENT.amount}",
  currency: "${DEMO_PAYMENT.currency}",
};

// 1. commit — posts payloadHash (fresh nonce each time)
const commitment = await stvor.commit(payment, {
  agentId: "agt_sandbox_demo",
  nonce: crypto.randomUUID(),
});

// 2. verify — signed receipt inline for ALLOW and DENY
const result = await stvor.verify(
  { from: "agt_sandbox_demo", ...payment },
  { commitmentId: commitment.commitmentId },
);

if (result.decision !== "ALLOW") {
  // result.receipt is a signed DENY — verify offline; do not settle
  return;
}

// 3. settle on your rail, then optionally attach txHash
await settleOnYourRail(payment);
// await stvor.settle(result.id!, txHash);`;

export const SDK_CHECKPOINT = `// WRONG — verify after payment
await stripe.paymentIntents.capture(id);
await stvor.verify(...); // too late

// RIGHT — commit → verify → settle
const payment = { to: "0xVendor...", amount: "50.00", currency: "USDC" };
const commitment = await stvor.commit(payment, { agentId: "agt_01", nonce: crypto.randomUUID() });

const result = await stvor.verify(
  { from: "agt_01", ...payment },
  { commitmentId: commitment.commitmentId },
);

if (result.decision !== "ALLOW") {
  await stripe.paymentIntents.cancel(escrowId);
  // signed DENY in result.receipt
  throw new Error(result.reason);
}

await stripe.paymentIntents.capture(id);`;

export const SDK_FLOW_SNIPPET = `const commitment = await stvor.commit(payment, { agentId, nonce: crypto.randomUUID() });

const result = await stvor.verify(
  { from: agentId, ...payment },
  { commitmentId: commitment.commitmentId },
);

if (result.decision !== "ALLOW") {
  // signed DENY receipt in result.receipt
  return;
}

await settleOnYourRail(payment);`;
