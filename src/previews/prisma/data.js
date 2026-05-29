/* PRISMA — static data */

export const EXHIBITIONS = [
  {
    id: 'luminous-void',
    title: 'Luminous Void',
    artist: 'Aiko Tanaka',
    status: 'current',
    dates: '3 Apr – 28 Jun 2026',
    location: 'Gallery I & II',
    medium: 'Light installation, mirrors, generative audio',
    description:
      'An immersive exploration of the space between presence and absence. Tanaka suspends 4,800 hand-blown glass spheres from the ceiling, each refracting a single beam of violet light. As visitors move through the installation the soundscape responds in real time, collapsing the boundary between observer and observed.',
    seed: 'luminousvoid',
    w: 800,
    h: 600,
  },
  {
    id: 'data-terra',
    title: 'Data Terra',
    artist: 'Marcus Webb',
    status: 'current',
    dates: '18 Mar – 14 Jun 2026',
    location: 'Gallery III',
    medium: 'Algorithmic painting, archival inkjet',
    description:
      'Webb\'s "Data Terra" translates decades of satellite climate data into monumental landscapes. Each 3 × 4 m canvas is the direct output of a neural network trained on atmospheric temperature gradients, sea-level anomalies and ice-sheet loss. The work is simultaneously scientific document and elegy.',
    seed: 'dataland',
    w: 800,
    h: 600,
  },
  {
    id: 'soft-architecture',
    title: 'Soft Architecture',
    artist: 'Chloe Bernardin',
    status: 'upcoming',
    dates: '10 Jul – 27 Sep 2026',
    location: 'East Wing + Courtyard',
    medium: 'Textile, resin, structural steel',
    description:
      'Bernardin reimagines the load-bearing logic of buildings through fabric. Vast woven membranes — some spanning 12 metres — are tensioned inside the East Wing, creating semi-transparent rooms within rooms. The courtyard installation responds to wind, changing silhouette throughout the day.',
    seed: 'softarch',
    w: 800,
    h: 600,
  },
  {
    id: 'echo-chamber',
    title: 'Echo Chamber',
    artist: 'Dario Messina',
    status: 'upcoming',
    dates: '5 Aug – 2 Nov 2026',
    location: 'Gallery IV',
    medium: 'Video sculpture, spatial audio, biometric sensors',
    description:
      'Visitors entering "Echo Chamber" see their own biometric data — heartbeat, skin conductance, eye movement — visualised in real time across nine towering screens. Messina interrogates surveillance, intimacy and what it means to be seen in an age of total data capture.',
    seed: 'echochamber',
    w: 800,
    h: 600,
  },
  {
    id: 'after-the-flood',
    title: 'After the Flood',
    artist: 'Yara Osei',
    status: 'past',
    dates: '12 Oct – 20 Dec 2025',
    location: 'Gallery I',
    medium: 'Oil, encaustic, found objects',
    description:
      'Osei\'s landmark survey drew on oral histories gathered across three continents. Massive encaustic panels embedded with salvaged domestic objects spoke of displacement, memory and the persistence of beauty inside catastrophe. The exhibition was seen by over 28,000 visitors.',
    seed: 'afterflood',
    w: 800,
    h: 600,
  },
  {
    id: 'pure-signal',
    title: 'Pure Signal',
    artist: 'Tomas Eriksson',
    status: 'past',
    dates: '6 Jun – 31 Aug 2025',
    location: 'Gallery II & III',
    medium: 'Neon, microcontrollers, custom software',
    description:
      'A high-frequency dialogue between analogue craft and digital control. Eriksson hand-bent over 1,200 metres of neon tubing then networked every tube through a central algorithm that shifts the entire colour temperature every 12 minutes — almost imperceptibly at first, shocking by nightfall.',
    seed: 'puresignal',
    w: 800,
    h: 600,
  },
]

export const FEATURED = EXHIBITIONS[0]

export const ARTISTS = [
  { id: 'aiko', name: 'Aiko Tanaka', discipline: 'Light & installation', origin: 'Osaka / Berlin', seed: 'aiko1', bio: 'Tanaka\'s practice centres on the threshold states — dawn, dusk, the edge of sleep — translated into spatial environments using glass, light and generative code.' },
  { id: 'marcus', name: 'Marcus Webb', discipline: 'Algorithmic painting', origin: 'Cape Town / London', seed: 'marcus1', bio: 'Webb writes the programs that make the paintings, then steps back. The work exists at the intersection of machine learning, environmental data and the tradition of landscape painting.' },
  { id: 'chloe', name: 'Chloe Bernardin', discipline: 'Textile sculpture', origin: 'Lyon / New York', seed: 'chloe1', bio: 'Bernardin trained as a structural engineer before turning to art. Her textile works borrow from tensile architecture, suspension bridge design and haute couture in equal measure.' },
  { id: 'dario', name: 'Dario Messina', discipline: 'Video & biometric art', origin: 'Rome / Tokyo', seed: 'dario1', bio: 'Working between neuroscience labs and gallery spaces, Messina uses biometric sensors to transform invisible physiological data into monumental visual experiences.' },
  { id: 'yara', name: 'Yara Osei', discipline: 'Painting & encaustic', origin: 'Accra / Paris', seed: 'yara1', bio: 'Osei\'s densely layered encaustic panels carry embedded objects — buttons, fabric scraps, photographs — as acts of archival resistance and communal memory.' },
  { id: 'tomas', name: 'Tomas Eriksson', discipline: 'Neon & code', origin: 'Stockholm / Los Angeles', seed: 'tomas1', bio: 'Eriksson reconciles the handmade heat of neon glass-blowing with networked software control, creating works that feel simultaneously ancient and hyper-contemporary.' },
  { id: 'priya', name: 'Priya Ravenscroft', discipline: 'Ceramics & glaze science', origin: 'Mumbai / Amsterdam', seed: 'priya1', bio: 'Ravenscroft develops proprietary glaze formulas that respond to gallery humidity and temperature, meaning every work continues to evolve long after leaving the kiln.' },
  { id: 'sol', name: 'Sol Vásquez', discipline: 'Performance & sculpture', origin: 'Mexico City / Berlin', seed: 'sol1', bio: 'Vásquez\'s durational performances dissolve into permanent sculptures — the residue of months-long actions cast in bronze, resin and stone.' },
]

export const TICKET_TYPES = [
  { id: 'adult', label: 'Adult', desc: 'Full access, permanent + temporary galleries', price: 18 },
  { id: 'concession', label: 'Concession', desc: 'Students, over 65s, unwaged — ID required', price: 10 },
  { id: 'family', label: 'Family (2 + 2)', desc: 'Two adults and up to two children under 16', price: 42 },
  { id: 'premium', label: 'Premium Access', desc: 'Includes guided tour (11am & 2pm daily)', price: 28 },
  { id: 'child', label: 'Child (under 12)', desc: 'Accompanied by an adult ticket holder', price: 0 },
]
