/**
 * MOCK CMS
 * -----------------------------------------------------------------------------
 * Mirrors the Framer CMS schema field-for-field. Every key here becomes a CMS
 * field in Framer, which is how the client ends up able to edit everything
 * without touching the design.
 *
 * COPY RULE FOR THIS SITE: write flat. State what the work is, who it was for,
 * how it was made. A production house's words should read like a call sheet;
 * the films carry the personality.
 *
 * Three specific things to keep out, all of which were in an earlier draft:
 *   1. "X, not Y" constructions, and words like "actually" used for candour.
 *   2. A closing clause that exists for rhythm rather than information -
 *      "one film", "the factory floor lights itself", "one that held to the end".
 *      If the last clause carries no fact, cut it.
 *   3. Lines borrowed from a reference site. A reference is for the layout and
 *      the feel, never the words - especially when the reference is another
 *      site by the same author, where duplicate copy is a real liability.
 *
 * Every line below is placeholder for ADGOD to replace with their own facts -
 * see docs/04-CLIENT-CONTENT-REQUEST.md.
 */

/* ---------------------------------------------------------------- Categories */
export const categories = [
  { slug: 'ad-film', name: 'Ad film' },
  { slug: 'brand-film', name: 'Brand film' },
  { slug: 'music-video', name: 'Music video' },
  { slug: 'documentary', name: 'Documentary' },
  { slug: 'product', name: 'Product' },
  { slug: 'social', name: 'Social' },
]

/* ----------------------------------------------------------------- Services */
export const services = [
  {
    index: '01',
    name: 'Ad films & TVC',
    body: 'Television and digital commercials. Script, casting, direction, shoot and post.',
    image: '/stills/s1.jpg',
  },
  {
    index: '02',
    name: 'Brand films',
    body: 'Longer-form films for launches, founder stories and campaigns.',
    image: '/stills/s2.jpg',
  },
  {
    index: '03',
    name: 'Music videos',
    body: 'Performance and narrative videos for artists and labels.',
    image: '/stills/s3.jpg',
  },
  {
    index: '04',
    name: 'Product & tabletop',
    body: 'Studio shoots for products. Macro, high speed and motion control.',
    image: '/stills/s4.jpg',
  },
  {
    index: '05',
    name: 'Documentary',
    body: 'Observational and interview-led films, shot on location.',
    image: '/stills/s5.jpg',
  },
  {
    index: '06',
    name: 'Social',
    body: 'Vertical cutdowns and campaign variants, delivered in volume.',
    image: '/stills/s6.jpg',
  },
]

/* ----------------------------------------------------------------- Projects */
/* `featured` + `order` drive the Home page grid. The client adds, removes and
   reorders here; both pages update on their own. */
