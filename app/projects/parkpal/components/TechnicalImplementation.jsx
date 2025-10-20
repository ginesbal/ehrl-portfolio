'use client'
import { useState } from 'react'

export default function TechnicalImplementation({ highlights }) {
    const [expandedIndex, setExpandedIndex] = useState(0)

    return (
        <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-text-primary leading-tight mb-4">
                            Technical Implementation
                        </h2>
                        <p className="text-[15px] text-text-muted max-w-2xl">
                            Key technical decisions and implementation details that shaped the project
                        </p>
                    </div>

                    <div className="space-y-3">
                        {highlights.map((item, idx) => (
                            <ExpandableCard
                                key={idx}
                                item={item}
                                index={idx}
                                isExpanded={expandedIndex === idx}
                                onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function ExpandableCard({ item, index, isExpanded, onToggle }) {
    const panelId = `ti-panel-${item.title.replace(/\s+/g, '-').toLowerCase()}`
    const buttonId = `${panelId}-button`

    return (
        <div
            className={`border rounded-lg transition-all duration-300 ${isExpanded
                    ? 'border-rose-taupe bg-bg-secondary shadow-sm'
                    : 'border-border-light hover:border-rose-taupe/30'
                }`}
        >
            <button
                id={buttonId}
                onClick={onToggle}
                className="w-full text-left p-6 focus:outline-none group"
                aria-expanded={isExpanded}
                aria-controls={panelId}
            >
                <div className="flex justify-between items-center gap-6">
                    <div className="flex items-baseline gap-4">
                        <span className="text-xs font-bold text-text-muted">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-[17px] font-semibold text-text-primary">
                            {item.title}
                        </h3>
                    </div>
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full border transition-all ${isExpanded
                            ? 'border-rose-taupe bg-rose-taupe rotate-45'
                            : 'border-border-light group-hover:border-rose-taupe'
                        }`}>
                        <span className={`text-lg leading-none ${isExpanded ? 'text-white' : 'text-text-muted'}`}>+</span>
                    </div>
                </div>
            </button>

            {isExpanded && (
                <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 space-y-6 border-t border-border-light pt-6"
                >
                    <DetailBlock label="Challenge" content={item.challenge} />
                    <DetailBlock label="Approach" content={item.approach} />
                    <div className="p-5 bg-bg-primary border-l-2 border-rose-taupe rounded-r">
                        <p className="text-[11px] font-bold tracking-wider uppercase text-rose-taupe mb-3">
                            Result
                        </p>
                        <p className="text-[14px] leading-[1.7] text-text-primary">
                            {item.outcome}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

function DetailBlock({ label, content }) {
    return (
        <div>
            <p className="text-[11px] font-bold tracking-wider uppercase text-text-muted mb-3">
                {label}
            </p>
            <p className="text-[14px] text-text-secondary leading-[1.7]">
                {content}
            </p>
        </div>
    )
}
