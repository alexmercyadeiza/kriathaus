export type ResourceBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'ul'; items: Array<string> }

export type Resource = {
  slug: string
  tag: string
  date: string
  title: string
  lead: string
  readTime: string
  author: string
  heroImage: string
  heroCredit: string
  cardImage: string
  body: Array<ResourceBlock>
}

const UNSPLASH = 'https://images.unsplash.com'
const CARD = '?w=480&h=480&fit=crop&auto=format&q=80'
const HERO = '?w=2000&h=1100&fit=crop&auto=format&q=85'
const INLINE = '?w=1400&h=900&fit=crop&auto=format&q=80'

export const RESOURCES: Array<Resource> = [
  {
    slug: 'free-stock-image-libraries',
    tag: 'Resource',
    date: 'Apr 23, 2026',
    title: 'The best places to get free stock images for your next project',
    lead: 'When a custom shoot is off the table, stock photography becomes your secret weapon, but only if you know where to look. After dozens of brand and product launches, here are the libraries we keep coming back to.',
    readTime: '6 min read',
    author: 'The Kriat Haus team',
    heroImage: `${UNSPLASH}/photo-1542038784456-1ea8e935640e${HERO}`,
    heroCredit: 'Image via Unsplash',
    cardImage: `${UNSPLASH}/photo-1542038784456-1ea8e935640e${CARD}`,
    body: [
      {
        type: 'p',
        text: 'The first question every founder asks us is some version of "do we really need to pay for photography?" The honest answer is: not always. The free stock libraries in 2026 are good enough that a well-curated site can launch without a single commissioned image, provided you treat sourcing as a craft instead of a search bar.',
      },
      { type: 'h2', text: 'Where we start, almost every time' },
      {
        type: 'p',
        text: 'Unsplash and Pexels are the obvious answers, and there is a reason. Both have moved well past the "person laughing alone with salad" era and now host genuinely cinematic work from photographers who use the platforms as a portfolio. Pixabay rounds out the trio with broader coverage, especially for illustrations, vectors and silent video B-roll.',
      },
      {
        type: 'ul',
        items: [
          'Unsplash: the default. Strong for editorial, lifestyle, landscape and abstract texture.',
          'Pexels: slightly warmer, more inclusive casting, excellent video library at the same URL.',
          'Pixabay: wide net. Great for the in-between assets nobody else stocks, like isolated objects on white.',
        ],
      },
      {
        type: 'image',
        src: `${UNSPLASH}/photo-1505740420928-5e560c06d30e${INLINE}`,
        alt: 'A workspace with headphones, a notebook and a phone on a wooden desk',
        caption: 'A workspace shot from Unsplash, the kind of thing every SaaS landing page will use this year.',
      },
      { type: 'h2', text: 'When the obvious sources feel too obvious' },
      {
        type: 'p',
        text: 'The downside of Unsplash being the default is that everyone else uses it too. If a client mentions they keep seeing "that one photo" on competitor sites, it is time to go a layer deeper.',
      },
      {
        type: 'ul',
        items: [
          'Burst by Shopify: curated for commerce. Product, food, retail and small-business imagery that does not look stock.',
          'Gratisography: playful, irreverent, occasionally weird. Perfect when a brand needs personality and the safer libraries feel too polite.',
          'ISO Republic: minimalist, design-led, heavy on muted palettes. A favourite for studios and tech brands.',
          'Kaboompics: strong on still life, food and interior. Photos come pre-sorted by colour palette which is genuinely useful.',
        ],
      },
      { type: 'h2', text: 'For African and culturally specific imagery' },
      {
        type: 'p',
        text: 'A lot of "diverse stock" still defaults to a single global aesthetic. For our Nigerian and pan-African clients, we lean on libraries that were built specifically to fix that gap.',
      },
      {
        type: 'ul',
        items: [
          'Nappy: high-quality images of Black and Brown people. Free, well-categorised, and the casting is contemporary.',
          'Iwaria: African-focused stock, strong on Nigerian street, market and lifestyle scenes.',
          'BlackIllustrations: for illustrated assets that actually represent who your users are.',
        ],
      },
      {
        type: 'quote',
        text: 'Stock photography only feels like stock when you grab the first result. Spend ten extra minutes and it looks commissioned.',
      },
      { type: 'h2', text: 'Beyond photos: textures, mockups, gradients' },
      {
        type: 'p',
        text: 'Most "stock image" rabbit holes lead to photography, but the real differentiator on a landing page is often the supporting material. A few libraries that quietly punch above their weight:',
      },
      {
        type: 'ul',
        items: [
          'Cosmos: Pinterest, but for designers. Less mood board, more reference library.',
          'Mockuuups Studio: device and product mockups with a free tier that covers most needs.',
          'Coolors and Hue: for generating and lifting palettes from existing imagery.',
          'Lummi and Pixeltrue: AI-generated and hand-drawn illustration sets, free for most commercial uses.',
        ],
      },
      {
        type: 'image',
        src: `${UNSPLASH}/photo-1493612276216-ee3925520721${INLINE}`,
        alt: 'A close-up texture of soft pastel colours blending together',
        caption: 'Texture and gradient backgrounds do more work than people credit them for.',
      },
      { type: 'h2', text: 'The unwritten rule' },
      {
        type: 'p',
        text: 'Free does not mean rules-free. Read the licence even when it says "no attribution required", because some libraries restrict using a photo as the main subject of a product (printed posters, t-shirts, NFT covers). And if you can credit the photographer, do it. The whole ecosystem only works because creators are willing to give work away. Sending one person a thank-you note costs nothing and goes further than you think.',
      },
    ],
  },
  {
    slug: 'typography-that-elevates-your-brand',
    tag: 'Guide',
    date: 'Apr 12, 2026',
    title: 'Choosing typography that elevates your brand identity',
    lead: 'Type is the loudest quiet decision in your brand. Get it right and people feel "considered" without knowing why. Get it wrong and a $200,000 site looks like a template.',
    readTime: '8 min read',
    author: 'The Kriat Haus team',
    heroImage: `${UNSPLASH}/photo-1455390582262-044cdead277a${HERO}`,
    heroCredit: 'Image via Unsplash',
    cardImage: `${UNSPLASH}/photo-1455390582262-044cdead277a${CARD}`,
    body: [
      {
        type: 'p',
        text: 'Founders tend to choose typefaces the way they choose paint colours, by scrolling until something feels right. It works, occasionally. More often it produces a brand that reads as competent but anonymous. Typography is the cheapest, fastest lever for making a brand feel like itself, and most teams under-use it.',
      },
      { type: 'h2', text: 'Start with the voice, not the font' },
      {
        type: 'p',
        text: 'Before opening Google Fonts, write down three adjectives that describe how your brand should sound when read out loud. Quiet authority? Friendly and irreverent? Technical and exact? Type carries voice the way casting carries a film. A geometric sans says one thing, a humanist serif says another, and a wide neo-grotesque says something entirely different. If you cannot describe the voice in words, no typeface will rescue you.',
      },
      {
        type: 'image',
        src: `${UNSPLASH}/photo-1503602642458-232111445657${INLINE}`,
        alt: 'Letterpress wooden type blocks arranged in a tray',
        caption: 'Typography long predates the screen, and the screen is still the worst place to choose it.',
      },
      { type: 'h2', text: 'The three-typeface rule' },
      {
        type: 'p',
        text: 'Most production brands need exactly three roles, not three fonts. You can fill all three with a single superfamily, and many of the best brands do.',
      },
      {
        type: 'ul',
        items: [
          'Display: the headlines, the moments that have to land. This is where personality lives.',
          'Body: the workhorse. Has to be readable at 16px on a phone and 11px in a footer.',
          'Mono or accent: for technical UI, code, numerals, or moments that need to feel different.',
        ],
      },
      {
        type: 'p',
        text: 'Pick the body face first, not the display face. The body face will carry 90% of the actual reading. If it is unpleasant at small sizes, no display headline can save the page.',
      },
      { type: 'h2', text: 'Pairing display and body' },
      {
        type: 'p',
        text: 'The classic pairing advice ("contrast serif with sans") is only half the answer. The deeper rule is contrast in proportion and energy. Pair a tightly-spaced, narrow display face with an open, generous body. Or do the opposite. Two faces with the same rhythm fight each other; two faces with deliberately different rhythms feel composed.',
      },
      {
        type: 'quote',
        text: 'A great pairing is not two typefaces that look alike. It is two typefaces that disagree usefully.',
      },
      { type: 'h2', text: 'The forgotten layer: numerals, punctuation, micro-type' },
      {
        type: 'p',
        text: 'The detail that separates a polished brand from a passable one is rarely in the headline. It is in the numerals on a pricing card, the quotation marks in a testimonial, the spacing in a phone number. Look for typefaces with proper tabular numerals, a real italic (not a slanted upright), and small caps. These are the features your users will never name but always feel.',
      },
      {
        type: 'image',
        src: `${UNSPLASH}/photo-1457369804613-52c61a468e7d${INLINE}`,
        alt: 'A close-up of an open book showing detailed type at varying weights',
        caption: 'Most brand decisions live at this scale. Audit your type where users will actually meet it.',
      },
      { type: 'h2', text: 'When to commission a custom typeface' },
      {
        type: 'p',
        text: 'Almost never, in the first three years. A custom typeface is a six-figure decision and an ongoing licensing relationship. Until you have a brand that ships in enough places to recoup that, a thoughtfully selected library typeface (possibly with light custom modifications to the wordmark) gets you 95% of the way there.',
      },
      { type: 'h2', text: 'Test where it lives, not on Behance' },
      {
        type: 'p',
        text: 'The single best diagnostic is this: take a real screen from your product or a real ad your team would actually run, drop the typography in at production size, screenshot it on a phone, and look at it the next morning. If it still feels right after coffee and away from the studio mindset, ship it.',
      },
    ],
  },
  {
    slug: 'why-growing-businesses-need-design-systems',
    tag: 'Insight',
    date: 'Mar 28, 2026',
    title: 'Why every growing business needs a design system',
    lead: 'Most teams do not realise they need a design system until they are already drowning in inconsistent buttons, mystery colour codes, and onboarding pain. Here is what we tell clients before they get there.',
    readTime: '7 min read',
    author: 'The Kriat Haus team',
    heroImage: `${UNSPLASH}/photo-1558655146-9f40138edfeb${HERO}`,
    heroCredit: 'Image via Unsplash',
    cardImage: `${UNSPLASH}/photo-1558655146-9f40138edfeb${CARD}`,
    body: [
      {
        type: 'p',
        text: 'Every growing company eventually has a moment where someone (usually a new designer or a frustrated engineer) asks "wait, which blue do we use?" The honest answer is almost always "we have nine." That is the moment a design system goes from optional to overdue.',
      },
      { type: 'h2', text: 'What a design system actually is' },
      {
        type: 'p',
        text: 'A design system is not a library of components. It is a shared agreement about how decisions get made. The components are the visible part. The invisible part (naming, tokens, spacing scale, motion rules, accessibility defaults) is what makes future decisions cheap. Without that agreement, every new screen is a fresh debate.',
      },
      { type: 'h2', text: 'The cost of not having one' },
      {
        type: 'p',
        text: 'The cost shows up as drift. Three button styles instead of one. Two date pickers because nobody knew the first one existed. A new hire who spends their first month asking what the official font weight is. None of these are catastrophic on their own, but compounded over a year of shipping, they translate into measurable engineering hours, slower onboarding, and a product that visibly does not trust itself.',
      },
      {
        type: 'image',
        src: `${UNSPLASH}/photo-1581291518857-4e27b48ff24e${INLINE}`,
        alt: 'Designer working on UI components on a large display',
        caption: 'A design system is, before anything else, a tool for reducing the number of decisions your team makes twice.',
      },
      { type: 'h2', text: 'You do not need Material Design' },
      {
        type: 'p',
        text: 'The biggest mistake we see in early-stage teams is over-scoping the system. Google has a design system because Google has 200 product surfaces. You have eight. Your v1 should fit on a single Figma page and a single TypeScript file. If it cannot, you have built documentation, not a system.',
      },
      { type: 'h2', text: 'What goes into the first version' },
      {
        type: 'ul',
        items: [
          'A spacing scale: usually a 4 or 8 px ramp. Pick one and ban the rest.',
          'A type ramp: five sizes is plenty. Display, heading, body, small, caption.',
          'Colour tokens: semantic names like surface, ink, accent, never raw hex codes in components.',
          'Six to ten components: button, input, card, badge, link, modal. The rest can wait.',
          'A motion primitive: one easing curve, three durations. That is most products covered.',
          'One page of writing principles: voice, casing, error tone. The most undersold part of any system.',
        ],
      },
      { type: 'h2', text: 'Make it a product, not a PDF' },
      {
        type: 'p',
        text: 'Design systems that live in a PDF or a Notion page die the moment the next sprint starts. The systems that survive are the ones that ship as code. Tokens as variables, components as imports, documentation co-located with the source. The bar is simple: a new engineer should be able to build a passable screen on day one without asking a designer a single question.',
      },
      {
        type: 'quote',
        text: 'Treat the design system the way you treat a customer-facing product. It has users, a roadmap, and bugs. Staff it accordingly.',
      },
      {
        type: 'image',
        src: `${UNSPLASH}/photo-1517180102446-f3ece451e9d8${INLINE}`,
        alt: 'Geometric architectural ceiling with repeating patterns',
        caption: 'Systems are most useful when the constraint is visible. Repetition is a feature, not a bug.',
      },
      { type: 'h2', text: 'How to know it is working' },
      {
        type: 'p',
        text: 'A working design system has three signals. New screens look like the old ones without anybody trying. Code reviews stop arguing about spacing and start arguing about logic. And the longest sentence in any design brief becomes "use the standard pattern." When you hit those three, you can stop polishing the system and go back to shipping the product. Which was always the point.',
      },
    ],
  },
]

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug)
}
