import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { HitechIllustration } from '../components/HitechIllustration'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECT_DESC } from '../components/project-data'
import { ResourceItem } from '../components/ResourceItem'
import { RESOURCES } from '../components/resource-data'
import { SplashIntro } from '../components/SplashIntro'
import { useReveals } from '../lib/useReveals'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveals(rootRef)

  return (
    <div ref={rootRef} className="relative bg-black">
      <SplashIntro />
      <div
        className="relative"
        style={{
          width: '1440px',
          height: '5712px',
          zoom: 'var(--kh-k, 1)',
        }}
      >
        <Header />

        {/* Hero billboard */}
        <div className="absolute left-0 top-[468px] h-[1000px] w-[1440px] overflow-hidden">
          <img
            alt=""
            src="/figma/hero-billboard.png"
            className="kh-project-media absolute inset-0 size-full max-w-none object-cover"
            decoding="async"
          />
        </div>

        {/* Divider below hero */}
        <div className="absolute left-1/2 top-[1442px] h-px w-[1440px] -translate-x-1/2 bg-white/60" />

        {/* About text */}
        <div className="kh-reveal absolute left-[calc(33.33%+111px)] top-[1545px] whitespace-nowrap text-[35px] leading-[normal] text-white">
          <p>We are Kriat Haus, an Abuja creative studio</p>
          <p>shaping brands, websites, and digital products</p>
          <p>that make ambitious ideas impossible to ignore.</p>
        </div>

        {/* Projects section */}
        <section
          id="projects"
          className="absolute left-1/2 top-[1900px] w-[1320px] -translate-x-1/2"
        >
          <div className="kh-reveal mb-[40px] flex items-center justify-between">
            <span className="text-[16px] font-medium text-white">Projects</span>
            <a
              href="/work"
              className="inline-flex h-[44px] items-center gap-[10px] rounded-full bg-white/10 px-[22px] text-[16px] font-medium text-white no-underline transition-colors hover:bg-white/15"
            >
              Show more
              <span className="text-[18px] leading-none">+</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-[40px] gap-y-[40px]">
            <ProjectCard
              slug="hitech"
              title="Hitech Electro Mechanical"
              description={PROJECT_DESC.hitech}
              bgClass="bg-[#1da8fc]"
            >
              <div className="kh-hitech-wrap size-full">
                <HitechIllustration />
              </div>
            </ProjectCard>

            <ProjectCard
              slug="mulla"
              title="Mulla"
              description={PROJECT_DESC.mulla}
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
              revealDelay={4}
            />
          </div>
        </section>

        {/* Resources section */}
        <section
          id="resources"
          className="absolute left-1/2 top-[4259px] w-[1320px] -translate-x-1/2"
        >
          <div className="kh-reveal mb-[40px] flex items-center justify-between">
            <span className="text-[16px] font-medium text-white">Resources</span>
            <a
              href="#"
              className="inline-flex h-[44px] items-center gap-[10px] rounded-full bg-white/10 px-[22px] text-[16px] font-medium text-white no-underline transition-colors hover:bg-white/15"
            >
              Show more
              <span className="text-[18px] leading-none">+</span>
            </a>
          </div>
          {RESOURCES.map((r) => (
            <div
              key={r.title}
              className="kh-reveal border-t border-white/15"
            >
              <div className="ml-[360px] py-[40px]">
                <ResourceItem {...r} />
              </div>
            </div>
          ))}
        </section>

        <Footer top={5389} />
      </div>
    </div>
  )
}
