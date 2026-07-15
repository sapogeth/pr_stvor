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

export const STVOR_VERIFIER_URL = `${STVOR_API_BASE}/verifier/`;

export const STVOR_FIXTURES_URL =
  "https://github.com/stvor-hq/stvor/tree/main/fixtures";

export const STVOR_CRYPTO = {
  hash: "SHA-256",
  signature: "ES256 (P-256, IEEE-P1363)",
} as const;

export const COMMIT_CURL = `curl -X POST ${STVOR_API_BASE}/commitments \\
  -H 'Content-Type: application/json' \\
  -d '{
    "agentId": "agt_example",
    "payload": {
      "destination": "0x7a3f91cd...4e",
      "amount": "50.00",
      "currency": "USDC",
      "method": "transfer"
    }
  }'`;

export const VERIFY_CURL = `curl -X POST ${STVOR_API_BASE}/verify \\
  -H 'Content-Type: application/json' \\
  -d '{
    "commitmentId": "cmt_01HXYZ...",
    "payload": { "...": "live params at execution time" }
  }'`;

export const SDK_INSTALL = `npm install ${STVOR_PACKAGES.sdk}`;

export const SDK_QUICKSTART = `import { StvorClient } from "${STVOR_PACKAGES.sdk}";

const stvor = new StvorClient({ baseUrl: "${STVOR_API_BASE}" });

// 1. commit — freeze intent
const commitment = await stvor.commit({ agentId, payload });

// 2. verify — bind execution to commitment
const decision = await stvor.verify({ commitmentId: commitment.id, payload: live });

if (!decision.allowed) {
  // signed DENY receipt issued; do not settle
  return;
}

// 3. settle — your rail (Stripe, chain, etc.)
await settle(live);

// receipt for ALLOW — verify offline with published key
console.log(decision.receipt);`;
