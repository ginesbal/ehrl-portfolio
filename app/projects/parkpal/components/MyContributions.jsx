export default function MyContributions({ contributions, context }) {
    return (
        <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 items-start">
                        <div className="lg:sticky lg:top-24">
                            <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-text-primary leading-tight mb-6">
                                My Contributions
                            </h2>
                            <p className="text-[15px] leading-[1.7] text-text-muted">
                                As the sole developer on the redesign, I took full ownership of the technical architecture and implementation.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {contributions.map((section, idx) => (
                                <div key={idx} className="pb-8 border-b border-border-light last:border-0 last:pb-0">
                                    <h3 className="text-[13px] font-bold tracking-wider uppercase text-rose-taupe mb-5">
                                        {section.category}
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start">
                                                <span className="w-1 h-1 rounded-full bg-rose-taupe mt-2 flex-shrink-0"></span>
                                                <span className="text-[14px] leading-[1.7] text-text-secondary">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}