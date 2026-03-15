'use client'

import { motion } from 'framer-motion'
import SplineScene from '../ui/SplineScene'

export default function About() {
<<<<<<< Updated upstream
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
=======
  return (
    <section className="relative bg-bg-primary pt-8 md:pt-0 pb-16 md:pb-24 overflow-hidden">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-[20%] w-[400px] h-[400px] rounded-full border opacity-[0.03] hidden md:block"
        style={{ borderColor: 'var(--rose-taupe)' }}
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24">
          {/* Left - Content */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] tracking-[0.3em] uppercase text-text-muted">03</span>
              <div className="h-[1px] w-12 bg-border-light" />
            </motion.div>

            <motion.h2
              className="text-[clamp(2rem,5vw,4rem)] font-bold text-text-primary mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About
            </motion.h2>

            <div className="space-y-6 max-w-xl">
              <motion.p
                className="text-[16px] md:text-[17px] lg:text-[19px] leading-relaxed text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Software development graduate from SAIT, 2024. I build interfaces and focus on how things feel when you interact with them.
              </motion.p>

              <motion.p
                className="text-[16px] md:text-[17px] lg:text-[19px] leading-relaxed text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                React, Next.js, TypeScript. I care about spacing, transitions, typography. Looking for teams that value craft.
              </motion.p>

              <motion.div
                className="pt-6 mt-6 border-t border-border-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Languages</p>
                    <p className="text-[10px] md:text-[13px] text-text-primary leading-relaxed">Java · Python · JavaScript · TypeScript · C# · SQL · HTML/CSS</p>
                  </div>
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Frontend & Mobile</p>
                    <p className="text-[10px] md:text-[13px] text-text-primary leading-relaxed">React · React Native · Next.js · Expo Go · Tailwind</p>
                  </div>
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Backend & APIs</p>
                    <p className="text-[10px] md:text-[13px] text-text-primary leading-relaxed">Node.js · Express · FastAPI · REST · JWT Auth</p>
                  </div>
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Databases</p>
                    <p className="text-[10px] md:text-[13px] text-text-primary leading-relaxed">PostgreSQL · MySQL · MongoDB · SQLite</p>
                  </div>
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Testing & QA</p>
                    <p className="text-[10px] md:text-[13px] text-text-primary leading-relaxed">Jest · Postman · Selenium</p>
                  </div>
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-text-muted mb-0.5">DevOps & Tools</p>
                    <p className="text-[10px] md:text-[13px] text-text-primary leading-relaxed">Git · Docker · AWS · CI/CD · Firebase · Figma</p>
                  </div>
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--rose-taupe)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-text-muted mb-0.5">Security</p>
                    <p className="text-[10px] md:text-[13px] text-text-primary leading-relaxed">OWASP · XSS Prevention · JWT Sessions</p>
                  </div>
                  <div className="pl-3 border-l-[2px]" style={{ borderLeftColor: 'var(--border-light)' }}>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-rose-taupe font-medium mb-0.5">Expanding</p>
                    <p className="text-[10px] md:text-[13px] text-text-secondary leading-relaxed">Three.js · Rust · OpenAI API</p>
                  </div>
>>>>>>> Stashed changes
                </div>
              </motion.div>

              <motion.div
                className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-border-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-text-muted mb-2">Location</p>
                    <p className="text-[14px] md:text-[15px] text-text-primary">Calgary, AB</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-text-muted mb-2">Status</p>
                    <p className="text-[14px] md:text-[15px] text-rose-taupe font-medium">Open to work</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile: light accent line to close the section */}
          <motion.div
            className="lg:hidden flex items-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="h-[1px] flex-1 bg-border-light" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-text-muted">03</span>
          </motion.div>

          {/* Desktop: 3D Scene */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full aspect-square max-w-[400px]">
              <div className="absolute inset-0 rounded-full border border-border-light" />
              <div className="absolute inset-4 rounded-full overflow-hidden bg-bg-secondary">
                <SplineScene
                  sceneUrl="https://prod.spline.design/0PMuB12cmQMtH4FZ/scene.splinecode"
                  className="w-full h-full"
                  fallbackContent={
                    <div className="w-full h-full grid place-items-center">
                      <p className="text-[13px] text-text-muted">Loading</p>
                    </div>
                  }
                />
              </div>
<<<<<<< Updated upstream
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
=======
            </div>
          </motion.div>
>>>>>>> Stashed changes
        </div>
      </div>
    </section>
  )
}