'use client'

import { useEffect, useRef, useState } from 'react'
import ScrollIndicator from '../ui/ScrollIndicator.jsx'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const mRef = useRef({ x:0, y:0 })
  const layer1 = useRef(null)
  const layer2 = useRef(null)
  const rAF = useRef(null)
  const pdfPath = '/files/resume.pdf'

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
          const {x,y} = mRef.current
          if (layer1.current) layer1.current.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`
          if (layer2.current) layer2.current.style.transform = `translate(${-x*0.2}px, ${-y*0.2}px)`
          rAF.current = null
        })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20 bg-bg-primary">

      <div className="container-custom relative">
        <div className="max-w-4xl">
          <div className={`inline-flex items-center gap-2.5 mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-block w-2 h-2 rounded-full bg-rose-taupe" />
            <span className="text-[13px] font-medium tracking-[0.05em] text-rose-quartz">Available for opportunities</span>
          </div>

          <div className={`mb-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="heading-xl mb-8 leading-[1.15]">
              <span className="block mb-2 text-onyx">Full-Stack Developer</span>
              <span className="block text-[28px] md:text-[36px] text-rose-taupe font-medium">Learning by building</span>
            </h1>
            <p className={`text-[17px] md:text-[19px] leading-[1.7] max-w-2xl mb-4 text-text-secondary transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Recent SAIT grad building web applications and learning new technologies.
            </p>
            <div className={`flex gap-3 flex-wrap transition-all duration-700 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="#projects" className="btn-primary rounded-full">View Projects →</a>
              <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full">Resume</a>
            </div>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  )
}
