import { useRef } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { getNextProject, getProjectBySlug } from '../components/project-data'
import type { ProjectMediaBlock } from '../components/project-data'
import { useReveals } from '../lib/useReveals'

export const Route = createFileRoute('/work_/$slug')({
  component: ProjectDetailPage,
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) throw notFound()
    return { project, next: getNextProject(params.slug) }
  },
  notFoundComponent: ProjectNotFound,
})

function ProjectDetailPage() {
  const { project, next } = Route.useLoaderData()
  const rootRef = useRef<HTMLDivElement>(null)
  useReveals(rootRef)

  return (
    <div ref={rootRef} className="relative bg-black">
      <div
        className="relative"
        style={{ width: '1440px', zoom: 'var(--kh-k, 1)' }}
      >
        <Header />

        {/* Title block */}
        <div className="kh-reveal mx-auto w-[1320px] pt-[200px]">
          <Link
            to="/work"
            className="inline-flex items-center gap-[8px] text-[13px] uppercase tracking-[0.22em] text-white/60 no-underline transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          <h1 className="mt-[40px] max-w-[1200px] text-[96px] font-medium leading-[0.98] tracking-[-0.025em] text-white">
            {project.title}
          </h1>

          <p className="mt-[36px] max-w-[820px] text-[24px] font-light leading-[1.45] text-white/70">
            {project.intro}
          </p>
        </div>

        {/* Meta strip */}
        <div className="kh-reveal kh-reveal-d1 mx-auto mt-[100px] w-[1320px] border-t border-white/15 pt-[36px]">
          <div className="grid grid-cols-4 gap-[40px]">
            <MetaItem label="Client" value={project.client} />
            <MetaItem label="Year" value={project.year} />
            <MetaItem label="Industry" value={project.industry} />
            <MetaItem
              label="Disciplines"
              value={project.disciplines.join(', ')}
            />
          </div>
        </div>

        {/* Cover */}
        <div
          className={`kh-reveal kh-reveal-d2 relative mx-auto mt-[80px] w-[1320px] overflow-hidden rounded-[12px] ${project.cover.bg ?? 'bg-white/5'}`}
        >
          {project.cover.image ? (
            <img
              alt={project.cover.alt}
              src={project.cover.image}
              decoding="async"
              className="block aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="block aspect-[16/9] w-full" aria-label={project.cover.alt} />
          )}
        </div>

        {/* Body */}
        <div className="mt-[200px] flex flex-col gap-[200px] pb-[80px]">
          {project.body.map((block, i) => (
            <MediaBlock key={i} block={block} />
          ))}
        </div>

        {/* Next project teaser */}
        <section className="kh-reveal mx-auto mt-[200px] w-[1320px] border-t border-white/15 pt-[60px]">
          <p className="text-[14px] uppercase tracking-[0.22em] text-white/50">
            Next project
          </p>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group mt-[28px] flex items-end justify-between gap-[40px] no-underline"
          >
            <div className="flex-1">
              <h2 className="text-[72px] font-medium leading-[1] tracking-[-0.02em] text-white">
                {next.title}
              </h2>
              <p className="mt-[24px] max-w-[620px] text-[18px] font-light leading-[1.5] text-white/60">
                {next.shortDescription}
              </p>
            </div>
            <div
              className={`relative h-[260px] w-[420px] flex-none overflow-hidden rounded-[10px] ${next.cover.bg ?? 'bg-white/5'}`}
            >
              {next.cover.image && (
                <img
                  alt=""
                  src={next.cover.image}
                  decoding="async"
                  className="block size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              )}
            </div>
          </Link>
        </section>

        {/* Footer in flow */}
        <div className="relative mt-[180px] h-[383px]">
          <Footer top={0} />
        </div>
      </div>
    </div>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[12px] uppercase tracking-[0.22em] text-white/50">
        {label}
      </div>
      <div className="mt-[10px] text-[15px] leading-[1.4] text-white">
        {value}
      </div>
    </div>
  )
}

function MediaBlock({ block }: { block: ProjectMediaBlock }) {
  switch (block.kind) {
    case 'figure-full':
      return (
        <section className="kh-reveal mx-auto w-[1320px]">
          <div className={`overflow-hidden rounded-[12px] ${block.bg ?? 'bg-white/5'}`}>
            {block.image ? (
              <img
                alt={block.alt}
                src={block.image}
                loading="lazy"
                decoding="async"
                className={`block w-full object-cover ${block.aspect ?? 'aspect-[16/9]'}`}
              />
            ) : (
              <div className={`block w-full ${block.aspect ?? 'aspect-[16/9]'}`} aria-label={block.alt} />
            )}
          </div>
          <div className="mt-[40px] grid grid-cols-12 gap-[40px]">
            <Label className="col-span-3">{block.label}</Label>
            <Rationale className="col-span-7 col-start-5">
              {block.rationale}
            </Rationale>
          </div>
        </section>
      )

    case 'figure-left':
      return (
        <section className="kh-reveal mx-auto grid w-[1320px] grid-cols-12 gap-[40px]">
          <div className="col-span-7 overflow-hidden rounded-[12px] bg-white/5">
            <img
              alt={block.alt}
              src={block.image}
              loading="lazy"
              decoding="async"
              className={`block w-full object-cover ${block.aspect ?? 'aspect-[4/5]'}`}
            />
          </div>
          <div className="col-span-4 col-start-9 self-end pb-[20px]">
            <Label>{block.label}</Label>
            <Rationale className="mt-[24px]">{block.rationale}</Rationale>
          </div>
        </section>
      )

    case 'figure-right':
      return (
        <section className="kh-reveal mx-auto grid w-[1320px] grid-cols-12 gap-[40px]">
          <div className="col-span-4 self-start pt-[40px]">
            <Label>{block.label}</Label>
            <Rationale className="mt-[24px]">{block.rationale}</Rationale>
          </div>
          <div className="col-span-7 col-start-6 overflow-hidden rounded-[12px] bg-white/5">
            <img
              alt={block.alt}
              src={block.image}
              loading="lazy"
              decoding="async"
              className={`block w-full object-cover ${block.aspect ?? 'aspect-[4/5]'}`}
            />
          </div>
        </section>
      )

    case 'pair':
      return (
        <section className="kh-reveal mx-auto w-[1320px]">
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-5 overflow-hidden rounded-[12px] bg-white/5">
              <img
                alt={block.primary.alt}
                src={block.primary.image}
                loading="lazy"
                decoding="async"
                className="block aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="col-span-7 self-end overflow-hidden rounded-[12px] bg-white/5">
              <img
                alt={block.secondary.alt}
                src={block.secondary.image}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-[40px] grid grid-cols-12 gap-[40px]">
            <Label className="col-span-3">{block.label}</Label>
            <Rationale className="col-span-7 col-start-5">
              {block.rationale}
            </Rationale>
          </div>
        </section>
      )

    case 'gallery-3':
      return (
        <section className="kh-reveal mx-auto w-[1320px]">
          <div className="grid grid-cols-3 gap-[24px]">
            {block.images.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[12px] bg-white/5"
              >
                <img
                  alt={img.alt}
                  src={img.image}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[3/4] w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-[40px] grid grid-cols-12 gap-[40px]">
            <Label className="col-span-3">{block.label}</Label>
            <Rationale className="col-span-7 col-start-5">
              {block.rationale}
            </Rationale>
          </div>
        </section>
      )

    case 'quote':
      return (
        <section className="kh-reveal mx-auto w-[1100px] py-[40px] text-center">
          <p className="text-[56px] font-light leading-[1.1] tracking-[-0.015em] text-white">
            “{block.text}”
          </p>
          {block.attribution && (
            <p className="mt-[28px] text-[13px] uppercase tracking-[0.22em] text-white/50">
              {block.attribution}
            </p>
          )}
        </section>
      )

    case 'stats':
      return (
        <section className="kh-reveal mx-auto w-[1320px]">
          <div className="grid grid-cols-3 gap-[80px] border-t border-white/15 pt-[60px]">
            {block.items.map((item, i) => (
              <div key={i}>
                <div className="text-[13px] uppercase tracking-[0.22em] text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-[20px] text-[72px] font-medium leading-[1] tracking-[-0.025em] text-white">
                  {item.value}
                </div>
                <div className="mt-[16px] text-[15px] leading-[1.4] text-white/60">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )
  }
}

function Label({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`text-[13px] uppercase tracking-[0.22em] text-white/60 ${className}`}
    >
      {children}
    </div>
  )
}

function Rationale({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`text-[20px] font-light leading-[1.55] text-white/85 ${className}`}
    >
      {children}
    </p>
  )
}

function ProjectNotFound() {
  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="relative"
        style={{ width: '1440px', zoom: 'var(--kh-k, 1)' }}
      >
        <Header />
        <div className="mx-auto w-[1320px] pt-[300px] text-center">
          <p className="text-[14px] uppercase tracking-[0.22em] text-white/60">
            404
          </p>
          <h1 className="mt-[20px] text-[64px] font-medium leading-[1.1] text-white">
            We couldn&rsquo;t find that project.
          </h1>
          <Link
            to="/work"
            className="mt-[40px] inline-flex h-[52px] items-center gap-[10px] rounded-full bg-white px-[26px] text-[15px] font-medium text-black no-underline"
          >
            Back to work
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
