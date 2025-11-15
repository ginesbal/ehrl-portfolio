'use client'

import { ProjectModalWrapper } from '@/components/modals/ProjectModal.jsx'
import ProjectCard from '@/components/projects/ProjectCard.jsx'
import { projects } from '@/data/portfolio-data'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Projects() {
  const router = useRouter()
  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [expandedMobile, setExpandedMobile] = useState(-1)

  const handleProjectClick = (project) => {
    const projectsWithDedicatedPages = ['parkpal', 'evision']

    if (projectsWithDedicatedPages.includes(project.id)) {
      router.push(`/projects/${project.id}`)
    } else {
      setSelectedProject(project)
    }
  }

  return (
    <section className="pt-8 md:pt-0 pb-8 md:pb-10 lg:pb-16 relative bg-bg-primary">
      <div className="container-custom">
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
