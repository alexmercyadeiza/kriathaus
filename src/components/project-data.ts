export const PROJECT_DESC = {
  // TODO: replace this placeholder summary with the real Aurum description.
  aurum:
    'A brand identity and visual system for Aurum, developed across the core mark, typography, color, and the way the brand shows up in the world.',
} as const

export type ImageRef = { image: string; alt: string }

export type ProjectMediaBlock =
  | {
      kind: 'figure-full'
      image?: string
      bg?: string
      alt: string
      label?: string
      rationale?: string
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
  slug: 'aurum'
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

// All Aurum slides are 4:3. Keep figure aspect ratios at 4/3 so nothing is cropped.
const AURUM = '/projects/aurum'
const SLIDE = 'aspect-[4/3]'

// TODO: the meta and narrative copy below are placeholders. Replace with the
// real client details and project story when ready.
export const PROJECTS: Array<Project> = [
  {
    slug: 'aurum',
    title: 'Aurum',
    client: 'Aurum',
    year: '2026',
    industry: 'Brand, Identity',
    disciplines: ['Brand Identity', 'Visual System', 'Art Direction'],
    shortDescription: PROJECT_DESC.aurum,
    cover: {
      image: `${AURUM}/presentation8.jpg`,
      alt: 'Aurum brand presentation cover',
    },
    intro:
      'Aurum needed an identity that felt considered, confident, and built to last. We shaped the full system, from the core mark to the way it carries across every surface.',
    body: [
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
      },
      {
        kind: 'figure-left',
        image: `${AURUM}/presentation2.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
        label: '01: The foundation',
        rationale:
          'Placeholder copy. Describe the strategy and thinking that set the direction for the system.',
      },
      {
        kind: 'figure-right',
        image: `${AURUM}/presentation3.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
        label: '02: The mark',
        rationale:
          'Placeholder copy. Describe how the mark was built and what it is meant to signal.',
      },
      {
        kind: 'quote',
        text: 'Placeholder quote that captures the heart of the Aurum project.',
      },
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation4.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
      },
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation5.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
      },
      {
        kind: 'figure-left',
        image: `${AURUM}/presentation6.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
        label: '03: The palette',
        rationale:
          'Placeholder copy. Describe the color and typography decisions and why they fit Aurum.',
      },
      {
        kind: 'figure-right',
        image: `${AURUM}/presentation7.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
        label: '04: In application',
        rationale:
          'Placeholder copy. Describe how the system shows up across real touchpoints.',
      },
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation9.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
      },
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation10.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
      },
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation11.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
      },
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation12.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
      },
      {
        kind: 'figure-full',
        image: `${AURUM}/presentation13.jpg`,
        alt: 'Aurum presentation slide',
        aspect: SLIDE,
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
