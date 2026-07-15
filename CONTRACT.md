# Stvor public contract

Source of truth for published API surface, packages, and cryptography.
Marketing site and docs must match this file.

## Base URL

`https://api.stvor.xyz` — SDK default `baseUrl`, docs, and curl examples.

## HTTP endpoints (flat paths, no `/api/v1`)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/commitments` | Anchor intent — freeze payload hash at commit time |
| POST | `/verify` | Compare live payload to commitment → ALLOW or DENY |
| POST | `/receipt` | Issue signed Trust Receipt (ALLOW **and** DENY) |

There is **no** `/agents/register` endpoint.

## Flow

```
commit → verify → settle
```

1. **commit** — canonical params hashed and stored; intent frozen
2. **verify** — `timingSafeEqual` on payload hash + destination match; swapped destination → signed DENY, not silent pass
3. **settle** — execution rail fires only after ALLOW
4. **receipt** — offline-verifiable ES256 (P-256, IEEE-P1363) for both ALLOW and DENY

## Packages (npm)

| Package | Role |
|---------|------|
| `@stvor/sdk` | HTTP client — `commit()`, `verify()`, `receipt()` |
| `@stvor/core` | Verification primitives — canonical hash, compare |

Do **not** reference `@stvor/web3` (does not exist).

## Cryptography

- Payload hash: **SHA-256** over canonical JSON
- Compare: **`crypto.timingSafeEqual()`**
- Receipt signature: **ES256 / P-256** (IEEE-P1363)
- **Not** ed25519 — remove all ed25519 mentions from published surfaces

## Verifier & fixtures

- Browser verifier: `https://api.stvor.xyz/verifier/` (`verifier/index.html`)
- Test vectors: `fixtures/` in the SDK repo (integrators self-check before writing code)

## §7 — Not implemented (do not claim on site)

- Counterparty **trust scoring** — engine is a stub; do not list as a live check

## Lead with (all demonstrable today)

1. Pre-execution binding — swapped destination → signed DENY
2. Trust Receipt verifiable offline (CLI, browser verifier, ~20 lines WebCrypto)
3. Published test vectors in `fixtures/`
