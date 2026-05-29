# ARTOSPHERED — Creative Web Studio

A redesigned, proposal-ready showcase site for **ARTOSPHERED**. It positions the studio
and ships **five complete, navigable demo websites** — proof of exactly what we can build
for a client.

> Built with React + Vite + React Router. Fully responsive (mobile · tablet · desktop)
> with a hamburger menu on mobile & tablet, scroll-driven motion, and per-demo design systems.

## The 5 demos (each is a full 5-page site)

| Demo | Industry | Highlight |
|------|----------|-----------|
| **LUMEN** | Photography studio | Filterable gallery + keyboard lightbox, booking flow |
| **PRISMA** | Art gallery | **Heavy glassmorphism** — frosted panels over an animated gradient mesh |
| **PULSE** | Music & events | Live countdown, day-filtered lineup, schedule tabs, ticket calculator |
| **ATELIER** | Fashion house | Light editorial theme, horizontal-scroll lookbook, quick-view shop |
| **VOID** | Web3 / NFT | Connect-wallet UI, animated mint bar, rarity-filtered drops, mint flow |

Routes: `/` (studio) and `/p/<lumen·prisma·pulse·atelier·void>`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the build
```

## Structure

```
src/
  agency/        ARTOSPHERED studio shell (Home, Work, Services, Process, Contact)
  previews/      the 5 demo sites, each self-contained (own routes, CSS module, data)
  shared/        useReveal (scroll reveal), ScrollToTop, preview registry
```

© 2026 ARTOSPHERED.
