'use client'

import { specimen } from '@/app/projects/evision/data'
import { projects } from '@/data/portfolio-data'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const showcaseProjects = (projects.some((p) => p.featured) ? projects.filter((p) => p.featured) : projects).slice(0, 3)

const lift = 'transition-transform duration-500 ease-[var(--ease-out-expo)] motion-safe:group-hover:-translate-y-1'

// One real piece of each project: its phone screen, its desktop screen, or (EVision has
// no screenshot) the sample query its case study leads with. Screens run off the bottom
// edge (-bottom-2), so the hover lift never opens a gap.
function Artefact({ project }) {
  const image = project.thumb ?? project.preview

  if (project.id === 'evision') {
    return (
      <div className={`absolute inset-0 flex flex-col justify-center p-5 xl:p-6 ${lift}`}>
        <p className="font-serif text-[18px] xl:text-[21px] leading-[1.25] text-balance text-text-primary">&ldquo;{specimen.query}&rdquo;</p>
        <span className="block my-3 xl:my-4 h-px bg-border-light" />
        <p className="text-[13px] leading-snug text-text-muted">
          Read as <span className="text-text-secondary">{specimen.readAs.join(' · ')}</span>
        </p>
        <p className="mt-1 text-[13px] tabular-nums text-text-muted">{specimen.matched} of {specimen.catalog} match</p>
      </div>
    )
  }

  if (!image) return null

  const desktop = project.screen === 'desktop'
  return (
    <div
      className={`absolute -bottom-2 overflow-hidden shadow-[var(--shadow-sm)] ${lift} ${
        desktop ? 'top-6 xl:top-10 inset-x-6 rounded-t-[8px]' : 'top-5 left-1/2 -translate-x-1/2 w-[11.5rem] rounded-t-[18px]'
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={desktop ? '304px' : '184px'}
        className={`object-cover ${desktop ? 'object-left-top' : 'object-top'}`}
      />
    </div>
  )
}

export default function Projects() {
  return (
    <section className="relative bg-bg-primary pt-8 md:pt-0 pb-16 md:pb-24">
      <div className="container-custom">
        <motion.h2
          className="mb-12 md:mb-16 font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal tracking-[-0.01em] leading-[0.95] text-text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Projects
        </motion.h2>

        <div>
          {showcaseProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group relative block border-t border-border-light active:bg-rose-taupe/5"
              >
                {/* Left accent — CSS only */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-rose-taupe origin-top scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-[400ms]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />

                <div className="pl-4 md:pl-6 py-6 md:py-8 xl:grid xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-x-16 xl:items-start">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-x-3 md:gap-x-4">
                      <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.01em] text-text-primary">
                        {project.title}
                      </h3>
                      <span className="text-[11px] tracking-[0.2em] tabular-nums text-text-muted">{project.year}</span>
                      <span aria-hidden className="xl:hidden ml-auto self-center text-[16px] text-rose-taupe transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-secondary">
                      {project.summary ?? project.description}
                    </p>

                    <p className="mt-3 text-[13px] text-text-muted">{project.tech.slice(0, 3).join(' · ')}</p>
                  </div>

                  <div aria-hidden className="relative mt-5 xl:mt-0 w-full max-w-[22rem] h-[10.5rem] xl:h-[13.5rem] overflow-hidden rounded-[var(--radius-md)] bg-bg-accent">
                    <Artefact project={project} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-border-light" />
        </div>
      </div>
    </section>
  )
}
