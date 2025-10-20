'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import SplineScene from '../ui/SplineScene'

export default function About() {
  const [active, setActive] = useState(0)
  const [dotOffset, setDotOffset] = useState(8)
  const timelineRef = useRef(null)
  const itemRefs = useRef([])
  const titleRefs = useRef([])

  const items = useMemo(() => ([
    {
      title: 'My Journey',
      body: [
        'SAIT Software Development grad. Discovered PostGIS during capstone; cut a spatial query from 800ms → 120ms.',
        'Focused on React/Node/Postgres. Looking for a first dev role with production impact.'
      ],
    },
    {
      title: 'My Approach',
      body: [
        'Ship solutions, not cleverness. Performance matters only if people actually want to use it.',
        'I ask: does this make someone’s day easier?'
      ],
    },
    {
      title: 'Beyond Code',
      body: [
        'Food enthusiast exploring Calgary. Active via gym, running, and hot yoga.',
        'Balancing tech with friends, family, and growth.'
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
    <section id="about" className="section-spacing py-20 bg-bg-primary">
      <div className="container-custom max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="max-w-[600px]">
            <header className="mb-16">
              <div className="flex items-start gap-6">
                <div className="w-1 h-24 mt-1 bg-rose-taupe" />
                <div className="flex-1">
                  <p className="caption-text mb-3 text-rose-taupe">GET TO KNOW ME</p>
                  <h2 className="heading-lg">About</h2>
                </div>
              </div>
            </header>

            <div ref={timelineRef} className="relative">
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

            <div className="mt-16 pt-8 border-t border-border-light">
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <dt className="text-[12px] tracking-wider uppercase mb-2 font-medium text-text-muted">Location</dt>
                  <dd className="text-[17px] font-medium text-text-primary">Calgary, AB</dd>
                </div>
                <div>
                  <dt className="text-[12px] tracking-wider uppercase mb-2 font-medium text-text-muted">Education</dt>
                  <dd className="text-[17px] font-medium text-text-primary">SAIT 2024</dd>
                </div>
                <div>
                  <dt className="text-[12px] tracking-wider uppercase mb-2 font-medium text-text-muted">Focus</dt>
                  <dd className="text-[17px] font-medium text-text-primary">Full-Stack</dd>
                </div>
                <div>
                  <dt className="text-[12px] tracking-wider uppercase mb-2 font-medium text-rose-taupe">Status</dt>
                  <dd className="text-[17px] font-medium flex items-center gap-1.5 text-rose-taupe">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-taupe" />
                    Available
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="relative lg:sticky lg:top-24 flex justify-center">
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
