export const PROJECT_DESC = {
  hitech:
    'Engineering solutions for commercial and industrial facilities. We delivered HVAC, electrical, and mechanical systems, unified by a new brand identity and a technical website.',
  mulla:
    'A cross-border payments and wallet experience built for the African diaspora. We designed the full product, from brand identity and marketing site to the mobile app, to make remittances effortless.',
  onecity:
    'A refreshed identity and modern digital presence for a multi-location Abuja congregation. The brand system and site welcome new visitors and support weekly ministry operations online.',
  kudimata:
    'A financial literacy platform helping young Africans build confidence with money. We shaped the brand, site, and mobile product to make saving and investing feel approachable from day one.',
  sofa:
    'A new identity for a contemporary door manufacturer. We crafted a wordmark and mark that read like the product itself (quiet, precise, built to last), and a system that carries across showroom, packaging, and web.',
} as const

export type ImageRef = { image: string; alt: string }

export type ProjectMediaBlock =
  | {
      kind: 'figure-full'
      image?: string
      bg?: string
      alt: string
      label: string
      rationale: string
      aspect?: string
    }
  | {
      kind: 'figure-left'
      image: string
      alt: string
      label: string
      rationale: string
      aspect?: string
    }
  | {
      kind: 'figure-right'
      image: string
      alt: string
      label: string
      rationale: string
      aspect?: string
    }
  | {
      kind: 'pair'
      primary: ImageRef
      secondary: ImageRef
      label: string
      rationale: string
    }
  | {
      kind: 'gallery-3'
      images: [ImageRef, ImageRef, ImageRef]
      label: string
      rationale: string
    }
  | { kind: 'quote'; text: string; attribution?: string }
  | { kind: 'stats'; items: Array<{ value: string; label: string }> }

export type Project = {
  slug: 'hitech' | 'mulla' | 'onecity' | 'kudimata' | 'sofa'
  title: string
  client: string
  year: string
  industry: string
  disciplines: Array<string>
  shortDescription: string
  cover: { image?: string; bg?: string; alt: string }
  intro: string
  body: Array<ProjectMediaBlock>
}

const UNSPLASH = 'https://images.unsplash.com'
const COVER = '?w=2400&h=1500&fit=crop&auto=format&q=85'
const WIDE = '?w=2000&h=1200&fit=crop&auto=format&q=82'
const TALL = '?w=1400&h=1800&fit=crop&auto=format&q=82'
const SQUARE = '?w=1200&h=1200&fit=crop&auto=format&q=82'

const img = (id: string, size: string) => `${UNSPLASH}/photo-${id}${size}`

