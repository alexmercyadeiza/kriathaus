import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#000000' },
      { property: 'og:site_name', content: 'Kriat Haus' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { title: 'Kriat Haus' },
      {
        name: 'description',
        content: 'A creative studio designing brands, websites, and digital products for ambitious teams.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/logo192.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  shellComponent: RootDocument,
})

const earlyScaleScript = `(function(){var set=function(){document.documentElement.style.setProperty('--kh-k',window.innerWidth/1440);};set();window.addEventListener('resize',set,{passive:true});})();`

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: earlyScaleScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
