import { useEffect, useState } from 'react'

// Hero slideshow images, pulled from the Aurum deck. presentation8 leads (it is
// also the Aurum project cover). Edit this list to change which slides appear.
const SLIDES = [
  '/projects/aurum/presentation8.jpg',
  '/projects/aurum/presentation.jpg',
  '/projects/aurum/presentation2.jpg',
  '/projects/aurum/presentation4.jpg',
  '/projects/aurum/presentation9.jpg',
  '/projects/aurum/presentation13.jpg',
]

const INTERVAL_MS = 5000

export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  function go(next: number) {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }

  return (
    <div
      className="group absolute left-0 top-[468px] h-[1000px] w-[1440px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((src, i) => (
        <img
          key={src}
          alt=""
          src={src}
          decoding="async"
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 size-full max-w-none object-cover transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Prev / Next, revealed on hover */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-[32px] top-1/2 z-10 flex size-[56px] -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 group-hover:opacity-100"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-[32px] top-1/2 z-10 flex size-[56px] -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 group-hover:opacity-100"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-[32px] left-1/2 z-10 flex -translate-x-1/2 gap-[12px]">
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-[8px] rounded-full transition-all duration-300 ${
              i === index
                ? 'w-[28px] bg-white'
                : 'w-[8px] bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
