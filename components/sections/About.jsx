'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import SplineScene from '../ui/SplineScene'

export default function About() {
  const [active, setActive] = useState(0)
  const [dotOffset, setDotOffset] = useState(8)
  const [expandedMobile, setExpandedMobile] = useState(-1)
  const timelineRef = useRef(null)
  const itemRefs = useRef([])
  const titleRefs = useRef([])

  const items = useMemo(() => ([
    {
      title: 'Background',
      body: [
        'Graduated from SAIT Software Development in 2024. During our capstone project, I discovered PostGIS while troubleshooting slow spatial queries — switching from JavaScript distance calculations to database spatial indexes cut query times from 800ms to around 120ms.',
        'That optimization work got me interested in performance tuning and understanding how databases actually handle geospatial data.'
      ],
    },
    {
      title: 'What I Build',
      body: [
        'I work with React and Node.js, building full-stack applications. Most comfortable with PostgreSQL and interested in projects where database design and query optimization matter.',
        'Currently looking for junior developer roles where I can contribute to production codebases and learn from experienced engineers.'
      ],
    },
    {
      title: 'Outside Work',
      body: [
        'Based in Calgary. Outside of coding, I stay active through the gym, running, and hot yoga.',
        'Also enjoy exploring the local food scene around the city.'
      ],
    }
  ]), [])

  useEffect(() => {
    const handleScroll = () => {
      const items = itemRefs.current.filter(Boolean)
      if (!items.length) return

      const navbarBottom = 120
      let newActive = 0

      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect()
        const itemMiddle = rect.top + (rect.height / 2)

        if (navbarBottom < itemMiddle) {
          newActive = i
          break
        }
        if (i === items.length - 1) {
          newActive = i
        }
      }

      setActive(newActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const tl = timelineRef.current
    const title = titleRefs.current[active]
    if (!tl || !title) return
    const tRect = tl.getBoundingClientRect()
    const hRect = title.getBoundingClientRect()
    const relativeTop = (hRect.top + hRect.height / 2) - tRect.top
    setDotOffset(relativeTop - 6)
  }, [active])

  useEffect(() => {
    const onResize = () => {
      const tl = timelineRef.current
      const title = titleRefs.current[active]
      if (!tl || !title) return
      const tRect = tl.getBoundingClientRect()
      const hRect = title.getBoundingClientRect()
      const relativeTop = (hRect.top + hRect.height / 2) - tRect.top
      setDotOffset(relativeTop - 6)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  return (
    <section id="about" className="py-8 md:py-16 bg-bg-primary">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="w-full lg:max-w-[600px]">
            <header className="mb-5 lg:mb-16">
              <div className="flex items-start gap-3">
                <div className="w-1 h-10 lg:h-24 mt-0.5 bg-rose-taupe" />
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.1em] uppercase mb-1.5 font-semibold text-rose-taupe">Get to Know Me</p>
                  <h2 className="text-[26px] lg:text-[40px] font-bold text-text-primary leading-tight">About</h2>
                </div>
              </div>
            </header>

            <div className="lg:hidden space-y-4">
              {items.map((it, i) => {
                const isExpanded = expandedMobile === i
                return (
                  <div key={it.title}>
                    <button
                      onClick={() => setExpandedMobile(isExpanded ? -1 : i)}
                      className="w-full flex items-center justify-between py-3 text-left min-h-[48px]"
                    >
                      <h3 className="text-[14px] font-semibold" style={{ color: 'var(--accent-primary)' }}>
                        {it.title}
                      </h3>
                      <svg
                        className={`w-4 h-4 text-rose-taupe transition-transform duration-200 flex-shrink-0 ml-3 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`transition-all duration-200 ease-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="pb-3 space-y-3 text-[14px] leading-[1.7] text-text-secondary">
                        {it.body.map((p, idx) => <p key={idx}>{p}</p>)}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-border-light" />
                  </div>
                )
              })}
            </div>

            {/* Desktop Timeline (≥ lg) */}
            <div ref={timelineRef} className="hidden lg:block relative">
              <div className="absolute left-0 top-0 w-0.5 h-full bg-border-light" aria-hidden="true" />
              <div
                className="absolute left-[-5px] w-3 h-3 rounded-full transition-transform duration-500 ease-out z-10 bg-silver"
                style={{ transform: `translateY(${dotOffset}px)`, boxShadow: '0 0 0 4px var(--bg-primary), 0 0 0 6px var(--silver)' }}
                aria-hidden="true"
              />

              <ol className="space-y-6 pl-8" role="list">
                {items.map((it, i) => (
                  <li
                    key={it.title}
                    data-index={i}
                    ref={el => (itemRefs.current[i] = el)}
                    className="relative"
                    aria-current={active === i ? 'step' : undefined}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h3 ref={el => (titleRefs.current[i] = el)} className="text-[18px] font-medium text-text-primary">
                        {it.title}
                      </h3>
                    </div>
                    <div className="space-y-3 body-text">
                      {it.body.map((p, idx) => <p key={idx}>{p}</p>)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 lg:mt-16 pt-6 lg:pt-8 border-t border-border-light">
              <dl className="grid grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <dt className="text-[11px] lg:text-[12px] tracking-wider uppercase mb-1.5 lg:mb-2 font-medium text-text-muted">Location</dt>
                  <dd className="text-[15px] lg:text-[17px] font-medium text-text-primary">Calgary, AB</dd>
                </div>
                <div>
                  <dt className="text-[11px] lg:text-[12px] tracking-wider uppercase mb-1.5 lg:mb-2 font-medium text-text-muted">Education</dt>
                  <dd className="text-[15px] lg:text-[17px] font-medium text-text-primary">SAIT 2024</dd>
                </div>
                <div>
                  <dt className="text-[11px] lg:text-[12px] tracking-wider uppercase mb-1.5 lg:mb-2 font-medium text-text-muted">Focus</dt>
                  <dd className="text-[15px] lg:text-[17px] font-medium text-text-primary">Full-Stack</dd>
                </div>
                <div>
                  <dt className="text-[11px] lg:text-[12px] tracking-wider uppercase mb-1.5 lg:mb-2 font-medium text-rose-taupe">Status</dt>
                  <dd className="text-[15px] lg:text-[17px] font-medium flex items-center gap-1.5 text-rose-taupe">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-taupe" />
                    Available
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="hidden lg:flex relative lg:sticky lg:top-24 justify-center">
            <div className="relative w-full max-w-[500px] h-[500px] rounded-lg overflow-hidden bg-bg-accent">
              <SplineScene
                sceneUrl="https://prod.spline.design/0PMuB12cmQMtH4FZ/scene.splinecode"
                className="w-full h-full"
                fallbackContent={
                  <div className="w-full h-full grid place-items-center">
                    <div className="text-center space-y-3">
                      <div className="w-20 h-20 mx-auto rounded-full grid place-items-center bg-rose-taupe/10">
                        <span className="text-4xl" aria-hidden>👨‍💻</span>
                      </div>
                      <p className="text-[13px] tracking-wide text-text-muted">Loading 3D scene…</p>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg -z-10 hidden lg:block bg-rose-quartz/10" aria-hidden />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full -z-10 hidden lg:block bg-silver/10" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
