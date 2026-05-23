import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { HitechIllustration } from '../components/HitechIllustration'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECT_DESC } from '../components/project-data'
import { WorkFilterBar } from '../components/WorkFilterBar'
import { useReveals } from '../lib/useReveals'

export const Route = createFileRoute('/work')({ component: WorkPage })

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
          height: '2998px',
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
            slug="hitech"
            title="Hitech Electro Mechanical"
            description={PROJECT_DESC.hitech}
            bgClass="bg-[#1da8fc]"
            height={WORK_CARD_HEIGHT}
          >
            <div className="kh-hitech-wrap size-full">
              <HitechIllustration />
            </div>
          </ProjectCard>

          <ProjectCard
            slug="mulla"
            title="Mulla"
            description={PROJECT_DESC.mulla}
            height={WORK_CARD_HEIGHT}
            revealDelay={1}
          >
            <img
              alt="Mulla"
              src="/figma/mulla.png"
              className="kh-project-media absolute inset-0 size-full object-cover object-center"
              decoding="async"
            />
          </ProjectCard>

          <ProjectCard
            slug="onecity"
            title="One City Church"
            description={PROJECT_DESC.onecity}
            height={WORK_CARD_HEIGHT}
            revealDelay={2}
          >
            <img
              alt="One City Church"
              src="/figma/one-city-church.png"
              className="kh-project-media absolute inset-0 size-full object-cover object-center"
              decoding="async"
            />
          </ProjectCard>

          <ProjectCard
            slug="kudimata"
            title="Kudimata"
            description={PROJECT_DESC.kudimata}
            height={WORK_CARD_HEIGHT}
            revealDelay={3}
          >
            <img
              alt="Kudimata"
              src="/figma/kudimata.png"
              className="kh-project-media absolute inset-0 size-full object-cover object-center"
              decoding="async"
            />
          </ProjectCard>

          <ProjectCard
            slug="sofa"
            title="Sofa Doors"
            description={PROJECT_DESC.sofa}
            bgClass="bg-[#6b4a36]"
            height={WORK_CARD_HEIGHT}
            revealDelay={4}
          />
        </div>

        <Footer top={2675} />
      </div>
    </div>
  )
}
