'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import FloatingCircles from '../ui/FloatingCircles.jsx'
import ScrollIndicator from '../ui/ScrollIndicator.jsx'

const ResumeModal = dynamic(() => import('../modals/ResumeModal.jsx'), { ssr: false })

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  // full height from md up; on phones it sizes to its content so the work starts on the first screen
  return (
    <section className="md:min-h-screen flex md:items-center relative overflow-hidden bg-bg-primary">

      <FloatingCircles />

      <div className="container-custom relative w-full flex flex-col md:block">
        {/* name card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute top-8 right-24 items-stretch gap-5"
        >
          <motion.div
            initial={{ scaleY: 0.1, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[3px] bg-rose-taupe origin-top"
            style={{ minHeight: '90px' }}
          />
          <div className="flex flex-col justify-center gap-1">
            <p className="leading-tight font-semibold tracking-[0.15em] uppercase text-onyx">
              Ehrl<br />Balquin
            </p>
            <p className="text-[12px] font-medium text-text-muted">Full-Stack Developer</p>
          </div>
        </motion.div>

        {/* main content area */}
        <div className="flex flex-col justify-center flex-1 md:flex-none md:justify-center md:min-h-[70vh] max-w-3xl pt-32 pb-16 md:p-0">

          {/* mobile name badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden flex items-stretch self-end gap-3 mb-20"
          >
            <div className="w-[2px] bg-rose-taupe" />
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-onyx">Ehrl Balquin</p>
              <p className="text-[11px] tracking-[0.05em] text-text-muted mt-0.5">Full-Stack Developer</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(0.75rem,1.5vw,0.9rem)] font-medium tracking-[0.15em] uppercase text-text-muted"
          >
            Welcome to my
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3.5rem,13vw,8rem)] font-normal leading-[0.92] tracking-[-0.02em] text-onyx"
          >
            portfolio<span className="italic text-rose-taupe">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 max-w-md text-[16px] md:text-[18px] leading-relaxed text-balance text-text-secondary"
          >
            I design and build for the web, with the same care for how an interface looks as for how it works.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-0 flex items-center justify-end gap-6 md:absolute md:bottom-8 md:right-36"
          >
            <a
              href="#projects"
              className="text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.1em] text-onyx transition-colors duration-300 hover:text-rose-taupe"
            >
              View Work
            </a>
            <span className="w-[3px] h-6 bg-rose-taupe self-center" />
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.1em] text-onyx transition-colors duration-300 hover:text-rose-taupe"
            >
              Resume
            </button>
          </motion.div>
        </div>
      </div>

      <div className="hidden md:block">
        <ScrollIndicator />
      </div>

      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
    </section>
  )
}