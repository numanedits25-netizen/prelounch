# LeadZone AI — pre-launch page

Animated waitlist / pre-launch landing page for **LeadZone AI**.

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS 3 · Framer Motion 12 · lucide-react
**Fonts:** Syne (display) · DM Sans (body) · JetBrains Mono (data) — same as the product.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Page structure

| # | Section | File | Signature motion |
|---|---|---|---|
| 1 | Nav + scroll progress | `components/nav.tsx` | glass on scroll, gradient progress bar |
| 2 | Hero + waitlist | `components/hero.tsx` | word-rise headline, light beam, 3D console that flattens on scroll |
| — | Radar scan console | `components/radar-console.tsx` | typed query → radar sweep → pins → ranked list → top-pick card (clickable niches) |
| 3 | Stats + niche marquee | `components/marquee.tsx` | count-ups, dual marquee |
| 4 | Problem | `components/problem.tsx` | scroll-linked: 8 scattered tabs collapse into one lead card |
| 5 | How it works | `components/how-it-works.tsx` | sticky scrollytelling (desktop), 4 animated step visuals |
| 6 | Five engines | `components/engines.tsx` | bento, CWV gauges, spotlight cards |
| 7 | Proof | `components/proof.tsx` | benchmark bars (F1 91.4 vs 65.2), evidence trace |
| 8 | AI pitch | `components/pitch.tsx` | tabbed typewriter (email / call / proposal / audit / DM) |
| 9 | Workflow | `components/workflow.tsx` | live kanban, map pins, tracking bars |
| 10 | Audience | `components/audience.tsx` | |
| 11 | Founding members + referral | `components/founding.tsx` | |
| 12 | FAQ | `components/faq.tsx` | accordion |
| 13 | Final CTA | `components/final-cta.tsx` | radar rings + sweep |

## Connecting the backend (next phase)

The waitlist is **UI-only** right now. Everything goes through one function:
`lib/waitlist.ts → joinWaitlist()`. Replace its body with a `POST /api/waitlist`
(Supabase insert + Resend confirmation) that returns `{ position, referralCode }` —
no component changes needed. `?ref=CODE` is already read from the URL and passed in.

All demo businesses and numbers in the console / visuals are illustrative (`lib/demo-data.ts`).
