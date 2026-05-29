/**
 * Single source of truth for the REAL ARTOSPHERED brand.
 * Every redesign concept pulls copy/data from here so the 5 directions
 * differ only in design, never in content. Pulled & expanded from
 * artosphered.com (a creative-culture / cultural-archive brand).
 * Editorial entries below are on-brand sample copy for the redesign mockups.
 */

export const BRAND = {
  name: 'ARTOSPHERED',
  wordmark: ['art', 'sphered'],
  tagline: 'For the globe, for creatives',
  intersect: 'where creative culture intersects',
  heroLine1: 'NOT JUST A PLATFORM.',
  heroLine2: 'A CULTURAL ARCHIVE.',
  mission:
    'ARTOSPHERED documents art, fashion, and contemporary culture across cities, translating emerging movements and aesthetics into cultural insight.',
  pillars: ['Culture Report', 'Art & Design', 'Event Coverage'],
  email: 'artosphered@gmail.com',
  instagram: '@artosphered',
  instagramUrl: 'https://instagram.com/artosphered',
  est: '2024',
  cities: ['Jakarta', 'Tokyo', 'Berlin', 'New York', 'Seoul', 'London', 'Lagos', 'Paris'],
}

/** Pages that match the real site's navigation. */
export const NAV = [
  { path: '', label: 'Home', end: true },
  { path: 'culture-report', label: 'Culture Report' },
  { path: 'events', label: 'Event Coverage' },
  { path: 'services', label: 'Creative Services' },
  { path: 'contact', label: 'Contact' },
]

/** Culture Report — editorial articles. */
export const ARTICLES = [
  { id: 'c1', cat: 'Fashion', city: 'Tokyo', title: 'The New Silhouette: Tokyo’s Post-Streetwear Turn', excerpt: 'How a generation of designers is dismantling streetwear orthodoxy and rebuilding tailoring from the seams up.', read: '7 min', date: 'May 2026', seed: 'aro-cr-1' },
  { id: 'c2', cat: 'Art & Design', city: 'Berlin', title: 'Concrete Dreams: Brutalism’s Quiet Comeback', excerpt: 'A new wave of installation artists is reclaiming the cold geometry of the 70s — and making it feel warm.', read: '5 min', date: 'May 2026', seed: 'aro-cr-2' },
  { id: 'c3', cat: 'Culture', city: 'Lagos', title: 'Lagos After Midnight: The Sound of a City Rewriting Itself', excerpt: 'Field notes from the clubs, studios and rooftops where West African futurism is being authored in real time.', read: '9 min', date: 'Apr 2026', seed: 'aro-cr-3' },
  { id: 'c4', cat: 'Fashion', city: 'Seoul', title: 'Seoul’s Archive Kids and the Economy of Memory', excerpt: 'Vintage as ideology: inside the resale collectives turning fashion history into a living language.', read: '6 min', date: 'Apr 2026', seed: 'aro-cr-4' },
  { id: 'c5', cat: 'Art & Design', city: 'New York', title: 'The Studio Is the Message', excerpt: 'Why the most interesting work of 2026 is happening in the space between disciplines.', read: '8 min', date: 'Mar 2026', seed: 'aro-cr-5' },
  { id: 'c6', cat: 'Culture', city: 'Paris', title: 'Soft Power: The Return of the Salon', excerpt: 'Intimate gatherings are quietly replacing the mega-event as culture’s most important room.', read: '4 min', date: 'Mar 2026', seed: 'aro-cr-6' },
]

export const ARTICLE_CATS = ['All', 'Fashion', 'Art & Design', 'Culture']

/** Event Coverage — documented happenings. */
export const EVENTS = [
  { id: 'e1', name: 'PARALLAX — Generative Art Biennale', city: 'Berlin', date: 'Jun 14–16, 2026', status: 'Upcoming', tag: 'Exhibition', excerpt: 'Three days of code-driven installation across a decommissioned power station.', seed: 'aro-ev-1' },
  { id: 'e2', name: 'ATLAS Fashion Week — Off Schedule', city: 'Tokyo', date: 'May 02–08, 2026', status: 'Covered', tag: 'Fashion', excerpt: 'Our crew on the ground with 11 emerging houses showing outside the official calendar.', seed: 'aro-ev-2' },
  { id: 'e3', name: 'NOCTURNE: Sound + Light', city: 'Seoul', date: 'Apr 26, 2026', status: 'Covered', tag: 'Performance', excerpt: 'A single-night audiovisual takeover of an abandoned subway platform.', seed: 'aro-ev-3' },
  { id: 'e4', name: 'The Lagos Print Fair', city: 'Lagos', date: 'Jul 09–11, 2026', status: 'Upcoming', tag: 'Design', excerpt: 'Independent publishers, zines and risograph studios from across the continent.', seed: 'aro-ev-4' },
  { id: 'e5', name: 'MATERIAL — A Textile Symposium', city: 'Paris', date: 'Mar 18, 2026', status: 'Covered', tag: 'Talk', excerpt: 'Designers and archivists on sustainability, memory and the future of cloth.', seed: 'aro-ev-5' },
  { id: 'e6', name: 'OPEN STUDIOS — Bushwick', city: 'New York', date: 'Aug 22–23, 2026', status: 'Upcoming', tag: 'Open Studio', excerpt: '40 studios, one weekend, unfiltered access to the work in progress.', seed: 'aro-ev-6' },
]

/** Creative Services — what ARTOSPHERED offers brands & institutions. */
export const SERVICES = [
  { id: 's1', title: 'Editorial & Storytelling', desc: 'Long-form features, interviews and city reports that translate culture into insight for your audience.', items: ['Feature writing', 'Interviews', 'City guides', 'Trend reports'] },
  { id: 's2', title: 'Event Coverage & Documentation', desc: 'On-the-ground photo, video and written documentation of shows, launches and happenings.', items: ['Photo & video', 'Live coverage', 'Recap films', 'Archives'] },
  { id: 's3', title: 'Creative Direction', desc: 'Concept, art direction and visual identity for brands that want to speak the language of culture.', items: ['Art direction', 'Brand worlds', 'Campaigns', 'Lookbooks'] },
  { id: 's4', title: 'Community & Partnerships', desc: 'We connect brands with the creative communities we document — authentically, not extractively.', items: ['Talent network', 'Activations', 'Collaborations', 'Curation'] },
]

export const STATS = [
  { num: '8', label: 'Cities documented' },
  { num: '120+', label: 'Stories published' },
  { num: '40k', label: 'Community reach' },
  { num: '2024', label: 'Archiving since' },
]

/** Short notes for the Contact / footer pages. */
export const CONTACT = {
  blurb: 'Pitch a story, invite us to your event, or start a creative project. We read everything.',
  topics: ['Story pitch', 'Event coverage', 'Creative services', 'Partnership', 'Something else'],
}
