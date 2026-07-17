# Stvor public contract (site mirror)

**Source of truth:** `platofrm/CONTRACT.md` v0.2. If this file disagrees with platofrm, platofrm wins.

## Base URL

`https://api.stvor.xyz` — flat paths, no `/api/v1`.

## Flow

```
commit → verify → settle
```

1. **commit** — `POST /commitments` with `payloadHash` (SHA-256 of RFC 8785 payment payload)
2. **verify** — `POST /verify` compares live payment hash → signed Trust Receipt **inline** for ALLOW and DENY
3. **settle** — your rail fires only after ALLOW
4. **optional** — `POST /receipt` attaches on-chain `txHash` after settlement (ALLOW only)

There is **no** `/agents/register` endpoint.

## Packages (npm)

| Package | Role |
|---------|------|
| `@stvor/client` | HTTP client — `commit()`, `verify()`, `settle()` |
| `@stvor/core` | RFC 8785 hash, offline receipt verification |
| `@stvor/verify` | CLI verifier |

**Do not** `npm install @stvor/sdk` — unrelated legacy E2EE library.

## Cryptography

- Payload hash: SHA-256 over RFC 8785 (JCS) canonical JSON
- Compare: `crypto.timingSafeEqual()` on hash bytes
- Receipt signature: ES256 / P-256 / IEEE-P1363
- Payment payload fields: `{ to, amount?, currency?, chain?, asset? }` — only `to` required

## Auth

`Authorization: Bearer <STVOR_KEY>` required in production.

Public sandbox key published on [stvor.xyz/#try-now](https://stvor.xyz/#try-now).

## Well-known keys

- `GET /.well-known/public-key` — current signing JWK
- `GET /.well-known/stvor-keys.json` — append-only keyset for offline verify

## Verifier & fixtures

- Browser verifier: `https://stvor.xyz/verifier/`
- Test vectors: `https://github.com/stvor-hq/core/tree/main/fixtures`

## License

`@stvor/core` and `@stvor/client` are **MIT** licensed.
