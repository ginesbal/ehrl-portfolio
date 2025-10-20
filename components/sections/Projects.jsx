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

  const handleProjectClick = (project) => {
    // Projects with dedicated pages (parkpal, evision)
    const projectsWithDedicatedPages = ['parkpal', 'evision']

    // If project has a dedicated page route, navigate to it
    if (projectsWithDedicatedPages.includes(project.id)) {
      router.push(`/projects/${project.id}`)
    } else {
      // Otherwise, open modal
      setSelectedProject(project)
    }
  }

  return (
    <section className="pt-0 pb-10 md:pb-16 relative bg-bg-primary">
      <div className="container-custom max-w-[1400px]">
        <SectionHeader />
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
    <div id="projects" className="mb-5 scroll-mt-20">
      <div className="flex items-start gap-6">
        <div className="w-1 h-24 mt-1 bg-rose-taupe" />
        <div className="flex-1">
          <p className="caption-text mb-3 text-rose-taupe">SELECTED WORK</p>
          <h2 className="heading-lg">Featured Projects</h2>
        </div>
      </div>
    </div>
  )
}

function ProjectGrid({ projects, hoveredProject, setHoveredProject, onProjectClick }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
    <div className="mt-20 text-center">
      <a
        href="/projects"
        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-border-light text-xs text-rose-taupe transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-taupe hover:border-rose-taupe hover:text-anti-flash-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-taupe/60 focus:ring-offset-2"
      >
        <span className="font-semibold tracking-wide">View All Projects</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>
  )
}
