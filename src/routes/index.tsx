import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { HeroSlider } from '../components/HeroSlider'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECT_DESC } from '../components/project-data'
import { ResourceItem } from '../components/ResourceItem'
import { RESOURCES } from '../components/resource-data'
import { SplashIntro } from '../components/SplashIntro'
import { useReveals } from '../lib/useReveals'

const HOME_TITLE = 'Kriat Haus | A studio for brand, web, and product design'
const HOME_DESCRIPTION =
  'A creative studio shaping brands, websites, and digital products that make ambitious ideas impossible to ignore.'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: 'description', content: HOME_DESCRIPTION },
      { property: 'og:title', content: HOME_TITLE },
      { property: 'og:description', content: HOME_DESCRIPTION },
      { name: 'twitter:title', content: HOME_TITLE },
      { name: 'twitter:description', content: HOME_DESCRIPTION },
    ],
  }),
})

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
          height: '4346px',
          zoom: 'var(--kh-k, 1)',
        }}
      >
        <Header />

        {/* Hero billboard slider */}
        <HeroSlider />

        {/* Divider below hero */}
        <div className="absolute left-1/2 top-[1442px] h-px w-[1440px] -translate-x-1/2 bg-white/60" />

        {/* About text */}
        <div className="kh-reveal absolute left-[calc(33.33%+111px)] top-[1545px] whitespace-nowrap text-[35px] leading-[normal] text-white">
          <p>We are Kriat Haus, a creative studio</p>
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
              slug="aurum"
              title="Aurum"
              description={PROJECT_DESC.aurum}
            >
              <img
                alt="Aurum"
                src="/projects/aurum/presentation8.jpg"
                className="kh-project-media absolute inset-0 size-full object-cover object-center"
                decoding="async"
              />
            </ProjectCard>
          </div>
        </section>

        {/* Resources section */}
        <section
          id="resources"
          className="absolute left-1/2 top-[2893px] w-[1320px] -translate-x-1/2"
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

        <Footer top={4023} />
      </div>
    </div>
  )
}
