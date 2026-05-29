// Shared content for the LUMEN demo site.

export const BASE = '/p/lumen'

export const CATEGORIES = ['All', 'Portraits', 'Editorial', 'Travel', 'Weddings']

// Portfolio works. `seed` drives the picsum image, ratio gives masonry variety.
export const WORKS = [
  { id: 1, title: 'Smoke & Silk', cat: 'Editorial', seed: 'lumen-edit-1', w: 800, h: 1100 },
  { id: 2, title: 'Golden Hour, Lisbon', cat: 'Travel', seed: 'lumen-travel-2', w: 800, h: 560 },
  { id: 3, title: 'The First Look', cat: 'Weddings', seed: 'lumen-wed-3', w: 800, h: 1000 },
  { id: 4, title: 'Quiet Study', cat: 'Portraits', seed: 'lumen-port-4', w: 800, h: 900 },
  { id: 5, title: 'Marrakech Blue', cat: 'Travel', seed: 'lumen-travel-5', w: 800, h: 1080 },
  { id: 6, title: 'Atelier No. 9', cat: 'Editorial', seed: 'lumen-edit-6', w: 800, h: 600 },
  { id: 7, title: 'Vows at Dusk', cat: 'Weddings', seed: 'lumen-wed-7', w: 800, h: 1120 },
  { id: 8, title: 'Northern Light', cat: 'Portraits', seed: 'lumen-port-8', w: 800, h: 760 },
  { id: 9, title: 'Concrete & Linen', cat: 'Editorial', seed: 'lumen-edit-9', w: 800, h: 1040 },
  { id: 10, title: 'Sea Road', cat: 'Travel', seed: 'lumen-travel-10', w: 800, h: 540 },
  { id: 11, title: 'Held', cat: 'Weddings', seed: 'lumen-wed-11', w: 800, h: 980 },
  { id: 12, title: 'Window Light', cat: 'Portraits', seed: 'lumen-port-12', w: 800, h: 1080 },
]

export const SERVICES = [
  {
    tag: 'Signature',
    name: 'Portrait Sessions',
    price: '$650',
    unit: '/ session',
    desc: 'Quiet, considered portraiture lit like a film still — for individuals, families and personal brands.',
    items: ['90-minute session', 'One location of your choice', '40+ hand-finished images', 'Online private gallery', 'Print-ready high-resolution files'],
    featured: false,
  },
  {
    tag: 'Most booked',
    name: 'Wedding Films',
    price: '$3,200',
    unit: 'from',
    desc: 'Full-day documentary coverage that treats your wedding like the cinematic story it is.',
    items: ['Up to 10 hours coverage', 'Two photographers', '600+ edited images', 'Cinematic highlight gallery', 'Heirloom album option', 'Engagement session included'],
    featured: true,
  },
  {
    tag: 'Brands',
    name: 'Commercial & Editorial',
    price: '$1,800',
    unit: '/ day',
    desc: 'Art-directed imagery for brands, magazines and campaigns — concept to final grade.',
    items: ['Half or full-day shoot', 'Creative direction & moodboard', 'On-set retouch preview', 'Full usage licensing', 'Colour-graded master files'],
    featured: false,
  },
]

export const FAQS = [
  { q: 'How far in advance should I book?', a: 'For weddings and editorial campaigns we recommend reaching out six to nine months ahead. Portrait sessions can often be arranged within two to three weeks, subject to season and availability.' },
  { q: 'Do you travel for shoots?', a: 'Always. Roughly a third of our work is on location — across Europe, North Africa and beyond. Travel and accommodation are quoted transparently on top of the base package, never marked up.' },
  { q: 'How long until I receive my images?', a: 'Portrait galleries are delivered within 10 working days. Weddings and commercial projects take three to five weeks, as every frame is graded and finished by hand rather than batch-processed.' },
  { q: 'What is your editing style?', a: 'Cinematic and timeless. We grade for warm shadows, true skin tones and the soft fall-off of natural light. You will never get an over-processed, trend-chasing look that dates in a year.' },
  { q: 'Can we customise a package?', a: 'Of course. The packages are starting points. Tell us the story you want told and we will build a quote around it — extra hours, second shooters, albums, prints and more.' },
]

export const TIMELINE = [
  { year: '2011', title: 'First frame', text: 'Picked up a borrowed Leica in Berlin and never gave it back. Began shooting street and available-light portraits.' },
  { year: '2015', title: 'LUMEN founded', text: 'Opened the studio with a single belief — that a photograph should feel like a memory, not a snapshot.' },
  { year: '2019', title: 'Editorial era', text: 'Began working with independent fashion houses and travel publications across Europe and North Africa.' },
  { year: '2024', title: 'A wider lens', text: 'Now a small collective of three, telling stories for couples, brands and humans who value light.' },
]

export const GEAR = [
  ['Bodies', 'Leica SL2 · Sony A7 IV'],
  ['Primes', '35mm · 50mm · 85mm f/1.4'],
  ['Lighting', 'Profoto B10 · natural only'],
  ['Film', 'Portra 400 · Cinestill 800T'],
  ['Finishing', 'Hand-graded, no presets'],
  ['Backup', 'Dual-card, triple archive'],
]
