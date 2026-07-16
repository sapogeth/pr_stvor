var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/.bun/canonicalize@2.1.0/node_modules/canonicalize/lib/canonicalize.js
var require_canonicalize = __commonJS((exports, module) => {
  module.exports = function serialize(object) {
    if (typeof object === "number" && isNaN(object)) {
      throw new Error("NaN is not allowed");
    }
    if (typeof object === "number" && !isFinite(object)) {
      throw new Error("Infinity is not allowed");
    }
    if (object === null || typeof object !== "object") {
      return JSON.stringify(object);
    }
    if (object.toJSON instanceof Function) {
      return serialize(object.toJSON());
    }
    if (Array.isArray(object)) {
      const values2 = object.reduce((t, cv, ci) => {
        const comma = ci === 0 ? "" : ",";
        const value = cv === undefined || typeof cv === "symbol" ? null : cv;
        return `${t}${comma}${serialize(value)}`;
      }, "");
      return `[${values2}]`;
    }
    const values = Object.keys(object).sort().reduce((t, cv) => {
      if (object[cv] === undefined || typeof object[cv] === "symbol") {
        return t;
      }
      const comma = t.length === 0 ? "" : ",";
      return `${t}${comma}${serialize(cv)}:${serialize(object[cv])}`;
    }, "");
    return `{${values}}`;
  };
});

