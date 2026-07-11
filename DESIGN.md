# STVOR Design System

**Version:** 1.0  
**Last updated:** 2026-07  
**Memorable thing:** "This is serious infrastructure for people who cannot afford to be wrong."

---

## Design philosophy

STVOR is cryptographic trust middleware. Its users are CTOs, security engineers, and senior
developers at AI agent platforms and financial institutions. They are skeptical by profession.

The visual language must communicate: **precision, legibility, security, confidence**.

No decorative gradients. No blobs. No hero illustrations. The UI IS the product — code
blocks, receipts, verification states, policy gates. Every visual decision should feel like
it belongs inside a terminal or a well-designed security console, not a SaaS landing page.

**Reference points:** Linear's dark mode, Stripe's documentation, Vercel's design system,
Tailscale's trust-first product voice. Not: Webflow sites, gradient-heavy Web3 projects,
or anything with floating 3D icons.

---

## Color system

### Core palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#06060a` | Page background — near-black with a faint blue cast |
| `--color-bg-elevated` | `#0e0e14` | Cards, code blocks, elevated surfaces |
| `--color-bg-subtle` | `#0a0a10` | Trust bar, subtle fills |
| `--color-border` | `#1a1a24` | Default borders — invisible unless on bg-elevated |
| `--color-border-strong` | `#252530` | Dividers, stronger separators |

### Foreground

| Token | Value | Usage |
|-------|-------|-------|
| `--color-fg` | `#f0f1f5` | Primary text — warm-cool white, not pure |
| `--color-fg-muted` | `#8e95a3` | Secondary text, descriptions, supporting copy |
| `--color-fg-subtle` | `#5a6070` | Tertiary — metadata, timestamps, labels |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand` | `#6366f1` | Indigo — primary interactive (links, focused states) |
| `--color-brand-hover` | `#4f46e5` | Hover on brand elements |
| `--color-accent` | `#10b981` | Emerald — verified/success/trust states |
| `--color-warn` | `#f59e0b` | Amber — pending, planned, expiring |
| `--color-danger` | `#ef4444` | Red — blocked, failed, attack detected |

### Color logic rules

1. **Green means "verified and safe."** Use `--color-accent` only for positive trust signals:
   verified receipts, active status, NIST compliance badges.
2. **Indigo is interactive.** Buttons, links, focused code keywords — things you can click.
3. **Amber is temporal.** Planned roadmap items, expiring commitments, "in progress."
4. **Red is blocked.** Attack detected, verification failed, policy violation. Never decorative.
5. **No purple gradients.** The brand color is already borderline purple. Don't pile on.
6. **Opacity for layering.** The palette uses opacity variants (rgba) for backgrounds and
   borders: `rgba(16,185,129,0.09)` for a green tint surface, never a new color.

---

## Typography

### Fonts

| Role | Font | Fallback |
|------|------|---------|
| Body / UI | Inter | ui-sans-serif, system-ui |
| Code / mono | JetBrains Mono | ui-monospace, SF Mono, Menlo |

**Why Inter:** Designed for screen legibility at small sizes. Optical sizing works well
at 11px (labels) through 48px (headlines). The `cv02/cv03/cv04/cv11` OpenType features
improve punctuation and numeral rendering — these are enabled in globals.css.

**Why JetBrains Mono:** The product IS code. SDK calls, policy configs, Trust Receipts —
all appear in monospace. JetBrains Mono has the best code ligature support and is more
distinctive than the system default. It also has a slight technical/security personality.

### Type scale

| Size | Usage | Weight |
|------|-------|--------|
| `10px` | Tracking labels, badge text, nav labels | 500 |
| `11px` | Trust bar, code comments, micro-signals | 400 |
| `12px–13px` | Card body, table cells, secondary content | 400 |
| `14px–15px` | Primary body copy | 400 |
| `20px` | H3, card titles | 600 |
| `28px–32px` | H2 section headers | 600 |
| `40px–64px` | H1 hero headline | 600 |

### Tracking conventions

- Labels: `tracking-[0.16em]` to `tracking-[0.22em]` — generous spacing for small caps
- Headlines: `tracking-[-0.035em]` — tight for impact at large sizes
- Code: `tracking-normal` — mono fonts have their own spacing

### Line height

- Body copy: `leading-[1.7]` to `leading-[1.8]` — generous for readability
- Headlines: `leading-[1.06]` — tight for display text
- Code: `leading-[1.75]` — generous for multi-line scanning

---

## Spacing

Grid unit: **4px**.

| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` | 4px | Inline icon gaps |
| `gap-2` / `gap-3` | 8–12px | Within components |
| `gap-4` to `gap-6` | 16–24px | Between components in a row |
| `gap-8` to `gap-12` | 32–48px | Column gaps, major sections |
| Section `py` | 80px / 112px (desktop) | Vertical breathing room |

### Container

Max-width: `72rem` (1152px). Padding: `1.5rem` (24px) each side.

---

## Motion

### Philosophy

Motion communicates state change — not decoration. Every animation should answer:
"what changed, and why does it matter?"

The brand personality is precise and confident. Animation should feel:
- **Physical** — spring physics, not duration-based tweens. Things settle.
- **Fast** — UI interactions under 200ms. Entrance animations under 900ms.
- **Purposeful** — blur on entrance (something materializing), slide on nav transitions,
  fade for async states.

### Core spring

```typescript
// The primary spring — high damping, never bouncy
const SPRING = { type: "spring", stiffness: 60, damping: 20, mass: 1 };

// Fast interactive spring — buttons, toggles
const FAST_SPRING = { type: "spring", stiffness: 400, damping: 25 };

// Layout spring — nav pill, repositioning elements
const LAYOUT_SPRING = { type: "spring", stiffness: 380, damping: 30 };
```

### Entrance easing

```typescript
// Expo-out — fast start, smooth landing
const EASE_OUT_EXPO = [0.16, 1, 0.32, 1];
```

### Stagger pattern

```typescript
// Section entrances: children stagger 60ms apart
const STAGGER = { staggerChildren: 0.06, delayChildren: 0.08 };

// Items: appear with upward slide + blur dissolve
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...SPRING } },
};
```

### Hover interactions

```typescript
// CTA buttons — subtle lift
whileHover={{ scale: 1.025, opacity: 0.92 }}
whileTap={{ scale: 0.975 }}
transition={FAST_SPRING}

// Navigation links — no scale, color only (CSS transition-colors)
```

### What NOT to animate

- Don't animate layout shifts between pages (no page transitions).
- Don't animate color changes on text (distracting when reading).
- Don't loop decorative animations (orbs, pulses) — they're background noise.
- Respect `prefers-reduced-motion` — all animations disabled at 0.01ms.

---

## Components

### Navbar

- Height: 60px
- Blur: `backdrop-blur-[20px]` + `bg-[var(--color-bg)]/88` when scrolled
- Scrolled state: `border-b border-[var(--color-border)]` — appears with `transition-[border-color,background-color,backdrop-filter] duration-300`
- Desktop nav: active state uses a `layoutId="nav-pill"` spring pill indicator
- Mobile menu: animated with `AnimatePresence` — stagger entrance per item with blur dissolve
- CTAs: ghost style ("Book demo") + filled ("Get started") with spring hover

### Cards

```
border: 1px solid var(--color-border)
background: var(--color-bg-elevated)
border-radius: 12px (rounded-xl)
```

Active/highlighted variant:
```
border-color: rgba(16,185,129,0.25)   ← green for verified/active
```

### Code blocks

```
background: var(--color-bg-elevated)
border: 1px solid var(--color-border)
border-radius: 12px
padding: 20px
font: JetBrains Mono 13px
line-height: 1.75
```

Three decorative dots in the header bar (not interactive). Language label, right-aligned, 10px mono.

**Syntax coloring:**

| Type | Color |
|------|-------|
| Keywords (`import`, `const`, `await`) | `#6366f1` (indigo) |
| Strings | `rgba(16,185,129,0.9)` (green) |
| Numbers / booleans | `rgba(245,158,11,0.85)` (amber) |
| Class names / constructors | `rgba(245,158,11,0.85)` (amber) |
| Comments | `rgba(255,255,255,0.28)` |
| Default text | `rgba(255,255,255,0.6)` |

### Badges

Small inline labels. 10px mono, 0.12em tracking, `px-2 py-0.5 rounded border`.

| Variant | Color logic |
|---------|-------------|
| Green | `rgba(16,185,129,...)` — verified, active, open source |
| Indigo | `rgba(99,102,241,...)` — informational |
| Amber | `rgba(245,158,11,...)` — pending, alpha, caution |

### Buttons

| Variant | Style |
|---------|-------|
| Primary (filled) | `bg-[var(--color-fg)] text-[var(--color-bg)]` — inverted |
| Ghost | `text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]` |
| Outline | `border border-[var(--color-border-strong)] hover:border-[rgba(255,255,255,0.2)]` |

No rounded-full buttons. `rounded-[6px]` — slightly rounded, not pill.

### Section dividers

1px gradient line: `transparent → --color-border → transparent`. Full container width.
Never bleed to page edge.

### Trust bar

