'use client'

import { ProjectModalWrapper } from '@/components/modals/ProjectModal.jsx'
import { projects } from '@/data/portfolio-data'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import FloatingCircles from '../ui/FloatingCircles.jsx'

export default function Projects() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [canHover, setCanHover] = useState(true)

  // Detect touch-only devices
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)')
    setCanHover(mq.matches)
    const handler = (e) => setCanHover(e.matches)
    mq.addEventListener?.('change', handler) || mq.addListener?.(handler)
    return () => mq.removeEventListener?.('change', handler) || mq.removeListener?.(handler)
  }, [])

  const showcaseProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured)
    return (featured.length ? featured : projects).slice(0, 3)
  }, [])

  const handleProjectClick = (project) => {
    const dedicatedPages = ['parkpal', 'evision']
    if (dedicatedPages.includes(project.id)) {
      router.push(`/projects/${project.id}`)
    } else {
      // Otherwise, open modal
      setSelectedProject(project)
    }
  }

  return (
    <section className="relative bg-bg-primary pt-8 md:pt-0 pb-16 md:pb-24">
      <FloatingCircles section="projects" />

      <div className="container-custom">
        <div className="mb-12 md:mb-16">
          <motion.div
            className="flex items-center gap-4 mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-text-muted">02</span>
            <div className="h-[1px] w-12 bg-border-light" />
          </motion.div>
          <motion.h2
            className="text-[clamp(2rem,5vw,4rem)] font-bold text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Projects
          </motion.h2>
        </div>

        <div>
          {showcaseProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              onMouseEnter={() => canHover && setHoveredIndex(index)}
              onMouseLeave={() => canHover && setHoveredIndex(null)}
              onClick={() => handleProjectClick(project)}
              className="group relative border-t border-border-light cursor-pointer active:bg-hover-overlay"
              style={{
                opacity: canHover && hoveredIndex !== null && hoveredIndex !== index ? 0.35 : 1,
                transition: 'opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {/* Left accent — CSS only */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-rose-taupe origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-[400ms]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              />

              <div className="pl-4 md:pl-6 py-6 md:py-7 grid lg:grid-cols-[1fr_auto] gap-x-8 items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 md:gap-x-4 gap-y-1">
                    <h3 className="text-[clamp(1.25rem,3vw,2.5rem)] font-semibold leading-tight text-text-primary">
                      {project.title}
                    </h3>
                    <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-text-muted">
                      {project.category.split(',')[0].trim()}
                    </span>
                  </div>

                  <p className="text-[13px] md:text-[14px] text-text-secondary leading-relaxed max-w-xl mt-2 md:mt-3 line-clamp-2">
                    {project.description}
                  </p>

                  {project.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-3 md:gap-4 mt-2 md:mt-3">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right column — simplified on mobile */}
                <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[11px] tracking-[0.25em] tabular-nums text-text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] tracking-[0.2em] text-text-muted">{project.year}</span>
                  <span className="text-[18px] mt-1 text-text-muted transition-colors duration-300 group-hover:text-rose-taupe">
                    →
                  </span>
                </div>

                {/* Mobile arrow inline */}
                <div className="md:hidden flex items-center justify-between mt-3 pt-3 border-t border-border-light/50">
                  <span className="text-[10px] tracking-[0.2em] text-text-muted">{project.year}</span>
                  <span className="text-[16px] text-rose-taupe">→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12 md:mt-16 flex justify-center md:justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="/projects"
            className="group inline-flex items-center gap-3 text-[12px] md:text-[13px] tracking-[0.15em] uppercase text-text-secondary font-semibold transition-colors hover:text-rose-taupe"
          >
            <span className="group-hover:underline underline-offset-4">All projects</span>
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </a>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModalWrapper
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          maxWidthClass="modal-w-1120"
        />
      )}
    </section>
  )
}
