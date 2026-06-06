import { useMemo, useRef } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ResourceItem } from '../components/ResourceItem'
import { RESOURCES, getResourceBySlug } from '../components/resource-data'
import type { ResourceBlock } from '../components/resource-data'
import { useReveals } from '../lib/useReveals'

export const Route = createFileRoute('/resources/$slug')({
  component: ResourceDetailPage,
  loader: ({ params }) => {
    const post = getResourceBySlug(params.slug)
    if (!post) throw notFound()
    return { post }
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post
    if (!post) {
      return {
        meta: [
          { title: 'Resource not found | Kriat Haus' },
          {
            name: 'description',
            content: 'The resource you were looking for is not in our library.',
          },
        ],
      }
    }
    const title = `${post.title} | Kriat Haus`
    const description = post.lead
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    }
  },
  notFoundComponent: ResourceNotFound,
})

function ResourceDetailPage() {
  const { post } = Route.useLoaderData()
  const rootRef = useRef<HTMLDivElement>(null)
  useReveals(rootRef)

  const related = useMemo(
    () => RESOURCES.filter((r) => r.slug !== post.slug).slice(0, 2),
    [post.slug],
  )

  return (
    <div ref={rootRef} className="relative bg-black">
      <div
        className="relative"
        style={{ width: '1440px', zoom: 'var(--kh-k, 1)' }}
      >
        <Header />

        {/* Article header — eyebrow, metadata, title, lead */}
        <div className="kh-reveal mx-auto w-[1320px] pt-[200px]">
          <Link
            to="/"
            hash="resources"
            className="inline-flex items-center gap-[8px] text-[13px] uppercase tracking-[0.22em] text-white/60 no-underline transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> Back to resources
          </Link>

          <div className="mt-[28px] flex items-center gap-[14px]">
            <span className="rounded-[4px] bg-white/10 px-[12px] py-[6px] text-[13px] text-white/80">
              {post.tag}
            </span>
            <span className="text-[13px] text-white/60">{post.date}</span>
            <span className="text-[13px] text-white/40">·</span>
            <span className="text-[13px] text-white/60">{post.readTime}</span>
            <span className="text-[13px] text-white/40">·</span>
            <span className="text-[13px] text-white/60">{post.author}</span>
          </div>

          <h1 className="mt-[32px] max-w-[1180px] text-[78px] font-medium leading-[1.04] tracking-[-0.02em] text-white">
            {post.title}
          </h1>

          <p className="mt-[40px] max-w-[820px] text-[24px] font-light leading-[1.5] text-white/70">
            {post.lead}
          </p>
        </div>

        {/* Hero image */}
        <div className="kh-reveal kh-reveal-d1 relative mx-auto mt-[80px] h-[620px] w-[1320px] overflow-hidden rounded-[12px] bg-white/5">
          <img
            alt=""
            src={post.heroImage}
            decoding="async"
            className="size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-[20px] left-[28px] text-[12px] text-white/70">
            {post.heroCredit}
          </div>
        </div>

        {/* Article body */}
        <article className="kh-reveal kh-reveal-d2 mx-auto mt-[100px] w-[820px]">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <div className="mt-[80px] flex items-center justify-between border-t border-white/15 pt-[32px]">
            <div className="text-[14px] text-white/60">
              Written by{' '}
              <span className="text-white">{post.author}</span>
            </div>
            <Link
              to="/contact"
              className="inline-flex h-[44px] items-center gap-[10px] rounded-full bg-white/10 px-[22px] text-[14px] font-medium text-white no-underline transition-colors hover:bg-white/15"
            >
              Work with us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>

        {/* Related */}
        <section className="mx-auto mt-[160px] w-[1320px]">
          <div className="kh-reveal mb-[40px] flex items-end justify-between">
            <h2 className="text-[36px] font-medium leading-[1.1] tracking-[-0.01em] text-white">
              Keep reading
            </h2>
            <Link
              to="/"
              hash="resources"
              className="inline-flex h-[44px] items-center gap-[10px] rounded-full bg-white/10 px-[22px] text-[16px] font-medium text-white no-underline transition-colors hover:bg-white/15"
            >
              All resources
              <span aria-hidden="true">+</span>
            </Link>
          </div>

          {related.map((r) => (
            <div key={r.slug} className="kh-reveal border-t border-white/15">
              <div className="py-[40px]">
                <ResourceItem
                  slug={r.slug}
                  tag={r.tag}
                  date={r.date}
                  title={r.title}
                  cardImage={r.cardImage}
                  readTime={r.readTime}
                />
              </div>
            </div>
          ))}
          <div className="border-t border-white/15" />
        </section>

        {/* Footer — wrapped in a 323px tall relative container so it sits in flow */}
        <div className="relative mt-[160px] h-[383px]">
          <Footer top={0} />
        </div>
      </div>
    </div>
  )
}

function Block({ block }: { block: ResourceBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="mt-[28px] text-[20px] font-light leading-[1.65] text-white/85 first:mt-0">
          {block.text}
        </p>
      )
    case 'h2':
      return (
        <h2 className="mt-[64px] text-[34px] font-medium leading-[1.2] tracking-[-0.01em] text-white">
          {block.text}
        </h2>
      )
    case 'quote':
      return (
        <blockquote className="my-[48px] border-l-[3px] border-white pl-[28px]">
          <p className="text-[26px] font-light leading-[1.45] text-white">
            “{block.text}”
          </p>
          {block.cite && (
            <footer className="mt-[14px] text-[14px] text-white/60">
              {block.cite}
            </footer>
          )}
        </blockquote>
      )
    case 'image':
      return (
        <figure className="my-[56px] -mx-[100px]">
          <div className="overflow-hidden rounded-[10px] bg-white/5">
            <img
              alt={block.alt}
              src={block.src}
              loading="lazy"
              decoding="async"
              className="block size-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-[14px] px-[100px] text-[13px] leading-[1.5] text-white/55">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'ul':
      return (
        <ul className="mt-[28px] space-y-[14px]">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-[26px] text-[19px] font-light leading-[1.6] text-white/85 before:absolute before:left-0 before:top-[14px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-white/60"
            >
              {item}
            </li>
          ))}
        </ul>
      )
  }
}

function ResourceNotFound() {
  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="relative"
        style={{ width: '1440px', height: '900px', zoom: 'var(--kh-k, 1)' }}
      >
        <Header />
        <div className="absolute left-1/2 top-[300px] w-[1320px] -translate-x-1/2 text-center">
          <p className="text-[14px] uppercase tracking-[0.22em] text-white/60">
            404
          </p>
          <h1 className="mt-[20px] text-[64px] font-medium leading-[1.1] text-white">
            We couldn&rsquo;t find that resource.
          </h1>
          <Link
            to="/"
            hash="resources"
            className="mt-[40px] inline-flex h-[52px] items-center gap-[10px] rounded-full bg-white px-[26px] text-[15px] font-medium text-black no-underline"
          >
            Back to resources
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
