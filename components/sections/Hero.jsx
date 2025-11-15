'use client'

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
            <div className={`flex gap-3 flex-col sm:flex-row md:transition-all md:duration-700 md:delay-600 ${loaded ? 'md:opacity-100 md:translate-y-0' : 'md:opacity-0 md:translate-y-4'}`}>
              <a href="#projects" className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold rounded-full bg-rose-taupe text-white transition-all duration-200 active:scale-[0.98] lg:hover:bg-rose-taupe/90 focus:outline-none focus:ring-2 focus:ring-rose-taupe/60 focus:ring-offset-2 min-h-[48px]">View Projects →</a>
              <button 
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold rounded-full border-2 border-rose-quartz text-rose-taupe transition-all duration-200 active:scale-[0.98] lg:hover:bg-reseda-green lg:hover:text-white lg:hover:border-reseda-green focus:outline-none focus:ring-2 focus:ring-rose-taupe/60 focus:ring-offset-2 min-h-[48px]"
              >
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <ScrollIndicator />
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  )
}
