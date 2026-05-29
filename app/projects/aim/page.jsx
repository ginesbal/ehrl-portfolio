import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import ProjectNavigation from './components/ProjectNavigation'
import { aimData } from './data'

export const metadata = {
    title: 'aim — Study Planner | Ehrl Balquin',
    description: 'A calm study planner built with Next.js and TypeScript. Focus timer, task manager, streak tracking, and localStorage persistence — no backend required.'
}

export default function AimPage() {
    return (
        <div>
            <MobileNav />
            <SidebarNav />
            <main
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <Hero project={aimData} />
                <Content project={aimData} />
                <ProjectNavigation />
            </main>
        </div>
    )
}

function Hero({ project }) {
    return (
        <section className="relative" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom pt-20 pb-16 lg:pt-28 lg:pb-20">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 text-[10px] font-bold tracking-[0.3em] rounded-full bg-rose-taupe/10 text-rose-taupe border border-rose-taupe/20">
                            {project.category.toUpperCase()}
                        </span>
                        <span className="text-xs text-text-muted font-semibold">{project.year}</span>
                    </div>

                    <h1 className="text-[clamp(40px,6vw,58px)] font-extrabold leading-[0.95] tracking-tight mb-5">
                        {project.title}
                    </h1>

                    <p className="text-[clamp(16px,1.8vw,19px)] text-text-secondary leading-[1.55] mb-10">
                        {project.description}
                    </p>

                    <div className="flex gap-3">
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            View Demo
                        </a>
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Content({ project }) {
    return (
        <section className="py-20 border-t-2 border-border-light" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom">
                <div className="max-w-3xl">

                    <div className="space-y-4 mb-16 pb-16 border-b border-border-light">
                        {project.summary.map((p, i) => (
                            <p key={i} className="text-lg leading-[1.65] text-text-secondary">{p}</p>
                        ))}
                    </div>

                    <div className="mb-16 pb-16 border-b border-border-light">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold mb-6">
                            What I built
                        </h2>
                        <ul className="space-y-3">
                            {project.built.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-[15px] leading-[1.6] text-text-secondary font-medium pl-4 relative before:content-['—'] before:absolute before:-left-0 before:text-text-muted"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold mb-6">
                            Stack
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 text-[12px] font-semibold tracking-[0.05em] border border-border-light text-text-secondary rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
