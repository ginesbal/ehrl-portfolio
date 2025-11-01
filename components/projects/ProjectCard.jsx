'use client'

export default function ProjectCard({ project, index, isHovered, onHover, onLeave, onClick }) {
    const open = (e) => { e.preventDefault(); onClick?.() }
    const keyOpen = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } }

    return (
        <article className="group relative transition-all duration-500 hover:-translate-y-2" onMouseEnter={onHover} onMouseLeave={onLeave}>
            <a
                href="#"
                role="button"
                aria-label={`Open ${project.title}`}
                onClick={open}
                onKeyDown={keyOpen}
                className="block rounded-xl border border-border-light bg-bg-primary shadow-sm hover:shadow-2xl transition-shadow duration-500 focus:outline-none focus:ring-2 focus:ring-rose-taupe/40"
                style={{ transitionDelay: `${index * 75}ms` }}
            >
                <ProjectImage project={project} index={index} isHovered={isHovered} />
                <ProjectInfo project={project} isHovered={isHovered} />
            </a>
        </article>
    )
}

function ProjectImage({ project, index, isHovered }) {
    return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-bg-accent">
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10 backdrop-blur-sm bg-white/95 border border-border-light">
                <span className="text-[14px] font-medium text-rose-taupe">{String(index + 1).padStart(2, '0')}</span>
            </div>

            {project.demo && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider backdrop-blur-sm z-10 bg-rose-taupe/95 text-white">
                    LIVE
                </div>
            )}

            {project.image ? (
                <img
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 brightness-75' : 'scale-100'}`}
                    loading="lazy"
                    width={1200}
                    height={900}
                />
            ) : (
                <div className={`absolute inset-0 transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} style={{ background: `linear-gradient(135deg, ${project.gradient})` }} />
            )}

            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-black/40 backdrop-blur-[1px]' : 'bg-transparent opacity-0 pointer-events-none'}`}>
                {isHovered && (
                    <div className="text-white text-center space-y-2 px-6">
                        <div className="text-[13px] font-medium tracking-wider opacity-90">VIEW DETAILS</div>
                        <div className="w-8 h-0.5 bg-white/60 mx-auto" />
                    </div>
                )}
            </div>
        </div>
    )
}

function ProjectInfo({ project, isHovered }) {
    return (
        <div className="p-6">
            <div className="mb-3">
                <h3 className="text-[20px] font-medium mb-1 text-text-primary group-hover:text-rose-taupe transition-colors">{project.title}</h3>
                <p className="text-[13px] tracking-wide text-text-muted">{project.subtitle}</p>
            </div>

            <p className="text-[14px] leading-relaxed mb-4 line-clamp-2 text-text-secondary">
                {project.description}
            </p>

            <TechStack tech={project.tech} />

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                <span className="text-[11px] tracking-wide text-text-muted">{project.year}</span>
                <span className={`text-[14px] text-rose-taupe transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} aria-hidden>→</span>
            </div>
        </div>
    )
}

function TechStack({ tech }) {
    return (
        <div className="space-y-2">
            <p className="text-[10px] tracking-widest uppercase font-medium text-text-muted">Stack</p>
            <div className="flex flex-wrap gap-2">
                {tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-3 py-2 text-[11px] rounded-md border border-border-light bg-bg-accent text-text-secondary hover:bg-rose-taupe hover:text-white hover:border-rose-taupe transition-colors duration-200">{t}</span>
                ))}
                {tech.length > 3 && <span className="px-2.5 py-1 text-[11px] font-medium text-text-muted">+{tech.length - 3}</span>}
            </div>
        </div>
    )
}
