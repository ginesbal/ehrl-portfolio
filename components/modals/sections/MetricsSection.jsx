'use client'

export default function MetricsSection({ metrics }) {
    if (!metrics?.length) return null

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
                <div
                    key={i}
                    className="p-6 rounded-xl text-center border transition-colors duration-200 hover:border-rose-taupe"
                    style={{
                        background: 'var(--bg-accent)',
                        borderColor: 'var(--border-light)'
                    }}
                >
                    <div
                        className="text-3xl font-light mb-1"
                        style={{ color: 'var(--rose-taupe)' }}
                    >
                        {metric.value}
                    </div>
                    <div
                        className="text-xs tracking-wide"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {metric.label}
                    </div>
                </div>
            ))}
        </div>
    )
}