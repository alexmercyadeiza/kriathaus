import { Link } from '@tanstack/react-router'
import type { Resource } from './resource-data'

type Props = Pick<
  Resource,
  'slug' | 'tag' | 'date' | 'title' | 'cardImage' | 'readTime'
>

export function ResourceItem({
  slug,
  tag,
  date,
  title,
  cardImage,
  readTime,
}: Props) {
  return (
    <Link
      to="/resources/$slug"
      params={{ slug }}
      className="group flex gap-[36px] no-underline"
    >
      <div className="h-[200px] w-[200px] flex-none overflow-hidden rounded-[6px] bg-white/5">
        <img
          alt=""
          src={cardImage}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-[16px] flex items-center gap-[12px]">
          <span className="rounded-[4px] bg-white/10 px-[10px] py-[5px] text-[13px] text-white/80">
            {tag}
          </span>
          <span className="text-[13px] text-white/60">{date}</span>
          <span className="text-[13px] text-white/40">·</span>
          <span className="text-[13px] text-white/60">{readTime}</span>
        </div>
        <span className="text-[24px] leading-[1.3] text-white underline-offset-[4px] group-hover:underline">
          {title}
        </span>
      </div>
    </Link>
  )
}
