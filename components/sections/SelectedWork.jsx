'use client'

import { ArrowUpRight, CheckCircle, ExternalLink, Github } from 'lucide-react'

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
        <section id="work" className="py-32 bg-[#FAFAFA]">
            <div className="container-custom">
                <div className="mb-20">
                    <div className="caption text-gray-500 mb-4">SELECTED WORK</div>
                    <h2 className="heading-1 max-w-3xl">
                        Projects that showcase my ability to solve complex problems with elegant solutions
                    </h2>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className="max-w-3xl"
                        >
                            <div className="space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-6xl font-bold text-gray-200 mb-2" aria-hidden="true">{project.id}</div>
                                        <h3 className="heading-lg">{project.title}</h3>
                                    </div>
                                    <span className="text-sm text-gray-500">{project.year}</span>
                                </div>

                                <p className="body-text text-gray-600">{project.description}</p>

                                {project.highlights && (
                                    <ul className="space-y-2">
                                        {project.highlights.map((h, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500" aria-hidden />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-sm border border-gray-300 rounded">{tag}</span>
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
