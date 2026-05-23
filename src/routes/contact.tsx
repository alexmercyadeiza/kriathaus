import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { useReveals } from '../lib/useReveals'

export const Route = createFileRoute('/contact')({ component: ContactPage })

type FormState = {
  name: string
  email: string
  projectType: string
  project: string
  source: string
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  projectType: '',
  project: '',
  source: '',
}

const inlineInput =
  'inline-block min-w-[260px] border-b border-white/25 bg-transparent pb-[6px] text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white'

function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  useReveals(rootRef)

  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  function update<TKey extends keyof FormState>(key: TKey, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const subject = encodeURIComponent(`New inquiry from ${form.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Project type: ${form.projectType || '(not specified)'}`,
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
              <input
                type="text"
                name="projectType"
                value={form.projectType}
                onChange={(e) => update('projectType', e.target.value)}
                placeholder="brand identity"
                className={`${inlineInput} text-[36px]`}
                size={18}
              />{' '}
              project, here&rsquo;s a bit more about it:
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
