export default function MyContributions({ contributions }) {
    return (
        <section className="py-20 border-t-2 border-border-light" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom">
                <div className="mb-10 flex items-baseline gap-8">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold" style={{ marginLeft: 'max(1rem, calc((100% - 72rem) / 2))' }}>
                        My Contributions
                    </h2>
                    <div className="hidden md:block h-px flex-1" style={{ background: 'var(--border-light)' }} />
                </div>
                <div className="max-w-6xl mx-auto">

                    <div className="grid md:grid-cols-[1fr,1.1fr] gap-10 md:gap-12">
                        {contributions.map((section, idx) => (
                            <div
                                key={idx}
                                className="space-y-4"
                                style={{ marginTop: idx === 1 ? '2rem' : '0' }}
                            >
                                <div className="flex items-center gap-3 pb-3 border-b border-border-light">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--rose-taupe)' }} />
                                    <h3 className="text-base font-bold text-text-primary">
                                        {section.category}
                                    </h3>
                                </div>
                                <ul className="space-y-2 pl-4">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="text-[15px] leading-[1.6] text-text-secondary font-medium relative before:content-['•'] before:absolute before:-left-4 before:text-rose-taupe">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
