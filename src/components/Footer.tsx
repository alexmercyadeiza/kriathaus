type Props = { top?: number }

export function Footer({ top = 4993 }: Props = {}) {
  return (
    <div
      className="absolute left-1/2 h-[323px] w-[1320px] -translate-x-1/2"
      style={{ top: `${top}px` }}
    >
      <div className="absolute left-0 right-0 top-0 flex h-[29px] items-center justify-between whitespace-nowrap text-[24px] text-white">
        <a
          href="mailto:hello@kriathaus.com"
          className="kh-nav-link"
        >
          hello@kriathaus.com
        </a>
        <nav className="flex items-center gap-[48px]">
          <a href="#" className="kh-nav-link">
            Instagram
          </a>
          <a href="#" className="kh-nav-link">
            Linkedin
          </a>
        </nav>
      </div>

      <div className="absolute left-0 top-[59px] h-[175px] w-full">
        <img
          alt="Kriat Haus"
          src="/figma/kriathaus-wordmark.svg"
          className="block size-full"
          decoding="async"
        />
      </div>

      <div className="absolute left-0 top-[264px] flex h-[29px] items-center gap-[10px] whitespace-nowrap text-[24px] text-white">
        <span>2026 Kriat Haus</span>
        <img
          alt=""
          src="/figma/copyright.svg"
          className="size-[25px]"
          decoding="async"
        />
        <span>All Rights Reserved.</span>
      </div>
    </div>
  )
}
