/**
 * The 5 redesign DIRECTIONS for ARTOSPHERED. Same brand & content
 * (see content.js), five distinct visual treatments. Each lives in
 * src/previews/<slug>/ and mounts at /p/<slug>. The agency shell reads
 * this to render the "choose a direction" proposal grid.
 */
export const PREVIEWS = [
  {
    slug: 'atelier',
    no: '01',
    name: 'EDITORIAL',
    kind: 'High-fashion magazine',
    tagline: 'Print, on the web.',
    blurb: 'A light, editorial direction — serif headlines, generous margins and a magazine grid. Reads like the print issue ARTOSPHERED never had.',
    accent: '#c9a96a',
    bg: '#100d0a',
    tags: ['Editorial', 'Serif', 'Light theme'],
  },
  {
    slug: 'prisma',
    no: '02',
    name: 'PRISM',
    kind: 'Glassmorphism',
    tagline: 'Glass & light.',
    blurb: 'Heavy glassmorphism — frosted panels layered over living gradients and culture imagery. Luminous, modern, tactile.',
    accent: '#9be7ff',
    bg: '#0a0f1a',
    tags: ['Glassmorphism', 'Gradient mesh', 'Depth'],
  },
  {
    slug: 'lumen',
    no: '03',
    name: 'MONOLITH',
    kind: 'Cinematic dark',
    tagline: 'Lights down.',
    blurb: 'A cinematic, full-bleed direction — moody imagery, big type and a gallery-grade lightbox. The archive as a film.',
    accent: '#e7c89a',
    bg: '#0c0b0a',
    tags: ['Cinematic', 'Full-bleed', 'Lightbox'],
  },
  {
    slug: 'pulse',
    no: '04',
    name: 'FREQUENCY',
    kind: 'Bold & vibrant',
    tagline: 'Loud on purpose.',
    blurb: 'High-energy and kinetic — neon gradients, marquees and motion everywhere. Street-culture volume turned all the way up.',
    accent: '#ff2e63',
    bg: '#0b0710',
    tags: ['Kinetic', 'Neon', 'Marquee'],
  },
  {
    slug: 'void',
    no: '05',
    name: 'ARCHIVE',
    kind: 'Brutalist terminal',
    tagline: 'Raw data.',
    blurb: 'A brutalist, archival direction — monospaced grids, hairline rules and index energy. Culture, catalogued like a database.',
    accent: '#7cff9b',
    bg: '#06080a',
    tags: ['Brutalist', 'Monospace', 'Grid'],
  },
]

export const getPreview = (slug) => PREVIEWS.find((p) => p.slug === slug)
