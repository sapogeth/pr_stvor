# stvor-site

Marketing site and technical documentation for [Stvor](https://stvor.xyz) — pre-execution verification for AI agents that move money.

**Production:** https://stvor.xyz  
**Live reference build:** https://nous.stvor.xyz (Hermes hackathon demo — attack sim, agent arena, Stripe escrow)

## What Stvor is

Stvor sits between **intent** and **execution**. Before a payment, transfer, or tool call runs, it checks:

1. **Destination match** — committed at intent, verified before execution  
2. **Payload integrity** — `SHA-256(params) === committed_hash` via `crypto.timingSafeEqual()`  
3. **Counterparty trust** — minimum trust score before transacting  
4. **Policy check** — amount caps, allowlists, method gates  

Any check fails → **DENIED**, no funds move. On success → **ECDSA P-256** signed Trust Receipt ([ATS-1](https://stvor.xyz/docs/ats-1) draft).

There is no self-serve npm SDK today. Production integrations run through a **paid 2-week pilot** ($500 flat).

## Site structure

| Route | Purpose |
|-------|---------|
| `/` | Landing — pilot CTA, threat model, comparison |
| `/docs` | Documentation index |
| `/docs/how-it-works` | Four checks, attacks, cryptography, threat model |
| `/docs/integrate` | Pilot onboarding, checkpoint wiring, rails |
| `/docs/ats-1` | Trust Receipt spec (draft) |
| `/demo` | Interactive verification demo |
| `/research` | Research notes + ATS-1 pointer |
| `/compare` | Competitor comparison |
| `/security` | Security posture |

Documentation layout mirrors [nous.stvor.xyz](https://nous.stvor.xyz): sidebar TOC, multi-page spec, integration guide, attack/defense pairs, code snippets.

## Development

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun run lint
```

Stack: **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS**, **Framer Motion**.

### Project layout

```
src/
  app/                  # Routes (pages + metadata)
  app/docs/             # Multi-page documentation
  components/
    docs/               # Docs shell, sidebar, UI primitives
    home/               # Landing page sections
    layout/             # Header, footer
  data/                 # Comparison table, docs nav
  lib/                  # site-config, shiki, utils
```

### Key config

- `src/lib/site-config.ts` — URLs, CTAs, pilot copy, nav items  
- `src/data/docs-nav.ts` — Documentation sidebar structure  

## Deploy

Deployed on Vercel from `main`. Push triggers production build.

```bash
git push origin main
```

## Related repos

- **Reference implementation / protocol:** https://github.com/stvor-hq  
- **Hackathon deployment:** https://nous.stvor.xyz  

## License

Reference code is **MIT** licensed (see GitHub). Site content © Stvor.

---

**Contact:** founder@stvor.xyz  
**Pilot:** [Book the pilot](mailto:founder@stvor.xyz?subject=Paid%202-week%20pilot%20—%20Stvor)
