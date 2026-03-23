'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import FloatingCircles from '../ui/FloatingCircles.jsx'

const SplineScene = dynamic(() => import('../ui/SplineScene'), { ssr: false })

export default function About() {
  return (
    <section className="relative bg-bg-primary pt-8 md:pt-0 pb-12 overflow-hidden">
      <FloatingCircles section="about" />

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
              className="text-[clamp(2rem,5vw,4rem)] font-bold text-text-primary mb-4 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About
            </motion.h2>

            <div className="space-y-4 max-w-xl">
              <motion.p
                className="text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hey there! <br />

                <br />
                I’m a SAIT Software Development graduate interested in front-end development and UI/UX design. I like building interfaces that feel clean, intuitive, and purposeful. A lot of my time goes into prototyping, refining details, and finding simple ways to make products easier to use while still keeping them visually engaging.
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}