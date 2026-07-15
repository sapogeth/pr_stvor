# stvor-site

Marketing site and technical documentation for [Stvor](https://stvor.xyz) — pre-execution verification for AI agents that move money.

**Production:** https://stvor.xyz  
**API:** https://api.stvor.xyz (`POST /commitments`, `/verify`, `/receipt`)  
**Hackathon reference:** https://nous.stvor.xyz (attack sim, agent arena, Stripe escrow — separate from production API)

## What Stvor is

Stvor binds **intent to execution** before funds move:

```
commit → verify → settle
```

1. **commit** — `POST /commitments` freezes canonical params at intent time  
2. **verify** — `POST /verify` compares live payload; swapped destination → signed **DENY**, not silent pass  
3. **settle** — your rail fires only after ALLOW; `POST /receipt` issues ES256 (P-256) Trust Receipt for ALLOW **and** DENY  

Verification checks: destination match, payload integrity (`timingSafeEqual`), policy gates.

**Packages:** `@stvor/sdk` (client), `@stvor/core` (verification primitives).  
**Proof:** [browser verifier](https://api.stvor.xyz/verifier/), [test vectors](https://github.com/stvor-hq/stvor/tree/main/fixtures), [ATS-1 spec](https://stvor.xyz/docs/ats-1).

## Site structure

| Route | Purpose |
|-------|---------|
| `/` | Landing — demo-first, cryptographic binding, comparison |
| `/docs` | Documentation index |
| `/docs/how-it-works` | commit → verify → settle, attacks, threat model |
| `/docs/integrate` | SDK + API wiring, checkpoint placement |
| `/docs/ats-1` | Trust Receipt spec (draft) |
| `/demo` | Interactive verification demo |
| `/research` | Cryptography notes + ATS-1 pointer |
| `/compare` | Competitor comparison |
| `/security` | Security posture |

## Development

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun run lint
```

Stack: **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS**, **Framer Motion**.

### Key config

- `CONTRACT.md` — published API contract (source of truth for site copy)  
- `src/lib/contract.ts` — API URLs, packages, curl snippets  
- `src/lib/site-config.ts` — URLs, CTAs, pilot copy, nav items  
- `src/data/docs-nav.ts` — Documentation sidebar structure  

## Deploy

Deployed on Vercel from `main`. Push triggers production build.

## Related repos

- **SDK + API:** https://github.com/stvor-hq  
- **Hackathon deployment:** https://nous.stvor.xyz  

## License

Reference code is **MIT** licensed (see GitHub). Site content © Stvor.

---

**Contact:** [@kun_sapog](https://t.me/kun_sapog) on Telegram
