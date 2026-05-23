import { useEffect, useState } from 'react'

// Module-level guard so the splash plays once per *page load*:
// a hard refresh replays it; a client-side route change back to "/" doesn't.
let splashAlreadyPlayed = false

const WORDMARK_PATHS = [
  // K
  'M0 0H23.4461V66.9225L95.1344 0H126.08L60.9251 62.1156L138.188 134.615H106.283L45.5475 76.9215L23.4461 97.8853V134.615H0V0Z',
  // R
  'M234.942 0C264.622 0 279.264 20.1933 279.264 40.3867C279.264 56.9234 269.305 73.4654 249.193 78.8475L293.906 134.615H263.835L223.027 80.5782H178.507V134.615H154.688V0H234.942ZM178.517 60.1896H230.651C246.466 60.1896 254.47 50.3805 254.47 40.3814C254.47 30.3823 246.466 20.3833 230.651 20.3833H178.517V60.1896Z',
  // I
  'M316.594 0H339.281V134.615H316.594V0Z',
  // A
  'M429.497 0H453.057L521.812 134.615H496.705L485.503 113H397.051L385.849 134.615H360.938L429.497 0ZM407.289 93.0956H475.271L441.282 27.4943L407.289 93.0956Z',
  // T
  'M660 0V19.8081H596.141V134.615H572.266V19.8081H508.406V0H660Z',
  // H
  'M708.469 0H731.832V57.1134H818.974V0H842.531V134.615H818.974V77.3068H731.832V134.615H708.469V0Z',
  // U
  'M1034.34 0H1058.11V80.9575C1058.11 104.304 1079.74 115.789 1101.38 115.789C1123 115.789 1144.63 104.304 1144.63 80.9575V0H1168.41V80.9575C1168.41 119.428 1134.89 138.757 1101.38 138.757C1067.86 138.757 1034.34 119.428 1034.34 80.9575V0Z',
  // S
  'M1306.24 37.8469C1295.92 27.9971 1274.14 21.6283 1255.22 21.6283C1236.69 21.6283 1221.02 27.6155 1221.02 41.7094C1221.02 71.6404 1320 47.5007 1320 101.767C1320 130.734 1289.23 142.899 1256.94 142.899C1230.95 142.899 1203.63 135.174 1190.06 121.849L1203.25 103.505C1213.57 114.51 1237.64 121.271 1258.66 121.271C1278.15 121.271 1294.97 115.48 1294.97 101.958C1294.97 70.2894 1196.18 94.8159 1196.18 41.3227C1196.18 11.7785 1224.27 0 1254.65 0C1278.92 0 1304.72 7.52914 1318.86 19.5036L1306.24 37.8469Z',
  // Second A (HAUS)
  'M865.217 134.615L932.999 0H957.279L1025.06 134.615H999.769L945.139 26.1194L890.509 134.615H865.217Z',
]

// The square dot under A is path: M933 135 H957 V158 H933, a 24×23 box.
// Within the 1320×158 viewBox that means:
const SQUARE_LEFT_PCT = (933 / 1320) * 100 // 70.681...
const SQUARE_TOP_PCT = (135 / 158) * 100 // 85.443...
const SQUARE_WIDTH_PCT = (24 / 1320) * 100 // 1.818...
const SQUARE_HEIGHT_PCT = (23 / 158) * 100 // 14.557...

export function SplashIntro() {
  // SSR & first client render: splashAlreadyPlayed is module-scoped,
  // so on a fresh page load it's `false` on both server and the first
  // client render → markup matches → no hydration warning.
  const [phase, setPhase] = useState<'show' | 'hide'>(
    splashAlreadyPlayed ? 'hide' : 'show',
  )

  useEffect(() => {
    if (phase !== 'show') return

    // Respect reduced motion: skip the animation entirely.
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced) {
      splashAlreadyPlayed = true
      setPhase('hide')
      return
    }

    splashAlreadyPlayed = true
    // Total timeline: 2000ms hold + 2200ms zoom + 200ms breathing room.
    const t = window.setTimeout(() => setPhase('hide'), 4400)
    return () => window.clearTimeout(t)
  }, [phase])

  if (phase === 'hide') return null

  return (
    <div className="kh-splash" aria-hidden="true">
      <div className="kh-splash-stage">
        <svg
          viewBox="0 0 1320 158"
          xmlns="http://www.w3.org/2000/svg"
          className="kh-splash-wordmark"
        >
          {WORDMARK_PATHS.map((d, i) => (
            <path key={i} d={d} fill="#000" />
          ))}
        </svg>
        <div
          className="kh-splash-square"
          style={{
            left: `${SQUARE_LEFT_PCT}%`,
            top: `${SQUARE_TOP_PCT}%`,
            width: `${SQUARE_WIDTH_PCT}%`,
            height: `${SQUARE_HEIGHT_PCT}%`,
          }}
        />
      </div>
    </div>
  )
}
