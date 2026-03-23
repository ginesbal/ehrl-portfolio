'use client'

import { ArrowUpRight, CheckCircle, ExternalLink, Github } from 'lucide-react'
import FloatingCircles from '../ui/FloatingCircles.jsx'

export default function SelectedWork() {
    const projects = [
        {
            id: '01',
            title: 'EB Secure Web App',
            category: 'WEB APPLICATION',
            year: '2024',
            description: 'A secure web application with modern authentication and data protection features',
            link: 'https://eb-secure-web-app.vercel.app',
            githubLink: 'https://github.com/yourusername/eb-secure-web-app',
            highlights: ['Secure user authentication', 'Encrypted data storage', 'Responsive design', 'Modern UI/UX'],
            tags: ['React', 'Node.js', 'JWT', 'Vercel'],
            status: 'live'
        },
    ]

    return (
        <section id="work" className="relative overflow-hidden bg-bg-primary pt-12 pb-20">
            <FloatingCircles section="selectedWork" />

            <div className="container-custom relative z-10">
                <div className="mb-12">
                    <p className="text-[10px] tracking-[0.15em] uppercase mb-1.5 font-semibold text-rose-taupe">selected work</p>
                    <h2 className="heading-1 max-w-3xl text-text-primary">
                        Projects that showcase my ability to solve complex problems with elegant solutions
                    </h2>
                </div>

                <div className="space-y-20">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className="max-w-4xl"
                        >
                            <div className="space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-6xl font-bold text-border-light mb-2" aria-hidden="true">{project.id}</div>
                                        <h3 className="heading-lg text-text-primary">{project.title}</h3>
                                    </div>
                                    <span className="text-sm text-text-muted">{project.year}</span>
                                </div>

                                <p className="body-text text-text-secondary">{project.description}</p>

                                {project.highlights && (
                                    <ul className="space-y-2">
                                        {project.highlights.map((h, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                                                <CheckCircle className="w-4 h-4 text-rose-taupe" aria-hidden />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-sm border border-border-light rounded">{tag}</span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary group flex items-center gap-2">
                                            <ExternalLink className="w-5 h-5" />
                                            View Live Site
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-outline group flex items-center gap-2">
                                            <Github className="w-5 h-5" />
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
