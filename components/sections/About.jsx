'use client'

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import FloatingCircles from '../ui/FloatingCircles.jsx'

const SplineScene = dynamic(() => import('../ui/SplineScene'), { ssr: false })

const skills = [
  ['Languages', 'Java · Python · JavaScript · TypeScript · C# · SQL · HTML/CSS'],
  ['Frontend & Mobile', 'React · React Native · Next.js · Expo Go · Tailwind'],
  ['Backend & APIs', 'Node.js · Express · FastAPI · REST · JWT Auth'],
  ['Databases', 'PostgreSQL · MySQL · MongoDB · SQLite'],
  ['Testing & QA', 'Jest · Postman · Selenium'],
  ['DevOps & Tools', 'Git · Docker · AWS · CI/CD · Firebase · Figma'],
  ['Security', 'OWASP · XSS Prevention · JWT Sessions'],
]

export default function About() {
  // The 3D scene is desktop-only; don't download the runtime on phones
  const [showScene, setShowScene] = useState(false)
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const syncScene = () => setShowScene(desktop.matches)
    syncScene()
    desktop.addEventListener('change', syncScene)
    return () => desktop.removeEventListener('change', syncScene)
  }, [])

  // The disc has two faces: the 3D avatar in front, the photo behind. It turns like a coin seen face-on:
  // it narrows to its edge, catching a little less light, the other side comes round, and it widens again.
  // Flat 2D transforms only, so the live WebGL canvas never goes through 3D compositing (no hitch on return).
  const [showPhoto, setShowPhoto] = useState(false)
  const [peek, setPeek] = useState(false)
  const reduceMotion = useReducedMotion()
  const angle = useMotionValue(0)
  const turn = (showPhoto ? 180 : 0) + (peek && !reduceMotion ? (showPhoto ? -16 : 16) : 0)
  useEffect(() => {
    if (reduceMotion) {
      angle.set(turn)
      return
    }
    const turning = animate(angle, turn, { duration: peek ? 0.35 : 0.7, ease: [0.65, 0, 0.35, 1] })
    return () => turning.stop()
  }, [angle, turn, peek, reduceMotion])
  const width = useTransform(angle, (a) => Math.max(0.015, Math.abs(Math.cos((a * Math.PI) / 180))))
  const frontShown = useTransform(angle, (a) => (a < 90 ? 1 : 0))
  const backShown = useTransform(angle, (a) => (a < 90 ? 0 : 1))
  const edgeShade = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * 0.3)
  function flip() {
    setShowPhoto((shown) => !shown)
    setPeek(false)
  }

  return (
    <section className="relative bg-bg-primary pt-8 md:pt-0 pb-12 overflow-hidden">
      <FloatingCircles section="about" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24">
          {/* Left - Content */}
          <div>
            <motion.h2
              className="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal tracking-[-0.01em] leading-[0.95] text-text-primary mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About
            </motion.h2>

            <div className="space-y-4 max-w-xl">
              <motion.div
                className="space-y-4 text-[16px] lg:text-[17px] leading-relaxed text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p>Hey there!</p>
                <p>
                  I’m a SAIT Software Development graduate interested in front-end development and UI/UX design. I like building interfaces that feel clean, intuitive, and purposeful. A lot of my time goes into prototyping, refining details, and finding simple ways to make products easier to use while still keeping them visually engaging.
                </p>
              </motion.div>

              <motion.div
                className="pt-6 mt-6 border-t border-border-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {skills.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11px] tracking-[0.2em] uppercase text-text-muted mb-1">{label}</dt>
                      <dd className="text-[14px] text-text-primary leading-relaxed">{value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-[11px] tracking-[0.2em] uppercase text-rose-taupe font-medium mb-1">Expanding</dt>
                    <dd className="text-[14px] text-text-secondary leading-relaxed">Three.js · Rust · OpenAI API</dd>
                  </div>
                </dl>
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
                    <p className="text-[11px] tracking-[0.2em] uppercase text-text-muted mb-2">Location</p>
                    <p className="text-[14px] md:text-[15px] text-text-primary">Calgary, AB</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-text-muted mb-2">Status</p>
                    <p className="text-[14px] md:text-[15px] text-rose-taupe font-medium">Open to work</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

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
              <motion.div style={{ scaleX: width }} className="absolute inset-4">
                <motion.div
                  style={{ opacity: frontShown }}
                  inert={showPhoto}
                  className={`absolute inset-0 rounded-full overflow-hidden bg-bg-secondary ${showPhoto ? 'pointer-events-none' : ''}`}
                >
                  {showScene && (
                    <SplineScene
                      // ponytail: Spline sends no Cache-Control, so ?v= (live ETag prefix) busts stale browser copies; bump it after each Spline promote
                      sceneUrl="https://prod.spline.design/0PMuB12cmQMtH4FZ/scene.splinecode?v=42b17fcc"
                      className="w-full h-full"
                      fallbackContent={
                        <div className="w-full h-full grid place-items-center">
                          <p className="text-[13px] text-text-muted">3D scene unavailable</p>
                        </div>
                      }
                    />
                  )}
                </motion.div>
                <motion.div
                  style={{ opacity: backShown }}
                  inert={!showPhoto}
                  className={`absolute inset-0 rounded-full overflow-hidden bg-bg-secondary border-[3px] border-rose-taupe ${showPhoto ? '' : 'pointer-events-none'}`}
                >
                  {/* the full portrait squared and zoomed out with its own mirrored studio backdrop, so the circle shows head and shoulders instead of a close crop */}
                  {showScene && <Image src="/images/ehrl-balquin-portrait-wide.webp" alt="Portrait of Ehrl Balquin" fill sizes="368px" className="object-cover" />}
                </motion.div>
                <motion.div aria-hidden="true" style={{ opacity: edgeShade }} className="pointer-events-none absolute inset-0 rounded-full bg-text-primary" />
              </motion.div>
              <button
                type="button"
                onClick={flip}
                onPointerEnter={() => setPeek(true)}
                onPointerLeave={() => setPeek(false)}
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center gap-2 rounded-full border border-border-light bg-bg-primary px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-text-secondary transition-[color,transform] duration-200 hover:text-text-primary active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-taupe"
              >
                <motion.svg animate={{ rotate: showPhoto ? -180 : 0 }} transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </motion.svg>
                {showPhoto ? 'Flip to 3D' : 'Flip to photo'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
