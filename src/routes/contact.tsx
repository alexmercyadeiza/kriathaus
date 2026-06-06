import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent, ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { useReveals } from '../lib/useReveals'

const CONTACT_TITLE = 'Contact | Kriat Haus'
const CONTACT_DESCRIPTION =
  'Tell us about a project. We read every message and reply within a day, even if the answer is brief.'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: CONTACT_TITLE },
      { name: 'description', content: CONTACT_DESCRIPTION },
      { property: 'og:title', content: CONTACT_TITLE },
      { property: 'og:description', content: CONTACT_DESCRIPTION },
      { name: 'twitter:title', content: CONTACT_TITLE },
      { name: 'twitter:description', content: CONTACT_DESCRIPTION },
    ],
  }),
})

type FormState = {
  name: string
  email: string
  projectType: string[]
  budget: string
  project: string
  source: string
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  projectType: [],
  budget: '',
  project: '',
  source: '',
}

const inlineInput =
  'inline-block min-w-[260px] border-b border-white/25 bg-transparent pb-[6px] text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white'

const BUDGET_RANGES = [
  '$1k–$5k',
  '$5k–$10k',
  '$10k–$25k',
  '$25k–$50k',
  '$50k–$100k',
  '$100k+',
] as const

const PROJECT_TYPES = [
  'brand identity',
  'website',
  'web app',
  'mobile app development',
  'ui/ux design',
  'product design',
  'design system',
  'art direction',
] as const

function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveals(rootRef)

  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [budgetError, setBudgetError] = useState(false)

  function update<TKey extends keyof FormState>(key: TKey, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.budget) {
      setBudgetError(true)
      return
    }
    const subject = encodeURIComponent(`New inquiry from ${form.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Project type: ${form.projectType.length ? form.projectType.join(', ') : '(not specified)'}`,
        `Budget: ${form.budget || '(not specified)'}`,
        '',
        'Project:',
        form.project,
        '',
        `Source: ${form.source || '(not specified)'}`,
      ].join('\n'),
    )
    window.location.href = `mailto:hello@kriathaus.com?subject=${subject}&body=${body}`
  }

  return (
    <div ref={rootRef} className="relative bg-black">
      <div
        className="relative"
        style={{
          width: '1440px',
          height: '2223px',
          zoom: 'var(--kh-k, 1)',
        }}
      >
        <Header />

        <main className="absolute left-1/2 top-[220px] w-[1320px] -translate-x-1/2">
          {/* Eyebrow */}
          <div className="kh-reveal mb-[28px] flex items-center gap-[14px]">
            <span className="text-[13px] uppercase tracking-[0.22em] text-white/60">
              Get in touch
            </span>
          </div>

          {/* Massive headline */}
          <h1 className="kh-reveal max-w-[1180px] text-[120px] font-medium leading-[0.95] tracking-[-0.02em] text-white">
            Let&rsquo;s make
            <br />
            something good.
          </h1>

          {/* Conversational form */}
          <form
            onSubmit={handleSubmit}
            className="kh-reveal kh-reveal-d1 mt-[120px] max-w-[1180px]"
          >
            <p className="text-[36px] font-light leading-[1.7] text-white/90">
              Hi, I&rsquo;m{' '}
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="John Doe"
                className={`${inlineInput} text-[36px]`}
                size={14}
              />
              . You can reach me at{' '}
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="hello@you.com"
                className={`${inlineInput} text-[36px]`}
                size={18}
              />
              . I&rsquo;d like to chat about a{' '}
              <MultiSelect
                value={form.projectType}
                options={PROJECT_TYPES}
                placeholder="select one or more"
                minWidth={360}
                onChange={(next) =>
                  setForm((f) => ({ ...f, projectType: next }))
                }
              />{' '}
              project with a budget of{' '}
              <Dropdown
                value={form.budget}
                options={BUDGET_RANGES}
                placeholder="select a range"
                invalid={budgetError}
                onChange={(value) => {
                  update('budget', value)
                  setBudgetError(false)
                }}
              />
              . Here&rsquo;s a bit more about it:
            </p>

            <textarea
              name="project"
              required
              value={form.project}
              onChange={(e) => update('project', e.target.value)}
              placeholder="A few sentences about the project, timeline, budget, or anything else you want us to know."
              rows={4}
              className="mt-[40px] block h-[220px] w-full resize-none border-b border-white/25 bg-transparent pb-[12px] text-[26px] font-light leading-[1.5] text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white"
            />

            <p className="mt-[40px] text-[36px] font-light leading-[1.7] text-white/90">
              I found you through{' '}
              <input
                type="text"
                name="source"
                value={form.source}
                onChange={(e) => update('source', e.target.value)}
                placeholder="Twitter"
                className={`${inlineInput} text-[36px]`}
                size={14}
              />
              .
            </p>

            <button
              type="submit"
              className="kh-cta-dark mt-[60px] inline-flex h-[72px] items-center gap-[14px] rounded-full bg-white px-[40px] text-[20px] font-medium text-black"
            >
              Send it
              <span aria-hidden="true" className="text-[22px]">
                →
              </span>
            </button>
          </form>

          {/* What happens next — horizontal step strip */}
          <section className="kh-reveal kh-reveal-d2 mt-[180px] border-t border-white/15 pt-[48px]">
            <p className="text-[14px] uppercase tracking-[0.22em] text-white/60">
              What happens next
            </p>
            <div className="mt-[32px] grid grid-cols-3 gap-[40px]">
              <Step num="01" title="We review">
                We read every message and figure out the best way to respond.
              </Step>
              <Step num="02" title="Reply within 24 hours">
                You&rsquo;ll hear back within a day, even if it&rsquo;s a quick
                acknowledgement.
              </Step>
              <Step num="03" title="Intro call if it fits">
                If we&rsquo;re a match, we&rsquo;ll book a short call to dig in.
              </Step>
            </div>
          </section>
        </main>

        <Footer top={1900} />
      </div>
    </div>
  )
}

