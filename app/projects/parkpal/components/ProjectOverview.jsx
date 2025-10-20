export default function ProjectOverview({ project }) {
    const { overview } = project

    return (
        <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 items-start">
                        <div className="lg:sticky lg:top-24">
                            <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-text-primary leading-tight">
                                Project Overview
                            </h2>
                        </div>

                        <div className="space-y-12">
                            <div className="text-[15px] leading-[1.8] text-text-secondary space-y-4">
                                {overview.summary.map((paragraph, i) => (
                                    <p key={i}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <InfoCard
                                    title="Technical Focus"
                                    items={overview.technicalFocus}
                                />
                                <InfoCard
                                    title="Core Features"
                                    items={overview.coreFeatures}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function InfoCard({ title, items }) {
    return (
        <div className="p-6 bg-bg-primary border border-border-light rounded-lg">
            <h3 className="text-[11px] font-bold tracking-wider uppercase text-rose-taupe mb-5">
                {title}
            </h3>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                        <span className="w-1 h-1 rounded-full bg-rose-taupe mt-2 flex-shrink-0"></span>
                        <span className="text-[13px] leading-[1.6] text-text-secondary">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
