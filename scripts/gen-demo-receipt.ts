/**
 * Regenerate public/fixtures/demo-deny-receipt.json (offline, test issuer key).
 * Run: bun run scripts/gen-demo-receipt.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  signReceipt,
  verifyReceiptOffline,
  generateKeyPair,
  signCanonical,
  jwkThumbprint,
  commitmentSigningPayload,
  hashPaymentPayload,
  kidOf,
} from '../public/verifier/stvor-core.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const FIXTURES = join(ROOT, 'public', 'fixtures')
const ISSUER_PRIV = JSON.parse(
  readFileSync(join(ROOT, 'scripts', 'fixtures-gen', 'issuer.private.jwk'), 'utf8'),
)
const keyset = JSON.parse(readFileSync(join(FIXTURES, 'keyset.json'), 'utf8'))

const COMMITTED_TO = '0x4c1b82f71a9e3d0c8b5e6f2a1d4c7b9e0f3a8c1d'
const SWAPPED_TO = '0x8f3a2c91d4e7b0a6c5d8f1e2a4b7c9d0e3f6a8c1d'
const payment = { to: COMMITTED_TO, amount: '50000.00', currency: 'USDC' }

const agentId = 'agent_finance_ops_v1'
const agentKey = await generateKeyPair()
const payloadHash = await hashPaymentPayload(payment)
const nonce = 'nonce_demo_blocked_001'
const expiresAt = '2026-07-16T12:00:00.000Z'
const issuedAt = '2026-07-16T12:00:05.000Z'
const agentSignature = await signCanonical(
  commitmentSigningPayload({ agentId, alg: 'sha256', expiresAt, nonce, payloadHash }),
  agentKey.privateJwk,
)
const agentKeyThumbprint = await jwkThumbprint(agentKey.publicJwk)
const issuerKid = await kidOf({
  kty: 'EC',
  crv: 'P-256',
  x: keyset.keys[0].jwk.x,
  y: keyset.keys[0].jwk.y,
})

const receipt = await signReceipt(
  {
    receiptId: 'rec_demo_blocked_001',
    verificationId: 'ver_demo_blocked_001',
    binding: 'agent-committed',
    agentId,
    to: SWAPPED_TO,
    amount: payment.amount,
    currency: payment.currency,
    nonce,
    decision: 'DENY',
    reason: 'PAYLOAD_MISMATCH',
    issuedAt,
    expiresAt,
    kid: issuerKid,
    commitmentId: 'cmt_demo_blocked_001',
    agentKeyThumbprint,
    agentSignature,
  },
  ISSUER_PRIV,
)

const offline = await verifyReceiptOffline(receipt, keyset)
if (!offline.ok) {
  console.error('Offline verify failed:', offline)
  process.exit(1)
}

mkdirSync(FIXTURES, { recursive: true })
const demo = {
  name: 'demo-deny-blocked-attack',
  description:
    'Agent committed 50000.00 USDC to vendor 0x4c1b82f7…; execution attempted swapped destination. DENY receipt is offline-verifiable.',
  committed: payment,
  attempted: { ...payment, to: SWAPPED_TO },
  receipt,
  keyset,
  expected: 'OK',
}
writeFileSync(join(FIXTURES, 'demo-deny-receipt.json'), JSON.stringify(demo, null, 2) + '\n')
console.log('Wrote public/fixtures/demo-deny-receipt.json')
console.log('  kid:', receipt.kid)
console.log('  signature length:', receipt.signature.length)