function MultiSelect({
  value,
  options,
  placeholder,
  onChange,
  minWidth = 240,
}: {
  value: string[]
  options: readonly string[]
  placeholder: string
  onChange: (value: string[]) => void
  minWidth?: number
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  function toggle(option: string) {
    onChange(
      value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option],
    )
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(options.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(options[active])
    }
  }

  return (
    <span ref={wrapRef} className="relative ml-[10px] inline text-[36px]">
      <span className="contents">
        {value.map((option) => (
          <span
            key={option}
            className="mr-[10px] inline-flex items-center gap-[6px] rounded-full bg-white/10 py-[6px] pl-[18px] pr-[8px] align-middle text-[20px] text-white"
          >
            {option}
            <button
              type="button"
              aria-label={`Remove ${option}`}
              onClick={() => toggle(option)}
              className="flex h-[24px] w-[24px] items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/15 hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </span>
        ))}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`inline-block text-left outline-none ${
            value.length
              ? 'align-middle text-white/40'
              : 'align-baseline text-white/30'
          }`}
        >
          {value.length === 0 && placeholder}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={`ml-[6px] inline-block align-middle text-white/50 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </span>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          style={{ width: minWidth }}
          className="absolute left-0 top-[calc(100%+12px)] z-20 overflow-hidden rounded-b-[14px] border border-white/12 bg-[#0a0a0a] shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
        >
          {options.map((option, i) => {
            const selected = value.includes(option)
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => toggle(option)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-[16px] px-[24px] py-[13px] text-left text-[22px] transition-colors duration-150 ${
                    i === active ? 'bg-white/8' : ''
                  } ${selected ? 'text-white' : 'text-white/65'}`}
                >
                  <span
                    className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
                      selected
                        ? 'border-white bg-white text-black'
                        : 'border-white/30'
                    }`}
                  >
                    {selected && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12l5 5 9-10"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {option}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </span>
  )
}

function Dropdown({
  value,
  options,
  placeholder,
  onChange,
  invalid = false,
  minWidth = 240,
}: {
  value: string
  options: readonly string[]
  placeholder: string
  onChange: (value: string) => void
  invalid?: boolean
  minWidth?: number
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  function choose(option: string) {
    onChange(option)
    setOpen(false)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setOpen(true)
      setActive(Math.max(0, options.findIndex((o) => o === value)))
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(options.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(options[active])
    }
  }

  return (
    <span ref={wrapRef} className="relative inline-block align-baseline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ minWidth }}
        className={`inline-flex items-center justify-between gap-[16px] border-b pb-[6px] text-left text-[36px] outline-none transition-colors duration-200 ${
          invalid
            ? 'border-red-400/70'
            : open
              ? 'border-white'
              : 'border-white/25 focus-visible:border-white'
        } ${value ? 'text-white' : 'text-white/30'}`}
      >
        {value || placeholder}
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 self-center text-white/50 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          style={{ minWidth }}
          className="absolute left-0 top-[calc(100%+12px)] z-20 w-full overflow-hidden rounded-b-[14px] border border-white/12 bg-[#0a0a0a] shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
        >
          {options.map((option, i) => {
            const selected = option === value
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => choose(option)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center justify-between px-[24px] py-[13px] text-left text-[22px] transition-colors duration-150 ${
                    i === active ? 'bg-white/8' : ''
                  } ${selected ? 'text-white' : 'text-white/65'}`}
                >
                  {option}
                  {selected && (
                    <span aria-hidden="true" className="text-[16px] text-white/70">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </span>
  )
}

function Step({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="text-[14px] text-white/40">{num}</div>
      <div className="mt-[8px] text-[22px] font-medium text-white">{title}</div>
      <p className="mt-[12px] text-[16px] leading-[1.5] text-white/60">
        {children}
      </p>
    </div>
  )
}
