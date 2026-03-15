'use client'

import { ProjectModalWrapper } from '@/components/modals/ProjectModal.jsx'
import { projects } from '@/data/portfolio-data'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function Projects() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState(null)

  const handleProjectClick = (project) => {
    const projectsWithDedicatedPages = ['parkpal', 'evision']

    if (projectsWithDedicatedPages.includes(project.id)) {
=======
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
>>>>>>> Stashed changes
      router.push(`/projects/${project.id}`)
    } else {
      setSelectedProject(project)
    }
  }

  return (
    <section className="pt-0 pb-10 md:pb-16 relative bg-bg-primary">
      <div className="container-custom max-w-[1400px]">
        <SectionHeader />

        <MobileProjectList
          projects={projects.slice(0, 3)}
          expandedMobile={expandedMobile}
          setExpandedMobile={setExpandedMobile}
          onProjectClick={handleProjectClick}
        />

        <ProjectGrid
          projects={projects.slice(0, 3)}
          hoveredProject={hoveredProject}
          setHoveredProject={setHoveredProject}
          onProjectClick={handleProjectClick}
        />

        <ViewAllLink />
=======
    <section className="relative bg-bg-primary pt-8 md:pt-0 pb-16 md:pb-24">
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
                transition: 'opacity 0.4s ease, background-color 0.15s ease',
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
            className="group inline-flex items-center gap-3 text-[12px] md:text-[13px] tracking-[0.15em] uppercase text-text-secondary transition-colors hover:text-rose-taupe"
          >
            All projects
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </a>
        </motion.div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
}

function SectionHeader() {
  return (
    <div id="projects" className="mb-5 lg:mb-16">
      <div className="flex items-start gap-3 lg:gap-6">
        <div className="w-1 h-14 lg:h-24 mt-0.5 bg-rose-taupe" />
        <div className="flex-1">
          <p className="text-[10px] lg:text-[13px] tracking-[0.1em] uppercase mb-1.5 lg:mb-3 font-semibold text-rose-taupe">Selected Work</p>
          <h2 className="text-[26px] lg:text-[40px] font-bold text-text-primary leading-tight">Featured Projects</h2>
        </div>
      </div>
    </div>
  )
}

function MobileProjectList({ projects, expandedMobile, setExpandedMobile, onProjectClick }) {
  return (
    <div className="lg:hidden space-y-2.5">
      {projects.map((project, index) => (
        <div key={project.id} className="border border-border-light rounded-lg overflow-hidden bg-bg-secondary">
          <button
            onClick={() => setExpandedMobile(expandedMobile === index ? -1 : index)}
            className="w-full px-4 py-3.5 flex items-center gap-3 text-left active:bg-bg-accent transition-colors min-h-[60px]"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-rose-taupe text-white flex-shrink-0">
              <span className="text-[12px] font-semibold">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-semibold text-text-primary leading-tight">{project.title}</h3>
              <p className="text-[12px] text-text-muted mt-0.5 truncate">{project.subtitle}</p>
            </div>
            <svg
              className={`w-5 h-5 text-rose-taupe transition-transform duration-200 flex-shrink-0 ${expandedMobile === index ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-200 ease-out ${expandedMobile === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
          >
            <div className="px-4 pb-4 space-y-3.5 border-t border-border-light pt-3.5">
              <p className="text-[13px] leading-[1.5] text-text-secondary">{project.description}</p>

              <div className="space-y-1.5">
                <p className="text-[10px] tracking-[0.08em] uppercase font-semibold text-text-muted">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((t) => (
                    <span key={t} className="px-2 py-1 text-[11px] rounded border border-border-light bg-bg-primary text-text-secondary font-medium">{t}</span>
                  ))}
                  {project.tech.length > 5 && <span className="px-2 py-1 text-[11px] font-semibold text-text-muted">+{project.tech.length - 5}</span>}
                </div>
              </div>

              <button
                onClick={() => onProjectClick(project)}
                className="w-full mt-1 px-4 py-2.5 bg-rose-taupe text-white text-[13px] font-semibold rounded-md active:bg-rose-taupe/90 transition-colors min-h-[44px]"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectGrid({ projects, hoveredProject, setHoveredProject, onProjectClick }) {
  return (
    <div className="hidden lg:grid grid-cols-3 gap-10">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredProject === project.id}
          onHover={() => setHoveredProject(project.id)}
          onLeave={() => setHoveredProject(null)}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  )
}

function ViewAllLink() {
  return (
    <div className="mt-8 lg:mt-20 text-center">
      <a
        href="/projects"
        className="group inline-flex items-center justify-center gap-2 px-6 py-3 lg:px-4 lg:py-2 rounded-lg lg:rounded-full border-2 border-border-light text-[13px] lg:text-xs text-rose-taupe transition-all duration-200 active:scale-[0.98] lg:hover:-translate-y-0.5 lg:hover:bg-rose-taupe lg:hover:border-rose-taupe lg:hover:text-anti-flash-white lg:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-taupe/60 focus:ring-offset-2 w-full sm:w-auto min-h-[48px] lg:min-h-0"
      >
        <span className="font-semibold tracking-wide">View All Projects</span>
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>
  )
}
=======
}
>>>>>>> Stashed changes
