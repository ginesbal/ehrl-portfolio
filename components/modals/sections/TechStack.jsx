'use client'

export default function TechStack({ tech }) {
    if (!tech?.length) return null

    return (
        <div>
            <h4
                className="text-xs font-bold tracking-widest mb-4"
                style={{ color: 'var(--text-primary)' }}
            >
                TECHNOLOGIES
            </h4>
            <div className="flex flex-wrap gap-2">
                {tech.map((techItem) => (
                    <span
                        key={techItem}
                        className="px-4 py-2 text-xs rounded-full border transition-all duration-200 hover:scale-105 hover:border-rose-taupe"
                        style={{
                            background: 'var(--bg-accent)',
                            borderColor: 'var(--border-light)',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        {techItem}
                    </span>
                ))}
            </div>
        </div>
    )
}