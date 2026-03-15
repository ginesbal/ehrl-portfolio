export default function ProjectHero({ project }) {
    return (
        <section className="relative" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom pt-20 pb-16 lg:pt-28 lg:pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 text-[10px] font-bold tracking-[0.3em] rounded-full bg-rose-taupe/10 text-rose-taupe border border-rose-taupe/20">
                            {project.category.toUpperCase()}
                        </span>
                        <span className="text-xs text-text-muted font-semibold">{project.year}</span>
                    </div>

                    <h1 className="text-[clamp(40px,6vw,58px)] font-extrabold leading-[0.95] tracking-tight mb-5">
                        {project.title}
                    </h1>

                    <p className="text-[clamp(16px,1.8vw,19px)] text-text-secondary leading-[1.55] mb-10 max-w-3xl">
                        {project.description}
                    </p>

                    <div className="flex gap-3 mb-14 pb-14 border-b border-border-light">
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

                    <div className="grid grid-cols-3 gap-6">
                        {project.metrics.map((m, i) => (
                            <div key={i} className="group">
                                <div className="text-3xl md:text-4xl font-black leading-none mb-1.5 transition-colors duration-300" style={{ color: 'var(--rose-taupe)' }}>
                                    {m.value}
                                </div>
                                <div className="text-[11px] text-text-primary uppercase tracking-[0.15em] font-bold mb-1">
                                    {m.label}
                                </div>
                                {m.detail && (
                                    <div className="text-[10px] text-text-muted leading-tight">
                                        {m.detail}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
