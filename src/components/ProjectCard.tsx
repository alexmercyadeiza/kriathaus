import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type Props = {
  title: string
  description: string
  bgClass?: string
  revealDelay?: 0 | 1 | 2 | 3 | 4
  height?: number
  slug?: string
  children?: ReactNode
}

export function ProjectCard({
  title,
  description,
  bgClass = 'bg-white',
  revealDelay = 0,
  height = 569,
  slug,
  children,
}: Props) {
  const delayClass = revealDelay > 0 ? `kh-reveal-d${revealDelay}` : ''

  const body = (
    <>
      <div
        className={`relative w-full overflow-hidden ${bgClass}`}
        style={{ height: `${height}px` }}
      >
        {children}
      </div>

      <div className="mt-4">
        <div className="text-[18px] font-medium text-white">{title}</div>
        <div className="mt-2 max-w-105 text-[13px] leading-tight font-normal text-[#888]">
          {description}
        </div>
      </div>
    </>
  )

  if (slug) {
    return (
      <Link
        to="/work/$slug"
        params={{ slug }}
        className={`kh-reveal ${delayClass} kh-project flex w-full flex-col no-underline`}
      >
        {body}
      </Link>
    )
  }

  return (
    <div className={`kh-reveal ${delayClass} kh-project flex w-full flex-col`}>
      {body}
    </div>
  )
}
