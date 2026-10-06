'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
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
  useEffect(() => setShowScene(window.matchMedia('(min-width: 1024px)').matches), [])

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
              <div className="absolute inset-4 rounded-full overflow-hidden bg-bg-secondary">
                {showScene && (
                  <SplineScene
                    sceneUrl="https://prod.spline.design/0PMuB12cmQMtH4FZ/scene.splinecode"
                    className="w-full h-full"
                    fallbackContent={
                      <div className="w-full h-full grid place-items-center">
                        <p className="text-[13px] text-text-muted">3D scene unavailable</p>
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}