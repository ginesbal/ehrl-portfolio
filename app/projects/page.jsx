'use client'

import MobileNav from '@/components/layout/MobileNav.jsx'
import SidebarNav from '@/components/layout/SidebarNav.jsx'
import { projects } from '@/data/portfolio-data'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectsArchive() {
    const [hoveredProject, setHoveredProject] = useState(null)

    const activeProject = projects.find((p) => p.id === hoveredProject) ?? projects[0]

    return (
        <>
            <MobileNav />
            <SidebarNav />

            <main
                className="min-h-screen relative transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                {/* Grain texture overlay */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
                    <svg width="100%" height="100%">
                        <filter id="grain">
                            <feTurbulence baseFrequency="0.65" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#grain)" />
                    </svg>
                </div>

                <div className="relative z-10 px-8 md:px-12 lg:px-20 py-20 md:py-24">
                    {/* Back to Home */}
                    <Link
                        href="/"
                        className="inline-block text-sm opacity-60 hover:opacity-100 transition-opacity mb-12"
                    >
                        ← Back to Home
                    </Link>

                    {/* Header */}
                    <header className="mb-20">
                        <div className="flex items-baseline justify-between mb-8">
                            <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-light">
                                Selected Work
                                <span className="text-[0.6em] opacity-50 ml-2">({projects.length})</span>
                            </h1>
                            <p className="text-sm opacity-60 max-w-xs text-right">
                                A piece from my selection of favorites
                            </p>
                        </div>
                    </header>

                    {/* Two-column layout on desktop */}
                    <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-16 lg:items-start">

                        {/* Projects List */}
                        <div className="relative">
                            {projects.map((project, index) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.id}`}
                                    className="group block border-t border-gray-200 py-8 md:py-10 relative"
                                    onMouseEnter={() => setHoveredProject(project.id)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                    style={{
                                        opacity: hoveredProject !== null && hoveredProject !== project.id ? 0.3 : 1,
                                        transition: 'opacity 0.3s ease',
                                    }}
                                >
                                    {/* Left bar */}
                                    <motion.div
                                        className="absolute left-0 top-0 w-[2px] bg-black"
                                        initial={{ height: 0 }}
                                        animate={{ height: hoveredProject === project.id ? '100%' : 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    />

                                    <div className="pl-5 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9]">
                                                {project.title}
                                            </h2>
                                            <div className="mt-3 flex items-center gap-4">
                                                <p className="text-sm opacity-60 tracking-wide">
                                                    {project.category.split(',')[0].trim()}
                                                </p>
                                                {project.role && (
                                                    <>
                                                        <span className="opacity-30 text-xs">·</span>
                                                        <p className="text-sm opacity-40 tracking-wide">{project.role}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-right ml-6 shrink-0">
                                            <span className="text-[clamp(1.5rem,3vw,2rem)] font-thin opacity-40">
                                                /{String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            <div className="border-t border-gray-200" />
                        </div>

                        {/* Sticky Preview Panel — desktop only */}
                        <div className="hidden lg:block sticky top-24 self-start">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* Image */}
                                    <div className="aspect-[4/3] overflow-hidden bg-bg-accent mb-5">
                                        {activeProject.image ? (
                                            <img
                                                src={activeProject.image}
                                                alt={activeProject.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="w-full h-full"
                                                style={{ background: `linear-gradient(135deg, ${activeProject.gradient})` }}
                                            />
                                        )}
                                    </div>

                                    {/* Meta */}
                                    <div className="space-y-3">
                                        <div className="flex items-baseline justify-between">
                                            <h3 className="text-[15px] font-medium">{activeProject.title}</h3>
                                            <span className="text-[12px] opacity-50">{activeProject.year}</span>
                                        </div>
                                        <p className="text-[13px] leading-relaxed opacity-60 line-clamp-3">
                                            {activeProject.description}
                                        </p>
                                        {activeProject.tech?.length > 0 && (
                                            <div className="flex flex-wrap gap-3 pt-1">
                                                {activeProject.tech.slice(0, 4).map((tech) => (
                                                    <span key={tech} className="text-[11px] tracking-wide opacity-50">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer stats */}
                    <footer className="mt-24 pt-12 border-t border-gray-200">
                        <div className="flex justify-end items-center">
                            <div className="flex gap-8">
                                {projects.filter((p) => p.demo).length > 0 && (
                                    <p className="text-sm opacity-60">
                                        {projects.filter((p) => p.demo).length} Live Projects
                                    </p>
                                )}
                                <p className="text-sm opacity-60">{projects.length} Total Works</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </>
    )
}
