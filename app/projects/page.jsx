'use client'

import Navigation from '@/components/layout/Navigation.jsx'
import { projects } from '@/data/portfolio-data'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProjectsArchive() {
    const [hoveredProject, setHoveredProject] = useState(null)
    const [imagePositions, setImagePositions] = useState({})

    // Generate random positions for floating images
    useEffect(() => {
        const positions = {}
        projects.forEach((project, index) => {
            positions[project.id] = {
                x: 20 + (index % 3) * 30 + Math.random() * 10,
                y: 10 + (index % 2) * 40 + Math.random() * 10,
                scale: 0.8 + Math.random() * 0.3,
                rotate: -10 + Math.random() * 20
            }
        })
        setImagePositions(positions)
    }, [])

    return (
        <>
            <Navigation />

            <main className="min-h-screen relative overflow-hidden">
                {/* Grain texture overlay */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
                    <svg width="100%" height="100%">
                        <filter id="grain">
                            <feTurbulence baseFrequency="0.65" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#grain)" />
                    </svg>
                </div>

                {/* Dark border frame — REMOVED */}

                {/* Main content */}
                <div className="relative z-10 px-8 md:px-12 lg:px-20 py-20 md:py-24">
                    {/* Back to Home link */}
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

                    {/* Projects List */}
                    <div className="relative">
                        {projects.map((project, index) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="group block border-t border-gray-200 py-8 md:py-12 transition-all duration-500 hover:pl-4"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2
                                            className={`
                        text-[clamp(3rem,7vw,6rem)]
                        font-bold
                        leading-[0.9]
                        transition-all
                        duration-500
                        ${hoveredProject === project.id ? 'translate-x-4' : ''}
                      `}
                                        >
                                            {project.title}
                                        </h2>
                                        <p className="mt-4 text-sm opacity-60 tracking-wide">
                                            {project.category}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-[clamp(2rem,4vw,3rem)] font-thin opacity-40">
                                            /{String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover indicator */}
                                <div
                                    className={`
                    mt-4
                    h-px
                    bg-black
                    origin-left
                    transition-transform
                    duration-500
                    ${hoveredProject === project.id ? 'scale-x-100' : 'scale-x-0'}
                  `}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Bottom stats */}
                    <footer className="mt-32 pt-12 border-t border-gray-200">
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
