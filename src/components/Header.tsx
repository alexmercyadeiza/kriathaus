import { Link, useRouterState } from '@tanstack/react-router'

const NAV_BASE = 'kh-nav-link transition-colors duration-300'
const NAV_DIM = `${NAV_BASE} text-[#888] hover:text-white`
const NAV_ACTIVE = `${NAV_BASE} text-white italic`

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isWorkPage = pathname === '/work'
  const isContactPage = pathname === '/contact'

  return (
    <div className="absolute left-1/2 top-[67px] z-50 flex h-[44px] w-[1320px] -translate-x-1/2 items-center justify-between">
      <Link to="/" className="block text-white">
        <img
          alt="Kriat Haus"
          src="/figma/kriathaus-wordmark.svg"
          className="block h-[44px] w-auto"
          decoding="async"
        />
      </Link>
      <nav className="flex items-center gap-[48px] whitespace-nowrap text-[24px]">
        <Link to="/work" className={isWorkPage ? NAV_ACTIVE : NAV_DIM}>
          Work
        </Link>
        <Link to="/contact" className={isContactPage ? NAV_ACTIVE : NAV_DIM}>
          Contact
        </Link>
      </nav>
    </div>
  )
}