// stvor-core/src/canonical.ts
var import_canonicalize = __toESM(require_canonicalize(), 1);
function canonicalize(value) {
  const out = import_canonicalize.default(value);
  if (typeof out !== "string") {
    throw new Error("canonicalize: value is not JSON-serializable");
  }
  return out;
}
function canonicalBytes(value) {
  return new TextEncoder().encode(canonicalize(value));
}
async function sha256Hex(data) {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return bytesToHex(new Uint8Array(digest));
}
function bytesToHex(bytes) {
  let hex = "";
  for (const b of bytes)
    hex += b.toString(16).padStart(2, "0");
  return hex;
}
function b64uToBytes(s) {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0;i < bin.length; i++)
    bytes[i] = bin.charCodeAt(i);
  return bytes;
}
function bytesToB64u(bytes) {
  let bin = "";
  for (const b of bytes)
    bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
// stvor-core/src/keys.ts
async function jwkThumbprint(jwk) {
  const canonical = canonicalize({ crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y });
  const hex = await sha256Hex(canonical);
  return bytesToB64u(hexToBytes(hex));
}
async function kidOf(jwk) {
  return `key_${(await jwkThumbprint(jwk)).slice(0, 16)}`;
}
function resolveKey(source, kid) {
  if (isRegistry(source)) {
    for (const entry of source.keys) {
      if (entry.kid === kid || entry.jwk?.kid === kid)
        return entry.jwk;
    }
    return null;
  }
  if (source.kid && source.kid !== kid)
    return null;
  return source;
}
function isRegistry(source) {
  return Array.isArray(source.keys);
}
function hexToBytes(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0;i < out.length; i++)
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}
// stvor-core/src/signing.ts
var EC_IMPORT = { name: "ECDSA", namedCurve: "P-256" };
var EC_SIGN = { name: "ECDSA", hash: "SHA-256" };
async function importPrivate(jwk) {
  if (!jwk.d)
    throw new Error('signing key JWK must include "d" (private scalar)');
  const { kty, crv, x, y, d } = jwk;
  return crypto.subtle.importKey("jwk", { kty, crv, x, y, d }, EC_IMPORT, false, ["sign"]);
}
async function importPublic(jwk) {
  const { kty, crv, x, y } = jwk;
  return crypto.subtle.importKey("jwk", { kty, crv, x, y }, EC_IMPORT, false, ["verify"]);
}
async function signCanonical(payload, privateJwk) {
  const key = await importPrivate(privateJwk);
  const sig = await crypto.subtle.sign(EC_SIGN, key, canonicalBytes(payload));
  return bytesToB64u(new Uint8Array(sig));
}
async function verifyCanonical(payload, signatureB64u, publicJwk) {
  let sig;
  try {
    sig = b64uToBytes(signatureB64u);
  } catch {
    return false;
  }
  if (sig.length !== 64)
    return false;
  const key = await importPublic(publicJwk);
  return crypto.subtle.verify(EC_SIGN, key, sig, canonicalBytes(payload));
}
async function generateKeyPair() {
  const pair = await crypto.subtle.generateKey(EC_IMPORT, true, ["sign", "verify"]);
  const privateJwk = await crypto.subtle.exportKey("jwk", pair.privateKey);
  const publicJwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
  const kid = await kidOf(publicJwk);
  return {
    privateJwk: { kty: "EC", crv: "P-256", x: privateJwk.x, y: privateJwk.y, d: privateJwk.d },
    publicJwk: { kty: "EC", crv: "P-256", x: publicJwk.x, y: publicJwk.y, kid },
    kid
  };
}
// stvor-core/src/payment.ts
var AMOUNT_REGEX = /^(0|[1-9]\d*)(\.\d+)?$/;
function paymentPayloadOf(intent) {
  if (!intent.to || typeof intent.to !== "string") {
    throw new Error('payment payload requires a non-empty "to"');
  }
  if (intent.amount !== undefined) {
    if (typeof intent.amount !== "string" || !AMOUNT_REGEX.test(intent.amount)) {
      throw new Error('amount must be a decimal string, e.g. "50.00" (never a JSON number)');
    }
  }
  const p = { to: intent.to };
  if (intent.amount !== undefined)
    p.amount = intent.amount;
  if (intent.currency !== undefined)
    p.currency = intent.currency;
  if (intent.chain !== undefined)
    p.chain = intent.chain;
  if (intent.asset !== undefined)
    p.asset = intent.asset;
  return p;
}
async function hashPaymentPayload(payload) {
  return sha256Hex(canonicalize(paymentPayloadOf(payload)));
}
function commitmentSigningPayload(c) {
  return {
    agentId: c.agentId,
    alg: c.alg,
    expiresAt: c.expiresAt,
    nonce: c.nonce,
    payloadHash: c.payloadHash
  };
}
// stvor-core/src/receipt.ts
async function signReceipt(payload, issuerPrivateJwk) {
  const signature = await signCanonical(stripUndefined(payload), issuerPrivateJwk);
  return { ...stripUndefined(payload), signature };
}
async function verifyReceiptOffline(receipt, keys) {
  if (receipt === null || typeof receipt !== "object" || Array.isArray(receipt)) {
    return { ok: false, reason: "MALFORMED", detail: "receipt must be a JSON object" };
  }
  const { signature, ...payload } = receipt;
  if (typeof signature !== "string" || signature.length === 0) {
    return { ok: false, reason: "MALFORMED", detail: "missing signature" };
  }
  if (typeof payload.kid !== "string" || payload.kid.length === 0) {
    return { ok: false, reason: "MALFORMED", detail: "missing kid" };
  }
  const jwk = resolveKey(keys, payload.kid);
  if (!jwk) {
    return { ok: false, reason: "UNKNOWN_KEY", detail: `no key in keyset for kid ${payload.kid}` };
  }
  let valid;
  try {
    valid = await verifyCanonical(payload, signature, jwk);
  } catch (err) {
    return { ok: false, reason: "MALFORMED", detail: String(err) };
  }
  if (!valid) {
    return { ok: false, reason: "BAD_SIGNATURE", detail: "signature does not match receipt contents" };
  }
  return { ok: true, receipt };
}
function stripUndefined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined)
      out[k] = v;
  }
  return out;
}
export {
  verifyReceiptOffline,
  verifyCanonical,
  signReceipt,
  signCanonical,
  sha256Hex,
  resolveKey,
  paymentPayloadOf,
  kidOf,
  jwkThumbprint,
  hashPaymentPayload,
  generateKeyPair,
  commitmentSigningPayload,
  canonicalize,
  canonicalBytes,
  bytesToHex,
  bytesToB64u,
  b64uToBytes,
  AMOUNT_REGEX
};