export const projects = [
  {
    slug: 'the-long-way-round',
    title: 'The Long Way Round',
    client: 'Meridian Motors',
    category: 'ad-film',
    year: '2026',
    featured: true,
    order: 1,
    cover: '/stills/p1.jpg',
    excerpt: 'A sixty-second launch film, shot at night across two state highways.',
    summary:
      'Three night shoots on the highway between Pune and Nashik. One camera car, practical light only. Delivered as 60s, 30s and 15s cuts with vertical versions for social.',
    services: ['Concept', 'Direction', 'Production', 'Post & grade'],
    credits: [
      ['Director', '—'],
      ['DOP', '—'],
      ['Producer', '—'],
      ['Edit', '—'],
    ],
    stills: ['/stills/x1.jpg', '/stills/x3.jpg', '/stills/x2.jpg'],
    video: '',
  },
  {
    slug: 'salt',
    title: 'Salt',
    client: 'Kala Kitchen',
    category: 'brand-film',
    year: '2026',
    featured: true,
    order: 2,
    cover: '/stills/p2.jpg',
    excerpt: 'A four-minute film about a family kitchen running the same menu since 1974.',
    summary:
      'Four days in the kitchen before the camera came out, then five shoot days on location. No scripted voiceover — the narration was cut from interviews recorded during service.',
    services: ['Direction', 'Location production', 'Edit', 'Sound'],
    credits: [
      ['Director', '—'],
      ['DOP', '—'],
      ['Sound', '—'],
    ],
    stills: ['/stills/x4.jpg', '/stills/x5.jpg', '/stills/p9.jpg'],
    video: '',
  },
  {
    slug: 'nightcall',
    title: 'Nightcall',
    client: 'Vireo',
    category: 'music-video',
    year: '2025',
    featured: true,
    order: 3,
    cover: '/stills/p3.jpg',
    excerpt: 'A single-location performance video with eleven lighting states cued to the track.',
    summary:
      'Shot in one blacked-out studio over a day. The DMX board was pre-programmed to the master across a week of prep so every lighting change lands on a beat.',
    services: ['Concept', 'Direction', 'Lighting design', 'Post'],
    credits: [
      ['Director', '—'],
      ['Gaffer', '—'],
      ['Colour', '—'],
    ],
    stills: ['/stills/s3.jpg', '/stills/p7.jpg', '/stills/p8.jpg'],
    video: '',
  },
  {
    slug: 'first-pour',
    title: 'First Pour',
    client: 'Anhad Spirits',
    category: 'product',
    year: '2025',
    featured: true,
    order: 4,
    cover: '/stills/p4.jpg',
    excerpt: 'A nineteen-second product film shot on motion control at 1000fps.',
    summary:
      'Two days in studio. Single large source through a mirror, motion-control rig on a high-speed body. Eleven takes of the pour; one used.',
    services: ['Tabletop direction', 'Motion control', 'High speed', 'Grade'],
    credits: [
      ['Director', '—'],
      ['DOP', '—'],
      ['Motion control', '—'],
    ],
    stills: ['/stills/x5.jpg', '/stills/x4.jpg'],
    video: '',
  },
  {
    slug: 'monsoon-season',
    title: 'Monsoon Season',
    client: 'Indica Tea',
    category: 'ad-film',
    year: '2025',
    featured: true,
    order: 5,
    cover: '/stills/p5.jpg',
    excerpt: 'Shot in real rain over a nine-day weather window in the hills.',
    summary:
      'The brief allowed for a rain tower. We shot in real weather instead, holding for a nine-day window in the hills. Four of those days were usable.',
    services: ['Concept', 'Direction', 'Location production', 'Post'],
    credits: [
      ['Director', '—'],
      ['Line producer', '—'],
      ['Edit', '—'],
    ],
    stills: ['/stills/x1.jpg', '/stills/p6.jpg', '/stills/x2.jpg'],
    video: '',
  },
  {
    slug: 'the-tenth-floor',
    title: 'The Tenth Floor',
    client: 'Lumen Group',
    category: 'documentary',
    year: '2024',
    featured: true,
    order: 6,
    cover: '/stills/p6.jpg',
    excerpt: 'Twelve months following one building from empty shell to opening day.',
    summary:
      'Eighteen shoot days spread across a year in a single location. Cut into a nine-minute film and fourteen social verticals from the same footage.',
    services: ['Long-lead production', 'Direction', 'Edit', 'Cutdowns'],
    credits: [
      ['Director', '—'],
      ['DOP', '—'],
      ['Edit', '—'],
    ],
    stills: ['/stills/x2.jpg', '/stills/p12.jpg'],
    video: '',
  },

  /* --- archive-only items, so the index is deeper than the home six --- */
  {
    slug: 'counterweight',
    title: 'Counterweight',
    client: 'Forge Athletic',
    category: 'social',
    year: '2024',
    featured: false,
    order: 7,
    cover: '/stills/p7.jpg',
    excerpt: 'Forty-one vertical cuts from a two-day shoot block.',
    summary:
      'A shot matrix was built before the shoot so each setup produced four usable openings. Delivered in three aspect ratios.',
    services: ['Production', 'Edit', 'Variant delivery'],
    credits: [['Director', '—']],
    stills: ['/stills/s6.jpg', '/stills/s3.jpg'],
    video: '',
  },
  {
    slug: 'paper-boats',
    title: 'Paper Boats',
    client: 'Tanvi Rao',
    category: 'music-video',
    year: '2024',
    featured: false,
    order: 8,
    cover: '/stills/p8.jpg',
    excerpt: 'In-camera miniatures, no compositing.',
    summary:
      'Every effect was built on a table and shot in camera over three days in studio.',
    services: ['Concept', 'Direction', 'Practical FX'],
    credits: [['Director', '—']],
    stills: ['/stills/p11.jpg', '/stills/x3.jpg'],
    video: '',
  },
  {
    slug: 'open-kitchen',
    title: 'Open Kitchen',
    client: 'Sattva Foods',
    category: 'brand-film',
    year: '2024',
    featured: false,
    order: 9,
    cover: '/stills/p9.jpg',
    excerpt: 'Six kitchens across six cities, cut as one film.',
    summary:
      'Local crews in each city worked to a shared lighting plan and a single lens set, so the footage would cut together.',
    services: ['Multi-city production', 'Production design', 'Edit'],
    credits: [['Producer', '—']],
    stills: ['/stills/p9.jpg', '/stills/x4.jpg'],
    video: '',
  },
  {
    slug: 'cold-start',
    title: 'Cold Start',
    client: 'Arc Mobility',
    category: 'product',
    year: '2023',
    featured: false,
    order: 10,
    cover: '/stills/p10.jpg',
    excerpt: 'A launch film built from CAD before the product existed.',
    summary:
      'Plates shot on location, CG build matched to them. Delivered three weeks before the first unit came off the line.',
    services: ['Previs', 'Plate photography', 'CG integration'],
    credits: [['Director', '—']],
    stills: ['/stills/p10.jpg', '/stills/x1.jpg'],
    video: '',
  },
  {
    slug: 'the-quiet-hours',
    title: 'The Quiet Hours',
    client: 'Meridian Motors',
    category: 'documentary',
    year: '2023',
    featured: false,
    order: 11,
    cover: '/stills/p11.jpg',
    excerpt: 'Six weeks on the night shift with a two-person crew.',
    summary:
      'Long lens and no lighting package: the shoot used only the existing floor lighting.',
    services: ['Field production', 'Direction', 'Edit'],
    credits: [['Director', '—']],
    stills: ['/stills/p11.jpg', '/stills/x3.jpg'],
    video: '',
  },
  {
    slug: 'everything-on-red',
    title: 'Everything On Red',
    client: 'Sable',
    category: 'ad-film',
    year: '2023',
    featured: false,
    order: 12,
    cover: '/stills/p12.jpg',
    excerpt: 'A thirty-second spot in a single take.',
    summary:
      'Four days of rehearsal with the full crew, then one shoot day. Eleven attempts; take nine was used.',
    services: ['Concept', 'Direction', 'Choreography', 'Production'],
    credits: [['Director', '—']],
    stills: ['/stills/p12.jpg', '/stills/x2.jpg'],
    video: '',
  },
]

/* ------------------------------------------------------------- Social links */
export const socials = [
  { name: 'Instagram', url: '#' },
  { name: 'Vimeo', url: '#' },
  { name: 'YouTube', url: '#' },
  { name: 'LinkedIn', url: '#' },
]

/* ------------------------------------------------------------------ Helpers */
export const featured = () =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order).slice(0, 6)

export const bySlug = (slug) => projects.find((p) => p.slug === slug)

export const categoryName = (slug) => categories.find((c) => c.slug === slug)?.name ?? slug

export const related = (slug, n = 3) => {
  const current = bySlug(slug)
  if (!current) return []
  const same = projects.filter((p) => p.slug !== slug && p.category === current.category)
  const rest = projects.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...same, ...rest].slice(0, n)
}