export const PROJECTS: Array<Project> = [
  {
    slug: 'hitech',
    title: 'Hitech Electro Mechanical',
    client: 'Hitech Electro Mechanical',
    year: '2025',
    industry: 'Engineering, Industrial',
    disciplines: ['Brand Identity', 'Web', 'Print System'],
    shortDescription: PROJECT_DESC.hitech,
    cover: {
      image: img('1581094794329-c8112a89af12', COVER),
      alt: 'A large industrial mechanical room with pipework and electrical panels',
    },
    intro:
      'A twelve-year-old engineering firm asked us to stop sounding like everyone else in the room. The work (HVAC, electrical, mechanical) was already excellent. The brand had to catch up.',
    body: [
      {
        kind: 'figure-full',
        image: img('1581092580497-e0d23cbdf1dc', WIDE),
        alt: 'An engineer at a worksite reviewing blueprints next to industrial equipment',
        label: '01: The discipline',
        rationale:
          'We started on site, not in Figma. Two weeks of plant rooms, switchboards, and after-hours commissioning gave us the vocabulary that the brand needed to inherit: exact, load-bearing, unornamented.',
      },
      {
        kind: 'figure-left',
        image: img('1488972685288-c3fd157d7c7a', TALL),
        alt: 'Architectural lines forming a sharp geometric grid against blue sky',
        label: '02: The mark',
        rationale:
          'The wordmark is set on the same drawing grid an engineer would use to lay out a plant room. Every junction is intentional, every clearance is to spec. It reads as a piece of engineering, not a piece of marketing.',
      },
      {
        kind: 'pair',
        primary: {
          image: img('1581094271901-8022df4466f9', TALL),
          alt: 'A close-up of industrial machinery with rugged steel and pipes',
        },
        secondary: {
          image: img('1581091226825-a6a2a5aee158', SQUARE),
          alt: 'Pipework and valves in a large industrial facility',
        },
        label: '03: The palette',
        rationale:
          'Two industrial blues and a high-visibility orange. The blues do the work: primary, secondary, background, ink. The orange is reserved for moments that matter: safety callouts, key data, the moment a user is meant to act.',
      },
      {
        kind: 'quote',
        text: 'Make a brand out of the work, never on top of it.',
      },
      {
        kind: 'figure-right',
        image: img('1635776062764-e025521e3df3', TALL),
        alt: 'Modern architectural facade with strong geometric repetition',
        label: '04: The web',
        rationale:
          'The site is organised around projects, not services. Each completed facility lives as a case file with photos, scope, equipment list and lead engineer, searchable by sector and by client. The marketing copy is short. The technical pages do the selling.',
      },
      {
        kind: 'gallery-3',
        images: [
          {
            image: img('1593642634443-44adaa06623a', TALL),
            alt: 'A precise architectural detail in steel and concrete',
          },
          {
            image: img('1554224155-6726b3ff858f', TALL),
            alt: 'A glowing computer monitor in a dark workspace',
          },
          {
            image: img('1581092918056-0c4c3acd3789', TALL),
            alt: 'An engineer at work in an industrial environment',
          },
        ],
        label: '05: In the field',
        rationale:
          'The system extends past the screen: site signage, project boards, equipment tags, fleet livery. We shipped a single set of templates the team can populate in under five minutes, so the brand stays consistent when nobody from the studio is in the room.',
      },
      {
        kind: 'stats',
        items: [
          { value: '12', label: 'Years in operation' },
          { value: '200+', label: 'Facilities delivered' },
          { value: '3 wks', label: 'From kickoff to launch' },
        ],
      },
    ],
  },
  {
    slug: 'mulla',
    title: 'Mulla',
    client: 'Mulla',
    year: '2025',
    industry: 'Fintech, Remittances',
    disciplines: ['Product Design', 'Brand', 'Mobile App', 'Marketing Site'],
    shortDescription: PROJECT_DESC.mulla,
    cover: {
      image: img('1556742502-ec7c0e9f34b1', COVER),
      alt: 'A hand holding a smartphone displaying a mobile payment interface',
    },
    intro:
      'Cross-border money is a trust problem, not a software problem. We designed Mulla (brand, app, marketing site) so that sending money home feels as simple, and as serious, as it should.',
    body: [
      {
        kind: 'figure-full',
        image: img('1611532736597-de2d4265fba3', WIDE),
        alt: 'A close-up of a phone screen showing a clean fintech interface',
        label: '01: The promise',
        rationale:
          'Three numbers, never hidden: the amount, the fee, the rate. The first screen of the product is the whole pitch. We resisted every request to add a hero illustration above the calculator. The calculator is the hero.',
      },
      {
        kind: 'pair',
        primary: {
          image: img('1563013544-824ae1b704d3', TALL),
          alt: 'A person checking a transaction on a mobile banking app',
        },
        secondary: {
          image: img('1554224154-22dec7ec8818', SQUARE),
          alt: 'A bright modern workspace with a phone and a notebook',
        },
        label: '02: The product',
        rationale:
          'Six screens cover ninety-five percent of usage: send, receive, confirm, track, repeat, support. Everything else lives behind the second tap. Onboarding is one form, not five, because trust is built faster by competence than by ceremony.',
      },
      {
        kind: 'quote',
        text: 'Remittance is the most emotional financial product in the world. We designed it like it.',
      },
      {
        kind: 'figure-left',
        image: img('1573497019940-1c28c88b4f3e', TALL),
        alt: 'A portrait of a young African professional in a thoughtful pose',
        label: '03: The audience',
        rationale:
          'We built Mulla for the diaspora professional who has tried five other apps and still does not quite trust any of them. The brand voice is calm, direct, written in the second person. No exclamation marks. No "amazing." No emoji.',
      },
      {
        kind: 'gallery-3',
        images: [
          {
            image: img('1502920917128-1aa500764cbd', TALL),
            alt: 'A laptop on a wooden desk in soft daylight',
          },
          {
            image: img('1607082348824-0a96f2a4b9da', TALL),
            alt: 'A clean overhead shot of a designer\'s workspace',
          },
          {
            image: img('1495020689067-958852a7765e', TALL),
            alt: 'A hand sketching on paper next to a laptop',
          },
        ],
        label: '04: The system',
        rationale:
          'A single token set powers the app, the marketing site, the support docs, and the email templates. The wordmark, the green, and the type are the only three things you need to know to recognise Mulla, from a phone home screen, a billboard, or a banking SMS.',
      },
      {
        kind: 'figure-right',
        image: img('1454165804606-c3d57bc86b40', TALL),
        alt: 'A modern advertising billboard at dusk with bright clean type',
        label: '05: The site',
        rationale:
          'The marketing site is a four-screen scroll, end to end. We removed the testimonials carousel, the partner logos, and the "as seen in" strip. Trust is built by showing the product, not by borrowing it.',
      },
      {
        kind: 'stats',
        items: [
          { value: '12', label: 'Corridors live at launch' },
          { value: '< 60s', label: 'Average send time' },
          { value: '4.8 ★', label: 'App store rating' },
        ],
      },
    ],
  },
  {
    slug: 'onecity',
    title: 'One City Church',
    client: 'One City Church',
    year: '2024',
    industry: 'Faith, Community',
    disciplines: ['Brand Identity', 'Web', 'Communications System'],
    shortDescription: PROJECT_DESC.onecity,
    cover: {
      image: img('1518709268805-4e9042af9f23', COVER),
      alt: 'Warm interior light streaming through tall windows in a quiet sanctuary',
    },
    intro:
      'A multi-location Abuja congregation needed an identity that worked Sunday morning and Wednesday night, for the first-time visitor and the lifelong member. The job was not to look modern. The job was to feel like welcome.',
    body: [
      {
        kind: 'figure-full',
        image: img('1518709594023-6eab9bab7b23', WIDE),
        alt: 'Soft natural light falling across rows of empty seats in a sanctuary',
        label: '01: The room',
        rationale:
          'Before we drew anything, we sat through six services across three campuses. The brand carries the temperature of those rooms (warm whites, dawn neutrals, ink that reads black but is actually a deep oxblood), so the digital surfaces feel like extensions of the physical space, not a contrast to it.',
      },
      {
        kind: 'figure-left',
        image: img('1518770660439-4636190af475', TALL),
        alt: 'Hands gently illuminated in warm soft light',
        label: '02: The identity',
        rationale:
          'A single mark, no wordmark variant. Built from one continuous stroke, a metaphor and a constraint at once. The mark works at the size of a profile photo and at the size of a bus billboard, and never sits beside an English word.',
      },
      {
        kind: 'pair',
        primary: {
          image: img('1559027615-cd4628902d4a', TALL),
          alt: 'Two hands meeting in a moment of greeting',
        },
        secondary: {
          image: img('1551836022-deb4988cc6c0', SQUARE),
          alt: 'A community gathered in soft warm light',
        },
        label: '03: Sunday system',
        rationale:
          'A weekly kit the comms team can fill in under thirty minutes: service slide, social card, bulletin, post-service email. The system carries the burden, so the volunteers can carry the message.',
      },
      {
        kind: 'quote',
        text: 'The brief was simple: feel like the room.',
      },
      {
        kind: 'figure-right',
        image: img('1497366216548-37526070297c', TALL),
        alt: 'Light pouring through a modern architectural opening',
        label: '04: The site',
        rationale:
          'Three doorways on the home page: Plan a visit, Watch, Give. Everything else is two clicks deep. Live stream is the largest CTA on a Sunday morning and quietly demotes itself on Monday. The site reads the calendar so the team does not have to.',
      },
      {
        kind: 'gallery-3',
        images: [
          {
            image: img('1574870111867-089730e5a72b', TALL),
            alt: 'A printed publication with elegant typography',
          },
          {
            image: img('1565299624946-b28f40a0ae38', TALL),
            alt: 'A close-up of warm-toned printed material',
          },
          {
            image: img('1571171637578-41bc2dd41cd2', TALL),
            alt: 'Soft ambient light in a contemplative interior space',
          },
        ],
        label: '05: In the world',
        rationale:
          'Signage, study journals, kids ministry kits, volunteer t-shirts, the welcome card someone takes home on their first visit. Every touch is built from the same three components, so the family of pieces is recognisable before anyone reads the name.',
      },
    ],
  },
  {
    slug: 'kudimata',
    title: 'Kudimata',
    client: 'Kudimata',
    year: '2025',
    industry: 'Fintech, Financial literacy',
    disciplines: ['Brand', 'Mobile Product', 'Web', 'Illustration'],
    shortDescription: PROJECT_DESC.kudimata,
    cover: {
      image: img('1559136555-9303baea8ebd', COVER),
      alt: 'A young African woman on her phone in warm afternoon light',
    },
    intro:
      'Most financial products assume you already understand them. Kudimata starts from the other end, at the moment before someone has confidence with money. The brand had to earn trust without sounding like the bank that scared them off in the first place.',
    body: [
      {
        kind: 'figure-full',
        image: img('1604079628040-94301bb21b91', WIDE),
        alt: 'A young person reading on their phone in soft natural light',
        label: '01: The audience',
        rationale:
          'University students, early-career professionals, first salary in hand. We interviewed forty of them before drawing a single button. The single most repeated word was "embarrassed." The brief became: build a product that never makes anyone feel that.',
      },
      {
        kind: 'figure-right',
        image: img('1574629810360-7efbbe195018', TALL),
        alt: 'A modern workspace with a notebook and phone in daylight',
        label: '02: Approachable money',
        rationale:
          'Every screen has one job. The home screen asks one question. The savings screen shows one number. We treated financial jargon like a foreign language: translated, never left untranslated, never quietly tolerated.',
      },
      {
        kind: 'pair',
        primary: {
          image: img('1573164574572-cb89e39749b4', TALL),
          alt: 'A bright modern interior with green plants and natural light',
        },
        secondary: {
          image: img('1517999144091-3d9dca6d1e43', SQUARE),
          alt: 'A composition of plants and a notebook on a desk',
        },
        label: '03: The palette',
        rationale:
          'A soft green that reads as growth without referencing currency. A warm cream as the canvas. One deep ink for type. We deliberately avoided every cliché of money: no gold gradients, no dollar signs, no metaphors involving piggy banks.',
      },
      {
        kind: 'quote',
        text: 'Saving feels different when the product believes you can.',
      },
      {
        kind: 'figure-left',
        image: img('1551836022-d5d88e9218df', TALL),
        alt: 'A close-up of a green plant against a soft background',
        label: '04: The motion',
        rationale:
          'Transitions are slow on purpose. Numbers count up, never appear. The interface breathes between actions, so the user has a moment to register that something happened. We optimised for the second of recognition, not the millisecond of speed.',
      },
      {
        kind: 'gallery-3',
        images: [
          {
            image: img('1542728928-1413d1894ed1', TALL),
            alt: 'A clean overhead shot of a desk with notebooks and a phone',
          },
          {
            image: img('1542816417-0983c9c9ad53', TALL),
            alt: 'A young professional working in a bright open space',
          },
          {
            image: img('1542652694-40abf526446e', TALL),
            alt: 'A creative workspace with green plants and warm light',
          },
        ],
        label: '05: Out in the world',
        rationale:
          'Campus posters, billboards, in-product education, the explainer videos that play before someone takes their first deposit. Every surface is a chance to remove an inch of intimidation, and the system is sized so the team can keep doing that without us in the room.',
      },
      {
        kind: 'stats',
        items: [
          { value: '50k+', label: 'Active users in year one' },
          { value: '2.1×', label: 'Avg deposit vs. category' },
          { value: '94%', label: 'Onboarding completion' },
        ],
      },
    ],
  },
  {
    slug: 'sofa',
    title: 'Sofa Doors',
    client: 'Sofa Doors',
    year: '2025',
    industry: 'Manufacturing, Architectural products',
    disciplines: ['Brand Identity', 'Wordmark', 'Packaging', 'Web'],
    shortDescription: PROJECT_DESC.sofa,
    cover: {
      bg: 'bg-[#6b4a36]',
      alt: 'Sofa Doors cover',
    },
    intro:
      'Sofa Doors makes the door you walk through without thinking about it, and that is the point. The brand had to do the same: present, useful, never in the way.',
    body: [
      {
        kind: 'figure-full',
        bg: 'bg-[#6b4a36]',
        alt: 'Sofa Doors brand mark',
        label: '01: The mark',
        rationale:
          'A single glyph built from the silhouette of a door swung open: readable as an S, readable as a doorway, never both at once. Set beside a wordmark drawn on the same square grid the factory uses to cut a door blank.',
      },
      {
        kind: 'quote',
        text: 'A door is a piece of architecture you can hold in your hand.',
      },
      {
        kind: 'stats',
        items: [
          { value: '40+', label: 'SKUs in the catalogue' },
          { value: '3', label: 'Showrooms branded' },
          { value: '1', label: 'Mark, no variants' },
        ],
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return PROJECTS[(i + 1) % PROJECTS.length]
}
