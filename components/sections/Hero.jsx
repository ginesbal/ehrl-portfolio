'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ResumeModal from '../modals/ResumeModal.jsx'
import ScrollIndicator from '../ui/ScrollIndicator.jsx'

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  return (
    <section className="min-h-[100svh] md:min-h-screen flex md:items-center relative overflow-hidden bg-bg-primary">
      {/* floating background circles */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-[12%] left-[6%] w-64 h-64 rounded-full border opacity-[0.05] hidden sm:block"
        style={{ borderColor: 'var(--rose-taupe)' }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-[18%] left-[8%] w-80 h-80 rounded-full opacity-[0.03] hidden sm:block"
        style={{ background: 'var(--rose-taupe)' }}
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-[22%] right-[12%] w-56 h-56 rounded-full border opacity-[0.05] hidden sm:block"
        style={{ borderColor: 'var(--rose-taupe)' }}
        animate={{ y: [0, -12, 0], x: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <div className="container-custom relative w-full flex flex-col md:block">
        {/* name card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute top-8 right-4 items-stretch gap-5"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[2px] bg-onyx origin-top"
            style={{ minHeight: '90px' }}
          />
          <div className="flex flex-col justify-center gap-2">
            <div>
              <h2 className="text-[clamp(0.8rem,1.8vw,1rem)] font-medium tracking-[0.2em] uppercase text-onyx">Ehrl</h2>
              <h2 className="text-[clamp(0.8rem,1.8vw,1rem)] font-medium tracking-[0.2em] uppercase text-onyx">Balquin</h2>
            </div>
            <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-text-muted">Full-Stack Developer</p>
          </div>
        </motion.div>

        {/* main content area */}
        <div className="flex flex-col justify-center flex-1 md:flex-none md:justify-center md:min-h-[70vh] max-w-3xl pb-24 md:pb-0">
          {/* mobile name badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden flex items-stretch self-end gap-3 mb-20"
          >
            <div className="w-[2px] bg-onyx" />
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-text-muted">Ehrl Balquin</p>
              <p className="text-[10px] tracking-[0.15em] text-text-muted/70 mt-0.5">Full-Stack Developer</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(0.75rem,1.5vw,0.9rem)] font-medium tracking-[0.15em] uppercase text-text-muted mb-2 md:mb-3"
          >
            Welcome to my
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,12vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-onyx"
          >
            portfolio<span className="text-rose-taupe">.</span>
          </motion.h1>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-0 flex items-center gap-6 md:absolute md:bottom-8 md:right-20"
          >
            <a
              href="#projects"
              className="text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.1em] text-onyx transition-colors duration-300 hover:text-rose-taupe"
            >
              View Work
            </a>
            <span className="w-[1px] h-4 bg-border-light" />
            <button
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

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  )
}