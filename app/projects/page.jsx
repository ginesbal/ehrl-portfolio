'use client'

import Footer from '@/components/layout/Footer.jsx'
import MobileNav from '@/components/layout/MobileNav.jsx'
import SidebarNav from '@/components/layout/SidebarNav.jsx'
import { Specimen } from '@/components/sections/Projects.jsx'
import FloatingCircles from '@/components/ui/FloatingCircles.jsx'
import { projects } from '@/data/portfolio-data'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
const EASE_OUT_EMIL = [0.23, 1, 0.32, 1]

export default function ProjectsArchive() {
    const [activeId, setActiveId] = useState(null)
    const [canHover, setCanHover] = useState(true)

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover)')
        setCanHover(mq.matches)
        const handler = (e) => setCanHover(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const activeProject = projects.find((p) => p.id === activeId) ?? projects[0] ?? null

    return (
        <div className="min-h-screen bg-bg-primary">
            <MobileNav />
            <SidebarNav />

            <main
                id="main"
                className="relative transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)', minHeight: '100vh' }}
            >
                <section className="relative bg-bg-primary pt-28 lg:pt-20 pb-16 md:pb-24 overflow-clip">
                    <FloatingCircles section="projects" />

                    <div className="container-custom relative z-10">
                        {/* Back link */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                            className="mb-12 md:mb-16"
                        >
                            <Link
                                href="/"
                                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-text-muted transition-colors duration-300 hover:text-rose-taupe"
                            >
                                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                                <span>Back to home</span>
                            </Link>
                        </motion.div>

                        {/* Header — mirrors the Projects section pattern, scaled up */}
                        <header className="mb-16 md:mb-24">
                            <motion.div
                                className="flex items-center gap-4 mb-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                            >
                                <span className="inline-flex w-2 h-2 rounded-full bg-rose-taupe" />
                                <span className="text-[11px] tracking-[0.3em] uppercase text-text-muted">Archive</span>
                                <div className="h-px w-12 bg-border-light" />
                                <span className="text-[11px] tracking-[0.3em] uppercase text-text-muted tabular-nums">
                                    {projects.length} works
                                </span>
                            </motion.div>

                            <motion.h1
                                className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.02em] text-text-primary"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
                            >
                                Selected work<span className="italic text-rose-taupe">.</span>
                            </motion.h1>

                            <motion.p
                                className="mt-6 md:mt-8 max-w-xl text-[17px] md:text-[19px] leading-relaxed text-text-secondary"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
                            >
                                A few things I’ve built over the past couple of years.
                            </motion.p>
                        </header>

                        {/* Two-column body */}
                        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-16 lg:items-start">

                            {/* Project list */}
                            <div className="relative">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.6, delay: index * 0.05, ease: EASE_OUT_EXPO }}
                                        onMouseEnter={() => canHover && setActiveId(project.id)}
                                    >
                                        <Link
                                            href={`/projects/${project.id}`}
                                            // the preview follows keyboard focus too, not only the mouse
                                            onFocus={() => setActiveId(project.id)}
                                            className="group relative block border-t border-border-light active:scale-[0.995] transition-transform duration-150 ease-out"
                                        >
                                            {/* Left accent bar */}
                                            <div
                                                className="absolute left-0 top-0 bottom-0 w-[2px] bg-rose-taupe origin-top scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-[400ms]"
                                                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                            />

                                            <div className="pl-5 md:pl-6 py-8 md:py-10 grid lg:grid-cols-[1fr_auto] gap-x-8 items-start">
                                                <div className="min-w-0">
                                                    <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-normal leading-[0.95] tracking-[-0.015em] text-text-primary">
                                                        {project.title}
                                                    </h2>

                                                    <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-1">
                                                        <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">
                                                            {project.category.split(',')[0].trim()}
                                                        </span>
                                                        {project.role && (
                                                            <>
                                                                <span aria-hidden className="text-text-muted/40">·</span>
                                                                <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">
                                                                    {project.role}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>

                                                    {project.description && (
                                                        <p className="mt-3 md:mt-4 max-w-xl text-[15px] leading-relaxed text-pretty text-text-secondary">
                                                            {project.description}
                                                        </p>
                                                    )}

                                                    {project.tech?.length > 0 && (
                                                        <div className="mt-3 md:mt-4 flex flex-wrap gap-3 md:gap-4">
                                                            {project.tech.slice(0, 3).map((tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className="text-[11px] tracking-[0.15em] uppercase text-text-muted"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right column — desktop */}
                                                <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
                                                    <span className="text-[11px] tracking-[0.2em] tabular-nums text-text-muted">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    <span className="text-[11px] tracking-[0.2em] text-text-muted">
                                                        {project.year}
                                                    </span>
                                                    <span aria-hidden className="mt-1 text-[18px] text-text-muted transition-[color,transform] duration-300 group-hover:text-rose-taupe group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </div>

                                                {/* Mobile inline meta */}
                                                <div className="md:hidden flex items-center justify-between mt-4 pt-3 border-t border-border-light/50">
                                                    <span className="text-[11px] tracking-[0.2em] text-text-muted">
                                                        {project.year}
                                                    </span>
                                                    <span aria-hidden className="text-[16px] text-rose-taupe">→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}

                                <div className="border-t border-border-light" />
                            </div>

                            {/* Sticky preview panel — desktop only. A mouse shortcut: every row already links to
                                the same page, so it stays out of the tab order and the accessibility tree. */}
                            <aside aria-hidden="true" className="hidden lg:block sticky top-24 self-start">
                                <AnimatePresence mode="wait">
                                    {activeProject && <motion.div
                                        key={activeProject.id}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                                    >
                                        <Link
                                            href={`/projects/${activeProject.id}`}
                                            tabIndex={-1}
                                            className="group block rounded-[var(--radius-lg)] border border-border-light bg-bg-secondary p-5 hover:border-rose-taupe/40 active:scale-[0.99] transition-[border-color,transform] duration-300 ease-[var(--ease-out-expo)]"
                                        >
                                            <div className="relative aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden bg-bg-accent mb-5">
                                                {/* the same artefact as the home row: EVision's query, or a screen peeking up
                                                    from the bottom edge, a phone or a wider desktop window (88% or 46% of 318px) */}
                                                {activeProject.id === 'evision' ? (
                                                    <Specimen className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1" />
                                                ) : (activeProject.thumb ?? activeProject.preview) ? (
                                                    <Image
                                                        src={activeProject.thumb ?? activeProject.preview}
                                                        alt=""
                                                        sizes={activeProject.screen === 'desktop' ? '282px' : '148px'}
                                                        className={`absolute left-1/2 -translate-x-1/2 h-auto transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 ${activeProject.screen === 'desktop' ? 'top-8 w-[88%] rounded-t-[8px]' : 'top-6 w-[46%] rounded-t-[18px]'}`}
                                                    />
                                                ) : null}
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-baseline justify-between gap-3">
                                                    <h3 className="text-[16px] font-medium text-text-primary truncate">
                                                        {activeProject.title}
                                                    </h3>
                                                    <span className="text-[12px] text-text-muted tabular-nums">
                                                        {activeProject.year}
                                                    </span>
                                                </div>

                                                <p className="text-[14px] leading-relaxed text-pretty text-text-secondary">
                                                    {activeProject.description}
                                                </p>

                                                {activeProject.tech?.length > 0 && (
                                                    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                                                        {activeProject.tech.slice(0, 4).map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="text-[11px] tracking-[0.15em] uppercase text-text-muted"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="pt-4 mt-2 border-t border-border-light/60">
                                                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-rose-taupe">
                                                        View project
                                                        <span
                                                            aria-hidden
                                                            className="inline-block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                                                        >
                                                            →
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>}
                                </AnimatePresence>
                            </aside>
                        </div>

                        {/* Footer stats */}
                        <motion.footer
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: EASE_OUT_EMIL }}
                            className="mt-20 md:mt-28 pt-8 border-t border-border-light"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">
                                    End of archive
                                </span>
                                <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">
                                    <span className="text-text-primary">{projects.length}</span> total
                                </span>
                            </div>
                        </motion.footer>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    )
}
