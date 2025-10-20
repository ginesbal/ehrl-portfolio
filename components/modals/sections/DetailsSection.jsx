'use client'

export default function DetailsSection({ details }) {
    if (!details) return null

    return (
        <div className="space-y-6">
            {Object.entries(details).map(([key, value]) => (
                <div
                    key={key}
                    className="p-6 rounded-xl border-l-2 transition-all duration-200 hover:shadow-sm"
                    style={{
                        background: 'var(--bg-accent)',
                        borderLeftColor: 'var(--rose-taupe)'
                    }}
                >
                    <h4
                        className="text-xs font-bold tracking-widest mb-3"
                        style={{ color: 'var(--rose-quartz)' }}
                    >
                        {key.toUpperCase().replace(/_/g, ' ')}
                    </h4>
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {value}
                    </p>
                </div>
            ))}
        </div>
    )
}