Between hero and first section. Narrow strip, `border-y border-[var(--color-border)]`,
`bg-[var(--color-bg-subtle)]`. Monospace items, `divide-x` separator. Fade in at `1.2s delay`.

---

## Iconography

Inline SVGs only — no icon libraries in the UI. Icons at 16px unless specified.

Current icons:
- **Swap** (payload manipulation) — two opposing arrows, 16px
- **Clock** (authorization gap) — circle + hands with gap, 16px  
- **Inject** (context injection) — rightward arrow with a left wall, 16px
- **GitHub** — official mark, 17px, in nav and footer
- **Twitter/X** — X mark, 15px

Rules:
- No filled decorative icons. All stroke or minimal fill.
- Color: inherit from parent (`currentColor`).
- Semantic icons for attack types use `rgba(239,68,68,0.6)` — muted red.

---

## Layout patterns

### Split hero

Left: text content (headline, body, CTAs, trust signals).  
Right: interactive product artifact (TrustReceipt component).  
Breakpoint: `lg` (1024px). Below: stacks vertically, receipt below text.

### Scroll story

Sticky left panel (status/step indicator) + scrollable right content.  
Breakpoint: `md` (768px). Below: linear vertical stack.

### Vision timeline

On desktop (`md+`): 160px left column (phase label + status + dot) + flex-1 card.  
On mobile: dot in card header, all content inline.

### Three-column grid

Problem cards, ecosystem platforms — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

### Competitive table

Overflow-x scroll wrapper with mobile hint `("scroll right →")`.

---

## Copywriting standards

**Voice:** A security engineer talking to a CTO. Precise. Direct. No fluff.

| Do | Don't |
|----|-------|
| "Every payment is verified before it runs" | "Comprehensive security for your AI workflow" |
| "Throws VerificationError if any field changed" | "Seamlessly prevents malicious transactions" |
| "ed25519, SHA-256, <2ms" | "Enterprise-grade cryptography" |
| "Not after. Never after." | "Real-time protection" |

**Headlines:** Statement of fact, not question or exclamation.  
**Labels:** All-caps, tracked, monospaced — system message aesthetic.  
**CTAs:** Action + context — "Book a demo" not "Get started" for the primary trust-building action. "Get started" for developer self-serve.

---

## Anti-patterns

These patterns are explicitly banned:

- Purple-to-blue gradients on backgrounds or text
- Floating blob shapes or abstract background shapes  
- 3D illustrated product mockups
- Animated particle effects
- Generic "lightning bolt" or "shield" icons for security
- "Robust", "comprehensive", "seamless", "leverage" in copy
- Centered-everything layouts (except hero text on mobile)
- Decorative looping animations
- Glass morphism panels with heavy border-radius
- Any color that isn't in the defined palette

---

## Responsive breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| `sm` | 640px | Stacked → inline CTAs |
| `md` | 768px | Mobile menu hidden, desktop nav shown |
| `lg` | 1024px | Hero splits to two columns |
| `xl` | 1280px | Sidebar widens in docs |

---

## File structure

```
src/
  app/
    globals.css          ← all CSS custom properties + utility classes
    layout.tsx           ← font loading (Inter + JetBrains Mono)
  components/
    layout/
      header.tsx         ← navbar with AnimatePresence mobile menu
      footer.tsx         ← 4-column links + social icons
    home/
      hero.tsx           ← split layout, spring entrance, TrustReceipt right
      trust-bar.tsx      ← Stripe-style trust signals strip
      problem.tsx        ← 3 attack cards with SVG icons
      why-now.tsx        ← 3 market forces
      scroll-story.tsx   ← sticky scroll narrative
      use-cases.tsx      ← tabbed buyer personas
      competitive.tsx    ← table + mobile scroll hint
      ecosystem.tsx      ← integration partner grid
      vision.tsx         ← roadmap timeline, wide desktop left column
      final-cta.tsx      ← dual-path enterprise + developer CTA
      trust-receipt.tsx  ← animated receipt artifact
    ui/
      button.tsx
      brand-icons.tsx
  lib/
    site-config.ts       ← all URLs, social links, CTA hrefs
    utils.ts
```

---

## Principles summary

1. **Precision over decoration.** If it doesn't communicate something, remove it.
2. **Code is the UI.** The product is cryptographic infrastructure. Show it.
3. **Green = verified.** Emerald carries semantic meaning throughout. Don't dilute it.
4. **Spring physics.** UI interactions should feel physical and settled, not tween-animated.
5. **The table stakes are different here.** This is a B2B security product. The buyer is
   an engineer deciding if they can trust STVOR with their customers' money. Every design
   decision should make that person more confident, not less.
