'use client'

<<<<<<< Updated upstream
import { useEffect, useRef, useState } from 'react'
import ResumeModal from '../modals/ResumeModal.jsx'
import ScrollIndicator from '../ui/ScrollIndicator.jsx'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const mRef = useRef({ x: 0, y: 0 })
  const layer1 = useRef(null)
  const layer2 = useRef(null)
  const rAF = useRef(null)

  useEffect(() => {
    setLoaded(true)
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isMobile = window.matchMedia('(hover: none)').matches
    if (media.matches || isMobile) return

    const onMove = (e) => {
      mRef.current.x = (e.clientX / window.innerWidth - 0.5) * 15
      mRef.current.y = (e.clientY / window.innerHeight - 0.5) * 15
      if (rAF.current == null) {
        rAF.current = requestAnimationFrame(() => {
          const { x, y } = mRef.current
          if (layer1.current) layer1.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
          if (layer2.current) layer2.current.style.transform = `translate(${-x * 0.2}px, ${-y * 0.2}px)`
          rAF.current = null
        })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="md:min-h-screen flex items-start md:items-center relative overflow-hidden pt-24 pb-0 md:pt-20 md:pb-0 bg-bg-primary">

      <div className="container-custom relative">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2.5 mb-5 md:mb-10">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-taupe" />
            <span className="text-[11px] md:text-[13px] font-semibold tracking-[0.05em] text-rose-quartz">Junior Full-Stack Developer • Calgary/Remote • Available Now</span>
          </div>

          <div className="mb-0 md:mb-16">
            <h1 className={`mb-5 md:mb-8 leading-[1.15] md:transition-all md:duration-1000 ${loaded ? 'md:opacity-100 md:translate-y-0' : 'md:opacity-0 md:translate-y-8'}`}>
              <span className="block mb-2 text-[32px] sm:text-[38px] md:text-[56px] lg:text-[64px] font-bold text-onyx">Full-Stack Developer</span>
              <span className="block text-[20px] sm:text-[24px] md:text-[36px] text-rose-taupe font-medium">Learning by building</span>
            </h1>
            <p className={`text-[14px] sm:text-[16px] md:text-[19px] leading-[1.7] max-w-2xl mb-5 md:mb-4 text-text-secondary md:transition-all md:duration-700 md:delay-300 ${loaded ? 'md:opacity-100 md:translate-y-0' : 'md:opacity-0 md:translate-y-4'}`}>
              Recent SAIT grad building web applications and learning new technologies.
            </p>
            <div className={`flex gap-3 flex-wrap transition-all duration-700 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="#projects" className="btn-primary rounded-full">View Projects →</a>
              <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full">Resume</a>
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <ScrollIndicator />
=======

      <div className="hidden md:block">
        <ScrollIndicator />
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
>>>>>>> Stashed changes
    </section>
  )
}