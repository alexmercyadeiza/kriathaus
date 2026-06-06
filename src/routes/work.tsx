import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECT_DESC } from '../components/project-data'
import { WorkFilterBar } from '../components/WorkFilterBar'
import { useReveals } from '../lib/useReveals'

const WORK_TITLE = 'Work | Kriat Haus'
const WORK_DESCRIPTION =
  'Selected work across brand identity, web, and product. Featuring Aurum.'

export const Route = createFileRoute('/work')({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: WORK_TITLE },
      { name: 'description', content: WORK_DESCRIPTION },
      { property: 'og:title', content: WORK_TITLE },
      { property: 'og:description', content: WORK_DESCRIPTION },
      { name: 'twitter:title', content: WORK_TITLE },
      { name: 'twitter:description', content: WORK_DESCRIPTION },
    ],
  }),
})

const WORK_CARD_HEIGHT = 569

function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveals(rootRef)

  return (
    <div ref={rootRef} className="relative bg-black">
      <div
        className="relative"
        style={{
          width: '1440px',
          height: '1632px',
          zoom: 'var(--kh-k, 1)',
        }}
      >
        <Header />

        {/* Filter + sort bar — anchored inside the 1320 content column */}
        <div className="kh-reveal absolute left-1/2 top-[380px] w-[1320px] -translate-x-1/2">
          <WorkFilterBar />
        </div>

        {/* Project grid — two columns × two rows, uniform card heights */}
        <div className="absolute left-1/2 top-[489px] grid w-[1320px] -translate-x-1/2 grid-cols-2 gap-x-[40px] gap-y-[40px]">
          <ProjectCard
            slug="aurum"
            title="Aurum"
            description={PROJECT_DESC.aurum}
            height={WORK_CARD_HEIGHT}
          >
            <img
              alt="Aurum"
              src="/projects/aurum/presentation8.jpg"
              className="kh-project-media absolute inset-0 size-full object-cover object-center"
              decoding="async"
            />
          </ProjectCard>
        </div>

        <Footer top={1309} />
      </div>
    </div>
  )
}
