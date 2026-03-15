export default function ProjectOverview({ project }) {
    const { overview } = project

    return (
        <section className="py-20 border-t-2 border-border-light" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom">
                <div className="mb-10 flex items-baseline gap-8">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold" style={{ marginLeft: 'max(1rem, calc((100% - 72rem) / 2))' }}>
                        Overview
                    </h2>
                    <div className="hidden md:block h-px flex-1" style={{ background: 'var(--border-light)' }} />
                </div>
                <div className="max-w-6xl mx-auto">

                    <div className="space-y-5 mb-16 pb-16 border-b border-border-light">
                        {overview.summary.map((paragraph, i) => (
                            <p key={i} className="text-lg leading-[1.65] text-text-secondary max-w-3xl">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-1 h-1 rounded-full" style={{ background: 'var(--rose-taupe)' }} />
                                <h3 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold">
                                    Technical Focus
                                </h3>
                            </div>
                            <ul className="space-y-2.5 pl-4">
                                {overview.technicalFocus.map((item, i) => (
                                    <li key={i} className="text-[15px] leading-[1.6] text-text-secondary font-medium relative before:content-['—'] before:absolute before:-left-4 before:text-text-muted">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-1 h-1 rounded-full" style={{ background: 'var(--rose-taupe)' }} />
                                <h3 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold">
                                    Core Features
                                </h3>
                            </div>
                            <ul className="space-y-2.5 pl-4">
                                {overview.coreFeatures.map((item, i) => (
                                    <li key={i} className="text-[15px] leading-[1.6] text-text-secondary font-medium relative before:content-['—'] before:absolute before:-left-4 before:text-text-muted">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
