import { useState } from 'react'

const SORTS = ['Curated', 'A–Z', 'Newest'] as const
type Sort = (typeof SORTS)[number]

export function WorkFilterBar() {
  const [sort, setSort] = useState<Sort>('Curated')

  return (
    <div className="flex h-[29px] items-center justify-between whitespace-nowrap text-[24px] text-white">
      <button
        type="button"
        className="kh-nav-link flex items-center gap-[14px] text-white"
      >
        <span>Logos</span>
        <svg
          aria-hidden="true"
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
        >
          <path
            d="M1 1 L8 7 L1 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex items-center gap-[48px]">
        {SORTS.map((s) => {
          const active = s === sort
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              className={
                'kh-nav-link transition-colors duration-300 ' +
                (active ? 'text-white' : 'text-[#888] hover:text-white')
              }
              aria-pressed={active}
            >
              {s}
            </button>
          )
        })}
      </div>
    </div>
  )
}
