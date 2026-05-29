export default function TechnicalImplementation({ highlights }) {
    return (
        <section className="py-20 border-t-2 border-border-light" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom">
                <div className="mb-12 flex items-baseline gap-8">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-text-muted font-bold" style={{ marginLeft: 'max(1rem, calc((100% - 72rem) / 2))' }}>
                        Technical Implementation
                    </h2>
                    <div className="hidden md:block h-px flex-1" style={{ background: 'var(--border-light)' }} />
                </div>
                <div className="max-w-6xl mx-auto">

                    <div className="space-y-12">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="relative pb-12 last:pb-0">
                                <div className="grid md:grid-cols-[50px,1fr] gap-6 md:gap-8">
                                    <div className="flex flex-col items-center">
                                        <div className="text-3xl md:text-4xl font-black leading-none" style={{ color: idx === highlights.length - 1 ? 'var(--rose-taupe)' : 'var(--text-muted)', opacity: 0.2 }}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <h3 className="text-xl md:text-2xl font-extrabold text-text-primary leading-tight">
                                            {item.title}
                                        </h3>

                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold mb-1.5">
                                                Challenge
                                            </p>
                                            <p className="text-[15px] leading-[1.6] text-text-secondary">
                                                {item.challenge}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold mb-1.5">
                                                Approach
                                            </p>
                                            <p className="text-[15px] leading-[1.6] text-text-secondary">
                                                {item.approach}
                                            </p>
                                        </div>

                                        <div className="pl-4 border-l-2" style={{ borderColor: 'var(--rose-taupe)' }}>
                                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1.5" style={{ color: 'var(--rose-taupe)' }}>
                                                Result
                                            </p>
                                            <p className="text-[15px] leading-[1.6] text-text-primary font-semibold">
                                                {item.outcome}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
