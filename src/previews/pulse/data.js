// PULSE 2026 — shared data for the festival demo site.

// Fixed festival start used by the live countdown timer.
export const FESTIVAL_DATE = '2026-08-15T18:00:00'

export const FESTIVAL_INFO = {
  name: 'PULSE 2026',
  dates: 'Aug 15 – 17, 2026',
  location: 'Meridian Fields · Lisbon, Portugal',
}

// ~12 artists for the lineup grid. day: Fri | Sat | Sun
export const ARTISTS = [
  { id: 'a1', name: 'NOVA RAYE', day: 'Fri', stage: 'Mainstage', seed: 'pulse-nova', headliner: true },
  { id: 'a2', name: 'KOSMIK', day: 'Fri', stage: 'Neon Tent', seed: 'pulse-kosmik', headliner: false },
  { id: 'a3', name: 'BASSLINE THEORY', day: 'Fri', stage: 'The Pit', seed: 'pulse-bassline', headliner: false },
  { id: 'a4', name: 'AURORA VICE', day: 'Fri', stage: 'Sunset Deck', seed: 'pulse-aurora', headliner: false },
  { id: 'a5', name: 'DELTA WAVE', day: 'Sat', stage: 'Mainstage', seed: 'pulse-delta', headliner: true },
  { id: 'a6', name: 'GLITCHCORE', day: 'Sat', stage: 'Neon Tent', seed: 'pulse-glitch', headliner: false },
  { id: 'a7', name: 'MIDNIGHT FREQ', day: 'Sat', stage: 'The Pit', seed: 'pulse-midnight', headliner: false },
  { id: 'a8', name: 'SOLARA', day: 'Sat', stage: 'Sunset Deck', seed: 'pulse-solara', headliner: false },
  { id: 'a9', name: 'PHANTOM 808', day: 'Sun', stage: 'Mainstage', seed: 'pulse-phantom', headliner: true },
  { id: 'a10', name: 'ECHO DRIFT', day: 'Sun', stage: 'Neon Tent', seed: 'pulse-echo', headliner: false },
  { id: 'a11', name: 'RAVEN STATIC', day: 'Sun', stage: 'The Pit', seed: 'pulse-raven', headliner: false },
  { id: 'a12', name: 'LUNAR CULT', day: 'Sun', stage: 'Sunset Deck', seed: 'pulse-lunar', headliner: false },
]

export const DAYS = ['Fri', 'Sat', 'Sun']

// Marquee artist names ticker.
export const MARQUEE = ARTISTS.map((a) => a.name)

// Schedule keyed by day → list of set times across stages.
export const SCHEDULE = {
  Fri: [
    { time: '16:00', stage: 'Sunset Deck', artist: 'AURORA VICE' },
    { time: '17:30', stage: 'The Pit', artist: 'BASSLINE THEORY' },
    { time: '19:00', stage: 'Neon Tent', artist: 'KOSMIK' },
    { time: '21:00', stage: 'Mainstage', artist: 'NOVA RAYE' },
    { time: '23:30', stage: 'Neon Tent', artist: 'AFTERGLOW (DJ Set)' },
  ],
  Sat: [
    { time: '15:30', stage: 'Sunset Deck', artist: 'SOLARA' },
    { time: '17:00', stage: 'The Pit', artist: 'MIDNIGHT FREQ' },
    { time: '18:45', stage: 'Neon Tent', artist: 'GLITCHCORE' },
    { time: '21:15', stage: 'Mainstage', artist: 'DELTA WAVE' },
    { time: '00:00', stage: 'The Pit', artist: 'B2B ALL-NIGHT' },
  ],
  Sun: [
    { time: '15:00', stage: 'Sunset Deck', artist: 'LUNAR CULT' },
    { time: '16:45', stage: 'The Pit', artist: 'RAVEN STATIC' },
    { time: '18:30', stage: 'Neon Tent', artist: 'ECHO DRIFT' },
    { time: '20:45', stage: 'Mainstage', artist: 'PHANTOM 808' },
    { time: '22:30', stage: 'Mainstage', artist: 'CLOSING CEREMONY' },
  ],
}

// Ticket tiers for the order calculator.
export const TICKETS = [
  {
    id: 'day',
    name: 'Day Pass',
    price: 89,
    blurb: 'Single-day entry. Pick your night, ride the wave.',
    perks: ['1-day festival access', 'All stages', 'Re-entry same day'],
  },
  {
    id: 'weekend',
    name: 'Weekend',
    price: 219,
    blurb: 'All three days. The full PULSE experience, start to finish.',
    perks: ['3-day festival access', 'All stages + afters', 'Free locker', 'Festival merch tote'],
    featured: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 449,
    blurb: 'Elevated platforms, fast lanes and premium bars.',
    perks: ['3-day VIP access', 'Raised viewing decks', 'Express entry', 'VIP bars & lounge'],
  },
  {
    id: 'backstage',
    name: 'Backstage',
    price: 899,
    blurb: 'Behind the curtain. Where the energy is born.',
    perks: ['Everything in VIP', 'Backstage access', 'Artist meet & greet', 'Golf-cart transfers'],
  },
]

export const FAQ = [
  { q: 'What are the gate times?', a: 'Doors open at 15:00 each day. Last entry is 23:00. The music runs late — set times in the Schedule.' },
  { q: 'Is there camping on site?', a: 'Yes. Meridian Fields has tiered camping from basic pitches to glamping pods. Add-ons go live with ticket sales.' },
  { q: 'What can I bring in?', a: 'Empty refillable bottles, sealed sunscreen and good vibes. No glass, no professional cameras, no outside drinks.' },
  { q: 'Are tickets refundable?', a: 'Tickets are non-refundable but fully transferable up to 7 days before the festival via your PULSE account.' },
]

export const SOCIALS = [
  { label: 'Instagram', handle: '@pulsefest' },
  { label: 'TikTok', handle: '@pulse2026' },
  { label: 'X', handle: '@pulse_live' },
  { label: 'Spotify', handle: 'PULSE Official' },
]
