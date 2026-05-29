/**
 * Registry of the 5 demo sites ("previews") that ARTOSPHERED showcases.
 * The agency shell reads this to render the work grid and case cards.
 * Each preview lives in src/previews/<slug>/ and mounts at /p/<slug>.
 */
export const PREVIEWS = [
  {
    slug: 'lumen',
    name: 'LUMEN',
    kind: 'Photography Studio',
    tagline: 'Light, framed.',
    blurb: 'A cinematic portfolio for a photographer — full-bleed imagery, an immersive lightbox gallery and a booking flow.',
    year: '2026',
    accent: '#e7c89a',
    bg: '#0c0b0a',
    tags: ['Portfolio', 'Lightbox', 'Booking'],
  },
  {
    slug: 'prisma',
    name: 'PRISMA',
    kind: 'Art Gallery',
    tagline: 'Glass & light.',
    blurb: 'A contemporary gallery rendered in heavy glassmorphism — frosted panels layered over living gradients and artwork.',
    year: '2026',
    accent: '#9be7ff',
    bg: '#0a0f1a',
    tags: ['Glassmorphism', 'Exhibitions', 'Tickets'],
  },
  {
    slug: 'pulse',
    name: 'PULSE',
    kind: 'Music & Events',
    tagline: 'Feel the drop.',
    blurb: 'A high-energy festival site — animated lineup, a countdown, an interactive stage map and a tiered ticket selector.',
    year: '2026',
    accent: '#ff2e63',
    bg: '#0b0710',
    tags: ['Countdown', 'Lineup', 'Ticketing'],
  },
  {
    slug: 'atelier',
    name: 'ATELIER',
    kind: 'Fashion House',
    tagline: 'Quiet luxury.',
    blurb: 'An editorial fashion brand — a couture lookbook, a shoppable collection grid and a refined, serif-driven identity.',
    year: '2026',
    accent: '#c9a96a',
    bg: '#100d0a',
    tags: ['Editorial', 'Lookbook', 'Shop'],
  },
  {
    slug: 'void',
    name: 'VOID',
    kind: 'Web3 / NFT Studio',
    tagline: 'Own the future.',
    blurb: 'A futuristic NFT collective — an animated mint counter, a live roadmap, rarity-ranked drops and a connected-wallet feel.',
    year: '2026',
    accent: '#7cff9b',
    bg: '#06080a',
    tags: ['Mint UI', 'Roadmap', 'Rarity'],
  },
]

export const getPreview = (slug) => PREVIEWS.find((p) => p.slug === slug)
